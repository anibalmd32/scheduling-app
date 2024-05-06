import type { MapSelectItems, SelectItem } from '../../components/ui';
import type { ClassroomData } from '../classrooms/def';
import type { SemesterData, SubjectData } from '../semesters/def';

// API
export interface ScheduleEventData {
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

export type ScheduleParam = 'semesters' | 'classrooms'

export interface ScheduleQuery {
  query: ScheduleParam
  value: string
}

// * CONTEXT
export interface SchedulesCtx {
  schedules: ScheduleEventData[]
	isLoading: boolean
	loadData: () => Promise<void>
}

// * LIBS
type MapSelectScheduleItems = MapSelectItems<ClassroomData | SemesterData | SubjectData>;

// * UTILS
type SelectItemsIndex = Record<ScheduleParam, MapSelectScheduleItems>;

// * COMPONENTS
export interface ScheduleViewProps {
  viewParam: ScheduleParam;
  modalParam: ScheduleParam;
}

export interface OptionsForAddToClassroomProps {
  semesterItems: SelectItem[];
	subjectItems: SelectItem[];
	semesterSelectValue: string;
	subjectSelectValue: string;
	handleSelectSemester: (value: string) => void;
	handleSelectSubject: (value: string) => void;
}

export interface OptionsForAddToSemesterProps {
  typeClassroomItems: SelectItem[];
  classroomItems: SelectItem[];
  typeClassroomSelectValue: string;
  classroomSelectValue: string;
  handleSelectClassroom: (value: string) => void;
  handleSelectTypeClassroom: (value: string) => void;
}

export interface AddSubjectObtionsProps extends OptionsForAddToClassroomProps, OptionsForAddToSemesterProps {
  param: ScheduleParam
}
