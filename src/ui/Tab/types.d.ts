import React from 'react';

export interface TabItem {
	id: number;
	label: string;
	view: React.ReactNode;
}

export interface TabProps {
	items: TabItem[];
}
