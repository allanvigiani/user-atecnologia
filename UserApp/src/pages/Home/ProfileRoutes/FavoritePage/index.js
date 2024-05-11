import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { Text } from "react-native-paper";

export default function FavoriteScreen({ navigation }) {


    return (
        <SafeAreaView style={{ flex: 1 }}>

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
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    inputContainer: {
        paddingHorizontal: 30,
    },
    button: {
        height: 70,
        backgroundColor: '#4f297a',
    },
});
