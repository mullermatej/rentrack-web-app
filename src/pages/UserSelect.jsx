import InputField from '../components/UserSelect/InputField';
import UserSelectDropdown from '../components/UserSelect/UserSelectDropdown';
import UserSelectDialog from '../components/UserSelect/UserSelectDialog';

export default function UserSelect() {
	return (
		<>
			<h1>Tko si ti?</h1>
			<h3>Ako nisi na popisu, dodaj se!</h3>
			<UserSelectDropdown />
			<InputField
				value="Lozinka"
				type="password"
			/>
			<UserSelectDialog />
		</>
	);
}
