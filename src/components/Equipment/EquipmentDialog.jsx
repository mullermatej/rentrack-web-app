import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import EquipmentInputField from './EquipmentInputField';
import UserInputField from './UserInputField';

function SimpleDialog(props) {
	const { onClose, selectedValue, open } = props;
	const [user, setUser] = useState({ username: '', password: '' });
	const [NewEquipment, setNewEquipment] = useState({
		name: '',
		adminId: '',
	});

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			setUser({
				username: user.username,
				password: '',
			});
		}
		setNewEquipment((prevState) => ({
			...prevState,
			adminId: user.adminId,
		}));
	}, []);

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleAddEquipment = async () => {
		try {
			const response = await axios.post('/api/auth/equipment', user);
			if (response.status === 200) {
				try {
					const response = await axios.post('/api/equipment', NewEquipment);
					console.log(response);
				} catch (error) {
					console.error(error);
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Dialog
			onClose={handleClose}
			open={open}
		>
			<div className="text-center">
				<EquipmentInputField
					value="Naziv"
					field="name"
					setNewEquipment={setNewEquipment}
				/>
				<UserInputField
					value="Admin lozinka"
					field="password"
					setUser={setUser}
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
