import * as selectItemsLib from '../libs/maped-select-items-lib';

export const mapedSelectItems = {
	'semesters': selectItemsLib.mapSemesterItems,
	'classrooms': selectItemsLib.mapClassroomItems,
};

export const mapedModalSelectItems = {
	'classrooms': selectItemsLib.mapTypeClassroomItems,
	'semesters': selectItemsLib.mapSemesterItems
};

