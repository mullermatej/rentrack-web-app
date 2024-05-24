import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import PinOutlinedIcon from '@mui/icons-material/PinOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function TextFieldLogin({ label, type = 'text', setUserInfo, field }) {
	const handleChange = (event) => {
		setUserInfo((prevState) => ({
			...prevState,
			[field]: event.target.value,
		}));
	};
	return (
		<Box sx={{ '& > :not(style)': { m: 1, mb: 3, width: '30ch' } }}>
			<TextField
				size="small"
				label={label}
				type={type}
				variant="outlined"
				onChange={handleChange}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							{label === '* OIB obrta' && <PinOutlinedIcon />}
							{label === '* Lozinka' && <LockOutlinedIcon />}
						</InputAdornment>
					),
					style: { fontFamily: 'nunito' },
				}}
				InputLabelProps={{ style: { fontFamily: 'nunito' } }}
			/>
		</Box>
	);
}
