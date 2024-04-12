import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function EquipmentChip({ value }) {
	const navigate = useNavigate();

	const handleClick = () => {
		const lowercaseValue = value.toLowerCase();
		navigate(`/oprema/adminId/${lowercaseValue}`); // Kod logina spremi adminId u localStorage ?
	};

	return (
		<Stack
			direction="row"
			spacing={1}
		>
			<Chip
				className="capitalize !cursor-pointer"
				label={value}
				onClick={() => handleClick()}
			/>
		</Stack>
	);
}
