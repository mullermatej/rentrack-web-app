import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputField({ value, type = 'text' }) {
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
				id="outlined-basic"
				label={value}
				variant="outlined"
				type={type}
				size="small"
			/>
		</Box>
	);
}
