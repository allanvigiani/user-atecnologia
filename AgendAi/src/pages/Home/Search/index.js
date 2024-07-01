import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Modal, ActivityIndicator, TouchableOpacity, Alert, RefreshControl, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import axios from 'axios';

import { getToken } from '../../../secure/GetToken';
import { getUserId } from '../../../secure/GetUserId';
import baseUrl from "../../../apis/CompanyServices";
import baseURLService from "../../../apis/Schedule";

export default function Search() {
    const route = useRoute();
    const navigation = useNavigation();
    const { serviceId } = route.params || {};

    const [message, setMessage] = useState('');
    const [servicesTypes, setServicesTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [searchService, setSearchService] = useState('');
    const [services, setServices] = useState([]);
    const [setedDays, setDays] = useState([]);
    const [setedDates, setDates] = useState([]);
    const [setedHours, setHours] = useState([]);
    const [days, setDayService] = useState('');
    const [date, setDateService] = useState('');
    const [hours, setHourService] = useState('');

    const [selectedService, setSelectedService] = useState(null);
    const [selectedServiceType, setSelectedServiceType] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [dayModalVisible, setDayModalVisible] = useState(false);
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [hourModalVisible, setHourModalVisible] = useState(false);

    const [tempDay, setTempDay] = useState(0);
    const [tempDate, setTempDate] = useState(0);
    const [tempHour, setTempHour] = useState(0);

    useEffect(() => {
        async function getServicesTypes() {
            const token = await getToken();

            try {
                const { data: servicesTypes } = await axios.get(
                    baseUrl + `types/all-types`,
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

        async function handleSearchServiceFromHome(serviceId) {
            setLoading(true);
            const token = await getToken();
            const url = `${baseUrl}get-service-app/${serviceId}`;

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setServices(response.data.message);
            setLoading(false);
        };

        getServicesTypes();
        if (serviceId) {
            handleSearchServiceFromHome(serviceId);
        }
    }, [serviceId]);

    const handleSearchService = async () => {
        const trimmedSearchService = searchService.trim();

        if (trimmedSearchService.length >= 3) {
            setLoading(true);
            const token = await getToken();
            const url = selectedServiceType ? `${baseUrl}search-types/${trimmedSearchService}/${selectedServiceType}` : `${baseUrl}search/${trimmedSearchService}`;

            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (Array.isArray(response.data.message) && response.data.message.length === 0) {
                    Alert.alert("Nenhum serviço encontrado", "Tente novamente com outra busca.");
                }

                setServices(Array.isArray(response.data.message) ? response.data.message : []);
            } catch (error) {
                console.error(error);
                Alert.alert("Erro", "Não foi possível buscar os serviços.");
            }

            setLoading(false);
        } else if (trimmedSearchService.length == 0) {
            setSearchService('');
            setSelectedServiceType('');
            setMessage('');
            setServices([]);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        setSelectedServiceType('');
        setMessage('');
        setServices([]);
        setRefreshing(false);
    };

    const nextDays = async (index) => {
        const hoje = new Date();
        const diaAtual = hoje.getDay();
        let diasParaAdicionar = (index - diaAtual + 7) % 7;
        if (diasParaAdicionar === 0) diasParaAdicionar = 7;

        const primeiraData = new Date(hoje);
        primeiraData.setDate(hoje.getDate() + diasParaAdicionar);

        const datas = [primeiraData];
        for (let i = 1; i < 3; i++) {
            const novaData = new Date(datas[i - 1]);
            novaData.setDate(datas[i - 1].getDate() + 7);
            datas.push(novaData);
        }

        return datas.map(data => format(data, 'dd/MM/yyyy', { locale: ptBR }));
    };

    const getServicesByType = async (id_type) => {
        try {
            setLoading(true);
            setSelectedServiceType(id_type);
            const token = await getToken();
            const response = await axios.get(baseUrl + `services-types-app/${id_type}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.message.result.length === 0) {
                Alert.alert("Nenhum serviço encontrado", "Tente novamente com outra categoria.");
            }
            if (response.data.message.result) {
                setServices(response.data.message.result);
            } else {
                setMessage('Nenhum serviço disponível no momento.');
            }
            setTimeout(() => setLoading(false), 2000);
        } catch (error) {
            setLoading(false);
            const errorMessage = error.response ? error.response.data.message : error.message;
            setMessage(`${errorMessage} Tente novamente mais tarde!`);
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const handleHourChange = (itemValue, itemIndex) => {
        setTempHour(itemValue);
    };

    const handleDayChange = (itemValue, itemIndex) => {
        setTempDay(itemValue);
    };

    const handleDateChange = (itemValue, itemIndex) => {
        setTempDate(itemValue);
    };

    const openScheduleModal = (service) => {
        setSelectedService(service);
        setModalVisible(true);
    };

    const transitionToDayModal = async () => {
        setLoading(true);

        const token = await getToken();
        const serviceId = selectedService.id;
        const companyId = selectedService.company_id;

        const response = await axios.get(baseUrl + `days/${serviceId}/${companyId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.message) {
            setDays(response.data.message);
        }

        setTimeout(() => {
            setModalVisible(false);
            setLoading(false)
            setDayModalVisible(true);
        }, 1000);
    };

    const confirmDay = async () => {
        let newTempDay = 0;
        if (tempDay == 0) {
            newTempDay = 1;
        } else {
            newTempDay = tempDay;
        }

        setDayService(newTempDay);
        setLoading(true);

        const dates = await nextDays(newTempDay);
        setDates(dates);
        setTempDate(dates[0]);

        setTimeout(() => {
            setDayModalVisible(false);
            setLoading(false)
            setDateModalVisible(true);
        }, 1000);
    };

    const confirmDate = async () => {
        setDateService(tempDate);
        setLoading(true);

        const token = await getToken();
        const serviceId = selectedService.id;
        const companyId = selectedService.company_id;

        const parts = tempDate.split('/');
        const formatedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

        const response = await axios.get(baseUrl + `hours/${serviceId}/${companyId}/${days}/${formatedDate}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.message) {
            setHours(response.data.message);

            const keys = Object.keys(response.data.message);
            const firstKey = keys[0];

            setHourService(parseInt(firstKey));
        } else {
            Alert.alert('Error', 'Não foi possível encontrar horários disponíveis. Tente outro dia!');
        }

        setTimeout(() => {
            setDateModalVisible(false);
            setLoading(false);
            setHourModalVisible(true);
        }, 1000);
    };

    const confirmHour = async () => {
        setTimeout(() => {
            setHourService(tempHour);
            setHourModalVisible(false);
        }, 1000);

        await finalizeSchedule();
    };

    async function finalizeSchedule() {
        try {
            setLoading(true);

            const userId = await getUserId();
            const scheduleFields = {
                date: date,
                day: days,
                hour: hours,
                service: selectedService,
                user_id: userId
            };

            const token = await getToken();

            const parts = scheduleFields.date.split('/');
            const formatedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

            const newScheduleFields = {
                company_id: scheduleFields.service.company_id,
                service_id: scheduleFields.service.id,
                service_hour_id: scheduleFields.hour,
                service_day_id: scheduleFields.day,
                date: formatedDate,
                user_id: userId
            }

            await axios.post(baseURLService + 'schedule/', newScheduleFields, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setLoading(false);

            Alert.alert('Agendamento Realizado!');
        } catch (error) {
            console.error('Error finalizing schedule:', error);
            Alert.alert('Error', 'Não foi possível realizar o agendamento. Tente mais tarde!');
        }
    }

    const resetState = async () => {
        navigation.navigate('Search');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#4f297a" style={styles.search_icon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder={selectedServiceType ? `Buscar por ${servicesTypes.find(type => type.value === selectedServiceType)?.label} - AgendAi` : "Buscar em Todo o AgendAi"}
                        placeholderTextColor="#666"
                        onChangeText={setSearchService}
                        onSubmitEditing={handleSearchService}
                    />
                </View>
                {services.length === 0 && (
                    <Text style={styles.categoryTitle}>Categorias</Text>
                )}
                {services.length === 0 && (
                    <View style={styles.categoriesContainer}>
                        {servicesTypes.map((category, index) => (
                            <TouchableOpacity onPress={() => getServicesByType(category.value)} key={index} style={styles.categoryCard}>
                                <Text style={styles.categoryText}>{category.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                <View>
                    <ScrollView>
                        {message !== '' && <Text style={styles.message}>{message}</Text>}
                        {loading && (
                            <Modal transparent={true} animationType="none">
                                <View style={styles.loading_circle}>
                                    <ActivityIndicator size="large" color="#4f297a" />
                                </View>
                            </Modal>
                        )}
                        <View style={styles.container_service}>
                            {services.length !== 0 && (
                                <Text style={styles.categoryTitle}>Você procura por</Text>
                            )}
                            {services.map((service, index) => (
                                <View key={service.id} style={styles.itemBox}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.itemTextName}>{service.name}</Text>
                                        <Text style={styles.itemTextNameCompany}>{service.company_name}</Text>
                                        <Text style={styles.itemText}>{service.address}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => openScheduleModal(service)}>
                                        <Ionicons name="add-circle-outline" size={40} color="#FFF" style={styles.add_icon} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(!modalVisible)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Ionicons name="close-circle" size={30} color="#4f297a" />
                            </TouchableOpacity>
                            <Text style={styles.modalText}>AgendAI!</Text>
                            <Text style={styles.labelText}>Serviço: {selectedService ? selectedService.name : ''}</Text>
                            <Text style={styles.labelText}>Profissional: {selectedService ? selectedService.professional_name : ''}</Text>
                            <Text style={styles.labelText}>Preço: {selectedService ? formatCurrency(selectedService.price) : ''}</Text>
                            <Text style={styles.labelText}>Empresa: {selectedService ? selectedService.company_name : ''}</Text>
                            <Text style={styles.labelText}>Endereço: {selectedService ? selectedService.address : ''}</Text>
                            <TouchableOpacity style={styles.schedule_button} onPress={transitionToDayModal}>
                                <Text style={styles.schedule_text}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={dayModalVisible}
                    onRequestClose={() => setDayModalVisible(!dayModalVisible)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setDayModalVisible(false)}
                            >
                                <Ionicons name="close-circle" size={30} color="#4f297a" />
                            </TouchableOpacity>
                            <Text style={styles.modalText}>Escolha o dia da semana!</Text>
                            <Picker
                                selectedValue={tempDay.toString()}
                                onValueChange={handleDayChange}
                                style={{ height: 40, width: 200 }}
                            >
                                {Object.entries(setedDays).map(([index, day]) => (
                                    <Picker.Item key={index} label={day} value={index.toString()} />
                                ))}
                            </Picker>
                            <TouchableOpacity style={styles.next_button} onPress={confirmDay}>
                                <Text style={styles.next_text}>Confirmar Dia</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={dateModalVisible}
                    onRequestClose={() => setDateModalVisible(!dateModalVisible)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setDateModalVisible(false)}
                            >
                                <Ionicons name="close-circle" size={30} color="#4f297a" />
                            </TouchableOpacity>
                            <Text style={styles.modalText}>Escolha uma data!</Text>
                            <Picker
                                selectedValue={tempDate.toString()}
                                onValueChange={handleDateChange}
                                style={{ height: 40, width: 200 }}
                            >
                                {Object.entries(setedDates).map(([index, date]) => (
                                    <Picker.Item key={index} label={date} value={date.toString()} />
                                ))}
                            </Picker>
                            <TouchableOpacity style={styles.next_button} onPress={confirmDate}>
                                <Text style={styles.next_text}>Confirmar Data</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={hourModalVisible}
                    onRequestClose={() => setHourModalVisible(!hourModalVisible)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setHourModalVisible(false)}
                            >
                                <Ionicons name="close-circle" size={30} color="#4f297a" />
                            </TouchableOpacity>
                            <Text style={styles.modalText}>Escolha um horário!</Text>
                            <Picker
                                selectedValue={tempHour}
                                onValueChange={handleHourChange}
                                style={{ height: 40, width: 200 }}
                            >
                                {Object.entries(setedHours).map(([index, hour]) => (
                                    <Picker.Item key={index} label={hour} value={index} />
                                ))}
                            </Picker>
                            <TouchableOpacity style={styles.next_button} onPress={confirmHour}>
                                <Text style={styles.next_text}>Confirmar Horário</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    searchInput: {
        marginLeft: 10,
        fontSize: 16,
        color: '#000',
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    categoryCard: {
        backgroundColor: '#f5f5f5',
        width: '48%',
        marginBottom: 10,
        borderRadius: 5,
        alignItems: 'center',
        padding: 25,
        borderWidth: 1,
        flexDirection: 'row',
    },
    categoryImage: {
        width: 50,
        height: 50,
        marginBottom: 10,
        marginRight: 10,
    },
    categoryText: {
        fontSize: 16,
        color: '#000',
    },
    search_icon: {
        padding: 10,
    },
    search_input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
    message: {
        fontSize: 16,
        color: '#4f297a',
        marginTop: 20,
        alignItems: 'center',
    },
    loading_circle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container_service: {
        width: '100%',
        padding: 15,
        marginBottom: 70,
    },
    itemBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4f297a',
        width: '100%',
        height: 110,
        marginTop: 10,
        padding: 15,
    },
    textContainer: {
        flex: 1,
    },
    itemTextName: {
        color: 'white',
        fontSize: 18,
        textAlign: 'left',
        marginBottom: 5,
        textDecorationLine: 'underline'
    },
    itemTextNameCompany: {
        color: 'white',
        fontSize: 20,
        textAlign: 'left',
        marginBottom: 5,
    },
    itemText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 5,
    },
    add_icon: {
        marginLeft: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        width: 360,
        position: 'relative',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    modalText: {
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        color: '#4f297a'
    },
    labelText: {
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#000',
    },
    schedule_button: {
        marginTop: 20,
        backgroundColor: '#4f297a',
        borderRadius: 35,
        paddingVertical: 8,
        width: '60%',
        height: '15%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    schedule_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    next_button: {
        marginTop: 20,
        backgroundColor: '#4f297a',
        borderRadius: 35,
        paddingVertical: 8,
        width: '60%',
        height: '18%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    next_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#000',
        paddingLeft: 10,
    },
});
