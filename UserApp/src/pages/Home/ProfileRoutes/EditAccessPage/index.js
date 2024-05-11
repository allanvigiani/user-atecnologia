import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Title } from "react-native-paper";
import { Icon } from '@mui/material';
import { Ionicons } from '@expo/vector-icons';

export default function AccessInfoScreen({ navigation }) {

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
                <ScrollView contentContainerStyle={styles.halfcontainerTop}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.MenuItemText}>Dados de acesso</Text>
                        <Text style={styles.MenuSubItemText}>Estes dados são sua forma de acesso ao AgendaAi! Seu e-mail não pode ser alterado,porque é a informação principal de acesso à sua conta</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.MenuItemText}>Email</Text>
                        <Text style={styles.MenuSubItemText}>thonycunha@gmail.com</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('EditDataScreen')}>
                        <View style={styles.inputContainerRow}>
                            <Text style={styles.MenuItemText}>Telefone</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.MenuSubItemTel}>Adicionar telefone</Text>
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
                                <Text style={styles.MenuSubItemText}>+55 (21) 9 6733-4174</Text>
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
    MenuSubItemTel: {
        color: 'red',
        marginLeft: 20,
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 26,
    },
    separator: {
        borderBottomColor: 'rgba(128,128,128,0.5)',
        borderBottomWidth: 1,
    },
});
