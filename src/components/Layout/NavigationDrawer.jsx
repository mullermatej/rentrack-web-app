import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';
import SellIcon from '@mui/icons-material/Sell';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Typography from '@mui/material/Typography';

export default function NavigationDrawer({ open, toggleDrawer }) {
	const handleClick = (event) => {
		if (event.currentTarget.innerText === 'Postavke') {
			window.location.href = '/admin';
		} else if (event.currentTarget.innerText === 'Promijeni djelatnika') {
			localStorage.removeItem('profile');
			window.location.href = '/userSelect';
		} else if (event.currentTarget.innerText === 'Izlaz') {
			localStorage.removeItem('profile');
			localStorage.removeItem('user');
			window.location.href = '/login';
		} else if (event.currentTarget.innerText === 'Popis opreme') {
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
							<SellIcon sx={{ color: 'black' }} />
						</ListItemIcon>
						<Typography
							variant="body1"
							style={{ fontFamily: 'nunito', color: 'black' }}
						>
							Popis opreme
						</Typography>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={handleClick}>
						<ListItemIcon>
							<SettingsIcon sx={{ color: 'black' }} />
						</ListItemIcon>
						<Typography
							variant="body1"
							style={{ fontFamily: 'nunito', color: 'black' }}
						>
							Postavke
						</Typography>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={handleClick}>
						<ListItemIcon>
							<AutorenewIcon sx={{ color: 'black' }} />
						</ListItemIcon>
						<Typography
							variant="body1"
							style={{ fontFamily: 'nunito', color: 'black' }}
						>
							Promijeni djelatnika
						</Typography>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={handleClick}>
						<ListItemIcon>
							<PowerSettingsNewIcon sx={{ color: 'black' }} />
						</ListItemIcon>
						<Typography
							variant="body1"
							style={{ fontFamily: 'nunito', color: 'black' }}
						>
							Izlaz
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
