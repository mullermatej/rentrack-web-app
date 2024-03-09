import Button from '@mui/material/Button';
import UserImage from '../components/UserImage';
import Stack from '@mui/material/Stack';

export default function UserSelect() {
	return (
		<>
			<h1>Odaberi korisnika</h1>
			<Stack
				direction="row"
				spacing={2}
				className="items-center justify-center my-6"
			>
				<UserImage
					alt="Remy Sharp"
					src="/static/images/avatar/1.jpg"
				/>
				<UserImage
					alt="Travis Howard"
					src="/static/images/avatar/2.jpg"
				/>
				<UserImage
					alt="Cindy Baker"
					src="/static/images/avatar/3.jpg"
				/>
			</Stack>

			<Button variant="outlined">Novi korisnik +</Button>
		</>
	);
}
