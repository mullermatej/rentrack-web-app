import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function EquipmentChip({ value }) {
	return (
		<Stack
			direction="row"
			spacing={1}
		>
			<Chip
				className="capitalize"
				label={value}
			/>
		</Stack>
	);
}
