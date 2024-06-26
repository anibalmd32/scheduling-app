import React from 'react';
import type { MapSelectItems, SelectItem } from '../../components/ui';
import type { ClassroomData } from '../classrooms/def';
import type { SemesterData, SubjectData } from '../semesters/def';
import type { ScheduleEvent } from '../classrooms/def';
import type {
	EventAddArg,
	DateSelectArg,
	EventClickArg,
	EventRemoveArg,
	EventChangeArg
} from '@fullcalendar/core/index.js';

// * API
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

export interface NewScheduleEventData {
  start: string
  end: string
  clarrooom: string
  semester: number | undefined
  subject: string
  subjectId: string
  typeClassroom: string
  day: string
  hours: number
  typeSubject: string
}

export interface UpdateSchedule {
  day: string
  start: string
  end: string
}

export interface DeleteSchedule {
  subject: string
  typeSubject: string
}

export type ScheduleParam = 'semester' | 'classroom'

export interface ScheduleQuery {
  query: ScheduleParam
  value: string
}

// * CONTEXT
export interface ClassroomScheduleCtx {
  // * For schedule component
  classroomSelectItems: SelectItem[];
  classroomSelectValue: string;
  classroomSchduleEvents: ScheduleEvent[];
  isLoading: boolean;
  handleClassroomSelect: (classroomValue: string) => void
  handleInputSubject: (args: DateSelectArg) => void
  handleClickSubject: (args: EventClickArg) => void
  handleChangeSubject: (args: EventChangeArg) => void
  onAddSubject: (args: EventAddArg) => void
  onDeleteSubject: (args: EventRemoveArg) => void

  handleOpenModal: (modalFor: 'add' | 'details') => void
  openModal: {
    forAdd: boolean;
    forDetails: boolean;
  }

  // * Form hook
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => AddToClassroomValues
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  formData: AddToClassroomValues

  // * For form componet
  semesterItems: SelectItem[]
  subjectItems: SelectItem[]
  typeSubjectItems: SelectItem[]
  handleSelectSemester: (semesterId: string) => void
  onSubmit: (formData: AddToClassroomValues) => Promise<void>
  selectedSubject: string | undefined
  argsFormDelete: EventClickArg | undefined
  toast: {
    loading: boolean;
    success: boolean;
    error: boolean;
  }
  error: string
  loadingScheduleEvents: boolean
  setLoadingScheduleEvents: React.Dispatch<React.SetStateAction<boolean>>
}

// * LIBS
type MapSelectScheduleItems = MapSelectItems<ClassroomData | SemesterData | SubjectData>;

// * UTILS
type SelectItemsIndex = Record<ScheduleParam, MapSelectScheduleItems>;

// * COMPONENTS

// * FORM VALUES
export interface AddToClassroomValues {
  type: string;
  semester: string; 
  subject: string;
}

interface ClassroomFormValues {
	code: string;
	category: string;
}
