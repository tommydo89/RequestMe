import React, { Component } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';
import { View, Text, ScrollView, TextInput, Keyboard } from 'react-native';
import { Button, Input } from './common';
import ColumnLabels from './columnLabels';
import Person from './Person';
import { calculate, addPerson, deletePerson, updateSubTaxTip, reset } from '../actions/actions';


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

	render() {
		return(
			<View style={{flex:1}}>
				<ColumnLabels />
				<View style={{flex:1}}>
					<ScrollView 
						keyboardShouldPersistTaps="never"
						style={{flexGrow:0}}
						ref={ref => this.scrollView = ref}
						onContentSizeChange={(contentWidth, contentHeight)=>{        
						    this.scrollView.scrollToEnd({animated: true});
						}}
					>
						{this.renderPersons()}
					</ScrollView>
				</View>
			</View>
		);
	}
}

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


export default connect(mapStateToProps)(PersonList);