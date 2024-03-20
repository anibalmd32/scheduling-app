import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const exportToPDF = async () => {
	const calendarElement = document.getElementById('myCalendar')!;
	const canvas = await html2canvas(calendarElement);
	const imgData = canvas.toDataURL('image/png');
	
	const pdf = new jsPDF();
	const imgProps = pdf.getImageProperties(imgData);
	const pdfWidth = pdf.internal.pageSize.getWidth();
	const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
	pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
	pdf.save('calendar.pdf');
};

export default exportToPDF;
