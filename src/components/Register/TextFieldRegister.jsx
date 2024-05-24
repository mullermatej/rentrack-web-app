import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PinOutlinedIcon from '@mui/icons-material/PinOutlined';

export default function TextFieldRegister({ label, type = 'text', setUserInfo, field }) {
	const handleChange = (e) => {
		setUserInfo((prevState) => ({
			...prevState,
			[field]: e.target.value,
		}));
	};

	return (
		<Box sx={{ '& > :not(style)': { m: 1, mb: 3, width: '30ch' } }}>
			<TextField
				variant="outlined"
				size="small"
				label={label}
				type={type}
				onChange={handleChange}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							{label === '* Naziv obrta' && <HomeOutlinedIcon />}
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
