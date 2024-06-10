import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Modal, ActivityIndicator, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import axios from 'axios';

import { getToken } from '../../../secure/GetToken';
import { getUserId } from '../../../secure/GetUserId';
import baseUrl from "../../../apis/CompanyServices";
import baseURLService from "../../../apis/Schedule";

export default function Search() {

    const navigation = useNavigation();

    const [message, setMessage] = useState('');
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

    const [modalVisible, setModalVisible] = useState(false);
    const [dayModalVisible, setDayModalVisible] = useState(false);
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [hourModalVisible, setHourModalVisible] = useState(false);

    const [tempDay, setTempDay] = useState(0);
    const [tempDate, setTempDate] = useState(0);
    const [tempHour, setTempHour] = useState(0);

    // Inicialização da tela
    useEffect(() => {
        getServices();
    }, []);

    const handleSearchService = async () => {
        if (searchService.length >= 3) {

            setLoading(true);
            const token = await getToken();

            const response = await axios.get(baseUrl + `search/${searchService}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setServices(response.data.message);
            setLoading(false);

        } else if (searchService.length == 0) {
            getServices();
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        getServices();
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

    const getServices = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            const response = await axios.get(baseUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
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

    // useEffect(() => {
    //     if (hours != '') {
    //         finalizeSchedule(date, days, hours, selectedService);
    //     }
    // }, [hours, date, days, selectedService]);

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

        // TODO: Paleativo para o bug do segunda vir como zero, consertar depois (newTempDay)
        let newTempDay = 0;
        if (tempDay == 0) {
            newTempDay = 1;
        }else {
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
            // Seta um valor com default (O que ja vem selecionado no picker)

            console.log('response:', response.data.message)

            const keys = Object.keys(response.data.message);
            const firstKey = keys[0];

            setHourService(parseInt(firstKey));

        }else {
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

            // Envia para a API de agendamento
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
            // await resetState();

        } catch (error) {
            console.error('Error finalizing schedule:', error);
            Alert.alert('Error', 'Não foi possível realizar o agendamento. Tente mais tarde!');
        }
    }

    const resetState = async () => {
        navigation.navigate('Search');
    }

    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.search_section}>
                    <Ionicons name="search" size={20} color="#4f297a" style={styles.search_icon} />
                    <TextInput
                        style={styles.search_input}
                        placeholder="Pesquise aqui..."
                        placeholderTextColor="#666"
                        onChangeText={setSearchService}
                        onSubmitEditing={handleSearchService}
                    />
                </View>
                <View>
                    {message !== '' && <Text style={styles.message}>{message}</Text>}
                    {loading && (
                        <Modal transparent={true} animationType="none">
                            <View style={styles.loading_circle}>
                                <ActivityIndicator size="large" color="#4f297a" />
                            </View>
                        </Modal>
                    )}
                    <ScrollView style={styles.container_service}>
                        {services.map((service, index) => (
                            <View key={service.id} style={styles.itemBox}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.itemTextName}>{service.name}</Text>
                                    <Text style={styles.itemText}>Profissional: {service.professional_name}</Text>
                                    <Text style={styles.itemText}>R$ {service.price}</Text>
                                </View>
                                <TouchableOpacity onPress={() => openScheduleModal(service)}>
                                    <Ionicons name="add-circle-outline" size={40} color="#FFF" style={styles.add_icon} />
                                </TouchableOpacity>
                            </View>
                        ))}
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
                            <Text style={styles.labelText}>Preço: R${selectedService ? selectedService.price : ''}</Text>
                            <Text style={styles.labelText}>Empresa: {selectedService ? selectedService.company_name : ''}</Text>
                            <Text style={styles.labelText}>Endereço: {selectedService ? selectedService.address : ''}</Text>
                            <TouchableOpacity style={styles.schedule_button} onPress={transitionToDayModal}>
                                <Text style={styles.schedule_text}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* DIA DA SEMANA */}
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
                {/* DATA DO SERVIÇO */}
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

                {/* HORÁRIO DO SERVIÇO */}
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
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
        border: 1,
        paddingTop: 20,
    },
    search_section: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        paddingHorizontal: 10,
        width: '100%',
        height: 60
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
        width: '100%'
    },
    itemBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4f297a',
        width: 320,
        height: 100,
        marginTop: 10,
        padding: 15,
        borderRadius: 10,
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
});