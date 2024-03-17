import Button from '@mui/material/Button';
import InputField from '../components/InputField';
// import LoginDialog from '../components/LoginDialog';

export default function Login() {
	return (
		<>
			<h1>This is a Login page</h1>
			<InputField value="OIB obrta" />
			<InputField
				value="Lozinka"
				type="password"
			/>

			<Button variant="outlined">Ulogiraj se</Button>
			{/* <LoginDialog /> */}
		</>
	);
}
