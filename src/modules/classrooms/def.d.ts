export interface DaySchema {
	name: string
	hours: string[]
}

export interface Classroom {
	_id: string;
	code: string;
	isActive: boolean;
	category: 'laboratory' | 'normal' | 'pc';
	degrees: string[];
	availability: DaySchema[];
	occupied: DaySchema[] | [];
}

// Interface temporarl
export interface ClassroomData extends Classroom {
	_id: string
}

export interface IClassroomContext {
	classroomsData: Classroom[];
	isLoading: boolean;
	loadData: () => Promise<void>
}

export interface ScheduleParams {
	degree: string;
	semester: string;
	classroom?: string; // Classroom code
}

export interface ScheduleEvent {
	id: string
	title: string
	start: string
	end: string
	metadata: Array<{
		key: string
		value: string
	}>
	type: string
}
  