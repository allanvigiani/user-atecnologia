import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Modal, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import baseUrl from '../../../apis/User';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NewPasswordScreen() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const route = useRoute();
    const { email, code } = route.params;

    const navigation = useNavigation();

    const handleResetPassword = async () => {
        if (password.length < 6) {
            setPasswordError('A senha precisa ter pelo menos 6 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        try {
            setLoading(true);

            const form = {
                email: email,
                code: code,
                password: password,
            };

            const response = await axios.post(baseUrl + '/reset-password', form);

            setLoading(false);
            Alert.alert('Sucesso', response.data.message.success, [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Login'),
                },
            ]);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                Alert.alert('Erro', error.response.data.message);
            } else {
                Alert.alert('Erro', error.message);
            }
        }
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        if (text.length < 6) {
            setPasswordError('A senha precisa ter pelo menos 6 caracteres.');
        } else {
            setPasswordError('');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Nova Senha</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        label="Nova Senha"
                        placeholder="Digite sua nova senha"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={handlePasswordChange}
                        style={styles.input}
                        theme={{ colors: { primary: '#4f297a', text: '#000000' } }}
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="#000" />
                    </TouchableOpacity>
                </View>
                {passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}

                <View style={styles.inputContainer}>
                    <TextInput
                        label="Confirmar Senha"
                        placeholder="Confirme sua nova senha"
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        style={styles.input}
                        theme={{ colors: { primary: '#4f297a', text: '#000000' } }}
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                {loading && (
                    <Modal transparent={true} animationType="none" visible={loading}>
                        <View style={styles.modalBackground}>
                            <ActivityIndicator size="large" color="#4f297a" />
                        </View>
                    </Modal>
                )}

                <Button
                    mode="contained"
                    onPress={handleResetPassword}
                    contentStyle={styles.buttonContent}
                    style={styles.button}
                    labelStyle={styles.text_button}
                >
                    Enviar
                </Button>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFF'
    },
    inputContainer: {
        position: 'relative',
        width: '100%',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingLeft: 20,
        fontSize: 16,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 25,
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
    errorMessage: {
        color: 'red',
        fontSize: 12,
        textAlign: 'left',
        width: '100%',
        marginBottom: 10,
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
