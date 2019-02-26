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
				<View>
					<Text style={styles.tipStyle}>Total Tip: ${this.props.total_tip}</Text>
					<Text style={styles.billStyle}>Total Bill: ${this.props.total_bill}</Text>
				</View>
			)
		}
	}

	render() {

		const { plusMinusStyle } = styles;

		return (
			<View>	
				<View style={plusMinusStyle}>
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
	plusMinusStyle: {
		flexDirection: 'row',
		marginLeft:50,
		marginRight:50,
		alignSelf: 'center',
		marginTop: 10
	},
	errorStyle: {
		fontSize: 14,
		color: 'red',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	tipStyle: {
		fontSize:22,
		color: 'black',
		marginLeft:50,
		marginRight:50,
		alignSelf: 'center',
		fontWeight:'bold',
		marginTop:10
	},
	billStyle: {
		fontSize:22,
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