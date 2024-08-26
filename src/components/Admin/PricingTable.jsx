import { useState, useRef } from 'react';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PriceListDialog from './PriceListDialog';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AuthSnackbar from '../Snackbars/AuthSnackbar';
import Button from '@mui/material/Button';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function createData(equipmentName, equipmentPricing) {
	return { equipmentName, equipmentPricing };
}

export default function PricingTable({ equipment }) {
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [backgroundColor, setBackgroundColor] = useState('fireBrick');
	const [snackbarLink, setSnackbarLink] = useState('');
	const [image, setImage] = useState(null);
	const [imageUrl, setImageUrl] = useState([]);
	const [imageEquipmentName, setImageEquipmentName] = useState('');
	const fileInputRef = useRef(null);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	const addNewImageUrl = async (imageUrl, equipmentName) => {
		const businessId = JSON.parse(localStorage.getItem('user')).businessId;
		try {
			let response = await axios.patch(`${BASE_URL}/equipment/${businessId}/${equipmentName}/newImage`, {
				imageUrl: imageUrl,
			});
			console.log(response);
		} catch (error) {
			console.error('Error adding image URL: ', error);
		}
		console.log(image);
	};

	const handleChangeImage = async (event) => {
		const selectedImage = event.target.files[0];
		setImage(selectedImage);

		console.log('Equipment name', imageEquipmentName);
		setBackgroundColor('gray');
		setSnackbarMessage('Pričekajte trenutak...');
		setSnackbarOpen(true);

		if (selectedImage) {
			const imageRef = ref(storage, `images/${selectedImage.name}`);
			try {
				const snapshot = await uploadBytes(imageRef, selectedImage);
				console.log('Uploaded a blob or file!', snapshot);
				const url = await getDownloadURL(snapshot.ref);
				setImageUrl((prev) => [...prev, url]);
				addNewImageUrl(url, imageEquipmentName);
				console.log('URL', imageUrl);
				setBackgroundColor('forestGreen');
				setSnackbarMessage('Slika uspješno promijenjena.');
				setSnackbarOpen(true);
			} catch (error) {
				setSnackbarMessage('Greška! Pokušaj ponovno.');
				setSnackbarOpen(true);
				console.error('Error uploading image: ', error);
			}
		}
	};

	const handleImageButton = (equipmentName) => {
		fileInputRef.current.click();
		setImageEquipmentName(equipmentName);
	};

	const createSnackbarLink = (equipmentName) => {
		const businessId = JSON.parse(localStorage.getItem('user')).businessId;
		return (
			<a
				href={`/equipment/${businessId}/${equipmentName}`}
				className="underline"
			>
				Vidi opremu
			</a>
		);
	};

	const handleDeleteEquipment = async (equipmentName) => {
		let deleteable = true;
		const businessId = JSON.parse(localStorage.getItem('user')).businessId;
		const response = await axios.get(`${BASE_URL}/equipment/${businessId}/${equipmentName}`);
		const addedEquipment = response.data[0].addedEquipment;
		if (addedEquipment.length > 0) {
			for (let i = 0; i < addedEquipment.length; i++) {
				if (addedEquipment[i].availability === 'unavailable') {
					console.log('Equipment is in use and cannot be deleted');
					deleteable = false;
					setSnackbarMessage('Greška! Oprema je trenutno u najmu.');
					setSnackbarLink(createSnackbarLink(equipmentName));
					setSnackbarOpen(true);
					return;
				}
			}
		}
		if (deleteable) {
			let response = await axios.delete(`${BASE_URL}/equipment/${businessId}/${equipmentName}`);
			console.log(equipmentName, businessId);
			if (response.status === 200) {
				setBackgroundColor('forestGreen');
				setSnackbarMessage('Oprema uspješno obrisana');
				setSnackbarOpen(true);
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			} else {
				setSnackbarMessage('Greška! Pokušaj ponovno.');
				setSnackbarOpen(true);
			}
		}
	};

	const rows = equipment.map((object) => createData(object.name, 'Uredi'));

	return (
		<>
			<TableContainer component={Paper}>
				<Table
					sx={{ minWidth: 250, backgroundColor: '#FFD460' }}
					size="small"
					aria-label="a dense table"
				>
					<TableHead>
						<TableRow>
							<TableCell sx={{ fontFamily: 'nunito', fontSize: '16px', borderBottom: 'none' }}>
								Naziv opreme
							</TableCell>
							<TableCell sx={{ borderBottom: 'none' }}></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.equipmentName}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell
									component="th"
									scope="row"
									className="capitalize"
									sx={{ fontFamily: 'nunito', borderBottom: 'none' }}
								>
									<HighlightOffIcon
										className="cursor-pointer"
										fontSize="small"
										onClick={() => handleDeleteEquipment(row.equipmentName)}
									/>{' '}
									{row.equipmentName}
								</TableCell>
								<TableCell
									align="right"
									sx={{ display: 'flex', gap: '10px', borderBottom: 'none' }}
								>
									<PriceListDialog
										equipment={equipment}
										singleEquipmentName={row.equipmentName}
									/>
									<Button
										size="small"
										variant="contained"
										onClick={() => handleImageButton(row.equipmentName)}
										style={{
											textTransform: 'none',
											fontFamily: 'nunito',
											backgroundColor: '#EA5455',
											fontSize: '13px',
										}}
									>
										<PhotoCameraIcon
											fontSize="inherit"
											className="mr-2"
										/>
										Promijeni sliku
									</Button>
									<input
										type="file"
										ref={fileInputRef}
										accept=".jpg,.jpeg,.png"
										style={{ display: 'none' }}
										onChange={handleChangeImage}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<AuthSnackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				handleClose={handleClose}
				message={snackbarMessage}
				backgroundColor={backgroundColor}
				link={snackbarLink}
			/>
		</>
	);
}
