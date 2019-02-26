import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';

class Input extends Component {
	render() {
		const { prefix, label, value, onChangeText, placeholder, secureTextEntry, onFocus, inputToFocus, inputType, inputFocus, onSubmitEditing } = this.props;
		const { inputStyle, labelStyle, containerStyle, inputContainerStyle } = styles;

		return (
			<View style={containerStyle}>
				<Text style={labelStyle}>{label}</Text>
				<View style={inputContainerStyle}>
					<Text>{prefix}</Text>
					<TextInput
					keyboardType='numeric' 
					secureTextEntry={secureTextEntry}
					placeholder={placeholder}
					autoCorrect={false}
					style={inputStyle}
					value={value}
					onChangeText={onChangeText}
					onFocus={onFocus}
					ref={(inputToFocus == inputType ? inputFocus : null)}
					onSubmitEditing={onSubmitEditing}
					blurOnSubmit={false}
					/>
				</View>
			</View>
		);
	}
}

const styles = {
	inputContainerStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 10,
		paddingLeft:5,
		paddingRight: 5
	},
	inputStyle: {
		color: '#000',
		fontSize: 18
	},
	labelStyle: {
		fontSize: 18
	},
	containerStyle: {
		justifyContent: 'center',
		alignItems: 'center'
	}
};

export { Input };