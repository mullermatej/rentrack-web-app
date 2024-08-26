import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function NewPriceInput({ label, setPriceInfo }) {
	let priceInfoValue = '';

	const handleChange = (e) => {
		if (label === '* Sati') priceInfoValue = 'hours';
		else priceInfoValue = 'price';

		setPriceInfo((prev) => ({
			...prev,
			[priceInfoValue]: e.target.value,
		}));
	};

	return (
		<Box
			component="form"
			sx={{
				'& > :not(style)': { m: 1, width: '11ch' },
			}}
			noValidate
			autoComplete="off"
		>
			<TextField
				label={label}
				variant="outlined"
				type="number"
				size="small"
				onChange={handleChange}
				InputProps={{ style: { fontFamily: 'nunito', color: 'black' } }}
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
