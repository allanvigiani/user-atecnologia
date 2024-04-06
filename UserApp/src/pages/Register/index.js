import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [contactPhone, setcontactPhone] = useState('');

    const navigation = useNavigation();

    return (
        <View style={Styles.container}>
            <View style={Styles.container_logo}>
                <Image
                    source={require('../../../assets/agendai_logo.png')}
                    style={{ width: '80%' }}
                    resizeMode='contain'
                />
            </View>

            <View style={Styles.container_form}>

                <View style={Styles.form_content}>

                <Text style={Styles.title}>Faça seu cadastro!</Text>

                    <TextInput
                        style={Styles.input}
                        placeholder="Nome"
                        placeholderTextColor="#FFF"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={Styles.input}
                        placeholder="E-mail"
                        placeholderTextColor="#FFF"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        style={Styles.input}
                        placeholder="Senha"
                        placeholderTextColor="#FFF"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TextInput
                        style={Styles.input}
                        placeholder="Endereço"
                        placeholderTextColor="#FFF"
                        value={address}
                        onChangeText={setAddress}
                    />

                    <TextInputMask
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
                        style={Styles.input}
                        placeholder="Celular"
                        placeholderTextColor="#FFF"
                        value={contactPhone}
                        onChangeText={setcontactPhone}
                    />

                    <TouchableOpacity 
                        style={Styles.button}
                        onPress={() => {/* Função de cadastro */}}
                    >
                        <Text style={Styles.text_button}>Cadastrar</Text>
                    </TouchableOpacity>

                    <View style={Styles.login_container}>

                        <Text style={Styles.normal_text}>Já possui uma conta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={Styles.login_text}>Faça o Login</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    container_logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    container_form: {
        flex: 2,
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 18,
        color: '#FFF',
    },
    form_content: {
        backgroundColor: '#4f297a',
        borderRadius: 20,
        width: '90%',
        alignItems: 'center',
        paddingVertical: 20,
    },
    input: {
        width: '85%',
        height: 50,
        backgroundColor: '#4f297a',
        marginBottom: 15,
        paddingLeft: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#FFF',
        color: '#FFF',
    },
    button: {
        backgroundColor: '#FFF',
        borderRadius: 35,
        paddingVertical: 8,
        width: '60%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    text_button: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4f297a',
    },
    login_container: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
    },
    normal_text: {
        color: '#FFF',
        fontSize: 16,
    },
    login_text: {
        textDecorationLine: 'underline',
        color: '#FFF',
        fontSize: 16,
    },
});
