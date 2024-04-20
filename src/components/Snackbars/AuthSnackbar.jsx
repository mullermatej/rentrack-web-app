import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function RegistrationSuccessful({ open, autoHideDuration, message, handleClose }) {
	const action = (
		<React.Fragment>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	return (
		<Snackbar
			open={open}
			autoHideDuration={autoHideDuration}
			onClose={handleClose}
			message={message}
			action={action}
		/>
	);
}
