import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ prefix, label, value, onChangeText, placeholder, secureTextEntry }) => {
	
	const { inputStyle, labelStyle, containerStyle } = styles;

	return (
		<View style={containerStyle}>
			<Text style={labelStyle}>{label}</Text>
			<View style={{flexDirection:'row', alignItems:'center'}}>
				<Text>{prefix}</Text>
				<TextInput
				keyboardType='numeric' 
				secureTextEntry={secureTextEntry}
				placeholder={placeholder}
				autoCorrect={false}
				style={inputStyle}
				value={value}
				onChangeText={onChangeText}
				/>
			</View>
		</View>
	);
};

const styles = {
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