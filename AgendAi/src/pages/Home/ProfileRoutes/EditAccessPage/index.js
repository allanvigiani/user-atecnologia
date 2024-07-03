import React, { useEffect, useState, useCallback } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    RefreshControl,
    ScrollView,
    Modal,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { getToken, deleteToken } from '../../../../secure/GetToken';
import baseURL from "../../../../apis/User";
import { storeUserContactPhone } from '../../../../secure/StoreUserId';
import { useFocusEffect } from '@react-navigation/native';

export default function AccessInfoScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchUserData();
        setRefreshing(false);
    };

    const handleNumberChange = async (event) => {
        let numberValue = event.replace(/\D/g, '');
        numberValue = numberValue.slice(0, 11);
        numberValue = numberValue.replace(/(\d{2})(\d)/, '($1) $2');
        numberValue = numberValue.replace(/(\d{5})(\d)/, '$1-$2');
        setPhoneNumber(numberValue);
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
                await deleteToken();
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error(`Erro: ${error}`);
        }
    };

    const fetchUserData = async () => {
        try {
            const token = await getToken();

            if (!token) {
                logOut();
                return;
            }

            setLoading(true);
            const { data: userData } = await axios.get(
                baseURL + `/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setEmail(userData.message.email);
            setPhoneNumber(userData.message.contact_phone);
            await handleNumberChange(userData.message.contact_phone);
            await storeUserContactPhone(userData.message.contact_phone);
            setTimeout(() => setLoading(false), 1000);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUserData();
        }, [])
    );

    const handleSave = () => {
    };

    const handleContainerPress = () => {
        handleSave();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={handleContainerPress}
                activeOpacity={1}
            >
                <ScrollView
                    contentContainerStyle={styles.halfcontainerTop}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {loading && (
                        <Modal transparent={true} animationType="none">
                            <View style={styles.loading_circle}>
                                <ActivityIndicator size="large" color="#4f297a" />
                            </View>
                        </Modal>
                    )}
                    <View style={styles.inputContainer}>
                        <Text style={styles.MenuItemText}>Dados de acesso</Text>
                        <Text style={styles.MenuSubItemText}>Estes dados são sua forma de acesso ao AgendaAi! Seu e-mail não pode ser alterado, porque é a informação principal de acesso à sua conta</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.MenuItemText}>Email</Text>
                        <Text style={styles.MenuSubItemText}>{email}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('EditDataScreen')}>
                        <View style={styles.inputContainerRow}>
                            <Text style={styles.MenuItemText}>Telefone</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={phoneNumber ? styles.MenuSubItemTelPurple : styles.MenuSubItemTelRed}>
                                    {phoneNumber ? 'Número já cadastrado' : 'Adicionar telefone'}
                                </Text>
                                <Ionicons name="chevron-forward" size={24} color="#4f297a" style={{ backgroundColor: '#f2f2f2', borderRadius: 50 }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.separator}></View>
                    <View style={[styles.inputContainer, { marginTop: 40 }]}>
                        <Text style={styles.MenuItemText}>Dados de contato</Text>
                        <Text style={styles.MenuSubItemText}>Estes dados servem para acompanhar seus pedidos e promoções</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('EditDataScreen')}>
                        <View style={styles.inputContainerRow}>
                            <Text style={styles.MenuItemText}>Telefone</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.MenuSubItemText}>{phoneNumber ? `+55 ${phoneNumber}` : 'Adicionar telefone'}</Text>
                                <Ionicons name="chevron-forward" size={24} color="#4f297a" style={{ backgroundColor: '#f2f2f2', padding: 5, borderRadius: 50 }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    halfcontainerTop: {
        flexGrow: 1,
        padding: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputContainerRow: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    MenuItemText: {
        color: '#4f297a',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 26,
    },
    MenuSubItemText: {
        color: 'rgba(79, 41, 122, 0.5)',
        marginLeft: 20,
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 22,
    },
    MenuSubItemTelRed: {
        color: 'red',
        marginLeft: 20,
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 26,
    },
    MenuSubItemTelPurple: {
        color: '#4f297a',
        marginLeft: 20,
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 26,
    },
    separator: {
        borderBottomColor: 'rgba(128,128,128,0.5)',
        borderBottomWidth: 1,
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
});
