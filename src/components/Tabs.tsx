import { TabProps } from './ui';
import useTab from '../hooks/useTab';

function Tabs({
	items
}: TabProps) {

	const { handleSelectTab, selectedTab } = useTab();

	return (
		<div className='flex flex-col items-start justify-between py-3 md:py-6'>
			<div className='flex gap-4'>
				{items.map(item => (
					<button
						key={item.id}
						onClick={() => handleSelectTab(item.id)}
						className={`px-6 py-2 bg-blue-800 text-gray-100 uppercase hover:bg-blue-900 transition-colors duration-300 rounded-lg ${selectedTab === item.id ? 'bg-blue-950' : ''}`}
					>
						{item.label}
					</button>
				))}
			</div>

			<div className='mt-6 md:mt-0 w-full'>
				{
					selectedTab &&
					items[selectedTab - 1].id === selectedTab &&
					items[selectedTab - 1].view
				}
			</div>
		</div>
	);
}

export default Tabs;
