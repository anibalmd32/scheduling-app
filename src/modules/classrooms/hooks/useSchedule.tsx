import { useState } from 'react';

function useSchedule() {
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

	const handleOpenModal = () => setIsOpenModal(!isOpenModal);


	return {
		isOpenModal,
		handleOpenModal,
	};
}

export default useSchedule;
