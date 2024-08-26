import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function HoursInputField({ type = 'number', setHours, value }) {
	const handleChange = (e) => {
		setHours(e.target.value);
	};

	return (
		<Box
			component="form"
			sx={{
				'& > :not(style)': { m: 1, width: '12ch' },
			}}
			noValidate
			autoComplete="off"
		>
			<TextField
				value={value}
				label="* Sati"
				variant="outlined"
				type={type}
				size="small"
				onChange={handleChange}
				InputLabelProps={{ style: { fontFamily: 'nunito', color: 'black' } }}
				sx={{
					'& .MuiOutlinedInput-root': {
						'&:hover fieldset': {
							borderColor: '#EA5455',
						},
						'&.Mui-focused fieldset': {
							borderColor: '#EA5455',
						},
					},
				}}
			/>
		</Box>
	);
}
