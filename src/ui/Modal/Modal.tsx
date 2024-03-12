import { ModalProps } from './types';
import { FaTimes } from 'react-icons/fa';

function Modal({
	children,
	onClose,
	open,
}: ModalProps) {
	return (
		<div
			className={`
                fixed top-0 left-0 right-0 bottom-0 z-50 w-full h-full
                ${open ? 'flex' : 'hidden'}
                justify-center items-center bg-black bg-opacity-50
            `}
		>
			<div className="relative bg-white rounded-lg p-4">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
				>
					<FaTimes />
				</button>
				{children}
			</div>
		</div>
	);
}

export default Modal;
