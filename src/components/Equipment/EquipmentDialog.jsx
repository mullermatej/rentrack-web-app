import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import EquipmentInputField from './EquipmentInputField';
import UserInputField from './UserInputField';
import HoursInputField from './HoursInputField';
import PricesInputField from './PricesInputField';

function SimpleDialog(props) {
	const { onClose, selectedValue, open } = props;

	const [user, setUser] = useState({ username: '', password: '' });
	const [newEquipment, setNewEquipment] = useState({
		name: '',
		adminId: '',
		prices: {},
	});
	const [hours, setHours] = useState(0);
	const [price, setPrice] = useState(0);

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

	const handleAddPricing = () => {
		if (hours === 0 || price === 0) {
			console.log('Hours or price not set');
			return;
		} else {
			setNewEquipment((prevState) => ({
				...prevState,
				prices: {
					...prevState.prices,
					[hours]: price,
				},
			}));
			console.log('Added pricing: ', hours, 'h = ', price, '€');
			setHours(0);
			setPrice(0);
		}
	};

	const handleAddEquipment = async () => {
		console.log(newEquipment);

		try {
			const response = await axios.post('/api/auth/equipment', user);
			if (response.status === 200) {
				try {
					const response = await axios.post('/api/equipment', newEquipment);
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
			<div className="text-center p-5">
				<EquipmentInputField
					value="*Naziv"
					field="name"
					setNewEquipment={setNewEquipment}
				/>
				<div className="flex justify-center">
					<HoursInputField
						value={hours}
						setHours={setHours}
					/>
					<PricesInputField
						value={price}
						setPrice={setPrice}
					/>
				</div>
				<Button
					size="small"
					variant="outlined"
					onClick={handleAddPricing}
				>
					Dodaj u cjenik
				</Button>

				<UserInputField
					value="*Admin lozinka"
					field="password"
					setUser={setUser}
				/>
				<Button
					variant="contained"
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
