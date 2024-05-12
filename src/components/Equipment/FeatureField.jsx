import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FeatureField({ value, type = 'text', setNewEquipment, field }) {
	const handleChange = (event) => {
		if (event.target.value !== '') {
			setNewEquipment((prevState) => ({
				...prevState,
				features: {
					...prevState.features,
					[field]: event.target.value,
				},
			}));
		}
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
				label={'* ' + value}
				variant="outlined"
				type={type}
				size="small"
				onChange={handleChange}
			/>
		</Box>
	);
}
