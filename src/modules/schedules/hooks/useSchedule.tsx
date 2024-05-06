// * Hooks
import React from 'react';
import useData from '../../../hooks/useData';

// * Utils
import endpointIndex from '../utils/endpoint-index';
import { mapedSelectItems } from '../utils/select-item-list';

// * Service Object
import HTTPService from '../../../http.service';

// * Definitions
import type { ScheduleParam } from '../schedules.d';
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

const service = new HTTPService('schedules');

export const useSchedule = (param: ScheduleParam) => {
	const [selectItems, setSelectItems] = React.useState<SelectItem[]>([]);
	const [selectValue, setSelectValue] = React.useState<string>('');
	const [openModal, setOpenModal] = React.useState({
		forAdd: false,
		forDetails: false
	});
	const [events, setEvents] = React.useState<ScheduleEvent[]>([]);
	
	// Data fetching
	const { data, loadData, isLoading } = useData<ClassroomData[] | SemesterData[]>({
		module: param,
		requestConfig: {
			endpoint: endpointIndex[param],
			method: 'get'
		}
	});

	// * HTTP Services
	const getScheduleEvents = async (id: string) => {
		const searchParamsIndex: Record<ScheduleParam, string> = {
			'semesters': 'semester',
			'classrooms': 'classroom'
		};

		try {
			const { data } = await service.httpCaller<ScheduleEvent[]>({
				endpoint: '/as-events',
				method: 'get',
				params: {
					[searchParamsIndex[param]]: id
				}
			});
			setEvents(data);
		} catch (error) {
			console.log(error);
		}
	};


	// * Handlers
	const handleOpenModal = (modalFor: 'add' | 'details') => {
		if (modalFor === 'add') {
			setOpenModal({ ...openModal, forAdd: !openModal.forAdd });
		} else if (modalFor === 'details') {
			setOpenModal({ ...openModal, forDetails: !openModal.forDetails });
		}
	};

	const handleSelect = async (value: string) => {
		setSelectValue(value);
		getScheduleEvents(value);
	};

	const handleInputSubject = async (args: DateSelectArg) => {
		// TODO: Capturar la informacion de la materia a agragar
		handleOpenModal('add');

		// TODO: Agregar el evento (nueva materia al componente) ✔️
		const componentAPI = args.view.calendar;
		const newSubject: EventInput = {
			title: 'nueva materia',
			start: args.startStr,
			end: args.endStr
		};
		
		componentAPI.addEvent(newSubject);
	};

	const handleClickSubject = (args: EventClickArg) => {
		args.event.remove();
		// TODO: abrir modal con la info de la mateia y con la accion de elimnar
	};

	const handleChangeSubject = (args: EventChangeArg) => {
		console.log('Modificando el evento', args);
	};

	// * Actions
	const onAddSubject = (args: EventAddArg) => {
		console.log('Se ha agregado una nueva materia', args.event._context);
	};

	const onDeleteSubject = (args: EventRemoveArg) => {
		console.log('Removiendo materia', args);
	};
	
	// * Effects
	React.useEffect(() => {
		loadData();
	}, [param]); // Load data on param change

	React.useEffect(() => {
		if (data) {
			setSelectItems(mapedSelectItems[param](data));
			setSelectValue(data[0]._id);
			getScheduleEvents(data[0]._id);
		}
	}, [data]); // Map data on load data

	return {
		// * Data from the server
		events,

		// * Data request state
		isLoading,

		// * Data in current state
		selectItems,
		selectValue,

		// * Component state
		openModal,
		
		// * Handlers
		handleSelect,
		handleInputSubject,
		handleClickSubject,
		handleChangeSubject,
		handleOpenModal,

		// * Actions
		onAddSubject,
		onDeleteSubject
	};
};