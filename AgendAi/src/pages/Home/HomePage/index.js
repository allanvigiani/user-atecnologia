import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { getUserName } from '../../../secure/GetUserId';
import Carousel from 'react-native-reanimated-carousel';
import { Avatar, Card, IconButton, SegmentedButtons, Menu, Provider } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { getToken } from "../../../secure/GetToken";
import baseURL from "../../../apis/CompanyServices";

export default function HomePage() {
    const [username, setUsername] = useState('');
    const width = Dimensions.get('window').width;
    const [selectedServiceType, setSelectedServiceType] = useState(null);
    const [services, setServices] = useState([]);
    const [servicesTypes, setServicesTypes] = useState([]);
    const [visibleMenu, setVisibleMenu] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const navigation = useNavigation();

    const fetchServicesByType = async (type) => {
        const token = await getToken();

        try {
            const { data: servicesByType } = await axios.get(
                baseURL + `services-types-app/${type}`,
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
            const name = user.split(' ')[0];
            setUsername(name);
        };

        async function getServicesTypes() {
            const token = await getToken();

            try {
                const { data: servicesTypes } = await axios.get(
                    baseURL + `types/all-types`,
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
                    baseURL + `services-types-app/0`,
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

    const openMenu = (service) => {
        setSelectedService(service);
        setVisibleMenu(true);
    };

    const closeMenu = () => setVisibleMenu(false);

    const handleMenuOption = (option) => {
        closeMenu();
        if (option === 'Cadastrar' && selectedService) {
            navigation.navigate('Search', { serviceId: selectedService.id });
        }
        // Add other options here
    };

    return (
        <Provider>
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
                        <Card key={service.id} style={styles.card}>
                            <Card.Title
                                title={service.name}
                                left={(props) => <Avatar.Icon {...props} icon="folder" />}
                                right={(props) => (
                                    <Menu
                                        visible={visibleMenu && selectedService && selectedService.id === service.id}
                                        onDismiss={closeMenu}
                                        anchor={
                                            <IconButton {...props} icon="dots-vertical" onPress={() => openMenu(service)} />
                                        }
                                    >
                                        <Menu.Item onPress={() => handleMenuOption('Cadastrar')} title="Cadastrar" />
                                    </Menu>
                                )}
                            />
                        </Card>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </Provider>
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
    card: {
        borderRadius: 0,
    },
});
