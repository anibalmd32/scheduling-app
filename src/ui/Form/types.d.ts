import React, { FormEvent, ChangeEvent } from 'react';

export interface InputProps {
	label: string;
	placeholder: string;
	type: 'text' | 'number';
	value: string | number;
	name: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectProps {
	label: string;
	name: string;
	value: number | string;
	items: {
		label: string;
		value: number | string;
	}[] | undefined;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export interface FormProps {
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	children: React.ReactNode
}
