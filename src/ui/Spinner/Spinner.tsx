import { SpinnerProps } from './types';

function Spinner ({ size }: SpinnerProps) {
	return (
		<div className="flex items-center justify-center">
			<div className={`animate-spin rounded-full h-${size} w-${size} border-b-4 border-blue-900`}></div>
		</div>
	);
}

export default Spinner;
