import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import InputField from '../components/UserSelect/InputField';
import Dropdown from '../components/UserSelect/Dropdown';
import NewProfileDialog from '../components/UserSelect/NewProfileDialog/NewProfileDialog';

export default function UserSelect() {
	const [open, setOpen] = useState(false);
	const [profile, setProfile] = useState({ adminId: '', name: '', surname: '', password: '' });

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleProfileLogin = async () => {
		// Nastaviti ovdje
		try {
			const response = await axios.post('/api/authProfile', profile);
			if (response.status === 200) {
				localStorage.setItem('profile', JSON.stringify(response.data));
				console.log('Logged in!');
			} else {
				console.log('Unable to log in!');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<h1>Tko si ti?</h1>
			<h3>Ako nisi na popisu, dodaj se!</h3>
			<Dropdown setProfile={setProfile} />
			<InputField
				value="Lozinka"
				type="password"
				field="password"
				setProfile={setProfile}
			/>
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
			<NewProfileDialog
				open={open}
				handleClickOpen={handleClickOpen}
				handleClose={handleClose}
			/>
		</>
	);
}
