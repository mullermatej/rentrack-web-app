import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputField({ value, type = 'text', inputValues, setInputValues }) {
	const handleChange = (event) => {
		setInputValues({
			...inputValues, // Spread existing values
			[value.toLowerCase()]: event.target.value, // Update specific property
		});
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
				variant="outlined"
				type={type}
				size="small"
				value={inputValues[value.toLowerCase()] || ''} // Access the correct property
				onChange={handleChange}
			/>
		</Box>
	);
}
