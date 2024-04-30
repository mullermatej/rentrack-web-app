export default function Profile() {
	const profile = JSON.parse(localStorage.getItem('profile'));
	return (
		<div>
			<h1>Profil</h1>
			<p>
				Ulogiran kao {profile.name} {profile.surname}
			</p>
		</div>
	);
}
