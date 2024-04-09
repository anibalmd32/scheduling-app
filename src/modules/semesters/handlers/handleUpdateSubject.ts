import { UpdateParams } from '../def';

const handleUpdate = ({
	handleOpenForm,
	row,
	setDefaultValues
}: UpdateParams) => {
	handleOpenForm();
	setDefaultValues(row);
};

export default handleUpdate;
