import { TableProps } from './types';

function Table<T>({
	data,
	tableData,
	caption
}: TableProps<T>) {
	return (
		<div className="overflow-x-auto">
			<table className="w-full divide-y divide-gray-200">
				{ caption && <caption className="text-xl">{caption}</caption>}
				<thead className="bg-gray-50">
					<tr>
						{tableData.map((cell, i) => (
							<th
								key={i}
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								{String(cell.column)}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{data.map((row, i) => (
						<tr key={i} className="hover:bg-gray-100">
							{tableData.map((cell, j) => (
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
