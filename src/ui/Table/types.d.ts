import React from 'react';

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
