import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Input } from './common';
import { updateSubTaxTip } from '../actions/actions';


class BillInput extends Component {
	render() {
		return (
			<View style={styles.containerStyle}>
				<Input 
					label="Subtotal"
					placeholder="0.00"
					prefix="$"
					value={this.props.overall_subtotal}
					onChangeText={(text) => this.props.updateSubTaxTip('overall_subtotal', text)}
				/>
				<Input 
					label="Tax"
					placeholder="0.00"
					prefix="$"
					value={this.props.tax}
					onChangeText={(text) => this.props.updateSubTaxTip('tax', text)}
				/>
				<Input 
					label="Tip"
					placeholder="0"
					prefix="%"
					value={this.props.tip}
					onChangeText={(text) => this.props.updateSubTaxTip('tip', text)}
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
		tip: state.tip
	};
};

export default connect(mapStateToProps, { updateSubTaxTip })(BillInput);