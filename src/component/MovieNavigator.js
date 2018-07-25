import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { loadCategories } from '../redux/modules/categories';
import Navigation from 'react-native-deprecated-custom-components'
import StartScreen from '../component/StartScreen'
import MovieScreen from '../component/MovieScreen'
import SplashScreen from '../component/SplashScreen'
import { AsyncStorage } from "react-native"

class MovieNavigator extends Component {

  static propTypes = {
    movies: PropTypes.array,
  };

  constructor(props) {
    super(props)

    this.state = {
      isLoading: 'is loading ...',
      dataSource: [{ name: '', price: '' }],
      movieIndex: 0,
    };

    this.props.dispatch(loadCategories());

    this._incrementMovieIndex = this._incrementMovieIndex.bind(this)
  }

  componentDidMount() {
    this._retrieveData()
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.movies !== nextProps.movies) {
      this._storeData(nextProps)
      this.setState({
        isLoading: 'I am ready online ...',
        dataSource: nextProps.movies,
      })
    }
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

  _storeData = async (nextProps) => {
    try {
      const bookmarksString = JSON.stringify(nextProps.movies);
      await AsyncStorage.setItem('@MyStore:bookmarks', bookmarksString);
    } catch (error) {
      console.log(error)
    }
  }

  _retrieveData = async () => {
    try {
      const data = await AsyncStorage.getItem('@MyStore:bookmarks');
      if (data !== null) {
        const bookmarksArray = JSON.parse(data);
        this.setState({
          isLoading: 'data is offline mode ...',
          dataSource: bookmarksArray
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const movie = this.state.dataSource[this.state.movieIndex]
    return (
      <Navigation.Navigator
        initialRoute={{ name: 'SplashScreen' }}
        renderScene={(route, navigator) => {
          switch (route.name) {
            case 'SplashScreen':
              return <SplashScreen onStartHandler={() => navigator.push({ name: 'StartScreen' })} />
            case 'StartScreen':
              return <StartScreen loadingText={this.state.isLoading} onStartHandler={() => navigator.push({ name: 'MovieScreen' })} />
            case 'MovieScreen':
              return (
                <MovieScreen
                  qId={this.state.movieIndex}
                  title={movie.title}
                  releaseYear={movie.price}
                  onNextMoviePress={this._incrementMovieIndex}
                />)
          }
        }}
      />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies.all,
  };
}

export default connect(mapStateToProps)(MovieNavigator);
