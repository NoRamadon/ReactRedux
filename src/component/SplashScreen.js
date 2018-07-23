import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import DefualtButton from './DefualtButton'

const bgImage = require('../../assets/splash.jpg')
const logo = require('../../assets/zen.png')

class SplashScreen extends Component {
    render() {
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer} >
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.loginText}>ADMIN LOGIN</Text>
                    <TextInput style={styles.TextInput}
                        underlineColorAndroid='transparent'
                        placeholder='Email' />
                    <TextInput style={styles.TextInput}
                        underlineColorAndroid='transparent'
                        placeholder='Password'
                        secureTextEntry={true} />
                    <DefualtButton text='Get Start' onPress={this.props.onStartHandler}/>
                    <Text style={styles.SkipText}>Skip</Text>
                </KeyboardAvoidingView>
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
        backgroundColor: 'rgba(66, 134, 244, 0.9)',
    },
    logo: {
        width: 150,
        height: 150,
    },
    loginText: {
        fontSize: 21,
        color: '#ffffff',
        fontWeight: 'bold',
        margin: 30,
    },
    TextInput: {
        alignSelf: 'stretch',
        textAlign: 'center',
        height: 46,
        borderRadius: 30,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    SkipText: {
        color: '#fff',
        textDecorationLine: 'underline',
        marginTop: 30,
    }
})

export default SplashScreen
