import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
	const [username, setUsername] = React.useState('');

	const handleChange = (event) => {
		setUsername(event.target.value);
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl style={{ minWidth: 250, marginTop: '20px' }}>
				<InputLabel
					id="demo-simple-select-label"
					size="small"
				>
					Korisnik
				</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={username}
					label="Korisnik"
					onChange={handleChange}
				>
					<MenuItem value={10}>Ivan Ivic</MenuItem>
					<MenuItem value={20}>Marko Markic</MenuItem>
					<MenuItem value={30}>Ana Anic</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
}
