import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import BasicDateRangePicker from '../DatePicker';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function SimpleDialog(props) {
	const { onClose, selectedValue, open, equipment } = props;
	const [dateRange, setDateRange] = useState([]);
	const [profit, setProfit] = useState(0);
	const adminId = JSON.parse(localStorage.getItem('user')).adminId;
	const equipmentName = equipment.name;

	useEffect(() => {
		const calculateProfit = async () => {
			const startingDate = dateRange[0];
			const endingDate = dateRange[1];

			try {
				const response = await axios.get(`${BASE_URL}/equipment/${adminId}/${equipmentName}`);
				const addedEquipment = response.data[0].addedEquipment;

				for (const object of addedEquipment) {
					for (const historyObject of object.history) {
						if (historyObject.date >= startingDate && historyObject.date <= endingDate) {
							setProfit((prevProfit) => prevProfit + parseInt(historyObject.price));
						}
					}
				}
			} catch (error) {
				console.error(error);
			}
		};
		{
			dateRange[1] && calculateProfit();
		}
	}, [dateRange, adminId, equipmentName]);

	const handleClose = () => {
		onClose(selectedValue);
		setProfit(0);
		setDateRange([]);
	};

	return (
		<Dialog
			onClose={handleClose}
			open={open}
		>
			<div className="p-4">
				<div className=" flex gap-4">
					<BasicDateRangePicker
						label="Od kada"
						setDateRange={setDateRange}
					/>
					<BasicDateRangePicker
						label="Do kada"
						setDateRange={setDateRange}
					/>
				</div>
				<div className="mt-4">
					<p className="text-lg text-center font-nunito">Zarada u ovom periodu iznosi: {profit}€</p>
				</div>
			</div>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selectedValue: PropTypes.string.isRequired,
};

export default function Profit({ equipment }) {
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState('');

	const handleClickOpen = async () => {
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);
		setSelectedValue(value);
	};

	return (
		<>
			<Button
				size="small"
				variant="contained"
				onClick={handleClickOpen}
				style={{ textTransform: 'none', fontSize: '14px', backgroundColor: '#2463EB', fontFamily: 'nunito' }}
			>
				Zarada
			</Button>
			<SimpleDialog
				selectedValue={selectedValue}
				open={open}
				onClose={handleClose}
				equipment={equipment}
			/>
		</>
	);
}
