import {
	UPDATE_PERSON,
	CHANGE_INPUT_FOCUS,
	CALCULATE,
	ADD_PERSON,
	DELETE_PERSON,
	UPDATE_SUB_TAX_TIP,
	RESET
} from './types';

export const updatePerson = (text, uuid, inputType) => {
	return {
		type: UPDATE_PERSON,
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

export const updateSubTaxTip = (type, value) => {
	return {
		type: UPDATE_SUB_TAX_TIP,
		payload: {type, value}
	}
}

export const reset = () => {
	return {
		type: RESET
	};
};