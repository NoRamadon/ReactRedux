import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native'
const Realm = require('realm');

export default class TestRealm extends Component {
    constructor(props) {
        super(props);
        this.state = { realm: null, dogs: null };
    }

    componentDidMount() {
        Realm.open({
            schema: [{ name: 'Dog', properties: { name: 'string', type: 'string' } }]
        }).then(realm => {
            realm.write(() => {
                realm.create('Dog', { name: 'Rex', type: 'small' });
            });

            let dogs = realm.objects('Dog')
            this.setState({
                realm: realm,
                dogs: dogs
            })

        });
    }

    _renderDogList() {
        return this.state.realm.objects('Dog').map(dog => {
            return (
                <Text>
                    {`name: ${dog.name} type: ${dog.type}`}
                </Text>
            )
        })
    }

    _renderLoading() {
        return (
            <Text>
                Loading ...
                </Text>
        )
    }

    render() {
        const info = this.state.realm
            ? 'Number of dogs in this Realm: ' + this.state.realm.objects('Dog').name
            : 'Loading...';

        return (
            <View style={styles.container}>
                {this.state.realm ? this._renderDogList() : this._renderLoading()}
            </View>
        );
    }
}

const styles = ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

})