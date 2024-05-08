// * HOOKS
import { useClassroomSchdule } from '../Contexts/ClassroomSchedulesCtx';

// * COMPONENTS
import Modal from '../../../components/Modal';
import Form from '../../../components/Form';
import Select from '../../../components/Select';
import Button from '../../../components/Button';

interface Props {
	open: boolean;
	toggle: () => void;
}

export const ScheduleForm = ({ open, toggle }: Props) => {
	const {
		semesterItems,
		subjectItems,
		handleSelectSemester,
		onSubmit,
		handleChange,
		handleSubmit,
		formData
	} = useClassroomSchdule();

	return (
		<Modal
			open={open}
			onClose={toggle}
		>
			<Form onSubmit={(e) => onSubmit(handleSubmit(e))}>
				<Select
					items={semesterItems}
					label='Seleccione un semestre'
					name='semester'
					onChange={e => {
						handleSelectSemester(e.target.value);
						handleChange(e);
					}}
					value={formData.semester}
				/>

				{
					subjectItems.length > 0 && (
						<Select
							items={subjectItems}
							label='Seleccione una materia'
							name='subject'
							onChange={e => {
								handleChange(e);
							}}
							value={formData.subject}
						/>
					)
				}

				<div className='mt-4 flex gap-2'>
					<Button
						label='Enviar'
						type='submit'
						variant='info'
						disabled={!subjectItems.length}
					/>

					<Button
						label='Cancelar'
						type='reset'
						variant='error'
						onClick={toggle}
					/>
				</div>
			</Form>			
		</Modal>
	);
};
