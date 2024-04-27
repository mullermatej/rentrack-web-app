import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker({ label, setDateRange }) {
	const handleChange = (newValue) => {
		setDateRange((prevArray) => [...prevArray, newValue.format('DD/MM/YYYY')]);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DemoContainer components={['DatePicker']}>
				<DatePicker
					label={label}
					onChange={handleChange}
					format="DD/MM/YYYY"
				/>
			</DemoContainer>
		</LocalizationProvider>
	);
}
