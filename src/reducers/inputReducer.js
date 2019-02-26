import uuidv1 from 'uuid/v1';
import { UPDATE_PERSON, CHANGE_INPUT_FOCUS, CALCULATE, ADD_PERSON, DELETE_PERSON, UPDATE_SUB_TAX_TIP, RESET } from '../actions/types';

var initial_persons = {};

for (i = 1; i <= 4; i++) {
	initial_persons[uuidv1()] = {
		name: '',
		index: i,
		subtotal: '',
		total: '',
		error: false
	}
};

const INITIAL_STATE = {
	persons: initial_persons,
	focused: {},
	tax: '',
	percent_tip: '',
	total_tip: '',
	total_bill: ''
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
	const overall_subtotal = parseFloat(state.overall_subtotal);
	const tax = parseFloat(state.tax);
	const percent_tip = parseFloat(state.percent_tip)/100;

	console.log(overall_subtotal, tax, percent_tip);

	const updatedPersons = {};

	var current_total_bill = 0;

	const total_tip = ((overall_subtotal + tax) * percent_tip)
	var total_bill = (overall_subtotal + tax + total_tip);
	const stateCopy = {
		...state,
		persons: {...state.persons}
	};
	const percent_tax = tax / overall_subtotal;
	Object.keys(state.persons).forEach((personID) => {
		const person = {...stateCopy.persons[personID]};
		if (person.subtotal.length > 0) {
			const total = (parseFloat(person.subtotal) * (1+percent_tax) * (1+ percent_tip));
			current_total_bill+=total;
			person.total = total.toFixed(2);
			updatedPersons[personID] = person;
		}
	})

	var error;
	current_total_bill = parseFloat(current_total_bill.toFixed(2));
	total_bill = parseFloat(total_bill.toFixed(2));
	
	if (current_total_bill < total_bill) {
		error = `Warning: The total is $${total_bill} but you are requesting only $${current_total_bill} so you may be under-paying.`;
	}

	if (current_total_bill > total_bill) {
		error = `Warning: The total is $${total_bill} but you are requesting $${current_total_bill} so you may be over-paying.`;
	}

	if (current_total_bill == total_bill) {
		error = false;
	}
	
	return {
		...state,
		error,
		persons: updatedPersons,
		total_tip: total_tip.toFixed(2),
		total_bill: total_bill.toFixed(2)
	};
};

const addPerson = (state) => {
	const newIndex = Object.keys(state.persons).length + 1;
	const newPerson = {
		name: '',
		index: newIndex,
		subtotal: '',
		total:''
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