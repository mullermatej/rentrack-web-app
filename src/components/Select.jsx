import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const currencies = [
	{
		value: 'USD',
		label: '$',
	},
	{
		value: 'EUR',
		label: '€',
	},
	{
		value: 'BTC',
		label: '฿',
	},
	{
		value: 'JPY',
		label: '¥',
	},
];

export default function Select() {
	return (
		<Box
			component="form"
			sx={{
				'& .MuiTextField-root': { m: 1, width: '25ch' },
			}}
			noValidate
			autoComplete="off"
		>
			<div>
				<TextField
					id="outlined-select-currency-native"
					select
					label="Native select"
					defaultValue="EUR"
					SelectProps={{
						native: true,
					}}
					helperText="Please select your currency"
				>
					{currencies.map((option) => (
						<option
							key={option.value}
							value={option.value}
						>
							{option.label}
						</option>
					))}
				</TextField>
			</div>
		</Box>
	);
}
