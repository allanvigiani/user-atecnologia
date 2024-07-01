import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import axios from 'axios';
import { getToken } from "../../../../secure/GetToken";
import { storeUserAdress, storeUserContactPhone, storeUserEmail, storeUserId, storeUserName } from "../../../../secure/StoreUserId";
import baseURL from "../../../../apis/User";

export default function PersonalInfoScreen({ navigation }) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [address, setAddress] = useState('');
    const [complement, setComplement] = useState('');
    const [number, setNumber] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const handleCpfChange = async (event) => {
        let cpfValue = event.replace(/\D/g, '');
        cpfValue = cpfValue.slice(0, 11);
        cpfValue = cpfValue.replace(/(\d{3})(\d)/, '$1.$2');
        cpfValue = cpfValue.replace(/(\d{3})(\d)/, '$1.$2');
        cpfValue = cpfValue.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        setCpf(cpfValue);
    };

    const handleNumberChange = async (event) => {
        let numberValue = event.replace(/\D/g, '');
        numberValue = numberValue.slice(0, 11);
        numberValue = numberValue.replace(/(\d{2})(\d)/, '($1) $2');
        numberValue = numberValue.replace(/(\d{5})(\d)/, '$1-$2');
        setNumber(numberValue);
    };

    const logOut = async () => {
        try {
            const token = await getToken();

            const { data } = await axios.post(
                baseURL + `/logout/`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.message.success) {
                await deleteToken()
                navigation.navigate('Login')
            }
        } catch (error) {
            console.error(`Erro: ${error}`);
        }
    };

    useEffect(() => {
        navigation.getParent().setOptions({
            tabBarStyle: { display: 'none' }
        });
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = await getToken();

        if (!token) logOut();

        setLoading(true);
        try {
            const { data: userData } = await axios.get(
                baseURL + `/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const user_id = userData.message.id;
            const user_name = userData.message.name;
            const user_address = userData.message.address;
            const user_email = userData.message.email;
            const user_contact_phone = userData.message.contact_phone;
            const user_cpf = userData.message.cpf;

            await storeUserId(user_id);
            await storeUserName(user_name);
            await storeUserAdress(user_address);
            await storeUserEmail(user_email);
            await storeUserContactPhone(user_contact_phone);

            await handleCpfChange(user_cpf)
            await handleNumberChange(user_contact_phone)
            setId(user_id)
            setName(user_name)
            setAddress(user_address)
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        const onlyNumbersCpf = cpf.replace(/\D/g, '');
        const onlyNumbersNumber = number.replace(/\D/g, '');

        const token = await getToken();

        setLoading(true);
        try {
            formData = {
                id: id,
                name: name,
                cpf: onlyNumbersCpf,
                address: address,
                contact_phone: onlyNumbersNumber,
                complement: complement,
            };

            const { data: updateUser } = await axios.put(
                baseURL + `/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await fetchData();
            setMessage(updateUser.message);
            setSnackbarVisible(true);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={styles.container}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {loading && (
                    <Modal transparent={true} animationType="none">
                        <View style={styles.loading_circle}>
                            <ActivityIndicator size="large" color="#4f297a" />
                        </View>
                    </Modal>
                )}
                <View style={styles.inputContainer}>
                    <TextInput mode="outlined"
                        label="Nome:"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                        right={name !== '' && (
                            <TextInput.Icon icon="close" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }} onPress={() => setName('')} />
                        )}
                    />
                    <TextInput mode="outlined"
                        label="CPF:"
                        placeholder="XXX.XXX.XXX-XX"
                        value={cpf}
                        onChangeText={(text) => handleCpfChange(text)}
                        type="cpf"
                        keyboardType="numeric"
                        style={styles.input}
                        right={cpf !== '' && (
                            <TextInput.Icon icon="close" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }} onPress={() => setCpf('')} />
                        )}
                    />
                    <TextInput mode="outlined"
                        label="Endereço:"
                        value={address}
                        onChangeText={setAddress}
                        style={styles.input}
                        right={address !== '' && (
                            <TextInput.Icon icon="close" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }} onPress={() => setAddress('')} />
                        )}
                    />
                    {/* <TextInput mode="outlined"
                        label="Complemento:"
                        value={complement}
                        onChangeText={setComplement}
                        style={styles.input}
                        right={complement !== '' && (
                            <TextInput.Icon icon="close" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }} onPress={() => setComplement('')} />
                        )}
                    /> */}
                    <TextInput mode="outlined"
                        label="Número:"
                        value={number}
                        onChangeText={setNumber}
                        keyboardType="numeric"
                        style={styles.input}
                        right={number !== '' && (
                            <TextInput.Icon icon="close" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }} onPress={() => setNumber('')} />
                        )}
                    />
                </View>
                <TouchableOpacity onPress={handleSave}>
                    <View style={styles.buttonContainer}>
                        <Button mode="contained" style={styles.button}>
                            <Text style={styles.largeButtonText}>Salvar</Text>
                        </Button>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
                style={styles.snackbar}
            >
                <Text style={styles.snackbarText}>{message}</Text>
            </Snackbar>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    buttonContainer: {
        position: 'relative',
        bottom: 0,
        width: '100%',
    },
    inputContainer: {
        paddingHorizontal: 30,
    },
    input: {
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#4f297a',
        borderRadius: 0,
        height: 80,
        justifyContent: 'center',
    },
    largeButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    loading_circle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    snackbar: {
        flex: 1,
        backgroundColor: '#4f297a',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'

    },
    snackbarText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
});
