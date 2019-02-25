import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text} from 'react-native';
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

	renderResult() {
		console.log(this.props.error);
		if (this.props.error) {
			return <Text style={styles.errorStyle}>{this.props.error}</Text>;
		} else {
			return (
				<Text style={styles.successStyle}>Total Tip: ${this.props.total_tip} Total Bill: ${this.props.total_bill}</Text>
			)
		}
	}

	render() {

		const { containerStyle } = styles;

		return (
			<View>	
				<View style={containerStyle}>
					<Button onPress={() => this.onAdd()}>+</Button>
					<Button onPress={() => this.onDelete()}>-</Button>
				</View>
				<Button onPress={() => this.onReset()}>Reset</Button>
				<Button onPress={() => this.onCalculate()}>Calculate</Button>
				{this.renderResult()}
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
	},
	errorStyle: {
		fontSize: 18,
		color: 'red',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	successStyle: {
		fontSize:18,
		color: 'black',
		marginLeft:50,
		marginRight:50,
		alignSelf: 'center',
		fontWeight:'bold'
	}
};

const mapStateToProps = state => {
	return {
		error: state.error,
		total_tip: state.total_tip,
		total_bill: state.total_bill
	};
};

export default connect(mapStateToProps, { calculate, addPerson, deletePerson, reset })(AllButtons);