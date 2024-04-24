import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup() {
	return (
		<FormControl>
			<FormLabel id="demo-radio-buttons-group-label">Koliko sati najma?</FormLabel>
			<RadioGroup
				aria-labelledby="demo-radio-buttons-group-label"
				defaultValue="first"
				name="radio-buttons-group"
			>
				<FormControlLabel
					value="first"
					control={<Radio />}
					label="1h (10€)"
				/>
				<FormControlLabel
					value="second"
					control={<Radio />}
					label="2h (15€)"
				/>
				<FormControlLabel
					value="third"
					control={<Radio />}
					label="3h (20€)"
				/>
				<FormControlLabel
					value="fourth"
					control={<Radio />}
					label="24h (50€)"
				/>
			</RadioGroup>
		</FormControl>
	);
}
