import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	ImageBackground,
	LayoutAnimation,
} from 'react-native'
import Movie from './Movie'
import NextMovieButton from './NextMovieButton'

const bgImage = require('../../assets/bg.png')
const spring = {
	duration: 500,
	create: {
		duration: 1000,
		delay: 300,
		type: LayoutAnimation.Types.easeIn,
		property: LayoutAnimation.Properties.opacity,
	},
	update: {
		type: LayoutAnimation.Types.easeInEaseOut,
		property: LayoutAnimation.Properties.opacity,
	},
	delete: {
		duration: 200,
		type: LayoutAnimation.Types.easeOut,
		property: LayoutAnimation.Properties.opacity,
	},
}

class MovieScreen extends Component {
	componentWillUpdate() {
		LayoutAnimation.configureNext(spring)
	}

	render() {
		return (
			<ImageBackground source={bgImage} style={styles.backgroundContainer}>
				<View style={styles.container}>
					<Movie
						key={this.props.qId}
						title={this.props.title}
						releaseYear={this.props.releaseYear}
					/>
					<NextMovieButton onPress={this.props.onNextMoviePress} />
				</View>
			</ImageBackground>
		)
	}
}

const styles = StyleSheet.create({
	backgroundContainer: {
		flex: 1,
		width: undefined,
		height: undefined,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default MovieScreen
