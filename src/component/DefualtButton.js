import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'

const DefualtButton = (props) => {
    return (
        <TouchableOpacity style={styles.Button} onPress={props.onPress}>
            <Text style={styles.Text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Button: {
        alignSelf: 'stretch',
        height: 46,
        borderRadius: 30,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    Text: {
        color: 'rgba(66, 134, 244, 1)',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

export default DefualtButton