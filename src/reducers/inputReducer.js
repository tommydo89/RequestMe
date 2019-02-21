import uuidv1 from 'uuid/v1';
import { UPDATE_INPUT, CHANGE_INPUT_FOCUS, CALCULATE, ADD_PERSON, DELETE_PERSON } from '../actions/types';

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
	focused: 1
};

const updateInput = (state, action) => {
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
	Object.keys(state.persons).forEach((personID) => {
		const person = {...stateCopy.persons[personID]};
		const total = (person.subtotal * 1.18 + (person.subtotal * 0.05)).toFixed(2);
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

export default (state = INITIAL_STATE, action) => {
	console.log(action);
	switch (action.type) {
		case UPDATE_INPUT:
			return updateInput(state, action);
		case CHANGE_INPUT_FOCUS:
			return changeInputFocus(state, action);
		case CALCULATE:
			return calculate(state);
		case ADD_PERSON:
			return addPerson(state);
		case DELETE_PERSON:
			return deletePerson(state);
		default:
			return state;
	}
};