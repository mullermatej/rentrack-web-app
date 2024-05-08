import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckList({ setNewEquipment }) {
	const handleChange = (event) => {
		setNewEquipment((prevState) => ({
			...prevState,
			features: {
				...prevState.features,
				[event.target.name]: event.target.checked,
			},
		}));
	};

	return (
		<div className="flex">
			<FormGroup>
				<FormControlLabel
					control={<Checkbox name="color" />}
					label="Boja"
					onChange={handleChange}
				/>
				<FormControlLabel
					control={<Checkbox name="dimensions" />}
					label="Dimenzije"
					onChange={handleChange}
				/>
				<FormControlLabel
					control={<Checkbox name="material" />}
					label="Materijal"
					onChange={handleChange}
				/>
				<FormControlLabel
					control={<Checkbox name="horsepower" />}
					label="Konjska snaga"
					onChange={handleChange}
				/>
			</FormGroup>
			<FormGroup>
				<FormControlLabel
					control={<Checkbox name="license" />}
					label="Dozvola"
					onChange={handleChange}
				/>
				<FormControlLabel
					control={<Checkbox name="wheels" />}
					label="Kotačići"
					onChange={handleChange}
				/>
				<FormControlLabel
					control={<Checkbox name="weight" />}
					label="Težina"
					onChange={handleChange}
				/>
				<FormControlLabel
					control={<Checkbox name="maximumPeople" />}
					label="Maks. osoba"
					onChange={handleChange}
				/>
			</FormGroup>
		</div>
	);
}
