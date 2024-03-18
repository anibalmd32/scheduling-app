import React, { useEffect } from 'react';
import useStyleSatate from '../hooks/useStyleState';
import colorConfig from '../utilities/colorConfig';
import {
	AiOutlineLoading3Quarters,
	AiOutlineCheckCircle,
	AiOutlineCloseCircle,
	AiOutlineExclamationCircle,
	AiFillInfoCircle
} from 'react-icons/ai';
import { ToastProps, ComponentVariant } from './ui';

function Toast({
	message,
	variant,
	duraction,
	isLoader
}: ToastProps) {

	const icons: Record<ComponentVariant, React.ReactNode> = {
		error: <AiOutlineCloseCircle />,
		info: isLoader ? <AiOutlineLoading3Quarters className='animate-spin' /> : <AiFillInfoCircle />,
		success: <AiOutlineCheckCircle />,
		warning: <AiOutlineExclamationCircle />
	};

	const {
		handleHover,
		handleVisibility,
		isVisible,
	} = useStyleSatate();

	useEffect(() => {
		if (duraction && variant !== 'info') {
			setTimeout(() => {
				handleVisibility();
			}, duraction);
		}
	}, [duraction]);

	return (
		<div
			className={`
				${isVisible ? 'flex' : 'hidden'}
				items-center p-2 rounded-md shadow-md text-gray-100 px-4
				absolute bottom-2 right-2 z-50 text-xl justify-between 
				min-w-[300px] min-h-[64px]
			`}
			style={{
				backgroundColor: colorConfig[variant].hover
			}}
			onMouseEnter={handleHover}
			onMouseLeave={handleHover}
			onClick={handleVisibility}
		>
			<div className='flex gap-4 justify-start items-center'>
				<span>
					{icons[variant]}
				</span>
				<span>
					{message}
				</span>
			</div>
		</div>
	);
}

export default Toast;
