import { useState } from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import InputField from './InputField';
function SimpleDialog(props) {
	const { onClose, selectedValue, open } = props;
	const [NewEquipment, setNewEquipment] = useState({
		name: '',
		adminId: '',
	});

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleAddEquipment = () => {
		// Nastavi na dodavanje nakon sto omogucis prikaz
		console.log('Adding equipment: ', NewEquipment);
	};

	return (
		<Dialog
			onClose={handleClose}
			open={open}
		>
			<div className="text-center">
				<InputField
					value="Naziv"
					field="name"
					setNewEquipment={setNewEquipment}
				/>
				<InputField
					value="Admin lozinka"
					field="adminId"
					setNewEquipment={setNewEquipment}
				/>
				<Button
					variant="outlined"
					style={{ marginBottom: '10px', marginTop: '10px' }}
					onClick={handleAddEquipment}
				>
					Dodaj
				</Button>
			</div>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};

export default function UserSelectDialog() {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button
				variant="outlined"
				onClick={handleClickOpen}
			>
				Dodaj
			</Button>
			<SimpleDialog
				open={open}
				onClose={handleClose}
			/>
		</>
	);
}
