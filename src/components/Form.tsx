import { FormProps } from './ui';

function Form({ children, onSubmit }: FormProps) {
	return (
		<form
			onSubmit={onSubmit}
			className='flex flex-col items-center justify-center px-4 py-8 mx-auto max-w-lg'
		>
			{children}
		</form>
	);
}

export default Form;
