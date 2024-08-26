import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export default function PricesInputField({ type = 'number', setPrice, value }) {
	const handleChange = (e) => {
		setPrice(e.target.value);
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
				label="* Cijena"
				variant="outlined"
				type={type}
				size="small"
				onChange={handleChange}
				InputProps={{
					startAdornment: <InputAdornment position="start">€</InputAdornment>,
				}}
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
