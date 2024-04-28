import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { getUserName } from '../../../secure/GetUserId';

export default function HomePage() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        async function fetchUsername() {
            const user = await getUserName();
            const name = user.split(' ')[0]
            setUsername(name);
        };
        fetchUsername();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>
                Bem-vindo,
            </Text>
            <Text style={styles.username}>{username}.</Text>
            <Text style={styles.incentiveText}>
                Não perca tempo e conheça e agende o serviço que você precisa!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    welcomeText: {
        fontSize: 48,
        color: '#4f297a',
    },
    username: {
        fontSize: 28,
        color: 'black',
    },
    incentiveText: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
        color: 'gray',
    },
});
