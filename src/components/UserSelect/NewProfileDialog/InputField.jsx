import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputField({ value, type = 'text', setNewUser, field }) {
	const handleChange = (event) => {
		setNewUser((prevState) => ({
			...prevState,
			[field]: event.target.value,
		}));
	};

	return (
		<Box
			component="form"
			sx={{
				'& > :not(style)': { m: 1, width: '25ch' },
			}}
			noValidate
			autoComplete="off"
		>
			<TextField
				label={value}
				onChange={handleChange}
				variant="outlined"
				type={type}
				size="small"
			/>
		</Box>
	);
}
