import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Switch,
    Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function Example() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        console.log('NOTURNO CLICKOU:', darkMode);
    }, [darkMode]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <View style={styles.profile}>
                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                        }}>
                        {/* <View style={styles.profileAvatarWrapper}>
                            <Image
                                alt=""
                                source={{
                                    uri: '',
                                }}
                                style={styles.profileAvatar} />

                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}>
                                <View style={styles.profileAction}>
                                    <FeatherIcon
                                        color="#fff"
                                        name="edit-3"
                                        size={15} />
                                </View>
                            </TouchableOpacity>
                        </View> */}
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.profileName}>NOME</Text>
                        <Text style={styles.profileAddress}>
                            ALGO AQUI
                        </Text>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>CONFIGURAÇÃO</Text>

                        <TouchableOpacity
                            onPress={() => {
                                console.log('CLICKOU')
                            }}
                            style={styles.row}>
                            <View style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
                                <FeatherIcon color="#fff" name="globe" size={20} />
                            </View>

                            <Text style={styles.rowLabel}>TEST</Text>

                            <View style={styles.rowSpacer} />

                            <FeatherIcon
                                color="#C6C6C6"
                                name="chevron-right"
                                size={20} />
                        </TouchableOpacity>

                        <View style={styles.row}>
                            <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                                <FeatherIcon color="#fff" name="moon" size={20} />
                            </View>

                            <Text style={styles.rowLabel}>NOTURNO</Text>

                            <View style={styles.rowSpacer} />

                            <Switch
                                onValueChange={value => setDarkMode(value)}
                                value={darkMode}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    /** Profile */
    profile: {
        padding: 24,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileAvatarWrapper: {
        position: 'relative',
    },
    profileAvatar: {
        width: 72,
        height: 72,
        borderRadius: 9999,
    },
    profileAction: {
        position: 'absolute',
        right: -4,
        bottom: -10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: 9999,
        backgroundColor: '#007bff',
    },
    profileName: {
        marginTop: 20,
        fontSize: 19,
        fontWeight: '600',
        color: '#414d63',
        textAlign: 'center',
    },
    profileAddress: {
        marginTop: 5,
        fontSize: 16,
        color: '#989898',
        textAlign: 'center',
    },
    /** Section */
    section: {
        paddingHorizontal: 24,
    },
    sectionTitle: {
        paddingVertical: 12,
        fontSize: 12,
        fontWeight: '600',
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: 1.1,
    },
    /** Row */
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 50,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        marginBottom: 12,
        paddingLeft: 12,
        paddingRight: 12,
    },
    rowIcon: {
        width: 32,
        height: 32,
        borderRadius: 9999,
        marginRight: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowLabel: {
        fontSize: 17,
        fontWeight: '400',
        color: '#0c0c0c',
    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
});