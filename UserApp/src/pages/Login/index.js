import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.container_logo}>
                <Image
                    source={require('../../../assets/agendai_logo.png')}
                    style={{ width: '100%' }}
                    resizeMode='contain'
                />
            </View>

            <View style={styles.container_form}>
                <Text style={styles.title}>Acesse sua conta!</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <View style={styles.input_area}>
                    <TextInput
                        style={styles.password_input}
                        placeholder="Senha"
                        placeholderTextColor="#999"
                        secureTextEntry={!passwordVisible}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity 
                        style={styles.icon}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                        <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={20} color="#999" />
                    </TouchableOpacity>
                </View>

                <View style={styles.register_container}>
                    <Text style={styles.normal_text}>Não tem uma conta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.register_text}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {/* Função de login */}}
                >
                    <Text style={styles.text_button}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        flex: 1,
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
    input_area: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 25
    },
    password_input: {
        paddingLeft: 20,
        width: '90%',
        marginBottom: 15,
        fontSize: 16,
    },
    icon: {
        paddingRight: 10,
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
    button: {
        backgroundColor: '#FFF',
        borderRadius: 35,
        paddingVertical: 8,
        width: '60%',
        height: '15%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
        text_button: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4f297a',
    },
});
