import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown({ setProfile }) {
	const [username, setUsername] = useState('');
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const user = JSON.parse(localStorage.getItem('user'));

			if (user) {
				try {
					const response = await axios.get(`api/users/${user.adminId}/profiles`);
					setData(response.data);
				} catch (error) {
					console.log(error);
				}
			} else {
				console.log('Nothing in local storage!');
			}
		};

		fetchData();
	}, []);

	const handleChange = (event) => {
		const [name, surname] = event.target.value.split(' ');
		const adminId = JSON.parse(localStorage.getItem('user')).adminId;
		setUsername(event.target.value);
		setProfile({ name, surname, adminId });
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
					{data &&
						data.map((item, index) => (
							<MenuItem
								key={index}
								value={item.name + ' ' + item.surname}
							>
								{item.name} {item.surname}
							</MenuItem>
						))}
				</Select>
			</FormControl>
		</Box>
	);
}
