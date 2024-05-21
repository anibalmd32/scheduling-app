import React, { FormEvent, ChangeEvent } from 'react';
import {
	EventAddArg,
	DateSelectArg,
	EventSourceInput,
	EventClickArg,
	EventRemoveArg,
	EventChangeArg,
} from '@fullcalendar/core';
import { IconType } from 'react-icons';

// * COLOR CONFIG
export interface ColorState {
	default: string;
	hover: string
}

export type ComponentVariant = 'success' | 'error' | 'warning' | 'info'

export type ColorConfig = Record<ComponentVariant, ColorState>

// * BUTTON
export interface ButtonComponentProps {
	label: string;
	variant: ComponentVariant;
	type: 'button' | 'submit' | 'reset'
	disabled?: boolean;
	onClick?: () => void;
}

// * TOPBAR
export interface TopbarProps {
	isOpen: boolean;
	handleOpen: () => void;
}

// * TABLE
export interface RenderCell<T> {
	column: string;
	render: (cell: T) => React.ReactNode;
}

export type TableCell<T> = RenderCell<T>[]

export interface TableProps<T> {
	data: T[];
	cells: TableCell<T>;
	caption?: string;
}

// * TABS
export interface TabItem {
	index: number;
	label: string;
	view: React.ReactNode;
}

export interface TabProps {
	items: TabItem[];
}

// * SPINNER
export interface SpinnerProps {
	size: number;
}

// * PAGE CONTAINER
export interface PageContainerProps {
	isOpen: boolean;
}

// * MODAL WINDOW
export interface ModalProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode
}

// * MENU
export interface MenuItemProps {
	label: string;
	path: string;
	icon: IconType;
}

export interface MenuProps {
	items: MenuItemProps[];
	isOpen: boolean;
}

// * FORM
export interface InputProps {
	label?: string;
	placeholder: string;
	type: 'text' | 'number';
	value: string | number;
	name: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectItem {
	label: string;
	value: number | string;
}

export interface SelectProps {
	label: string;
	name: string;
	value: number | string;
	items: SelectItem[] | undefined;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export type MapSelectItems<T> = (items: T[]) => SelectItem[];

export interface FormProps {
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	children: React.ReactNode
}

// * TOASTER
export interface ToastProps {
	variant: ComponentVariant;
	message: string;
	duraction?: number;
	isLoader?: boolean;
}

// * CALLENDAR
export interface CallendarProps {
	events: EventSourceInput;
	onExport?: () => void;
	handleInputEvent: (args: DateSelectArg) => void;
	handleClickEvent: (args: EventClickArg) => void;
	handleChangeEvent: (args: EventChangeArg) => void;
	onAddEvent: (args: EventAddArg) => void;
	onDeletEvent: (args: EventRemoveArg) => void;
	interactive?: boolean;
	selectable?: boolean;
}

