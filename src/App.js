import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { View, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
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
						<ScrollView 
						keyboardShouldPersistTaps="handled"
						style={{flexGrow:0}}
						ref={ref => this.scrollView = ref}
						onContentSizeChange={(contentWidth, contentHeight)=>{        
						    this.scrollView.scrollToEnd({animated: true});
						}}
						>
						<PersonList scrollToEnd={() => this.scrollView.scrollToEnd({animated: true})}/>
						<BillInput />
						<AllButtons />
						</ScrollView>
					</View>
			</Provider>
		);
	};
}

export default App;