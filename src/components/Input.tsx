import { InputProps } from './ui';

function Input({
	label,
	name,
	onChange,
	placeholder,
	type,
	value
}: InputProps) {
	return (
		<label
			htmlFor={name}
			className='flex flex-col gap-2'
		>
			<span className='block'>
				{label}
			</span>
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				name={name}
				id={name}
				onChange={onChange}
				className='block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-blue-100'
			/>
		</label>
	);
}

export default Input;
