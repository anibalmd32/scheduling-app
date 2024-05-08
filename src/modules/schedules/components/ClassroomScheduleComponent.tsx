// * HOOKS
import { useClassroomSchdule } from '../Contexts/ClassroomSchedulesCtx';

// * COMPONENTS
import Callendar from '../../../components/Callendar';
import Select from '../../../components/Select';
import Spinner from '../../../components/Spinner';
import { ScheduleForm } from './SchduleForm';

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

	if (isLoading) {
		return <Spinner size={200} />;
	}
	
	return (
		<>
			<Select
				items={classroomSelectItems}
				label="Lista de salones"
				name="classrooms"
				onChange={e => handleClassroomSelect(e.target.value)}
				value={classroomSelectValue}
			/>

			<Callendar
				events={classroomSchduleEvents}
				handleChangeEvent={handleChangeSubject}
				handleClickEvent={handleClickSubject}
				handleInputEvent={handleInputSubject}
				onAddEvent={onAddSubject}
				onDeletEvent={onDeleteSubject}
			/>

			<ScheduleForm
				open={openModal.forAdd}
				toggle={() => handleOpenModal('add')}
			/>
		</>
	);
};
