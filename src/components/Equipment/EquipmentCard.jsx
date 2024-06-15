import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'ldrs/bouncy';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export default function EquipmentCard({ equipment, imageLoaded }) {
	const [profit, setProfit] = useState(0);

	const navigate = useNavigate();

	useEffect(() => {
		const getProfit = async () => {
			const businessId = JSON.parse(localStorage.getItem('user')).businessId;
			try {
				const response = await axios.get(`${BASE_URL}/equipment/${businessId}/${equipment.name}/profit`);
				setProfit(response.data.profit);
			} catch (error) {
				console.error('Error getting profit: ', error);
			}
		};
		getProfit();
	}, [equipment.name]);

	const handleClick = () => {
		const businessId = JSON.parse(localStorage.getItem('user')).businessId;
		navigate(`/equipment/${businessId}/${equipment.name}`);
	};

	const card = (
		<>
			<CardContent sx={{ padding: 0 }}>
				{imageLoaded === true && (
					<img
						src={equipment.imageUrl}
						alt=""
						className="w-full h-40 object-cover"
					/>
				)}
				{imageLoaded === false && (
					<l-bouncy
						size="45"
						speed="1.75"
						color="#2463EB"
						style={{ height: '10rem', width: '100%', paddingTop: '4rem' }}
					></l-bouncy>
				)}
				<Typography
					variant="h5"
					component="div"
					className="capitalize py-4"
				>
					<span className="font-nunito">{equipment.name}</span>
				</Typography>
			</CardContent>
			<Divider />
			<CardActions className="flex justify-between">
				<p className="text-sm font-nunito">Ovaj mjesec</p>
				<Button
					size="small"
					variant="outlined"
				>
					<span className="font-nunito">{profit}€</span>
				</Button>
			</CardActions>
		</>
	);

	return (
		<Box sx={{ minWidth: 250, maxWidth: 250 }}>
			<Card
				variant="outlined"
				onClick={handleClick}
				className="cursor-pointer"
				style={{ borderRadius: '20px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
			>
				{card}
			</Card>
		</Box>
	);
}
