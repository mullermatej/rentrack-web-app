import { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import PriceOptions from '../RadioGroups/PriceOptions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function SimpleDialog(props) {
	const { onClose, selectedValue, openPayment, equipment, equipmentId } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};

	return (
		<Dialog
			onClose={handleClose}
			open={openPayment}
		>
			<ArrowBackIcon
				onClick={handleClose}
				sx={{
					cursor: 'pointer',
					position: 'absolute',
					left: '-15px',
					top: '17px',
					marginLeft: '25px',
				}}
			/>
			<div className="text-center px-10 py-4">
				<p className="font-nunito text-lg ">Iznajmi opremu</p>
			</div>
			<div className="px-10 pb-4 text-center">
				<PriceOptions
					equipment={equipment}
					equipmentId={equipmentId}
				/>
			</div>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	openPayment: PropTypes.bool.isRequired,
	selectedValue: PropTypes.string.isRequired,
};

export default function HandlePayment({ openPayment, setOpenPayment, equipment, equipmentId }) {
	const [selectedValue, setSelectedValue] = useState('');

	const handleClosePayment = (value) => {
		setOpenPayment(false);
		setSelectedValue(value);
	};

	return (
		<>
			<SimpleDialog
				selectedValue={selectedValue}
				openPayment={openPayment}
				onClose={handleClosePayment}
				equipment={equipment}
				equipmentId={equipmentId}
			/>
		</>
	);
}
