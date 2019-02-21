import React from 'react';
import { View, Text } from 'react-native'

const columnLabels = () => {
	
	const { containerStyle, numStyle, nameStyle, subTotalStyle, totalStyle} = styles;

	return (
		<View style={containerStyle}>
			<Text style={numStyle}>#</Text>
			<Text style={nameStyle}>Name</Text>
			<Text style={subTotalStyle}>Sub-Total</Text>
			<Text style={totalStyle}>Total</Text>
		</View>
	);
};

const styles = {
	containerStyle: {
		flexDirection: 'row',
		marginTop: 20,
		marginBottom: 20
	},
	numStyle: {
		flex: 1,
		textAlign: 'center',
		fontWeight: 'bold',
		borderColor: '#ddd',
		borderWidth: 1,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 2
	},
	nameStyle: {
		flex: 6,
		textAlign: 'center',
		fontWeight: 'bold',
		borderColor: '#ddd',
		borderWidth: 1,
		borderRadius: 2
	},
	subTotalStyle: {
		flex: 2,
		textAlign: 'center',
		fontWeight: 'bold',
		borderColor: '#ddd',
		borderWidth: 1,
		marginLeft: 10,
		borderRadius: 2
	},
	totalStyle: {
		flex: 2,
		textAlign: 'center',
		fontWeight: 'bold',
		borderColor: '#ddd',
		borderWidth: 1,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 2
	}
};

export default columnLabels;