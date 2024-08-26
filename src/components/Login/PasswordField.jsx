import { useState } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from '@mui/material/IconButton';

export default function PasswordField({ label, setUserInfo, field, widthRecieve = '30ch' }) {
	const [showPassword, setShowPassword] = useState(false);
	const widthCheck = widthRecieve;
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleChange = (event) => {
		setUserInfo((prevState) => ({
			...prevState,
			[field]: event.target.value,
		}));
	};
	return (
		<Box sx={{ '& > :not(style)': { m: 1, mb: 2, width: widthCheck } }}>
			<TextField
				size="small"
				label={label}
				type={showPassword ? 'text' : 'password'}
				variant="outlined"
				onChange={handleChange}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<LockOutlinedIcon sx={{ color: 'black' }} />
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
							>
								{showPassword ? (
									<VisibilityOffOutlinedIcon sx={{ color: 'black' }} />
								) : (
									<VisibilityOutlinedIcon sx={{ color: 'black' }} />
								)}
							</IconButton>
						</InputAdornment>
					),
					style: { fontFamily: 'nunito' },
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
