import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TextInput, Keyboard } from 'react-native';
import { CardSection, Input } from './common';
import { updatePerson, changeInputFocus } from '../actions/actions';

class Person extends Component {

	onChangeText(text, uuid, inputType) {
		this.props.updatePerson(text, uuid, inputType);
	}

	changeFocusHelper(nextIndex, nextInputType) {
		if (nextIndex > Object.keys(this.props.persons).length) {
			this.props.changeInputFocus(null, 'overall_subtotal');
		} else {
			this.props.changeInputFocus(nextIndex, nextInputType);
		}
	}

	render() {
		const { containerStyle, numStyle, nameStyle, subTotalContainerStyle, subTotalTextStyle, totalStyle } = styles;
		const { index, name, subtotal, total, uuid } = this.props.person;
		const { inputToFocus, inputFocus, changeInputFocus} = this.props;
		
		return (
				<View style={containerStyle}>
					<Text style={numStyle}>{index}</Text>
					<TextInput 
						placeholder={`Person ${index} (Optional)`}
						autoCorrect={false}
						ref={(inputToFocus == "name") ? inputFocus : null}
						style={nameStyle}
						value={name}
						onChangeText={(text) => this.onChangeText(text, uuid, "name")}
						onFocus={() => changeInputFocus(index, "name")}
						onSubmitEditing={() => this.changeFocusHelper(index, "subtotal")}
						blurOnSubmit={false}
					/>
					<View style={subTotalContainerStyle}>
						<Text>$</Text>
						<TextInput
							keyboardType='numeric'
							returnKeyType='done'
							placeholder="0.00"
							ref={(inputToFocus == "subtotal") ? inputFocus : null}
							value={subtotal}
							style={subTotalTextStyle}
							onChangeText={(text) => this.onChangeText(text, uuid, "subtotal")}
							onFocus={() => changeInputFocus(index, "subtotal")}
							onSubmitEditing={() => this.changeFocusHelper(index+1, "name")}
							blurOnSubmit={false}
						/>
					</View>
					<Text style={totalStyle}>${total}</Text>
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
		borderRadius: 10,
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 18
	},
	nameStyle: {
		color: '#000',
		flex: 6,
		borderColor: '#ddd',
		borderWidth: 1,
		borderRadius: 10,
		lineHeight:23,
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 18
	},
	subTotalContainerStyle: {
		color: '#000',
		borderColor: '#ddd',
		borderWidth: 1,
		marginLeft: 10,
		paddingLeft: 5,
		borderRadius: 10,
		alignItems: 'center',
		flexDirection: 'row',
		flex:2
	},
	subTotalTextStyle:{
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
		borderRadius: 10,
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


export default connect(mapStateToProps, { updatePerson, changeInputFocus })(Person);