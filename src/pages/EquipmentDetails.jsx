import { useParams } from 'react-router-dom';

export default function EquipmentDetails() {
	const { equipmentName } = useParams();

	return (
		<div>
			<h1>Nalazim se na {equipmentName} stranici</h1>
		</div>
	);
}
