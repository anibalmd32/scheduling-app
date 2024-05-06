import type { SelectItemsIndex } from '../schedules.d';
import * as selectItemsLib from '../libs/maped-select-items-lib';

export const mapedSelectItems: SelectItemsIndex = {
	'semesters': selectItemsLib.mapSemesterItems,
	'classrooms': selectItemsLib.mapClassroomItems,
};

export const mapedModalSelectItems: SelectItemsIndex = {
	'classrooms': selectItemsLib.mapTypeClassroomItems,
	'semesters': selectItemsLib.mapSemesterItems
};

