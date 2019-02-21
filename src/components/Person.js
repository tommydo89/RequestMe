import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TextInput, Keyboard } from 'react-native';
import { CardSection, Input } from './common';
import { updateInput, changeInputFocus } from '../actions/actions';

class Person extends Component {

	onChangeText(text, uuid, inputType) {
		this.props.updateInput(text, uuid, inputType);
	}

	changeFocusHelper(nextIndex, nextInputType) {
		if (nextIndex > Object.keys(this.props.persons).length) {
			Keyboard.dismiss();
		} else {
			this.props.changeInputFocus(nextIndex, nextInputType);
		}
	}

	render() {
		console.log(this.props);
		const { containerStyle, numStyle, nameStyle, subTotalStyle, totalStyle } = styles;
		const { index, name, subtotal, total, uuid } = this.props.person;
		const { inputToFocus, inputFocus, changeInputFocus} = this.props;
		
		return (
				<View style={containerStyle}>
					<Text style={numStyle}>{index}</Text>
					<TextInput 
						placeholder={`Person ${index} (Optional)`}
						ref={(inputToFocus == "name") ? inputFocus : null}
						style={nameStyle}
						value={name}
						onChangeText={(text) => this.onChangeText(text, uuid, "name")}
						onFocus={() => changeInputFocus(index, "name")}
						onSubmitEditing={() => this.changeFocusHelper(index, "subtotal")}
					/>
					<TextInput
						placeholder="$0.00"
						ref={(inputToFocus == "subtotal") ? inputFocus : null}
						style={subTotalStyle}
						value={subtotal}
						onChangeText={(text) => this.onChangeText(text, uuid, "subtotal")}
						onFocus={() => changeInputFocus(index, "subtotal")}
						onSubmitEditing={() => this.changeFocusHelper(index+1, "name")}
					/>
					<Text style={totalStyle}>{total}</Text>
				</View>
		);
	}
}

const styles = {
	containerStyle:{
		flexDirection: 'row',
		marginBottom: 10,
		flex:1
	},
	numStyle: {
		flex: 1,
		borderColor: '#ddd',
		borderWidth: 1,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 2,
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 18
	},
	nameStyle: {
		color: '#000',
		flex: 6,
		borderColor: '#ddd',
		borderWidth: 1,
		borderRadius: 2,
		lineHeight:23,
		height: 40,
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 18
	},
	subTotalStyle: {
		color: '#000',
		flex: 2,
		borderColor: '#ddd',
		borderWidth: 1,
		marginLeft: 10,
		borderRadius: 2,
		lineHeight:23,
		height: 40,
		width:100,
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 18
	},
	totalStyle: {
		flex: 2,	
		borderColor: '#ddd',
		borderWidth: 1,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 2,
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 18
	}
}

const mapStateToProps = (state, ownProps) => {
	const { index, inputType} = state.focused;
	var inputToFocus = null;
	if (index === ownProps.person.index) {
		inputToFocus = inputType;
	}

	return {
		persons: state.persons,
		inputToFocus
	};
};


export default connect(mapStateToProps, { updateInput, changeInputFocus })(Person);