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
							{label === '* Naziv obrta' && <HomeOutlinedIcon sx={{ color: 'black' }} />}
							{label === '* OIB obrta' && <PinOutlinedIcon sx={{ color: 'black' }} />}
							{label === '* Lozinka' && <LockOutlinedIcon sx={{ color: 'black' }} />}
						</InputAdornment>
					),
					style: { fontFamily: 'nunito', color: 'black' },
				}}
				InputLabelProps={{ style: { fontFamily: 'nunito', color: 'black' } }}
				sx={{
					'& .MuiOutlinedInput-root': {
						'&:hover fieldset': {
							borderColor: '#EA5455',
						},
						'&.Mui-focused fieldset': {
							borderColor: '#EA5455',
						},
					},
				}}
			/>
		</Box>
	);
}
