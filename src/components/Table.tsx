import { TableProps } from './ui';

function Table<T>({
	data,
	cells,
	caption
}: TableProps<T>) {
	return (
		<div className="overflow-x-auto bg-white shadow rounded-lg">
			<table className="w-full divide-y divide-blue-200">
				{ caption && <caption className="px-6 py-3 text-xl bg-blue-500 text-white">{caption}</caption>}
				<thead className="bg-blue-900 text-white">
					<tr>
						{cells.map((cell, i) => (
							<th
								key={i}
								className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
							>
								{String(cell.column)}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="divide-y divide-blue-200">
					{data.map((row, i) => (
						<tr key={i} className="hover:bg-blue-50 transition-colors duration-300">
							{cells.map((cell, j) => (
								<td key={j} className="px-6 py-4 whitespace-nowrap">
									{cell.render(row)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Table;
