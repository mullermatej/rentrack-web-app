import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import Typography from '@mui/material/Typography';

export default function NavigationDrawer({ open, toggleDrawer }) {
	const handleClick = (event) => {
		if (event.currentTarget.innerText === 'Postavke') {
			window.location.href = '/admin';
		} else if (event.currentTarget.innerText === 'Odjavi se: Profil') {
			localStorage.removeItem('profile');
			window.location.href = '/userSelect';
		} else if (event.currentTarget.innerText === 'Odjavi se: Admin') {
			let profile = JSON.parse(localStorage.getItem('profile'));
			if (profile) {
				alert('Potrebno je odjaviti se sa računa radnika prvo!');
			} else {
				localStorage.removeItem('user');
				window.location.href = '/login';
			}
		} else if (event.currentTarget.innerText === 'Oprema') {
			window.location.href = '/equipment';
		}
	};

	const DrawerList = (
		<Box
			sx={{ width: 250 }}
			role="presentation"
			onClick={toggleDrawer(false)}
		>
			<List>
				<ListItem disablePadding>
					<ListItemButton onClick={handleClick}>
						<ListItemIcon>
							<PersonOutlineOutlinedIcon />
						</ListItemIcon>
						<Typography
							variant="body1"
							style={{ fontFamily: 'nunito' }}
						>
							Postavke
						</Typography>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={handleClick}>
						<ListItemIcon>
							<LocalOfferOutlinedIcon />
						</ListItemIcon>
						<Typography
							variant="body1"
							style={{ fontFamily: 'nunito' }}
						>
							Oprema
						</Typography>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={handleClick}>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<Typography
							variant="body1"
							style={{ fontFamily: 'nunito' }}
						>
							Odjavi se: Profil
						</Typography>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={handleClick}>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<Typography
							variant="body1"
							style={{ fontFamily: 'nunito' }}
						>
							Odjavi se: Admin
						</Typography>
					</ListItemButton>
				</ListItem>
			</List>
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
