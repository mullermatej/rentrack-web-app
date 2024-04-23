import { useParams } from 'react-router-dom';
import InfoTable from '../components/EquipmentDetails/InfoTable';
import NewEquipment from '../components/EquipmentDetails/Dialogs/NewEquipment';
import Button from '@mui/material/Button';
import Pricing from '../components/EquipmentDetails/Dialogs/Pricing';

export default function EquipmentDetails() {
	const { equipmentName } = useParams();

	return (
		<div className="mx-auto">
			<div className="justify-center mt-8">
				<p className="text-4xl uppercase">{equipmentName}</p>
				<div className="my-4 space-x-4">
					<NewEquipment equipmentName={equipmentName} />
					<Pricing equipmentName={equipmentName} />
					<Button
						size="small"
						variant="contained"
					>
						Zarada
					</Button>
					<Button
						size="small"
						variant="outlined"
					>
						12 / 46
					</Button>
				</div>
			</div>
			<InfoTable />
		</div>
	);
}
