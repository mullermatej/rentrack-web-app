import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function EquipmentChip({ value }) {
	const navigate = useNavigate();

	const handleClick = () => {
		const lowercaseValue = value.toLowerCase();
		navigate(`/oprema/adminId/${lowercaseValue}`); // Zamijeni sa id-em iz storage-a
	};

	const handleDelete = () => {
		console.info('You clicked the delete icon.');
	};

	return (
		<Stack
			direction="row"
			spacing={1}
		>
			<Chip
				className="capitalize"
				label={value}
				onClick={() => handleClick()}
				onDelete={handleDelete}
			/>
		</Stack>
	);
}
