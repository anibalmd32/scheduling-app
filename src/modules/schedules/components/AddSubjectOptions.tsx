import React from 'react';

import type {
	ScheduleParam,
	OptionsForAddToClassroomProps,
	OptionsForAddToSemesterProps,
	AddSubjectObtionsProps
} from '../schedules.d';
import Select from '../../../components/Select';

const OptionsForAddToClassroom = ({
	semesterItems,
	subjectItems,
	semesterSelectValue,
	subjectSelectValue,
	handleSelectSemester,
	handleSelectSubject
}: OptionsForAddToClassroomProps) => {
	return (
		<>
			<Select
				items={semesterItems}
				name='semester'
				label='Seleccione el semestre'
				onChange={(e) => handleSelectSemester(e.target.value)}
				value={semesterSelectValue}
			/>

			{
				subjectItems.length &&
				<Select
					items={subjectItems}
					label='Seleccione la materia'
					name='subject'
					onChange={e => handleSelectSubject(e.target.value)}
					value={subjectSelectValue}
				/>
			}
		</>
	);
};

const OptionsForAddToSemester = ({
	typeClassroomItems,
	classroomItems,
	typeClassroomSelectValue,
	classroomSelectValue,
	handleSelectClassroom,
	handleSelectTypeClassroom
}: OptionsForAddToSemesterProps) => {
	return (
		<>
			<Select
				items={typeClassroomItems}
				label='Selecione el tipo de salon'
				name='typeClassroom'
				onChange={e => handleSelectTypeClassroom(e.target.value)}
				value={typeClassroomSelectValue}
			/>

			{
				classroomItems.length &&
				<Select
					items={classroomItems}
					label='Seleccione el salon'
					name='classroom'
					onChange={e => handleSelectClassroom(e.target.value)}
					value={classroomSelectValue}
				/>
			}
		</>
	);
};

export default function AddSubjectObtions({ param, ...props }: AddSubjectObtionsProps) {
	const options: Record<ScheduleParam, React.JSX.Element> = {
		'classrooms': <OptionsForAddToClassroom {...props} />,
		'semesters': <OptionsForAddToSemester {...props} />
	};

	return (
		<div className='min-w-52 w-96'>
			{options[param]}
		</div>
	);
}