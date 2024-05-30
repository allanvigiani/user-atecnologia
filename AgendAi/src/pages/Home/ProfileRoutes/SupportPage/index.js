import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Image, SafeAreaView } from 'react-native';

export default function SupportScreen({ navigation }) {
    useEffect(() => {
        navigation.getParent().setOptions({
            tabBarStyle: { display: 'none' }
        });
    }, []);

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
