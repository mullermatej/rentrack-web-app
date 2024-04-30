import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import EditIcon from '@mui/icons-material/Edit';
import PriceListList from './PriceListList';
import NewPriceDialog from './NewPriceDialog';

function SimpleDialog(props) {
	const { onClose, selectedValue, open, equipment, singleEquipmentName } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};

	const getPriceList = () => {
		const equipmentObject = equipment.find((object) => object.name === singleEquipmentName);

		if (equipmentObject) {
			return (
				<div>
					{Object.entries(equipmentObject.prices).map(([hour, price]) => (
						<PriceListList
							key={hour}
							hour={hour}
							price={price}
							singleEquipmentName={singleEquipmentName}
						/>
					))}
				</div>
			);
		} else {
			return null;
		}
	};

	return (
		<Dialog
			onClose={handleClose}
			open={open}
		>
			<div className="text-center">
				{getPriceList()}
				<div className="flex gap-4 justify-center mb-2">
					<Button
						variant="contained"
						size="small"
					>
						Spremi
					</Button>
					<NewPriceDialog singleEquipmentName={singleEquipmentName} />
				</div>
			</div>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selectedValue: PropTypes.string.isRequired,
};

export default function Pricing({ equipment, singleEquipmentName }) {
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState('');

	const handleClickOpen = async () => {
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);
		setSelectedValue(value);
	};

	return (
		<>
			<Button
				size="small"
				variant="contained"
				onClick={handleClickOpen}
			>
				<EditIcon
					fontSize="inherit"
					className="mr-2"
				/>
				Uredi
			</Button>
			<SimpleDialog
				selectedValue={selectedValue}
				open={open}
				onClose={handleClose}
				equipment={equipment}
				singleEquipmentName={singleEquipmentName}
			/>
		</>
	);
}