import { useState } from 'react';
import Button from '@mui/material/Button';
import InputField from '../components/InputField';
import axios from 'axios';

export default function Register() {
	const [inputValues, setInputValues] = useState({});

	const handleClick = async () => {
		const username = inputValues['korisnicko ime'];
		const password = inputValues['lozinka'];
		try {
			const doc = { username, password };

			const response = await axios.post('http://localhost:3000/users', doc);
			console.log('Success: ', response.data);
		} catch (error) {
			if (error.response) {
				console.error('Error:', error.response.data, error.response.status);
			} else {
				console.error('Error:', error.message);
			}
		}
	};

	return (
		<>
			<h1>This is a Register page</h1>
			{/* <InputField value="Ime vlasnika" />
			<InputField value="Prezime vlasnika" />
			<InputField value="Naziv obrta" />
			<InputField value="OIB broj obrta" />
			<InputField value="Adresa obrta" />
			<InputField
				value="Email"
				type="email"
			/> */}
			<InputField
				value="Korisnicko ime"
				inputValues={inputValues}
				setInputValues={setInputValues}
			/>
			<InputField
				value="Lozinka"
				type="password"
				inputValues={inputValues}
				setInputValues={setInputValues}
			/>
			{/* <InputField
				value="Potvrdi lozinku"
				type="password"
			/> */}

			<Button
				variant="outlined"
				onClick={handleClick}
			>
				Registriraj se
			</Button>
		</>
	);
}
