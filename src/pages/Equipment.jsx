import { useState, useEffect } from 'react';
import axios from 'axios';
// import { storage } from '../firebase';
// import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import EquipmentDialog from '../components/Equipment/EquipmentDialog';
import EquipmentCard from '../components/Equipment/EquipmentCard';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export default function Equipment() {
	const [equipment, setEquipment] = useState([]);
	const [exists, setExists] = useState(null);
	const [imageLoaded, setImageLoaded] = useState(false);
	// const [image, setImage] = useState('');
	// const [imageUrl, setImageUrl] = useState([]);
	// const renderedUrls = new Set();

	// const uploadImage = async () => {
	// 	if (image !== null) {
	// 		const imageRef = ref(storage, `images/${image.name}`);
	// 		uploadBytes(imageRef, image).then((snapshot) => {
	// 			console.log('Uploaded a blob or file!', snapshot);
	// 			getDownloadURL(snapshot.ref).then((url) => {
	// 				setImageUrl((prev) => [...prev, url]);
	// 			});
	// 		});
	// 	}
	// };

	useEffect(() => {
		const businessId = JSON.parse(localStorage.getItem('user')).businessId;

		// listAll(ref(storage, 'images')).then((res) => {
		// 	res.items.forEach((itemRef) => {
		// 		getDownloadURL(itemRef).then((url) => {
		// 			setImageUrl((prev) => [...prev, url]);
		// 		});
		// 	});
		// });

		const getEquipment = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/equipment/${businessId}`);
				setEquipment(response.data);
				if (response.data.length > 0) {
					setExists(true);
					setImageLoaded(true);
				} else {
					setExists(false);
				}
			} catch (error) {
				console.error('Error getting equipment: ', error);
			}
		};

		getEquipment();
	}, []);

	return (
		<>
			{exists === true && (
				<div className="flex justify-center my-6">
					<Paper className="py-4 px-8 flex-column justify-center">
						<p className="text-4xl font-nunito pb-2">Popis Opreme</p>
						<EquipmentDialog />
					</Paper>
				</div>
			)}
			{exists === true && (
				<Container>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{equipment.map((item) => (
							<div
								key={item._id}
								className="flex justify-center my-2"
							>
								<EquipmentCard
									equipment={item}
									imageLoaded={imageLoaded}
								/>
							</div>
						))}
					</div>
					{/* <div>
						<input
							type="file"
							onChange={(e) => setImage(e.target.files[0])}
						/>
						<button onClick={uploadImage}>Upload</button>
					</div>
					<div>
						{imageUrl.map((url) => {
							if (!renderedUrls.has(url)) {
								renderedUrls.add(url);
								return (
									<div key={url}>
										<img
											src={url}
											height="200px"
											width="200px"
										/>
									</div>
								);
							}
							return null;
						})}
					</div> */}
				</Container>
			)}
			{exists === false && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '80vh',
					}}
				>
					<Container>
						<div className="flex justify-center">
							<Paper className="flex-column justify-center p-6 max-w-sm">
								<WavingHandOutlinedIcon style={{ fontSize: '6rem', marginBottom: '15px' }} />
								<p className="font-nunito text-3xl">Započni praćenje najma</p>
								<p className="font-nunito py-3">
									Čini se malo praznim ovdje. Započni praćenje najma dodavanjem svoje prve opreme.
								</p>
								<EquipmentDialog />
							</Paper>
						</div>
					</Container>
				</div>
			)}
		</>
	);
}
