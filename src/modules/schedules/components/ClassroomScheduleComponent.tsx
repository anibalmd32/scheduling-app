// * HOOKS
import { useClassroomSchdule } from '../Contexts/ClassroomSchedulesCtx';

// * COMPONENTS
import Callendar from '../../../components/Callendar';
import Select from '../../../components/Select';
import Spinner from '../../../components/Spinner';
import { ScheduleForm } from './SchduleForm';
import { ScheduleDetails } from './ScheduleDetails';

export const ClassroomScheduleComponent = () => {
	const {
		classroomSchduleEvents,
		classroomSelectItems,
		classroomSelectValue,
		handleClassroomSelect,
		isLoading,
		handleChangeSubject,
		handleClickSubject,
		handleInputSubject,
		handleOpenModal,
		onAddSubject,
		onDeleteSubject,
		openModal,
	} = useClassroomSchdule();

	const handlerPrint = async () => {
		try {
			const pdf = await fetch(`/api/pdf?for=classrooms&id=${classroomSelectValue}`).then(res => res.blob());
			const url = URL.createObjectURL(pdf);
			window.open(url);
		} catch (error) {
			console.error('Ocurrio un error al generar el PDF', error);
		}
		
	};

	if (isLoading) {
		return <Spinner size={200} />;
	}
	
	return (
		<>
			<ScheduleDetails />
			<Select
				items={classroomSelectItems}
				label="Lista de salones"
				name="classrooms"
				onChange={e => handleClassroomSelect(e.target.value)}
				value={classroomSelectValue}
			/>

			<div className='mt-4'>
				<Callendar
					events={classroomSchduleEvents}
					handleChangeEvent={handleChangeSubject}
					handleClickEvent={handleClickSubject}
					handleInputEvent={handleInputSubject}
					onAddEvent={onAddSubject}
					onDeletEvent={onDeleteSubject}
					selectable
					interactive
					onExport={handlerPrint}
				/>
			</div>

			<ScheduleForm
				open={openModal.forAdd}
				toggle={() => handleOpenModal('add')}
			/>
		</>
	);
};
