import Button from '@mui/material/Button';
import InputField from '../components/InputField';
import Select from '../components/Select';

function Register() {
	return (
		<>
			<h1>This is a Register page</h1>
			<InputField value="Username" />
			<InputField
				value="Email"
				type="email"
			/>
			<InputField
				value="Password"
				type="password"
			/>

			<Select />

			<Button variant="outlined">Hello world</Button>
		</>
	);
}

export default Register;
