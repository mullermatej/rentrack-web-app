import Button from '@mui/material/Button';
import InputField from '../components/InputField';

export default function Register() {
	return (
		<>
			<h1>This is a Register page</h1>
			<InputField value="Ime vlasnika" />
			<InputField value="Prezime vlasnika" />
			<InputField value="Naziv obrta" />
			<InputField value="OIB broj obrta" />
			<InputField value="Adresa obrta" />
			<InputField
				value="Email"
				type="email"
			/>
			<InputField
				value="Lozinka"
				type="password"
			/>
			<InputField
				value="Potvrdi lozinku"
				type="password"
			/>

			<Button variant="outlined">Registriraj se</Button>
		</>
	);
}
