import { ComponentVariant } from '../../types';

export interface ButtonComponentProps {
	label: string;
	variant: ComponentVariant;
	onClick: () => void;
}
