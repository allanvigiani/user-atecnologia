import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Modal, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import baseUrl from '../../../apis/UserAuth';
import { useNavigation } from '@react-navigation/native';

export default function EmailScreen() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const handleEmailSubmit = async () => {
        try {
            setLoading(true);
            // const response = await axios.post(baseUrl + '/forgot-password', {
            //     email: email,
            // });

            // setMessage(response.data.message);
            setLoading(false);

            setTimeout(() => {
                setMessage('');
                navigation.navigate('CodeVerificationScreen');
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
                <Text style={styles.title}>Recuperar Senha</Text>

                <TextInput
                    label="E-mail"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    style={styles.input}
                    theme={{ colors: { primary: '#4f297a', text: '#000000' } }}
                />

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
                    onPress={handleEmailSubmit}
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
    input: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 15,
        paddingLeft: 20,
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
