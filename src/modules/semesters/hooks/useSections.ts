import { useState, useEffect } from 'react';
import useSemesters from './useSemesters';
import { SelectItem } from '../../../components/ui';
import { SectionData, SubjectData } from '../def';

function useSections(sections: SectionData[]) {
	const [sectionItems, setSectionItems] = useState<SelectItem[]>();
	const [sectionSubjects, setSectionSubjects] = useState<SubjectData[]>([]);
	const [selectedSection, setSelectedSection] = useState<string>(sections[0]._id);

	const { setSectionId } = useSemesters();

	useEffect(() => {
		if (selectedSection) {
			setSectionItems(sections.map((section) => ({
				label: section.code,
				value: section._id
			})));
	
			setSelectedSection(sections[0]._id);

			const currentSection = sections.filter(section => section._id === selectedSection);
	
			if (currentSection.length) {
				setSectionSubjects(currentSection[0].subjects);
			}

			setSectionId(selectedSection);
		}
	}, [sections, selectedSection]);

	return {
		sectionItems,
		sectionSubjects,
		selectedSection,
		setSelectedSection,
		setSectionSubjects
	};
}

export default useSections;
