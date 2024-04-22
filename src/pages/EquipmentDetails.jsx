import { useParams } from 'react-router-dom';
import InfoTable from '../components/EquipmentDetails/InfoTable';
import NewEquipment from '../components/EquipmentDetails/NewEquipment';

export default function EquipmentDetails() {
	const { equipmentName } = useParams();

	return (
		<div className="mx-auto">
			<div className="flex space-x-4 justify-center mt-8">
				<p className="text-4xl uppercase">{equipmentName}</p>
				<NewEquipment equipmentName={equipmentName} />
			</div>
			<InfoTable />
		</div>
	);
}
