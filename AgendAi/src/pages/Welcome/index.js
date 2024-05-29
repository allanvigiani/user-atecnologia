import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const navigation = useNavigation();

    return (
        <View style={Styles.container}>
            <View style={Styles.container_logo}>
                <Image
                    source={require('../../../assets/agendai_logo.png')}
                    style={{ width: '100%' }}
                    resizeMode='contain'
                ></Image>
            </View>

            <View style={Styles.container_form}>
                <Text style={Styles.title}>Todos os serviços que você precisa na palma da sua mão!</Text>
                
                <TouchableOpacity 
                    style={Styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={Styles.text_button}>Agende já!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4f297a'
    },
    container_logo: {
        flex: 2,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container_form: {
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 12,
        color: '#FFF'
    },
    button: {
        position: 'absolute',
        backgroundColor: '#FFF',
        borderRadius: 35,
        paddingVertical: 8,
        width: '60%',
        height: '15%',
        alignSelf: 'center',
        bottom: '25%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text_button: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4f297a',
    }
});