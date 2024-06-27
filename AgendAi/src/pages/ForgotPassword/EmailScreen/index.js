import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Modal, ActivityIndicator, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import baseUrl from '../../../apis/User';
import { useNavigation } from '@react-navigation/native';

export default function EmailScreen() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const handleEmailSubmit = async () => {
        try {
            setLoading(true);

            const form = { email: email };
            const response = await axios.post(baseUrl + '/send-email-password', form);

            if (response.status !== 200) {
                Alert.alert('Erro', response.data.message);
                setLoading(false);
                return;
            }

            setTimeout(() => {
                navigation.navigate('CodeVerificationScreen', { email: email });
                setLoading(false);
            }, 3000);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                Alert.alert('Erro', error.response.message ? error.response.message.toString() : 'Erro no servidor');
            } else {
                Alert.alert('Erro', 'Erro no servidor');
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
