import { ProfessorsContextProvider } from './context/ProfessorsContext';
import ProfessorsTable from './components/ProfessorsTable';
import ProfessorsAdd from './components/ProfessorsAdd';
import ProfessorForm from './components/ProfessorForm';

export default function Professors() {
	return (
		<ProfessorsContextProvider>
			<section className="mt-8">
				<h1 className='text-3xl text-blue-950 font-bold'>Profesores</h1>

				<div className='w-full mt-4'>
					<ProfessorsAdd />

					<div className='mt-4'>
						<ProfessorsTable />
					</div>
				</div>

				<ProfessorForm />
			</section>
		</ProfessorsContextProvider>
	);
}
