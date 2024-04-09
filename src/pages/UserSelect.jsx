import UserSelectDialog from '../components/UserSelect/UserSelectDialog';
import UserSelectDropdown from '../components/UserSelect/UserSelectDropdown';
import InputField from '../components/InputField';

export default function UserSelect() {
	return (
		<>
			<h1>Odaberi korisnika</h1>
			<UserSelectDropdown />
			<InputField
				value="Lozinka"
				type="password"
			/>
			<UserSelectDialog />
		</>
	);
}
