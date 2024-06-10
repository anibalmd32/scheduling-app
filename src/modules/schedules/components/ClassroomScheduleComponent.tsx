// * HOOKS
import { useClassroomSchdule } from '../Contexts/ClassroomSchedulesCtx';

// * COMPONENTS
import Callendar from '../../../components/Callendar';
import Select from '../../../components/Select';
import { ClipLoader } from 'react-spinners';
import Toast from '../../../components/Toast';
import { ScheduleForm } from './SchduleForm';
import { ScheduleDetails } from './ScheduleDetails';

import useGenerate from '../hooks/useGenerate';

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
		toast,
		error,
		loadingScheduleEvents,
		setLoadingScheduleEvents
	} = useClassroomSchdule();

	const { disabled, handleGenerate } = useGenerate(classroomSelectValue);

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
		return <ClipLoader size={80} />;
	}
	
	return (
		<>
			<ScheduleDetails />
			<Select
				items={classroomSelectItems}
				label="Lista de salones"
				name="classrooms"
				onChange={e => {
					handleClassroomSelect(e.target.value);
					setLoadingScheduleEvents(true);
				}}
				value={classroomSelectValue}
			/>

			<div className='mt-4'>
				{
					loadingScheduleEvents ? (
						<div className='flex justify-center items-center h-full w-full'>
							<ClipLoader size={80} />
						</div>
					) : (
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
							generate={{ disabled, onClick: handleGenerate}}
						/>	
					)
				}
			</div>

			<ScheduleForm
				open={openModal.forAdd}
				toggle={() => handleOpenModal('add')}
			/>

			{toast.loading && (
				<Toast
					message='Cargando'
					variant='info'
					isLoader
				/>
			)}

			{toast.success && (
				<Toast
					message='Exito en la operacion'
					variant='success'
					duraction={3000}
				/>
			)}

			{toast.error && (
				<Toast
					message={error}
					variant='error'
					duraction={3000}
				/>
			)}	
		</>
	);
};
