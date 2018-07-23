import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  Alert,
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

const Realm = require('realm');

class MovieNavigator extends Component {

  static propTypes = {
    movies: PropTypes.array,
  };

  constructor(props) {
    super(props)

    this.state = {
      realm: null,
      isLoading: 'is loading ...',
      dataSource: [{ name: '', price: '' }],
      movieIndex: 1,
    };
    this.props.dispatch(loadCategories());

    this._incrementMovieIndex = this._incrementMovieIndex.bind(this)
  }

  componentDidMount() {
    Realm.open({
      schema: [{ name: 'Book', properties: { name: 'string', price: 'string' } }]
    }).then(realm => {
      this.setState({
        realm: realm,
        dataSource: realm.objects('Book'),
        isLoading: `Offline Mode ... ${realm.objects('Book').length}`,
      })
    });
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

  _deleteBook() {
    const realm = this.state.realm
    realm.write(() => {
      let allBooks = realm.objects('Book');
      realm.delete(allBooks)
    });
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.movies !== nextProps.movies) {
      if (this.state.realm != null) {
        this._deleteBook()
      }
      nextProps.movies.map(
        movie => {
          this.state.realm.write(() => {
            this.state.realm.create('Book', { name: `${movie.title}`, price: `${movie.price}` });
          });
        }
      )
      this.setState({
        isLoading: `Online Mode ... ${this.state.dataSource.length}`,
        dataSource: this.state.realm.objects('Book'),
      });
    }

    console.log(this.state.dataSource)
  }

  render() {
    if (this.props.isOnline === false) {
      Alert.alert('Offline', 'You don\'t have internet connection');
    }

    const movie = this.state.dataSource[this.state.movieIndex]
    console.log(this.state.dataSource)

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
                  title={movie.name}
                  releaseYear={movie.price}
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
