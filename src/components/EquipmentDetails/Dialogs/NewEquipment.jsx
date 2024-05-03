import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import EquipmentInput from '../InputFields/EquipmentInput';
import PasswordInput from '../InputFields/PasswordInput';

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

function SimpleDialog(props) {
	const { onClose, selectedValue, open, equipmentName } = props;
	const [newEquipmentId, setNewEquipmentId] = useState('');
	const [adminPassword, setAdminPassword] = useState('');

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleAddEquipment = async () => {
		const username = JSON.parse(localStorage.getItem('user')).username;
		const adminId = JSON.parse(localStorage.getItem('user')).adminId;
		const doc = {
			id: parseInt(newEquipmentId),
			availability: 'available',
			endTime: '/',
			profitDay: '0',
			profitMonth: '0',
			history: [],
		};
		const user = {
			username,
			password: adminPassword,
		};

		try {
			const authenticate = await axios.post('/api/auth/equipment', user);
			if (authenticate.status === 200) {
				try {
					const response = await axios.post(`${baseUrl}/equipment/${adminId}/${equipmentName}`, doc);
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
			<div className="text-center p-4">
				<EquipmentInput
					value="* ID opreme"
					setNewEquipmentId={setNewEquipmentId}
				/>
				<PasswordInput
					value="* Admin lozinka"
					setAdminPassword={setAdminPassword}
					type="password"
				/>
				<Button
					variant="contained"
					onClick={handleAddEquipment}
					style={{
						backgroundColor: '#2463EB',
						color: 'white',
						fontFamily: 'nunito',
						width: '30ch',
						marginTop: '10px',
					}}
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
	selectedValue: PropTypes.string.isRequired,
};

export default function NewEquipment({ equipmentName }) {
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState('');

	const handleClickOpen = () => {
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
				style={{ textTransform: 'none', fontSize: '14px', backgroundColor: '#2463EB', fontFamily: 'nunito' }}
			>
				Novo
			</Button>
			<SimpleDialog
				selectedValue={selectedValue}
				open={open}
				onClose={handleClose}
				equipmentName={equipmentName}
			/>
		</>
	);
}
