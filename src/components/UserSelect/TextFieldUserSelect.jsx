import { useState } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from '@mui/material/IconButton';

export default function TextFieldUserSelect({ label, setProfile, field }) {
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleChange = (event) => {
		setProfile((prevState) => ({
			...prevState,
			[field]: event.target.value,
		}));
	};
	return (
		<Box sx={{ '& > :not(style)': { m: 1, mb: 3, width: '30ch' } }}>
			<TextField
				size="small"
				label={label}
				type={showPassword ? 'text' : 'password'}
				variant="outlined"
				onChange={handleChange}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							{label === '* Lozinka' && <LockOutlinedIcon />}
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
								{showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
							</IconButton>
						</InputAdornment>
					),
					style: { fontFamily: 'nunito' },
				}}
				InputLabelProps={{ style: { fontFamily: 'nunito' } }}
			/>
		</Box>
	);
}
