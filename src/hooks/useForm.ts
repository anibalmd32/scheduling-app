import { ChangeEvent, FormEvent, useState } from 'react';

function useForm<T>(defaultValues: T) {
	const [formData, setFormData] = useState<T>(defaultValues);

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(() => ({...formData, [name]:  value}));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		return formData;
	};

	return {
		formData,
		handleSubmit,
		handleChange
	};
}

export default useForm;
