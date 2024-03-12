import { SelectProps } from './types';

function Select({
	items,
	label,
	name,
	value,
	onChange
}: SelectProps) {
	return (
		<label
			htmlFor={name}
			className='flex flex-col gap-2'
		>
			<span className='block'>{label}</span>
			<select
				name={name}
				id={name}
				onChange={onChange}
				value={value}
				className='block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-blue-100'
			>
				<option value=""></option>
				{items && items.map((item, i) => (
					<option key={i} value={item.value}>
						{item.label}
					</option>
				))}
			</select>
		</label>
	);
}

export default Select;
