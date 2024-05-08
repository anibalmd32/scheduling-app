// * HOOKS
import React from 'react';
import useData from '../../../hooks/useData';
import useForm from '../../../hooks/useForm';

// * LIBS
import * as endpointLib from '../libs/endpoint-lib';
import * as mapSelectItems from '../libs/maped-select-items-lib';

// * UTILS
import { formatSchedule } from '../utils/formatSchedule';

// * DEFINITIONS
import type { ClassroomScheduleCtx, AddToClassroomValues, NewScheduleEventData } from '../def';
import type { ClassroomData } from '../../classrooms/def';
import type { SemesterData } from '../../semesters/def';
import type { SelectItem } from '../../../components/ui';
import type { ScheduleEvent } from '../../classrooms/def';
import type {
	EventAddArg,
	DateSelectArg,
	EventInput,
	EventClickArg,
	EventRemoveArg,
	EventChangeArg
} from '@fullcalendar/core/index.js';

// * SERVICES
import {
	getSchedulesForClassroom,
	createScheduleFromClassroom,
	updateSchedule,
	deleteSchedule
} from '../services/scheduleServices';

// * VIEW CONTEXT
const ClassroomScheduleContext = React.createContext<ClassroomScheduleCtx>({} as ClassroomScheduleCtx);

