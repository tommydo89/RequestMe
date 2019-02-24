import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View } from 'react-native';
import { Button } from './common';
import { calculate, addPerson, deletePerson, reset } from '../actions/actions';


class AllButtons extends Component {

	onCalculate() {
		this.props.calculate();
	}

	onAdd() {
		this.props.addPerson();
	}

	onDelete() {
		this.props.deletePerson();
	}

	onReset() {
		this.props.reset();
	}

	render() {
		return (
			<View>	
				<View style={styles.containerStyle}>
					<Button onPress={() => this.onAdd()}>+</Button>
					<Button onPress={() => this.onDelete()}>-</Button>
				</View>
				<Button onPress={() => this.onReset()}>Reset</Button>
				<Button onPress={() => this.onCalculate()}>Calculate</Button>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		flexDirection: 'row',
		marginLeft:50,
		marginRight:50,
		alignSelf: 'center'
	}
};

export default connect(null, { calculate, addPerson, deletePerson, reset })(AllButtons);