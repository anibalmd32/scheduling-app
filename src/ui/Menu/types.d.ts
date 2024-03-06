import { IconType } from 'react-icons';

export interface MenuItemProps {
	label: string;
	path: string;
	icon: IconType;
}

export interface MenuProps {
	items: MenuItemProps[];
	isOpen: boolean;
}