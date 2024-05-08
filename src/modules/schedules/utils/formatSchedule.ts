interface Args {
	start: string;
	end: string;
}

export interface FormattedSchedule {
	start: string;
	end: string;
	day: string;
}

export function formatSchedule(args: Args): FormattedSchedule {
	const daysObj: Record<number, string> = {
		0: 'lunes',
		1: 'martes',
		2: 'miercoles',
		3: 'jueves',
		4: 'viernes',
		5: 'sábado',
	};

	const startDate = new Date(args.start);
	const startHour = startDate.getHours();
	const startMinute = startDate.getMinutes();
	const formatStartHour = startHour.toString().padStart(2, '0');
	const formatStartMinute = startMinute.toString().padStart(2, '0');
	const endDate = new Date(args.end);
	const endHour = endDate.getHours();
	const endMinute = endDate.getMinutes();
	const formatEndHour = endHour.toString().padStart(2, '0');
	const formatEndMinute = endMinute.toString().padStart(2, '0');

	const start = `${formatStartHour}:${formatStartMinute}`;
	const end = `${formatEndHour}:${formatEndMinute}`;
	const day = startDate.getUTCDay();

	return {
		start,
		end,
		day: daysObj[day],
	};
}