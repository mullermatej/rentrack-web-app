import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import NewPriceInput from './NewPriceInput';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
const adminId = JSON.parse(localStorage.getItem('user')).adminId;

function SimpleDialog(props) {
	const { onClose, selectedValue, open, singleEquipmentName } = props;
	const [priceInfo, setPriceInfo] = useState({
		hours: '',
		price: 0,
	});

	const handleAddNewPrice = async () => {
		priceInfo.price = parseInt(priceInfo.price);
		try {
			const response = await axios.post(`${BASE_URL}/equipment/${adminId}/${singleEquipmentName}/prices`, {
				hours: priceInfo.hours,
				price: priceInfo.price,
			});
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	const handleClose = () => {
		onClose(selectedValue);
	};

	return (
		<Dialog
			onClose={handleClose}
			open={open}
		>
			<div className="text-center m-4">
				<NewPriceInput
					setPriceInfo={setPriceInfo}
					label="Sati"
				/>
				<NewPriceInput
					setPriceInfo={setPriceInfo}
					label="Cijena"
				/>
				<div className="mt-4">
					<Button
						variant="contained"
						size="small"
						onClick={handleAddNewPrice}
					>
						Spremi
					</Button>
				</div>
			</div>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selectedValue: PropTypes.string.isRequired,
};

export default function Pricing({ singleEquipmentName }) {
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState('');

	const handleClickOpen = async () => {
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);
		setSelectedValue(value);
	};

	return (
		<>
			<Button
				size="small"
				variant="outlined"
				onClick={handleClickOpen}
			>
				Novo
			</Button>
			<SimpleDialog
				selectedValue={selectedValue}
				open={open}
				onClose={handleClose}
				singleEquipmentName={singleEquipmentName}
			/>
		</>
	);
}
