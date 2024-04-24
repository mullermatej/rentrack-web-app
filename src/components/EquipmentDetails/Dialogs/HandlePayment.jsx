import { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';

import PriceOptions from '../RadioGroups/PriceOptions';

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
			<div className="p-4">
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
