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
					const response = await axios.get(`api/users/${user.businessId}/profiles`);
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
		const businessId = JSON.parse(localStorage.getItem('user')).businessId;
		setUsername(event.target.value);
		setProfile({ name, surname, businessId });
	};

	return (
		<Box sx={{ '& > :not(style)': { m: 1, mb: 3, width: '30ch' } }}>
			<FormControl
				sx={{
					minWidth: 250,
					marginTop: '20px',
					'& .MuiOutlinedInput-root': {
						'&:hover fieldset': {
							borderColor: '#EA5455',
						},
						'&.Mui-focused fieldset': {
							borderColor: '#EA5455',
						},
					},
				}}
			>
				<InputLabel
					id="demo-simple-select-label"
					size="small"
					style={{ fontFamily: 'nunito', color: 'black' }}
				>
					Djelatnik
				</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={username}
					label="Korisnik"
					onChange={handleChange}
					size="small"
				>
					{data !== null ? (
						data.length > 0 ? (
							data.map((item, index) => (
								<MenuItem
									key={index}
									value={item.name + ' ' + item.surname}
									style={{ fontFamily: 'nunito' }}
								>
									{item.name} {item.surname}
								</MenuItem>
							))
						) : (
							<MenuItem
								value="No profiles found"
								style={{ pointerEvents: 'none', fontFamily: 'nunito' }}
							>
								Nema profila
							</MenuItem>
						)
					) : (
						<MenuItem value="Loading...">Učitavam...</MenuItem>
					)}
				</Select>
			</FormControl>
		</Box>
	);
}
