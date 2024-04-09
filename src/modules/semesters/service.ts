// import HTTPService from '../../http.service';
// import type { SemesterData } from './def';

// class SemesterService {
// 	private httpService: HTTPService;
// 	private baseUrl: string;

// 	constructor() {
// 		this.httpService = new HTTPService();
// 		this.baseUrl = '/semesters';
// 	}

// 	/**
// 	 * get_all
// 	 */
// 	public async get_all() {
// 		const { data: allSemesters } = await this.httpService.httpCaller<SemesterData>({
// 			endpoint: `${this.baseUrl}/all`,
// 			method: 'get'
// 		});

// 		return allSemesters;
// 	}
// }

// export default SemesterService;
