import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import InputField from './InputField';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
	const { onClose, selectedValue, open } = props;
	const [newUser, setNewUser] = useState({
		name: '',
		surname: '',
		password: '',
		repeatPassword: '',
	});

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleCreateUser = async () => {
		const adminId = JSON.parse(localStorage.getItem('user')).adminId;
		const doc = {
			adminId,
			name: newUser.name,
			surname: newUser.surname,
			password: newUser.password,
		};

		if (newUser.name === '' || newUser.surname === '') {
			console.log('Potrebno je ispuniti sva polja!');
			return;
		} else if (newUser.password.length < 6) {
			console.log('Lozinka mora imati najmanje 6 znakova');
			return;
		} else if (newUser.password !== newUser.repeatPassword) {
			console.log('Lozinke se ne podudaraju');
			return;
		}
		try {
			const response = await axios.post(`api/users/${adminId}/profiles`, doc);
			console.log('Success, response is: ', response);
		} catch (error) {
			console.error('Error:', error.message);
		}
	};

	return (
		<Dialog
			onClose={handleClose}
			open={open}
		>
			<DialogTitle className="text-center">Ispuni sve informacije kako bi te dodali</DialogTitle>
			<div className="text-center">
				<InputField
					value="Ime"
					setNewUser={setNewUser}
					field="name"
				/>
				<InputField
					value="Prezime"
					setNewUser={setNewUser}
					field="surname"
				/>
				<InputField
					value="Lozinka"
					setNewUser={setNewUser}
					type="password"
					field="password"
				/>
				<InputField
					value="Ponovi lozinku"
					setNewUser={setNewUser}
					type="password"
					field="repeatPassword"
				/>
				<Button
					variant="outlined"
					style={{ marginBottom: '20px', marginTop: '20px' }}
					onClick={handleCreateUser}
				>
					Kreiraj
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

export default function UserSelectDialog() {
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState(emails[1]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);
		setSelectedValue(value);
	};

	const handleProfileLogin = () => {
		// Nastaviti ovdje
	};

	return (
		<>
			<div className="flex justify-center gap-4 mt-2">
				<Button
					variant="outlined"
					onClick={handleProfileLogin}
				>
					Ulogiraj
				</Button>
				<Button
					variant="outlined"
					onClick={handleClickOpen}
				>
					Novi korisnik?
				</Button>
			</div>
			<SimpleDialog
				selectedValue={selectedValue}
				open={open}
				onClose={handleClose}
			/>
		</>
	);
}