// * VIEW CONTEXT PROVIDER
export const ClassroomScheduleContextProvider = ({ children }: { children: React.ReactNode }) => {
	
	// * STATES FOR SHCEDULE COMPONENT
	const [classroomSelectItems, setClassroomsSelectItems] = React.useState<SelectItem[]>([]);
	const [classroomSelectValue, setClassroomSelectValue] = React.useState<string>('');
	const [classroomSchduleEvents, setClassroomScheduleEvents] = React.useState<ScheduleEvent[]>([]);

	// * STATES FOR FORM COMPOENT
	const [semesterItems, setSemesterItems] = React.useState<SelectItem[]>([]);
	const [subjectItems, setSubjectItems] = React.useState<SelectItem[]>([]);
	const [newEventData, setNewEventData] = React.useState<NewScheduleEventData>({
		start: '',
		end: '',
		clarrooom: '',
		semester: undefined,
		subject: '',
		typeClassroom: '',
		day: '',
		hourInterval: 0
	});
	const [formValues,] = React.useState<AddToClassroomValues>({
		semester: '',
		subject: ''
	});

	const [openModal, setOpenModal] = React.useState({
		forAdd: false,
		forDetails: false
	});

	// * FORM HOOK
	const { handleSubmit, handleChange, formData, resetForm } = useForm<AddToClassroomValues>(formValues);

	// * DATA FECTHING
	const {
		data: classroomData,
		isLoading,
	} = useData<ClassroomData[]>({
		module: 'classrooms',
		requestConfig: {
			endpoint: endpointLib.getClassroomList(),
			method: 'get'
		}
	}); // Get data for schedule

	const { data: semesterData } = useData<SemesterData[]>({
		module: 'semesters',
		requestConfig: {
			endpoint: endpointLib.getSemesterList(),
			method: 'get'
		}
	}); // Get Data for form

	const loadClassroomScheduleEvents = async () => {
		try {
			if (classroomSelectValue) {
				const events = await getSchedulesForClassroom(classroomSelectValue);
				setClassroomScheduleEvents(events);
			}
		} catch (error) {
			console.error('Ocurrio un error al obtener los horarios de los salones', error);
		}		
	}; // Get Spesific schedule events by classroom

	// * VIEW HANDLERS
	const handleClassroomSelect = (classroomValue: string) => {
		setClassroomSelectValue(classroomValue);
	}; // Select a new classroom for get its schedule data

	const handleOpenModal = (modalFor: 'add' | 'details') => {
		if (modalFor === 'add') {
			setOpenModal({ ...openModal, forAdd: !openModal.forAdd });
		} else if (modalFor === 'details') {
			setOpenModal({ ...openModal, forDetails: !openModal.forDetails });
		}
	}; // Open a modal window for a spesific action
	
	// * SCHEDULE EVENTS LOGIC
	const handleInputSubject = (args: DateSelectArg) => {
		handleOpenModal('add');

		const { day, end, start } = formatSchedule({
			start: args.startStr,
			end: args.endStr
		});

		setNewEventData({
			...newEventData,
			start,
			end,
			day,
		});

		const componentAPI = args.view.calendar;
		const newSubject: EventInput = {
			title: '',
			start: args.startStr,
			end: args.endStr
		};
		
		componentAPI.addEvent(newSubject);
	};

	const handleClickSubject = (args: EventClickArg) => {
		args.event.remove();
		// TODO: abrir modal con la info de la mateia y con la accion de elimnar
	};

	const handleChangeSubject = async (args: EventChangeArg) => {
		const { day, end, start } = formatSchedule({
			start: args.event.startStr,
			end: args.event.endStr
		});

		const dataToSend = {
			day,
			end,
			start,
		};

		try {
			const schedule = await updateSchedule(args.event.id, dataToSend);
			setClassroomScheduleEvents([...classroomSchduleEvents, schedule]);
		} catch (error) {
			console.error('Ocurrio un error al actualizar el horario', error);
		}
	};

	const onAddSubject = (args: EventAddArg) => {
		console.log('Se ha agregado una nueva materia', args.event._context);
	};

	const onDeleteSubject = async (args: EventRemoveArg) => {
		try {
			await deleteSchedule(args.event.id);
			setClassroomScheduleEvents(classroomSchduleEvents.filter(event => event.id !== args.event.id));
		} catch (error) {
			console.error('Ocurrio un error al eliminar el horario', error);
		}
	};

	// * Form handlers
	const handleSelectSemester = (semesterId: string) => {
		if (semesterData) {
			const subjectData = semesterData.find(semester => semester._id === semesterId)?.sections[0].subjects;
	
			if (subjectData) {
				const subjectItems = mapSelectItems.mapSubjectItems(subjectData);
				setSubjectItems(subjectItems);
			}
		}
	};

	const onSubmit = async (formData: AddToClassroomValues) => {
		if (semesterData && formData.semester) {
			const semester = semesterData.find(semester => semester._id === formData.semester);
			const classroom = classroomData?.find(classroom => classroom._id === classroomSelectValue);
			const classroomType = classroom?.category;

			const subjects = semester?.sections[0].subjects;
			const foundSubject = subjects?.find(subject => subject._id === formData.subject);

			let subjectHours: number | undefined;

			if (classroomType === 'laboratory') {
				subjectHours = foundSubject?.laboratoryHours;
			} else if (classroomType === 'normal') {
				subjectHours = foundSubject?.theoryHours;
			} else if (classroomType === 'pc') {
				subjectHours = foundSubject?.practiceHours;
			}

			if (subjectHours === 0) {
				throw new Error('Esta materia no puede ver horas en este salon');
			}

			if (foundSubject && classroomType && semester) {
				
				const newSchedule: NewScheduleEventData = {
					clarrooom: classroom.code,
					subject: foundSubject.name,
					typeClassroom: classroomType,
					semester: semester.number,
					start: newEventData.start,
					end: newEventData.end,
					day: newEventData.day,
					hourInterval: subjectHours
				};

				try {
					const schedule = await createScheduleFromClassroom(newSchedule);
					setClassroomScheduleEvents([...classroomSchduleEvents, schedule]);
					setOpenModal({ ...openModal, forAdd: false });
					resetForm();
					setSubjectItems([]);
				} catch (error) {
					console.error('Ocurrio un error al crear el horario', error);
				}
			}
			
		}
	};

	// * VIEW EFECTS
	React.useEffect(() => {
		if (classroomData) {
			const selectitems = mapSelectItems.mapClassroomItems(classroomData);
			setClassroomsSelectItems(selectitems);
			setClassroomSelectValue(classroomData[0]._id);
		}
	}, [classroomData]); // Set classroom select items on load classroom data

	React.useEffect(() => {
		if (semesterData) {
			const selectItems = mapSelectItems.mapSemesterItems(semesterData);
			setSemesterItems(selectItems);
		}
	}, [semesterData]); // Set semester select items on load semester data

	React.useEffect(() => {
		loadClassroomScheduleEvents();
	}, [classroomSelectValue]); // Load schedule data on select classroom

	return (
		<ClassroomScheduleContext.Provider value={{
			// * For schedule component
			classroomSchduleEvents,
			classroomSelectItems,
			classroomSelectValue,
			isLoading,
			handleClassroomSelect,
			handleInputSubject,
			handleClickSubject,
			handleChangeSubject,
			onAddSubject,
			onDeleteSubject,

			handleOpenModal,
			openModal,

			// * Form hook
			handleSubmit,
			handleChange,
			formData,

			// * For form componet
			semesterItems,
			subjectItems,
			handleSelectSemester,
			onSubmit
		}}>
			{children}
		</ClassroomScheduleContext.Provider>
	);
};

// * CONTEXT CUSTOM HOOK
export const useClassroomSchdule = () => React.useContext(ClassroomScheduleContext);
