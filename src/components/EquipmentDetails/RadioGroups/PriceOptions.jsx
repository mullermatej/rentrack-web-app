import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

export default function PriceOptions({ equipment, equipmentId }) {
	const adminId = JSON.parse(localStorage.getItem('user')).adminId;
	const worker =
		JSON.parse(localStorage.getItem('profile')).name + ' ' + JSON.parse(localStorage.getItem('profile')).surname;
	const equipmentName = equipment.name;
	const prices = equipment.prices;
	let choice = {};

	const handleChoice = (event) => {
		choice = {
			equipmentId: equipmentId,
			worker: worker,
			currentTime: new Date().toLocaleString(),
			hours: event.target.value.split(',')[0],
			price: event.target.value.split(',')[1],
		};
	};

	const handleConfirm = () => {
		try {
			// Ovdje nastavit
			// const response = axios.patch(`api/equipment/${adminId}/${equipmentName}`, choice);
			// console.log(response);

			console.log(choice);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<FormControl>
			<FormLabel id="demo-radio-buttons-group-label">Odaberi vrijeme najma</FormLabel>
			<RadioGroup
				aria-labelledby="demo-radio-buttons-group-label"
				defaultValue="first"
				name="radio-buttons-group"
				onChange={handleChoice}
			>
				{Object.keys(prices).map((hours) => (
					<FormControlLabel
						key={hours}
						value={`${hours},${prices[hours]}`}
						control={<Radio />}
						label={`${hours} sata = ${prices[hours]}€`}
					/>
				))}
			</RadioGroup>
			<Button
				variant="contained"
				size="small"
				color="primary"
				onClick={handleConfirm}
			>
				Potvrdi
			</Button>
		</FormControl>
	);
}
