import { ComponentVariant } from '../../types';

export interface ButtonComponentProps {
	label: string;
	variant: ComponentVariant;
	type: 'button' | 'submit' | 'reset'
	onClick?: () => void;
}
