import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Modal, SafeAreaView } from 'react-native';
import baseUrl from '../../apis/UserAuth';
import { storeToken } from '../../secure/StoreToken';
import { getToken } from '../../secure/GetToken';
import { storeUserAdress, storeUserContactPhone, storeUserEmail, storeUserId, storeUserName } from '../../secure/StoreUserId';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const loginUser = async () => {
        try {
            const response = await axios.post(baseUrl + '/login', {
                email: email,
                password: password,
            });

            setLoading(true);

            const token = response.data.message.token;
            await storeToken(token);

            setTimeout(async () => {
                await verifyUserLogged();
                setLoading(false);
            }, 2000);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage(error.message);
            }
        }
    };

    const verifyUserLogged = async () => {
        try {
            const token = await getToken();

            if (!token) return setMessage('');

            const response = await axios.get(baseUrl + '/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const user_id = response.data.message.id;
            const user_name = response.data.message.name;
            const user_address = response.data.message.address;
            const user_email = response.data.message.email;
            const user_contact_phone = response.data.message.contact_phone;

            await storeUserId(user_id);
            await storeUserName(user_name);
            await storeUserAdress(user_address);
            await storeUserEmail(user_email);
            await storeUserContactPhone(user_contact_phone);

            setLoading(true);

            if (token) {
                setTimeout(() => {
                    navigation.navigate('Home');
                    setLoading(false);
                }, 2000);
            }
        } catch (error) {
            setLoading(false);
            setMessage('');
        }
    };

    useEffect(() => {
        verifyUserLogged();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
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
                        label="E-mail"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        style={styles.input}
                        theme={{ colors: { primary: '#4f297a', text: '#000000' } }}
                    />

                    <TextInput
                        label="Senha"
                        placeholder="Digite sua senha"
                        secureTextEntry={!passwordVisible}
                        value={password}
                        onChangeText={setPassword}
                        keyboardType="default"
                        right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible(!passwordVisible)} />}
                        style={styles.input}
                        theme={{ colors: { primary: '#4f297a', text: '#000000' } }}
                    />

                    <View style={styles.register_container}>
                        <Text style={styles.normal_text}>Não tem uma conta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.register_text}>Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.password_container}>
                        <Text style={styles.normal_text}>Esqueceu a senha? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={styles.register_text}>Recuperar</Text>
                        </TouchableOpacity>
                    </View>

                    {message !== '' && <Text style={styles.message}>{message}</Text>}

                    {loading && (
                        <Modal transparent={true} animationType="none">
                            <View style={styles.modalBackground}>
                                <ActivityIndicator size="large" color="#4f297a" />
                            </View>
                        </Modal>
                    )}

                    <Button
                        mode="contained"
                        onPress={loginUser}
                        contentStyle={styles.buttonContent}
                        style={styles.button}
                        labelStyle={styles.text_button}
                    >
                        Entrar
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#4f297a',
    },
    container: {
        flex: 1,
        backgroundColor: '#4f297a',
    },
    container_logo: {
        flex: 1,
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
        marginTop: 20,
        marginBottom: 12,
        color: '#FFF'
    },
    input: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 15,
        paddingLeft: 20,
        fontSize: 16,
    },
    register_container: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
    },
    password_container: {
        flexDirection: 'row',
        marginTop: 10,
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
        width: '50%',
        alignSelf: 'center',
        marginTop: 10,
    },
    buttonContent: {
        height: 50,
    },
    text_button: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4f297a',
    },
    message: {
        fontSize: 10,
        color: '#FFF'
    },
    modalBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
