import React, { Component } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { Button, Input } from './common';
import ColumnLabels from './columnLabels';
import Person from './Person';
import { calculate, addPerson, deletePerson } from '../actions/actions';


class PersonList extends Component {

	componentDidUpdate() {
		if (this.props.focus) {
			this.inputFocus.focus();
		}
	}

	renderPersons() {
		return this.props.persons.map((person) => {
			return <Person key={person.uuid} person={person} inputFocus={input => this.inputFocus = input} />;
		});
	}

	onCalculate() {
		this.props.calculate();
	}

	onAdd() {
		this.props.addPerson();
	}

	onDelete() {
		this.props.deletePerson();
	}

	render() {
		console.log(this.props.persons);
		return(
			<View style={{flex:1}}>
				<ColumnLabels />
				<View style={{height: 600}}>
					<ScrollView 
						style={{flexGrow:0}}
						ref={ref => this.scrollView = ref}
						onContentSizeChange={(contentWidth, contentHeight)=>{        
						    this.scrollView.scrollToEnd({animated: true});
						}}
					>
						{this.renderPersons()}
					</ScrollView>
					<View style={styles.billInputContainerStyle}>
						<Input 
							label="Subtotal"
							placeholder="0.00"
							prefix="$"
						/>
						<Input 
							label="Tax"
							placeholder="0.00"
							prefix="$"
						/>
						<Input 
							label="Tip"
							placeholder="0"
							prefix="%"
						/>
					</View>
					<View style={styles.plusMinusContainerStyle}>
						<Button onPress={() => this.onAdd()}>+</Button>
						<Button onPress={() => this.onDelete()}>-</Button>
					</View>
					<Button onPress={() => this.onCalculate()}>Calculate</Button>
				</View>
			</View>
		);
	}
}

const styles = {
	plusMinusContainerStyle: {
		flexDirection: 'row',
		width: '50%',
		alignSelf: 'center'
	},
	billInputContainerStyle: {
		flexDirection: 'row',
		justifyContent:'space-around'
	}
};

const mapStateToProps = state => {
	const listPersons = {...state.persons};
	const focus = state.focused.index != null;
	console.log(focus);
	const persons = _.map(listPersons, (val, uuid) => {
		return {
			...val,
			uuid
		};
	});
	
	return {
		persons,
		focus
	};
};


export default connect(mapStateToProps, { calculate, addPerson, deletePerson })(PersonList);