import React from 'react';

export interface RenderCel<T> {
	column: string;
	render: (cell: T) => React.ReactNode;
}

export type TableData<T> = RenderCel<T>[]

export interface TableProps<T> {
	data: T[];
	tableData: TableData<T>;
	caption?: string;
}
