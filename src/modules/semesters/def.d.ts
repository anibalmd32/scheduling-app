import { TabItem } from '../../components/ui';
import HTTPService from '../../../http.service';

// * DATA
export interface SubjectData {
	_id: string;
	name: string;
	theoryHours: number;
	practiceHours: number;
	laboratoryHours: number;
}

export interface SectionData {
	_id: string;
	subjects: SubjectData[];
	code: string;
}

export interface SemesterData {
	_id: string;
	number: number;
	isActive: boolean;
	sections: SectionData[]
}

// * CONTEXT
export interface SemestersCtx {
	semesters: SemesterData[];
	isLoading: boolean;
	semestersTabItems: TabItem[];
	loadData: () => Promise<void>;
	sectionId: string;
	setSectionId: React.Dispatch<React.SetStateAction<string>>;
}

// * COMPONENTS
export interface SectionViewProps {
	sections: SectionData[];
}

export interface SubjectFormProps {
	defaultValues: SubjectData;
	openForm: boolean;
	onSubmit: (data: T, sectionId?: string) => void;
	onCloseModal: () => void;
}

// * ACTIONS
export type UpdateFunction = <T>(row: T) => void
export type DeleteFunction = <T>(row: T) => void

export interface RowActions<T> {
	updateRow: UpdateFunction<T>;
	deleteRow: DeleteFunction<T>;
}

// * HANDLERS
export interface DeleteParams {
	subjectId: string;
	service: HTTPService;
	handleLoading: () => void;
	handleSuccess: () => void;
	handleError: () => void;
	loadData: () => Promise<void>;
}

export interface UpdateParams {
	row: SubjectData;
	handleOpenForm: () => void;
	setDefaultValues: (value: React.SetStateAction<SubjectData>) => void;
}

export interface SubmitParams {
	handleLoading: () => void;
	handleSuccess: () => void;
	handleError: () => void;
	service: HTTPService;
	data: SubjectData;
	loadData: () => Promise<void>;
	sectionId: string;
	handleOpenForm: () => void;
	handleResetForm: () => void
}
