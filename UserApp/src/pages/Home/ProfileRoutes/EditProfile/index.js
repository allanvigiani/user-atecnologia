import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
export default function EditProfileScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.menuwrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('PersonalInfo')}>
                    <View style={styles.MenuItem}>
                        <Text style={styles.MenuItemText}>Informações pessoais</Text>
                        <View style={styles.iconContainer}>
                            <Ionicons name="chevron-forward" size={24} color="#4f297a" />
                        </View>
                        <Text style={styles.MenuSubItemText}>Nome completo, CPF e Endereço</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AccessInfo')}>
                    <View style={styles.MenuItem}>
                        <Text style={styles.MenuItemText}>Informações de acesso</Text>
                        <View style={styles.iconContainer}>
                            <Ionicons name="chevron-forward" size={24} color="#4f297a" />
                        </View>
                        <Text style={styles.MenuSubItemText}>Dados de contato e acesso a sua conta</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menuwrapper: {
        marginTop: 10,
    },
    MenuItem: {
        flexDirection: 'column',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    MenuSubItemText: {
        color: 'rgba(79, 41, 122, 0.5)',
        marginLeft: 20,
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 22,
    },
    MenuItemText: {
        color: '#4f297a',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 26,
    },
    iconContainer: {
        position: 'absolute',
        right: 20,
    },
});
