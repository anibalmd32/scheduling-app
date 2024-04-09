import SemestersProvider from './context/Provider';
import SemestersList from './components/SemestersList';

function Semesters() {
	return (
		<SemestersProvider>
			<section className='mt-8'>
				<h1 className='text-3xl text-blue-950 font-bold'>Semestres de Ing de Sistemas</h1>
				<SemestersList />
			</section>
		</SemestersProvider>
	);
}

export default Semesters;