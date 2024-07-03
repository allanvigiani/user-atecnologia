import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { View, StyleSheet, Dimensions, Image, SafeAreaView } from 'react-native';

export default function HomePage({ navigation }) {
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
            {/* <Image
                source={require('../../../../../assets/maintenance.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            /> */}
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
});
