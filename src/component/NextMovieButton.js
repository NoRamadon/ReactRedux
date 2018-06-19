import React, { Component, PropTypes } from 'react'
import {
	TouchableOpacity,
	Text,
	StyleSheet,
} from 'react-native'

class NextMovieButton extends Component {
	render() {
		return (
			<TouchableOpacity style={styles.button} onPress={this.props.onPress}>
				<Text style={styles.buttonText}>Next Movie</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	button: {
		borderWidth: 2,
		borderColor: '#ffffff',
		padding: 10,
		marginBottom: 20,
	},
	buttonText: {
		color: '#ffffff',
		fontSize: 18,
	},
})

export default NextMovieButton
