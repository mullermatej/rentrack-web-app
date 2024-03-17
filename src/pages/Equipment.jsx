import EquipmentChip from '../components/Equipment/EquipmentChip';
import EquipmentDialog from '../components/Equipment/EquipmentDialog';

export default function Equipment() {
	return (
		<>
			<div className="flex space-x-4 justify-center">
				<p className="text-3xl uppercase">Oprema</p>
				<EquipmentDialog />
			</div>
			<div className="mt-6 flex space-x-4">
				<EquipmentChip value="Ležaljke" />
				<EquipmentChip value="Suncobrani" />
				<EquipmentChip value="Pedaline" />
				<EquipmentChip value="Gliseri" />
			</div>
		</>
	);
}
