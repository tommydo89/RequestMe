import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { View } from 'react-native';
import { Header } from './components/common';
import PersonList from './components/PersonList';
import inputReducer from './reducers/inputReducer';
import BillInput from './components/BillInput';
import AllButtons from './components/AllButtons';

class App extends Component {
	render() {
		const store = createStore(inputReducer);

		return (
			<Provider store={store}>
				<View style={{flex:1}}>
					<Header headerText="RequestMe" />
					<PersonList />
					<BillInput />
					<AllButtons />
				</View>
			</Provider>
		);
	};
}

export default App;