import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Keyboard } from 'react-native';
import { Input } from './common';
import { updateSubTaxTip, changeInputFocus } from '../actions/actions';


class BillInput extends Component {

	componentDidUpdate() {
		if (this.inputFocus) {
			this.inputFocus.focus();
		}
	}

	changeFocusHelper(nextIndex, nextInputType) {
		if (nextInputType === null) {
			Keyboard.dismiss();
		} else {
			this.props.changeInputFocus(nextIndex, nextInputType);
		}
	}

	render() {
		return (
			<View style={styles.containerStyle}>
				<Input 
					label="Subtotal"
					inputType="overall_subtotal"
					placeholder="0.00"
					prefix="$"
					value={this.props.overall_subtotal}
					onChangeText={(text) => this.props.updateSubTaxTip('overall_subtotal', text)}
					onFocus={() => this.props.changeInputFocus(null, 'overall_subtotal')}
					inputFocus={input => this.inputFocus = input}
					inputToFocus={this.props.inputToFocus}
					onSubmitEditing={() => this.changeFocusHelper(null, "tax")}
				/>
				<Input 
					label="Tax"
					inputType="tax"
					placeholder="0.00"
					prefix="$"
					value={this.props.tax}
					onChangeText={(text) => this.props.updateSubTaxTip('tax', text)}
					onFocus={() => this.props.changeInputFocus(null, 'tax')}
					inputFocus={input => this.inputFocus = input}
					inputToFocus={this.props.inputToFocus}
					onSubmitEditing={() => this.changeFocusHelper(null, "tip")}
				/>
				<Input 
					label="Tip"
					inputType="tip"
					placeholder="0"
					prefix="%"
					value={this.props.percent_tip}
					onChangeText={(text) => this.props.updateSubTaxTip('percent_tip', text)}
					onFocus={() => this.props.changeInputFocus(null, 'tip')}
					inputFocus={input => this.inputFocus = input}
					inputToFocus={this.props.inputToFocus}
					onSubmitEditing={() => this.changeFocusHelper(null, null)}
				/>
			</View>
		)
	}
}


const styles = {
	containerStyle: {
		flexDirection: 'row',
		justifyContent:'space-around'
	}
};

const mapStateToProps = state => {
	return {
		overall_subtotal: state.overall_subtotal,
		tax: state.tax,
		percent_tip: state.percent_tip,
		inputToFocus: state.focused.inputType
	};
};

export default connect(mapStateToProps, { updateSubTaxTip, changeInputFocus })(BillInput);