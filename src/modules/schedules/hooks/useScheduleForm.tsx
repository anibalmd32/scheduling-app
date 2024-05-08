import React from 'react';
import useData from '../../../hooks/useData';
import type { SelectItem } from '../../../components/ui';
import type { ClassroomData } from '../../classrooms/def';
import type { SemesterData } from '../../semesters/def';
import endpointIndex from '../utils/endpoint-index';
import { mapedModalSelectItems } from '../utils/select-item-list';
import { mapSubjectItems } from '../libs/maped-select-items-lib';

export const useScheduleForm = () => {
	const [semesterItems, setSemesterItems] = React.useState<SelectItem[]>([]);
	const [subjectItems, setSubjectItems] = React.useState<SelectItem[]>([]);

	const { data } = useData<ClassroomData[] | SemesterData[]>({
		module: 'semesters',
		requestConfig: {
			endpoint: endpointIndex['semester'],
			method: 'get'
		}
	});

	const handleSelectSemester = (semesterId: string) => {
		const semesterData = data as SemesterData[];
		const subjectData = semesterData.find(semester => semester._id === semesterId)?.sections[0].subjects;

		subjectData && setSubjectItems(mapSubjectItems(subjectData));
	};

	const handleSelectSubject = (subjectId: string) => {
		console.log('Materia seleccionada', subjectId);
	};

	// TODO: mover a otro archivo
	const setStateIndex = {
		'semesters': setSemesterItems,
	};

	React.useEffect(() => {
		if (data) {
			setStateIndex['semesters'](mapedModalSelectItems['semesters'](data));
		}
	}, [data]);

	return {
		semesterItems,
		subjectItems,
		handleSelectSemester,
		handleSelectSubject,
	};
};