import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import InputLabel from '@mui/material/InputLabel';

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
			<InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
			<TextField
				label={value}
				variant="outlined"
				type={type}
				size="small"
				value={inputValues[value.toLowerCase()] || ''} // Access the correct property
				onChange={handleChange}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<PersonIcon fontSize="small" />
						</InputAdornment>
					),
				}}
			/>
		</Box>
	);
}
