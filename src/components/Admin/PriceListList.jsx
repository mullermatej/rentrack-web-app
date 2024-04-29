import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
const adminId = JSON.parse(localStorage.getItem('user')).adminId;

const Demo = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
}));

export default function PriceListList({ hour, price, singleEquipmentName }) {
	const handleDeletePrice = async () => {
		try {
			const response = await axios.delete(`${BASE_URL}/equipment/${adminId}/${singleEquipmentName}/prices`, {
				data: {
					hours: hour,
				},
			});
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Box sx={{ flexGrow: 1, maxWidth: 752, marginLeft: 2, marginRight: 2 }}>
			<Grid
				item
				xs={12}
				md={6}
			>
				<Demo>
					<List dense={true}>
						<ListItem
							secondaryAction={
								<IconButton
									edge="end"
									aria-label="delete"
									onClick={handleDeletePrice}
								>
									<HighlightOffIcon />
								</IconButton>
							}
						>
							<p>
								{hour === '1' ? `${hour} sat` : `${hour} sata`} - {price}€
							</p>
						</ListItem>
					</List>
				</Demo>
			</Grid>
		</Box>
	);
}
