import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function EquipmentInput({ value, type = 'text', setNewEquipmentId }) {
	const handleChange = (event) => {
		setNewEquipmentId(event.target.value);
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
