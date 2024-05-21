// * HOOKS
import useSections from '../hooks/useSections';
import useSubjects from '../hooks/useSubjects';

// * COMPONENTS
import Select from '../../../components/Select';
import Table from '../../../components/Table';
import SubjectForm from './SubjectForm';
import Toast from '../../../components/Toast';

// * DEFINITIONS
import { SectionViewProps } from '../def';
import Button from '../../../components/Button';

// * ICONS
import {FaPlusSquare } from 'react-icons/fa';
// import Input from '../../../components/Input';

function SectionsView({
	sections,
}: SectionViewProps) {
	
	const {
		sectionItems,
		sectionSubjects,
		selectedSection,
		setSelectedSection
	} = useSections(sections);

	const {
		colums,
		defaultValues,
		handleOpenForm,
		openForm,
		handleSubmit,
		showToast
	} = useSubjects();

	return (
		<>
			<div className='flex gap-2 mt-4'>
				<div className='w-fit'>
					<Select
						items={sectionItems}
						label='Secciones'
						name='sections'
						onChange={(e) => {
							setSelectedSection(e.target.value);
						}}
						value={selectedSection}
					/>
				</div>
				<div className='mt-12'>
					<button className='text-5xl text-blue-500 hover:scale-110 transition-transform duration-300'>
						<FaPlusSquare />
					</button>
				</div>
			</div>

			<div className='mt-4'>
				<h2 className='text-xl text-blue-950 font-semibold'>Lista de materias</h2>
				<div className='mb-2 flex gap-2 items-center'>
					<Button
						onClick={handleOpenForm}
						label='Agregar Materia'
						type='button'
						variant='info'
					/>
					{/* <Input
						name='subject'
						onChange={() => {}}
						placeholder='Buscar materia'
						type='text'
						value={''}
					/> */}
				</div>

				<Table
					cells={colums}
					data={sectionSubjects}
				/>

				<SubjectForm
					defaultValues={defaultValues}
					onCloseModal={handleOpenForm}
					openForm={openForm}
					onSubmit={handleSubmit}
				/>

				{showToast.loading && (
					<Toast
						message='Cargando'
						variant='info'
						isLoader
					/>
				)}

				{showToast.success && (
					<Toast
						message='Exito en la operacion'
						variant='success'
						duraction={3000}
					/>
				)}

				{showToast.error && (
					<Toast
						message='Error en la operacion'
						variant='error'
						duraction={3000}
					/>
				)}
			</div>
		</>
	);
}

export default SectionsView;
