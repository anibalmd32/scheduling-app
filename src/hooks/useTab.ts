import { useEffect, useState } from 'react';
import useQuery from './useQuery';

function useTab() {
	const [selectedTab, setSelectedTab] = useState<number>(0);
	
	const query = useQuery();
	const tab = query.get('tab');

	const handleSelectTab = (tabIndex: number) => {
		setSelectedTab(tabIndex);
		window.history.replaceState(null, '', `?tab=${tabIndex}`);
	};
	
	useEffect(() => {
		const initialTab = tab ? Number(tab):  0;
		setSelectedTab(initialTab);
		window.history.replaceState(null, '', `?tab=${initialTab}`);
	}, [tab]);

	return {
		selectedTab,
		handleSelectTab
	};
} 

export default useTab;
