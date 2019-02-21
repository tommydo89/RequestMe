import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({ children, visible, onAccept, onDecline }) => {

	const { containerStyle, textStyle, cardSectionStyle } = styles;

	return (
		<Modal
			visible={visible}
			transparent
			animationType="slide"
			onRequestClose={() => {}}
		>
			<View style={containerStyle}>
				<CardSection>
					<Text style={textStyle}>{children}</Text>
				</CardSection>
				<CardSection>
					<Button onPress={onAccept}>
						Yes
					</Button>
					<Button onPress={onDecline}>
						No
					</Button>
				</CardSection>
			</View>
		</Modal>
	);
};

const styles = {
	cardSectionStyle: {
		justifyContent: 'center' // centers the text since flexDirection = row
	},
	textStyle: {
		fontSize: 18,
		textAlign: 'center',
		lineHeight: 40,
		flex:1 // makes sure the text fills up as much as possible horizontally
	},
	containerStyle: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)', // makes the background black but with an opacity of 0.75
		position: 'relative',
		flex: 1,
		justifyContent: 'center'
	}
};

export { Confirm };