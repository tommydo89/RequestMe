import {
	UPDATE_INPUT,
	CHANGE_INPUT_FOCUS,
	CALCULATE,
	ADD_PERSON,
	DELETE_PERSON
} from './types';

export const updateInput = (text, uuid, inputType) => {
	return {
		type: UPDATE_INPUT,
		payload: {text, uuid, inputType}
	};
};

export const changeInputFocus = (index, inputType) => {
	return {
		type: CHANGE_INPUT_FOCUS,
		payload: {index, inputType}
	};
};

export const calculate = () => {
	return {
		type: CALCULATE
	};
};

export const addPerson = () => {
	return {
		type:ADD_PERSON
	};
};

export const deletePerson = () => {
	return {
		type: DELETE_PERSON
	};
};