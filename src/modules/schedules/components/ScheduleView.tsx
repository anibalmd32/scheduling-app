// * Hooks
import { useSchedule } from '../hooks/useSchedule';
import { useScheduleModal } from '../hooks/useScheduleModal';

// * Components
import Select from '../../../components/Select';
import Callendar from '../../../components/Callendar';
import Spinner from '../../../components/Spinner';
import Modal from '../../../components/Modal';
import AddSubjectObtions from './AddSubjectOptions';

// * Definitions
import { ScheduleViewProps } from '../schedules.d';

export default function ScheduleView({ modalParam, viewParam }: ScheduleViewProps) {
	const {
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
	} = useSchedule(viewParam); // ? Schedule view hook


	const { ...modalHooks } = useScheduleModal(modalParam);
	
	return (
		<article>
			{
				isLoading &&
				<Spinner size={500} />
			}
			{
				selectItems.length > 0 &&
				<Select
					items={selectItems}
					label='Filtrar'
					name='filter'
					onChange={async (e) => await handleSelect(e.target.value)}
					value={selectValue}
				/>
			}
			<div className='mt-4'>
				<Callendar
					events={events}
					handleInputEvent={handleInputSubject}
					handleClickEvent={handleClickSubject}
					handleChangeEvent={handleChangeSubject}
					onAddEvent={onAddSubject}
					onDeletEvent={onDeleteSubject}
				/>
			</div>
		
			<Modal
				onClose={() => handleOpenModal('add')}
				open={openModal.forAdd}
			>
				<AddSubjectObtions param={viewParam} {...modalHooks} />
			</Modal>
		</article>
	);
}
