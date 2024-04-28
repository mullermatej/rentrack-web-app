import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

export default function NavigationDrawer({ open, toggleDrawer }) {
	const navigate = useNavigate();

	const handleClick = (event) => {
		if (event.currentTarget.innerText === 'Postavke') {
			navigate('/settings');
		} else if (event.currentTarget.innerText === 'Admin') {
			navigate('/admin');
		} else if (event.currentTarget.innerText === 'Profil') {
			navigate('/profile');
		} else if (event.currentTarget.innerText === 'Odjavi se (Profil)') {
			// Logout user
			localStorage.removeItem('profile');
			console.log('Odjavljen korisnik!');
			navigate('/userSelect');
		} else if (event.currentTarget.innerText === 'Odjavi se (Admin)') {
			// Logout admin
			let profile = JSON.parse(localStorage.getItem('profile'));
			if (profile) {
				console.log('Nemoguce se odjaviti dok je radnik ulogiran!');
			} else {
				localStorage.removeItem('user');
				console.log('Odjavljen admin!');
				navigate('/login');
			}
		}
	};

	const DrawerList = (
		<Box
			sx={{ width: 250 }}
			role="presentation"
			onClick={toggleDrawer(false)}
		>
			<List>
				{['Admin', 'Profil', 'Postavke', 'Odjavi se (Profil)', 'Odjavi se (Admin)'].map((text, index) => (
					<ListItem
						key={text}
						disablePadding
					>
						<ListItemButton onClick={handleClick}>
							{(index === 4 || index === 3) && (
								<ListItemIcon>
									<LogoutIcon />
								</ListItemIcon>
							)}
							{index === 2 && (
								<ListItemIcon>
									<SettingsIcon />
								</ListItemIcon>
							)}
							{(index === 0 || index === 1) && (
								<ListItemIcon>
									<PersonIcon />
								</ListItemIcon>
							)}
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			{/* <Divider />
			<List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItem
						key={text}
						disablePadding
					>
						<ListItemButton>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List> */}
		</Box>
	);

	return (
		<div>
			<Drawer
				open={open}
				onClose={toggleDrawer(false)}
			>
				{DrawerList}
			</Drawer>
		</div>
	);
}
