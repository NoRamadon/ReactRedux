import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  Alert,
  ListView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { loadCategories } from '../redux/modules/categories';
import Navigation from 'react-native-deprecated-custom-components'
import StartScreen from '../component/StartScreen'
import MovieScreen from '../component/MovieScreen'
import SplashScreen from '../component/SplashScreen'

class MovieNavigator extends Component {

  static propTypes = {
    movies: PropTypes.array,
  };

  constructor(props) {
    super(props)

    this.state = {
      isLoading: 'is loading ...',
      dataSource: this.props.movies,
      movieIndex: 1,
    };
    this.props.dispatch(loadCategories());

    this._incrementMovieIndex = this._incrementMovieIndex.bind(this)
  }

  _incrementMovieIndex() {
    let newIndex

    if (this.state.movieIndex + 1 === this.state.dataSource.length) {
      newIndex = 0
    } else {
      newIndex = this.state.movieIndex + 1
    }

    this.setState({
      movieIndex: newIndex,
    })
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.movies !== nextProps.movies) {
      this.setState({
        isLoading: 'I\'m ready to relax...',
        dataSource: nextProps.movies,
      });
    }
  }

  render() {
    if (this.props.isOnline === false) {
      Alert.alert('Offline', 'You don\'t have internet connection');
    }

    const movie = this.state.dataSource[this.state.movieIndex]

    return (

      <Navigation.Navigator
        initialRoute={{ name: 'SplashScreen' }}
        renderScene={(route, navigator) => {
          switch (route.name) {
            case 'SplashScreen':
              return <SplashScreen/>
            case 'StartScreen':
              return <StartScreen loadingText={this.state.isLoading} onStartHandler={() => navigator.push({ name: 'MovieScreen' })} />
            case 'MovieScreen':
              return (
                <MovieScreen
                  qId={this.state.movieIndex}
                  title={movie.title}
                  releaseYear={movie.releaseYear}
                  onNextMoviePress={this._incrementMovieIndex}
                />)
          }
        }}
      />
    );
  }
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#3498db',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
    ...Platform.select({
      ios: {
        paddingTop: 30,
      },
      android: {
        paddingTop: 10,
      },
    }),
  },
});

const mapStateToProps = (state) => {
  return {
    movies: state.movies.all,
  };
}

export default connect(mapStateToProps)(MovieNavigator);
