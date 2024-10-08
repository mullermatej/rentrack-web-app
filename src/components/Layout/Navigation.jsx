import * as React from 'react';
import { useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NavigationDrawer from './NavigationDrawer';
import Logo from '../../assets/LogoUpdated.png';

export default function Navigation() {
	const location = useLocation();
	const isUserSelectRoute = location.pathname === '/userSelect';
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const profile = JSON.parse(localStorage.getItem('profile'));

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	const handleLogout = () => {
		localStorage.removeItem('profile');
		localStorage.removeItem('user');
		window.location.href = '/login';
	};

	const checkScreenSize = () => {
		if (window.innerWidth < 600) {
			return false;
		}
		return true;
	};

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 4 new mails"
					color="inherit"
				>
					<Badge
						badgeContent={4}
						color="error"
					>
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 17 new notifications"
					color="inherit"
				>
					<Badge
						badgeContent={17}
						color="error"
					>
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position={isUserSelectRoute ? 'fixed' : 'sticky'}
				sx={{ bgcolor: '#FFD460', color: 'black' }}
			>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ mr: 2 }}
						onClick={toggleDrawer(true)}
					>
						<MenuIcon />
					</IconButton>
					{checkScreenSize() && (
						<img
							src={Logo}
							alt="Logo"
							style={{ height: '40px' }}
						/>
					)}
					<NavigationDrawer
						open={open}
						toggleDrawer={toggleDrawer}
					/>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { md: 'flex' } }}>
						<Typography
							sx={{
								fontFamily: 'nunito',
								color: 'black',
								fontWeight: '600',
								fontSize: '18px',
							}}
						>
							{profile ? 'Djelatnik: ' : ''} {profile && profile.name + ' ' + profile.surname}
							<IconButton
								color="inherit"
								sx={{ marginBottom: '3px', marginLeft: '10px' }}
							>
								<PowerSettingsNewIcon onClick={handleLogout}></PowerSettingsNewIcon>
							</IconButton>
						</Typography>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</Box>
	);
}
