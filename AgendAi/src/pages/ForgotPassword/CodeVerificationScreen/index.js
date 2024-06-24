import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Modal, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import baseUrl from '../../../apis/User';
import { useNavigation } from '@react-navigation/native';

export default function CodeVerificationScreen() {
    const [code, setCode] = useState(['', '', '', '']);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const handleCodeChange = (text, index) => {
        let newCode = [...code];
        newCode[index] = text;
        setCode(newCode);
    };

    const handleVerifyCode = async () => {
        const verificationCode = code.join('');
        if (verificationCode.length !== 4) {
            setMessage('Por favor, insira um código de 4 dígitos.');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(baseUrl + '/verify-code', {
                code: verificationCode,
            });

            setMessage(response.data.message);
            setLoading(false);

            setTimeout(() => {
                setMessage('');
                navigation.navigate('NewPasswordScreen');
            }, 3000);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage(error.message);
            }
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Verificação de Código</Text>

                <View style={styles.codeContainer}>
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            value={digit}
                            onChangeText={(text) => handleCodeChange(text, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            style={styles.codeInput}
                            theme={{ colors: { primary: '#4f297a', text: '#000000' } }}
                        />
                    ))}
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
                    onPress={handleVerifyCode}
                    contentStyle={styles.buttonContent}
                    style={styles.button}
                    labelStyle={styles.text_button}
                >
                    Verificar
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
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    codeInput: {
        width: 50,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 24,
        marginHorizontal: 5,
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
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 20,
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
