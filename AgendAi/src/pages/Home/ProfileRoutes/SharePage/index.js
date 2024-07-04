import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { View, StyleSheet, Dimensions, Image, SafeAreaView } from 'react-native';
import { Text } from "react-native-paper";

const colors = {
    primary: '#6A1B9A',
    secondary: '#FFFFFF',
    accent: '#FFFFFF',
};

export default function ShareScreen({ navigation }) {
    useEffect(() => {
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.noAppointmentsContainer}>
                <Text style={styles.noAppointmentsText}>Em Breve</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    noAppointmentsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noAppointmentsText: {
        fontSize: 24,
        color: colors.primary,
    },
});
