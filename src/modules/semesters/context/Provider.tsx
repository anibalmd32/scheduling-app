// * REACT IMPORTS
import { useState, useEffect, createContext, ReactNode } from 'react';

// * HOOKS
import useData from '../../../hooks/useData';

// * COMPONENTS
import SectionsView from '../components/SectionsView';

// * DEFINITIONS
import { SemestersCtx, SemesterData } from '../def';
import { TabItem } from '../../../components/ui';

export const SemestersContext = createContext<SemestersCtx>({} as SemestersCtx);

function SemestersProvider({ children }: { children: ReactNode }) {
	const [semestersTabItems, setSemesterTabItems] = useState<TabItem[]>([]);
	const [sectionId, setSectionId] = useState<string>('');

	const { data: semesters, isLoading, loadData } = useData<SemesterData[]>({
		module: 'semesters',
		requestConfig: {
			endpoint: '/all',
			method: 'get'
		}
	});

	useEffect(() => {
		isLoading && loadData();
		
		if (semesters) {
			setSemesterTabItems(semesters.map((semester, index) => ({
				index,
				label: `Semestre ${semester.number}`,
				view: <SectionsView sections={semester.sections} />
			})));
		}
	}, [semesters, isLoading]);

	return (
		<SemestersContext.Provider value={{
			isLoading,
			semesters: semesters || [],
			semestersTabItems,
			loadData,
			sectionId,
			setSectionId
		}}>
			{children}
		</SemestersContext.Provider>
	);
}

export default SemestersProvider;
