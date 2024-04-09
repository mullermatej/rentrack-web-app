import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import InputField from '../../components/InputField';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
	const { onClose, selectedValue, open } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};

	return (
		<Dialog
			onClose={handleClose}
			open={open}
		>
			<DialogTitle className="text-center">Ispuni informacije novog korisnika</DialogTitle>
			<div className="text-center">
				<InputField value="Ime" />
				<InputField value="Prezime" />
				<InputField
					value="Lozinka"
					type="password"
				/>
				<InputField
					value="Ponovi lozinku"
					type="password"
				/>
				<Button
					variant="outlined"
					style={{ marginBottom: '20px', marginTop: '20px' }}
				>
					Kreiraj
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

export default function UserSelectDialog() {
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
			<div className="flex justify-center gap-4 mt-2">
				<Button variant="outlined"> Ulogiraj</Button>
				<Button
					variant="outlined"
					onClick={handleClickOpen}
				>
					Novi korisnik
				</Button>
			</div>
			<SimpleDialog
				selectedValue={selectedValue}
				open={open}
				onClose={handleClose}
			/>
		</>
	);
}
