import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import DenseTable from '../Tables/DenseTable';

function SimpleDialog(props) {
	const { onClose, selectedValue, open, equipment } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};

	return (
		<Dialog
			onClose={handleClose}
			open={open}
		>
			<DenseTable equipment={equipment} />
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selectedValue: PropTypes.string.isRequired,
};

export default function Pricing({ equipmentName }) {
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState('');
	const [equipment, setEquipment] = useState({});
	const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

	useEffect(() => {
		const getEquipment = async () => {
			try {
				const adminId = JSON.parse(localStorage.getItem('user')).adminId;
				const response = await axios.get(`${baseUrl}/equipment/${adminId}/${equipmentName}`);
				setEquipment(response.data[0]);
			} catch (error) {
				console.error(error);
			}
		};
		getEquipment();
	}, [baseUrl, equipmentName]);

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
				variant="contained"
				onClick={handleClickOpen}
			>
				Cjenik
			</Button>
			<SimpleDialog
				selectedValue={selectedValue}
				open={open}
				onClose={handleClose}
				equipment={equipment}
			/>
		</>
	);
}
