// * Hooks
import React from 'react';

// * Definitions
import type {
	EventAddArg,
	DateSelectArg,
	EventInput,
	EventClickArg,
	EventRemoveArg,
	EventChangeArg
} from '@fullcalendar/core/index.js';

export const useScheduleEvent = () => {
	const [openModal, setOpenModal] = React.useState({
		forAdd: false,
		forDetails: false
	});

	// * Handlers
	const handleOpenModal = (modalFor: 'add' | 'details') => {
		if (modalFor === 'add') {
			setOpenModal({ ...openModal, forAdd: !openModal.forAdd });
		} else if (modalFor === 'details') {
			setOpenModal({ ...openModal, forDetails: !openModal.forDetails });
		}
	};

	const handleInputSubject = (args: DateSelectArg) => {
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
		console.log('Haciendo click en un component');
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

	return {
		// * Component state
		openModal,
		
		// * Handlers
		handleInputSubject,
		handleClickSubject,
		handleChangeSubject,
		handleOpenModal,

		// * Actions
		onAddSubject,
		onDeleteSubject
	};
};
