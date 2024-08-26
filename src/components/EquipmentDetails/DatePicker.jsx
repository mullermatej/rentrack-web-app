import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Typography } from '@mui/material';

export default function BasicDatePicker({ label, setDateRange }) {
	const handleChange = (newValue) => {
		setDateRange((prevArray) => [...prevArray, newValue.format('DD/MM/YYYY')]);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DemoContainer components={['DatePicker']}>
				<DatePicker
					label={<Typography style={{ fontFamily: 'nunito', color: 'black' }}>{label}</Typography>}
					onChange={handleChange}
					format="DD/MM/YYYY"
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
			</DemoContainer>
		</LocalizationProvider>
	);
}
