const API_URL = import.meta.env.NODE_ENV === 'prod' ? '/api' : 'http://localhost:8080/api';

export {
	API_URL,
};