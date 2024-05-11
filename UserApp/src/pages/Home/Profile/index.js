import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
} from 'react-native';
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';

export default function Profile({ navigation }) {

    const navigateToScreen = (screenName) => () => {
        navigation.navigate(screenName);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image source={{
                        uri: 'https://www.w3schools.com/w3images/avatar3.png'
                    }} size={80} />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>Thony Cunha</Title>
                        <Caption style={styles.caption}>@thonycunha</Caption>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name='map-marker-radius' color='#4f297a' size={20} style={{ marginLeft: 10 }} />
                    <Text style={{ color: '#4f297a', marginLeft: 10 }}>Rua Vereador Luiz Antônio da Cunha, Rio de Janeiro</Text>
                </View>
                <View style={styles.row}>
                    <Icon name='phone' color='#4f297a' size={20} style={{ marginLeft: 10 }} />
                    <Text style={{ color: '#4f297a', marginLeft: 10 }}>(21) 96733-4174</Text>
                </View>
                <View style={styles.row}>
                    <Icon name='email' color='#4f297a' size={20} style={{ marginLeft: 10 }} />
                    <Text style={{ color: '#4f297a', marginLeft: 10 }}>thonycunha@gmail.com</Text>
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
        </SafeAreaView >
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
});