import { useContext } from 'react';
import { SemestersContext } from '../context/Provider';

const useSemesters = () => useContext(SemestersContext);

export default useSemesters;
