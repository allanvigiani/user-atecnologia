import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                <Text style={Styles.title}>Acesse sua conta!</Text>
                
                <TextInput
                    style={Styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={Styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <View style={Styles.register_container}>

                    <Text style={Styles.normal_text}>Não tem uma conta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={Styles.register_text}>Cadastre-se</Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity 
                    style={Styles.button}
                    onPress={() => {/* Função de login */}}
                >
                    <Text style={Styles.text_button}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4f297a',
    },
    container_logo: {
        flex: 1.5,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container_form: {
        flex: 1.5,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 12,
        color: '#FFF'
    },
    input: {
        width: '90%',
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 25,
        marginBottom: 15,
        paddingLeft: 20,
        fontSize: 16,
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
    },
    register_container: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        marginBottom: 25,
    },
    normal_text: {
        color: '#FFF',
        fontSize: 16,
    },
    register_text: {
        textDecorationLine: 'underline',
        color: '#FFF',
        fontSize: 16,
    },
});
