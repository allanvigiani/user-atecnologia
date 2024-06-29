import React, { useState, useEffect } from "react";

import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, IconButton, Text } from "react-native-paper";
import axios from 'axios';
import { TextInputMask } from "react-native-masked-text";
import { getToken } from "../../../../secure/GetToken";
import IMask from 'imask';

export default function SchedulesConfirmedScreen({ navigation }) {  
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.container}>
                        <Text>Agendamentos confirmados</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

