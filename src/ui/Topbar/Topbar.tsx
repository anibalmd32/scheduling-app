import { TopbarProps } from './types';
import TopbarBtn from './TopbarBtn';

function Topbar ({
	handleOpen,
	isOpen
}: TopbarProps) {
	return (
		<div className={`
			bg-blue-900 w-full p-4 sticky top-0 left-0 text-blue-50 z-50
		`}>
			<TopbarBtn handleOpen={handleOpen} isOpen={isOpen} />
		</div>
	);
}

export default Topbar;