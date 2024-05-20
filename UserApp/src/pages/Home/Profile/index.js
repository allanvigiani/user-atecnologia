import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    RefreshControl,
    ScrollView,
    Modal,
    ActivityIndicator,
} from 'react-native';
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'; // Adicionei o axios, pois é usado no logOut
import { getUserName, getUserAddress, getUserEmail, getUserContactPhone } from '../../../secure/GetUserId';
import { getToken, deleteToken } from '../../../secure/GetToken';

export default function Profile({ navigation }) {
    const [username, setUsername] = useState('');
    const [shortName, setShortName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchUserData();
        setRefreshing(false);
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
            const user = await getUserName();
            const name = user.split(' ')[0];
            setShortName(name);
            setUsername(user);

            const address = await getUserAddress();
            setAddress(address);

            const email = await getUserEmail();
            setEmail(email);

            const contactPhone = await getUserContactPhone();
            setContactPhone(contactPhone);
            
            setTimeout(() => setLoading(false), 1000);
        } catch (error) {
            console.error(`Erro: ${error}`);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const navigateToScreen = (screenName) => () => {
        navigation.navigate(screenName);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <ScrollView
                    refreshControl={ // Corrigido aqui
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
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image source={{
                                uri: 'https://www.w3schools.com/w3images/avatar3.png'
                            }} size={80} />
                            <View style={{ marginLeft: 20 }}>
                                <Title style={[styles.title, {
                                    marginTop: 15,
                                    marginBottom: 5,
                                }]}>{username}</Title>
                                <Caption style={styles.caption}>@{shortName}</Caption>
                            </View>
                        </View>
                    </View>

                    <View style={styles.userInfoSection}>
                        <View style={styles.row}>
                            <Icon name='map-marker-radius' color='#4f297a' size={20} style={{ marginLeft: 10 }} />
                            <Text style={{ color: '#4f297a', marginLeft: 10 }}>{address}</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name='phone' color='#4f297a' size={20} style={{ marginLeft: 10 }} />
                            <Text style={{ color: '#4f297a', marginLeft: 10 }}>{contactPhone}</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name='email' color='#4f297a' size={20} style={{ marginLeft: 10 }} />
                            <Text style={{ color: '#4f297a', marginLeft: 10 }}>{email}</Text>
                        </View>
                    </View>

                    <TouchableRipple onPress={navigateToScreen('Screen1')}>
                        <View style={styles.infoBoxWrapper}>
                            <View style={[styles.infoBox, {
                                borderRightColor: '#dddddd',
                                borderRightWidth: 1,
                            }]}>
                                <Title>10</Title>
                                <Caption>Agendados</Caption>
                            </View>

                            <View style={styles.infoBox}>
                                <Title>5</Title>
                                <Caption>Confirmados</Caption>
                            </View>
                        </View>
                    </TouchableRipple>

                    <View style={styles.menuwrapper}>
                        <TouchableRipple onPress={navigateToScreen('FavoriteScreen')}>
                            <View style={styles.MenuItem}>
                                <Icon name='heart-outline' color='#4f297a' size={25} />
                                <View style={styles.iconContainer}>
                                    <Ionicons name="chevron-forward" size={24} color="#4f297a" />
                                </View>
                                <Text style={styles.MenuItemText}>Favoritos</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple onPress={navigateToScreen('ShareScreen')}>
                            <View style={styles.MenuItem}>
                                <Icon name='share-outline' color='#4f297a' size={25} />
                                <View style={styles.iconContainer}>
                                    <Ionicons name="chevron-forward" size={24} color="#4f297a" />
                                </View>
                                <Text style={styles.MenuItemText}>Compartilhar</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple onPress={navigateToScreen('SuportScreen')}>
                            <View style={styles.MenuItem}>
                                <Icon name='account-check-outline' color='#4f297a' size={25} />
                                <View style={styles.iconContainer}>
                                    <Ionicons name="chevron-forward" size={24} color="#4f297a" />
                                </View>
                                <Text style={styles.MenuItemText}>Suporte</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple onPress={navigateToScreen('EditProfile')}>
                            <View style={styles.MenuItem}>
                                <Icon name='shield-edit' color='#4f297a' size={25} />
                                <View style={styles.iconContainer}>
                                    <Ionicons name="chevron-forward" size={24} color="#4f297a" />
                                </View>
                                <Text style={styles.MenuItemText}>Editar Perfil</Text>
                            </View>
                        </TouchableRipple>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuwrapper: {
        marginTop: 10,
    },
    MenuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    MenuItemText: {
        color: '#4f297a',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
    iconContainer: {
        position: 'absolute',
        right: 20,
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