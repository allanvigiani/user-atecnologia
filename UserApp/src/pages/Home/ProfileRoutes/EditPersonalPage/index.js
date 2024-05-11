import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, IconButton, Text } from "react-native-paper";
import axios from 'axios';
import { getToken } from "../../../../secure/GetToken";

export default function PersonalInfoScreen({ navigation }) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [address, setAddress] = useState('');
    const [complement, setComplement] = useState('');
    const [number, setNumber] = useState('');

    const handleCpfChange = (event) => {
        let cpfValue = event.replace(/\D/g, '');
        cpfValue = cpfValue.slice(0, 11);
        cpfValue = cpfValue.replace(/(\d{3})(\d)/, '$1.$2');
        cpfValue = cpfValue.replace(/(\d{3})(\d)/, '$1.$2');
        cpfValue = cpfValue.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        setCpf(cpfValue);
    };

    useEffect(() => {
        navigation.getParent().setOptions({
            tabBarStyle: { display: 'none' }
        });
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = await getToken();

        try {
            const { data: userData } = await axios.get(
                `https://user-api-one.vercel.app/user/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setId(userData.message.id)
            setName(userData.message.name)
            setAddress(userData.message.address)
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async () => {
        const onlyNumbersCpf = cpf.replace(/\D/g, '');
        const onlyNumbersNumber = number.replace(/\D/g, '');
        console.log('Nome:', name);
        console.log('CPF:', onlyNumbersCpf);
        console.log('Endereço:', address);
        console.log('Complemento:', complement);
        console.log('Número:', onlyNumbersNumber);

        const token = await getToken();

        try {

            formData = {
                id: id,
                name: name,
                cpf: onlyNumbersCpf,
                address: address,
                contact_phone: null,
                complement: complement,
            };

            const { data: updateUser } = await axios.put(
                `https://user-api-one.vercel.app/user/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(updateUser);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
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
                    <TextInput mode="outlined"
                        label="Complemento:"
                        value={complement}
                        onChangeText={setComplement}
                        style={styles.input}
                        right={complement !== '' && (
                            <TextInput.Icon icon="close" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }} onPress={() => setComplement('')} />
                        )}
                    />
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
});
