import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, Text } from "react-native-paper";
import axios from 'axios';
import IMask from 'imask';
import { getToken } from "../../../../secure/GetToken";
import { getUserContactPhone } from '../../../../secure/GetUserId';
import { storeUserContactPhone } from '../../../../secure/StoreUserId';
import { useFocusEffect } from '@react-navigation/native';

export default function EditDataScreen({ navigation }) {
    const [cellNumber, setCellNumber] = useState('');

    const applyMask = (event) => {
        const numberValue = event.replace(/\D/g, '');
        const maskedValue = IMask.createMask({
            mask: '(00) 0 0000-0000',
            autofix: true,
            lazy: false,
        });
        maskedValue.resolve(numberValue);
        setCellNumber(maskedValue.value);
    };

    const handleNumberChange = async (event) => {
        let numberValue = event.replace(/\D/g, '');
        numberValue = numberValue.slice(0, 11);
        numberValue = numberValue.replace(/(\d{2})(\d)/, '($1) $2');
        numberValue = numberValue.replace(/(\d{5})(\d)/, '$1-$2');
        setCellNumber(numberValue);
    };

    useEffect(() => {
        async function fetchData() {
            const userContactPhone = await getUserContactPhone();
            handleNumberChange(userContactPhone);
        }

        fetchData();
    }, []);

    useFocusEffect(
        useCallback(() => {
            navigation.getParent().setOptions({
                tabBarStyle: { display: 'none' }
            });

            return () => {
                navigation.getParent().setOptions({
                    tabBarStyle: {
                        position: 'absolute',
                        backgroundColor: '#4f297a',
                        borderTopWidth: 0,
                        elevation: 0,
                        borderTopLeftRadius: 2,
                        borderTopRightRadius: 2,
                        height: 70
                    },
                });
            };
        }, [navigation])
    );

    const handleSave = async () => {
        const unmaskedNumber = cellNumber.replace(/\D/g, '');

        const token = await getToken();

        try {
            const formData = {
                contact_phone: unmaskedNumber,
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

            if (updateUser) {
                await storeUserContactPhone(unmaskedNumber);
                Alert.alert('Sucesso', 'Número de celular atualizado com sucesso!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.MenuItemText}>Qual o número do seu celular?</Text>
                    <View style={styles.textFieldContainer}>
                        <TextInput
                            mode="outlined"
                            label="Número de Celular"
                            placeholder="(00) 9 0000-0000"
                            value={cellNumber}
                            onChangeText={(text) => applyMask((text))}
                            keyboardType="phone-pad"
                            left={<TextInput.Affix text="+55" />}
                            right={cellNumber !== '' && (
                                <TextInput.Icon icon="close" style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }} onPress={() => setCellNumber('')} />
                            )}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleSave}
                        style={styles.buttonContainer}
                    >
                        <Button mode="contained" onPress={handleSave} style={styles.button}>Salvar</Button>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    MenuItemText: {
        color: '#4f297a',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 26,
    },
    textFieldContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    buttonContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    inputContainer: {
        paddingHorizontal: 30,
    },
    button: {
        backgroundColor: '#4f297a',
    },
});
