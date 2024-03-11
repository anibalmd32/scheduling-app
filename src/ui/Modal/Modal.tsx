import { ModalProps } from './types';

function Modal ({
	children,
	onClose,
	open,
}: ModalProps) {
	return (
		<div
			className={`
				bg-black bg-opacity-15 absolute top-0 left-0 right-0 bottom-0 z-50 w-full h-screen
				${open ? 'flex' : 'hidden'}
				flex justify-center items-center
			`}
			onClick={onClose}
		>
			{children}
		</div>
	);
}

export default Modal;