import { SpinnerProps } from './ui';

function Spinner ({ size }: SpinnerProps) {
	const spinnerSize = size || '8';
  
	return (
		<div className={`flex justify-center rounded-full items-center h-${spinnerSize} w-${spinnerSize}`}>
			<div className={`rounded-full h-${spinnerSize} w-${spinnerSize} border-t-2 border-b-2 border-gray-900`}></div>
		</div>
	);
}
  

export default Spinner;
