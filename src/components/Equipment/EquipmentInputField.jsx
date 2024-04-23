import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function EquipmentInputField({ value, type = 'text', setNewEquipment, field }) {
	const handleChange = (e) => {
		setNewEquipment((prevState) => ({
			...prevState,
			[field]: e.target.value,
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
				variant="outlined"
				type={type}
				size="small"
				onChange={handleChange}
			/>
		</Box>
	);
}
