import React from 'react';
import useData from '../../../hooks/useData';
import type { SelectItem } from '../../../components/ui';
import type { ScheduleParam } from '../schedules.d';
import type { ClassroomData } from '../../classrooms/def';
import type { SemesterData } from '../../semesters/def';
import endpointIndex from '../utils/endpoint-index';
import { mapedModalSelectItems } from '../utils/select-item-list';
import { mapSubjectItems, mapClassroomItems } from '../libs/maped-select-items-lib';

export const useScheduleModal = (param: ScheduleParam) => {
	const [semesterItems, setSemesterItems] = React.useState<SelectItem[]>([]);
	const [semesterSelectValue, setSemesterSelectValue] = React.useState<string>('');
	const [subjectItems, setSubjectItems] = React.useState<SelectItem[]>([]);
	const [subjectSelectValue, setSubjectSelectValue] = React.useState<string>('');
	const [classroomItems, setClassroomItems] = React.useState<SelectItem[]>([]);
	const [classroomSelectValue, setClassroomSelectValue] = React.useState<string>('');
	const [typeClassroomItems, setTypeClassroomItems] = React.useState<SelectItem[]>([]);
	const [typeClassroomSelectValue, setTypeClassroomSelectValue] = React.useState<string>('');

	const { data, loadData } = useData<ClassroomData[] | SemesterData[]>({
		module: param,
		requestConfig: {
			endpoint: endpointIndex[param],
			method: 'get'
		}
	});

	const handleSelectSemester = (semesterId: string) => {
		setSemesterSelectValue(semesterId);
		const semesterData = data as SemesterData[];
		const subjectData = semesterData.find(semester => semester._id === semesterId)?.sections[0].subjects;

		subjectData && setSubjectItems(mapSubjectItems(subjectData));
	};

	const handleSelectSubject = (subjectId: string) => {
		setSubjectSelectValue(subjectId);
		console.log('Materia seleccionada', subjectId);
	};

	const handleSelectTypeClassroom = (typeClassroom: string) => {
		setTypeClassroomSelectValue(typeClassroom);
		const classroomData = data as ClassroomData[];
		const classroomsOfType = classroomData.filter(classrooom => classrooom.category === typeClassroom);

		classroomsOfType && setClassroomItems(mapClassroomItems(classroomsOfType));
	};

	const handleSelectClassroom = (classroomId: string) => {
		setClassroomSelectValue(classroomId);
		console.log('salon selecionado:', classroomId);
	};

	// TODO: mover a otro archivo
	const setStateIndex = {
		'semesters': setSemesterItems,
		'classrooms': setTypeClassroomItems
	};

	const setValueIndex = {
		'semesters': setSemesterSelectValue,
		'classrooms': setTypeClassroomSelectValue
	};

	React.useEffect(() => {
		loadData();
	}, [param]);

	React.useEffect(() => {
		if (data) {
			setStateIndex[param](mapedModalSelectItems[param](data));
			setValueIndex[param](data[0]._id);
		}
	}, [data]);

	return {
		semesterItems,
		subjectItems,
		typeClassroomItems,
		classroomItems,
		semesterSelectValue,
		subjectSelectValue,
		typeClassroomSelectValue,
		classroomSelectValue,
		handleSelectSemester,
		handleSelectSubject,
		handleSelectTypeClassroom,
		handleSelectClassroom
	};
};