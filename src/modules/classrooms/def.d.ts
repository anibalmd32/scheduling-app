export interface DaySchema {
	name: string
	hours: string[]
}

export interface Classroom {
	code: string;
	category: 'laboratory' | 'normal' | 'pc';
	degrees: string[];
	availability: DaySchema[];
	occupied: DaySchema[] | [];
}

export interface IClassroomContext {
	classroomsData: Classroom[];
	isLoading: boolean;
}

export interface ScheduleParams {
	degree: string;
	semester: string;
	classroom?: string; // Classroom code
}

export interface ScheduleEvent {
	title: string
	start: string
	end: string
}
  