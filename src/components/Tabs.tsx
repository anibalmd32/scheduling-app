import { TabProps } from './ui';
import useTab from '../hooks/useTab';

function Tabs({
	items
}: TabProps) {

	const { handleSelectTab, selectedTab } = useTab();
	return (
		<div className='flex flex-col items-start justify-between py-3 md:py-6'>
			<div className='flex gap-2 flex-wrap'>
				{items.map(item => (
					<button
						key={item.index}
						onClick={() => handleSelectTab(item.index)}
						className={`px-6 py-2 bg-blue-800 text-gray-100 uppercase hover:bg-blue-900 transition-colors duration-300 rounded-lg ${selectedTab === item.index ? 'bg-blue-950' : ''}`}
					>
						{item.label}
					</button>
				))}
			</div>

			<div className='mt-6 md:mt-0 w-full'>
				{
					items[selectedTab ?? 0].index === selectedTab &&
					items[selectedTab].view
				}
			</div>
		</div>
	);
}

export default Tabs;
