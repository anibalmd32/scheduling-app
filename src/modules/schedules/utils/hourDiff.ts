export function hourDiff(start: string, end: string): number {
	const startHour = new Date(`1970-01-01T${start}:00`);
	const endHour = new Date(`1970-01-01T${end}:00`);

	const diff = endHour.getTime() - startHour.getTime();
	const hours = diff / (1000 * 60 * 60); // Convertir a horas

	// Calcular los minutos restantes después de restar las horas enteras
	const minutes = (hours - Math.floor(hours)) * 60;
	
	// Sumar las horas enteras y los minutos convertidos a fracción de hora
	return Number(`${Math.floor(hours)}.${minutes}`);
}
