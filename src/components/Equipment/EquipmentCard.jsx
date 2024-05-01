import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const bull = (
	<Box
		component="span"
		sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
	>
		•
	</Box>
);

const card = (
	<React.Fragment>
		<CardContent>
			<Typography
				variant="h5"
				component="div"
			>
				Ležaljke
			</Typography>
		</CardContent>
		<Divider />
		<CardActions className="flex justify-between">
			<p>Ovaj mjesec</p>
			<Button
				size="small"
				variant="outlined"
			>
				1450.60€
			</Button>
		</CardActions>
	</React.Fragment>
);

export default function EquipmentCard() {
	return (
		<Box sx={{ minWidth: 275 }}>
			<Card variant="outlined">{card}</Card>
		</Box>
	);
}
