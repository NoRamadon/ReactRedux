import React, { Component, PropTypes } from 'react'
import {
	View,
	Text,
	StyleSheet,
	Platform,
} from 'react-native'

class Movie extends Component {
	render() {
		return (
			<View style={styles.Container}>
				<Text style={styles.titleText}>"{this.props.title}"</Text>
				<Text style={styles.yearText}>- {this.props.releaseYear}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		justifyContent: 'center',
	},
	titleText: {
		fontFamily: (Platform.OS === 'ios') ? 
			'AvenirNext-Bold' :
			'Roboto-Bold',
		fontSize: 36,
		color: '#ffffff',
		marginVertical: 10,
		padding: 16,
	},
	yearText: {
		fontFamily: (Platform.OS === 'ios') ? 
			'AvenirNext-Italic' :
			'Roboto',
		fontSize: 20,
		color: '#F8F8F8',
		textAlign: 'right',
		fontStyle: 'italic',
		paddingRight: 8,
	},
})

export default Movie
