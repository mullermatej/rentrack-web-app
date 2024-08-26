import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function InputField({ value, type = 'text', setNewUser, field }) {
	const handleChange = (event) => {
		setNewUser((prevState) => ({
			...prevState,
			[field]: event.target.value,
		}));
	};

	return (
		<Box
			component="form"
			sx={{
				'& > :not(style)': { m: 1, mb: 2, width: '25ch' },
			}}
			noValidate
			autoComplete="off"
		>
			<TextField
				label={value}
				onChange={handleChange}
				variant="outlined"
				type={type}
				size="small"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							{(field === 'name' || field === 'surname') && (
								<PersonOutlineOutlinedIcon sx={{ color: 'black' }} />
							)}
							{(field === 'password' || field === 'repeatPassword') && <LockOutlinedIcon />}
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
