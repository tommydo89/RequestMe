import uuidv1 from 'uuid/v1';
import { UPDATE_PERSON, CHANGE_INPUT_FOCUS, CALCULATE, ADD_PERSON, DELETE_PERSON, UPDATE_SUB_TAX_TIP, RESET } from '../actions/types';

var initial_persons = {};

for (i = 1; i <= 5; i++) {
	initial_persons[uuidv1()] = {
		name: '',
		index: i,
		subtotal: '',
		total: '-'
	}
};

const INITIAL_STATE = {
	persons: initial_persons,
	focused: 1,
	overall_subtotal: '',
	tax: '',
	tip: ''
};

const updatePerson = (state, action) => {
	const { text, uuid, inputType} = action.payload;
	const stateCopy = {
		...state,
		persons: {
			...state.persons,
			[uuid]: {
				...state.persons[uuid],
				[inputType]: text
			}
		}
	}
	return stateCopy;
};

const changeInputFocus = (state, action) => {
	return {
		...state,
		focused: action.payload
	};
};

const calculate = (state) => {
	const updatedPersons = {};
	const stateCopy = {
		...state,
		persons: {...state.persons}
	};
	const percent_tax = state.tax / state.overall_subtotal;
	Object.keys(state.persons).forEach((personID) => {
		const person = {...stateCopy.persons[personID]};
		const total = (person.subtotal * (1+percent_tax) * (1+ (state.tip/100))).toFixed(2);
		person.total = total;
		updatedPersons[personID] = person;
	})
	return {
		...state,
		persons: updatedPersons
	};
};

const addPerson = (state) => {
	const newIndex = Object.keys(state.persons).length + 1;
	const newPerson = {
		name: '',
		index: newIndex,
		subtotal: '',
		total:'-'
	};
	const stateCopy = {
		...state,
		persons: {
			...state.persons,
			[uuidv1()]: newPerson
		},
		focused: {}
	};
	return stateCopy;
};

const deletePerson = (state) => {
	const deleteIndex = Object.keys(state.persons).length;
	const stateCopy = {
		...state,
		persons: {...state.persons},
		focused: {}
	};
	Object.keys(stateCopy.persons).forEach((personID) => {
		if (stateCopy.persons[personID].index === deleteIndex) {
			delete stateCopy.persons[personID];
		}
	});
	return stateCopy;
};

const updateSubTaxTip = (state, action) => {
	return {
		...state,
		focused: {},
		[action.payload.type]: action.payload.value
	};
};

const reset = (state) => {
	return INITIAL_STATE;
};

export default (state = INITIAL_STATE, action) => {
	console.log(action);
	switch (action.type) {
		case UPDATE_PERSON:
			return updatePerson(state, action);
		case CHANGE_INPUT_FOCUS:
			return changeInputFocus(state, action);
		case CALCULATE:
			return calculate(state);
		case ADD_PERSON:
			return addPerson(state);
		case DELETE_PERSON:
			return deletePerson(state);
		case UPDATE_SUB_TAX_TIP:
			return updateSubTaxTip(state, action);
		case RESET:
			return reset(state);
		default:
			return state;
	}
};