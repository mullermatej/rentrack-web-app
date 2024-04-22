import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import InputField from './InputField';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
	const { onClose, selectedValue, open, equipmentName } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};

	return (
		<Dialog
			onClose={handleClose}
			open={open}
		>
			<DialogTitle className="text-center">Dodaj u opremu &quot;{equipmentName}&quot;</DialogTitle>
			<div className="text-center">
				<InputField value="ID" />
				<Button
					variant="outlined"
					style={{ marginBottom: '20px', marginTop: '20px' }}
				>
					Dodaj
				</Button>
			</div>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selectedValue: PropTypes.string.isRequired,
};

export default function NewEquipment({ equipmentName }) {
	const [open, setOpen] = React.useState(false);
	const [selectedValue, setSelectedValue] = React.useState(emails[1]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);
		setSelectedValue(value);
	};

	return (
		<>
			<Button
				variant="outlined"
				onClick={handleClickOpen}
			>
				Dodaj
			</Button>
			<SimpleDialog
				selectedValue={selectedValue}
				open={open}
				onClose={handleClose}
				equipmentName={equipmentName}
			/>
		</>
	);
}
