const semesterEndpoints = {
	updateSubject: (id: string) => `/subjects/update/${id}`,
	createSubject: (sectionId: string) => `/subjects/create?section=${sectionId}`,
	deleteSubject: (subjectId: string) => `/subjects/delete/${subjectId}`
}; 

export default semesterEndpoints;