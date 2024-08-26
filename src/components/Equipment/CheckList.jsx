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
					control={
						<Checkbox
							name="color"
							sx={{ color: '#EA5455', '&.Mui-checked': { color: '#EA5455' } }}
						/>
					}
					label="Boja"
					onChange={handleChange}
				/>
				<FormControlLabel
					control={
						<Checkbox
							name="dimensions"
							sx={{ color: '#EA5455', '&.Mui-checked': { color: '#EA5455' } }}
						/>
					}
					label="Dimenzije"
					onChange={handleChange}
				/>
				<FormControlLabel
					control={
						<Checkbox
							name="material"
							sx={{ color: '#EA5455', '&.Mui-checked': { color: '#EA5455' } }}
						/>
					}
					label="Materijal"
					onChange={handleChange}
				/>
				<FormControlLabel
					control={
						<Checkbox
							name="horsepower"
							sx={{ color: '#EA5455', '&.Mui-checked': { color: '#EA5455' } }}
						/>
					}
					label="Konjska snaga"
					onChange={handleChange}
				/>
			</FormGroup>
			<FormGroup>
				<FormControlLabel
					control={
						<Checkbox
							name="license"
							sx={{ color: '#EA5455', '&.Mui-checked': { color: '#EA5455' } }}
						/>
					}
					label="Dozvola"
					onChange={handleChange}
				/>
				<FormControlLabel
					control={
						<Checkbox
							name="wheels"
							sx={{ color: '#EA5455', '&.Mui-checked': { color: '#EA5455' } }}
						/>
					}
					label="Kotačići"
					onChange={handleChange}
				/>
				<FormControlLabel
					control={
						<Checkbox
							name="weight"
							sx={{ color: '#EA5455', '&.Mui-checked': { color: '#EA5455' } }}
						/>
					}
					label="Težina"
					onChange={handleChange}
				/>
				<FormControlLabel
					control={
						<Checkbox
							name="maximumPeople"
							sx={{ color: '#EA5455', '&.Mui-checked': { color: '#EA5455' } }}
						/>
					}
					label="Maks. osoba"
					onChange={handleChange}
				/>
			</FormGroup>
		</div>
	);
}
