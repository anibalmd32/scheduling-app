import type { ClassroomData } from '../../classrooms/def';
import type { SemesterData, SubjectData } from '../../semesters/def';
import type { MapSelectScheduleItems } from '../def';

export const mapTypeClassroomItems: MapSelectScheduleItems = (items) => {
	const classrooms = items as ClassroomData[];
	
	const uniqueTypes = new Set(classrooms.map(classroom => classroom.category));

	const typeClassroomItems = Array.from(uniqueTypes).map(category => ({
		label: category,
		value: category
	}));

	return typeClassroomItems;
};

export const mapClassroomItems: MapSelectScheduleItems = (items) => {
	const classrooms = items as ClassroomData[];

	return classrooms.map(classroom => ({
		label: `${classroom.code} - ${classroom.category}`,
		value: classroom._id
	}));
};

export const mapSemesterItems: MapSelectScheduleItems = (items) => {
	const semesters = items as SemesterData[];
	
	return semesters.map(semester => ({
		label: `Semestre ${semester.number}`,
		value: semester._id
	}));
};

export const mapSubjectItems: MapSelectScheduleItems = (items) => {
	const subjects = items as SubjectData[];

	return subjects.map(subject => ({
		label: subject.name,
		value: subject._id
	}));
};
