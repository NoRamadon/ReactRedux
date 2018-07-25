import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    ImageBackground,
    Image,
    TextInput,
} from 'react-native'
import DefualtButton from './DefualtButton'
import AnimateLoadingButton from 'react-native-animate-loading-button'

const bgImage = require('../../assets/splash.jpg')
const logo = require('../../assets/zen.png')

class SplashScreen extends Component {

    _onPressHandler() {
        this.loadingButton.showLoading(true);
     
        // mock
        setTimeout(() => {
          this.loadingButton.showLoading(false);
        }, 2000);
      }

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
                    <DefualtButton text='Get Start' onPress={this.props.onStartHandler} />
                    <Text style={styles.SkipText}>Skip</Text>

                    <AnimateLoadingButton
                        ref={c => (this.loadingButton = c)}
                        width={300}
                        height={50}
                        title="Click me"
                        titleFontSize={16}
                        backgroundColor="rgba(66, 134, 244, 1)"
                        titleColor="rgb(225,225,225)"
                        borderRadius={30}
                        onPress={this._onPressHandler.bind(this)}
                    />
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
        margin: 30,
    }
})

export default SplashScreen
