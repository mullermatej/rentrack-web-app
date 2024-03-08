import Button from '@mui/material/Button';
import InputField from '../components/InputField';

function Login() {
	return (
		<>
			<h1>This is a Login page</h1>
			<InputField value="Username" />
			<InputField
				value="Email"
				type="email"
			/>
			<InputField
				value="Password"
				type="password"
			/>

			<Button variant="outlined">Hello world</Button>
		</>
	);
}

export default Login;
