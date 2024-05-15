import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { getUserName } from '../../../secure/GetUserId';
import Carousel from 'react-native-reanimated-carousel';
import { Avatar, Card, IconButton, SegmentedButtons } from 'react-native-paper';
import axios from 'axios';
import { getToken } from "../../../secure/GetToken";

export default function HomePage() {
    const [username, setUsername] = useState('');
    const width = Dimensions.get('window').width;
    const [selectedServiceType, setSelectedServiceType] = useState(null);
    const [services, setServices] = useState([]);
    const [servicesTypes, setServicesTypes] = useState([]);

    const fetchServicesByType = async (type) => {
        const token = await getToken();

        try {
            const { data: servicesByType } = await axios.get(
                `https://company-services-api.vercel.app/services-types/${type}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setServices(servicesByType.message.result);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        async function fetchUsername() {
            const user = await getUserName();
            const name = user.split(' ')[0]
            setUsername(name);
        };

        async function getServicesTypes() {
            const token = await getToken();

            try {
                const { data: servicesTypes } = await axios.get(
                    `https://company-services-api.vercel.app/types/all-types`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const formattedServicesTypes = servicesTypes.message.result.map(serviceType => ({
                    value: serviceType.id,
                    label: serviceType.type,
                }));

                setServicesTypes(formattedServicesTypes);
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchServices() {
            const token = await getToken();

            try {
                const { data: servicesByType } = await axios.get(
                    `https://company-services-api.vercel.app/services-types/0`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setServices(servicesByType.message.result);
            } catch (error) {
                console.error(error);
            }
        }

        fetchUsername();
        fetchServices();
        getServicesTypes();
    }, []);

    const handleServiceTypeChange = async (selectedType) => {
        if (selectedType === selectedServiceType) {
            setSelectedServiceType(null);
            await fetchServicesByType(0);
        } else {
            setSelectedServiceType(selectedType);
            await fetchServicesByType(selectedType);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.topView}>
                    <Text style={styles.welcomeText}>
                        Bem-vindo, {username}!
                    </Text>
                    <Text style={styles.incentiveText}>
                        Aqui você pode visualizar seus agendamentos e informações de perfil.
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Carousel
                        loop
                        width={width}
                        height={width / 2}
                        autoPlay={true}
                        data={[...new Array(6).keys()]}
                        scrollAnimationDuration={6000}
                        renderItem={({ index }) => (
                            <View
                                style={{
                                    flex: 1,
                                    borderWidth: 1,
                                    justifyContent: 'center',
                                }}
                            >
                                <Text style={{ textAlign: 'center', fontSize: 30 }}>
                                    {index}
                                </Text>
                            </View>
                        )}
                    />
                </View>
                <View style={styles.topView}>
                    <Text style={styles.incentiveText}>
                        Selecione um tipo de serviço:
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginTop: 10 }}
                        contentContainerStyle={styles.scrollViewContent}
                    >
                        <SegmentedButtons
                            value={selectedServiceType}
                            onValueChange={handleServiceTypeChange}
                            buttons={servicesTypes}
                            style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}
                        />
                    </ScrollView>
                </View>
                {services.map(service => (
                    <Card key={service.id}>
                        <Card.Title
                            title={service.name}
                            // subtitle={service.subtitle}
                            left={(props) => <Avatar.Icon {...props} icon="folder" />}
                            right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { }} />}
                        />
                    </Card>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topView: {
        padding: 20,
        alignItems: 'left',
    },
    welcomeText: {
        fontSize: 28,
        color: '#4f297a',
    },
    username: {
        fontSize: 20,
        color: 'black',
    },
    incentiveText: {
        fontSize: 18,
        textAlign: 'left',
        color: 'gray',
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    segmentedButtons: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
