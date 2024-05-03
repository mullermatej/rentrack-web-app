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
					label={<Typography style={{ fontFamily: 'nunito' }}>{label}</Typography>}
					onChange={handleChange}
					format="DD/MM/YYYY"
				/>
			</DemoContainer>
		</LocalizationProvider>
	);
}
