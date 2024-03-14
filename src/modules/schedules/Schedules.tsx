import Table from '../../ui/Table/Table';
import { RenderCell } from '../../ui/Table/types';

interface Data {
	name: string;
	lastName: string;
	email: string;
	age: number;
}

const users: Data[] = [
	{
		age: 26,
		email: 'anibal@gmail.com',
		lastName: 'mendoza',
		name: 'anibal'
	},
	{
		age: 16,
		email: 'ezequiel@gmail.com',
		lastName: 'mendoza',
		name: 'ezequiel'
	}
];

const cells: RenderCell<Data>[] = [
	{
		column: 'nombre',
		render(cell) {
			return (
				<>
					{cell.name}
				</>
			);
		},
	},
	{
		column: 'apellido',
		render(cell) {
			return(
				<>
					{cell.lastName}
				</>
			);
		},
	},
	{
		column: 'correo',
		render(cell) {
			return(
				<>
					{cell.email}
				</>
			);
		},
	},
	{
		column: 'edad',
		render(cell) {
			return(
				<>
					{cell.age}
				</>
			);
		},
	}
]; 

function Schedules() {
	return (
		<div>
			<h1>Horarios de clase</h1>
			<Table
				data={users}
				cells={cells}
			/>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem cumque nobis veniam sapiente nulla quibusdam. Voluptas laborum quae suscipit voluptatem dolores est optio quasi magnam. Reprehenderit obcaecati ullam inventore perspiciatis!
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure illum minus et at rerum accusantium minima magnam? Ratione nemo consectetur unde iste vero incidunt molestiae quis, a voluptate debitis dolor.
			</p>
		</div>
	);
}

export default Schedules;