import { useState } from 'react';
import Avatar from '@mui/material/Avatar';

export default function UserImage({ alt, src }) {
	const [selected, setSelected] = useState(false);

	function handleClick() {
		setSelected(!selected);
	}

	return (
		<Avatar
			alt={alt}
			src={src}
			className="cursor-pointer"
			style={{ border: selected ? '2px solid blue' : '' }}
			onClick={handleClick}
		/>
	);
}
