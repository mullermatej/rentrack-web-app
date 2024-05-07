import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DenseTable from '../Tables/DenseTable';
import ArrowIconBack from '@mui/icons-material/ArrowBack';

function SimpleDialog(props) {
	const { onClose, selectedValue, open, equipment } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};

	return (
		<Dialog
			onClose={handleClose}
			open={open}
		>
			<div className="py-2 px-2">
				<ArrowIconBack
					onClick={handleClose}
					sx={{ cursor: 'pointer' }}
				/>
			</div>
			<DenseTable equipment={equipment} />
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selectedValue: PropTypes.string.isRequired,
};

export default function Pricing({ equipment }) {
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
				style={{ textTransform: 'none', fontSize: '14px', backgroundColor: '#2463EB', fontFamily: 'nunito' }}
			>
				Cjenik
			</Button>
			<SimpleDialog
				selectedValue={selectedValue}
				open={open}
				onClose={handleClose}
				equipment={equipment}
			/>
		</>
	);
}
