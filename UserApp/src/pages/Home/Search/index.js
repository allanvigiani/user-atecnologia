import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Modal, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { getToken } from '../../../secure/GetToken';
import baseUrl from "../../../apis/CompanyServices";
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function Search() {

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

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

            setTimeout(() => {
                setLoading(false);
            }, 2000);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                setMessage(error.response.data.message + ' Tente novamente mais tarde!');
            } else {
                setMessage(error.message + ' Tente novamente mais tarde!');
            }
        }
    };

    const openScheduleModal = async (service) => {
        try {
            setSelectedService(service);
            setModalVisible(true);
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    const scheduleService = async (service) => {
        try {
            console.log('Serviço agendado!', service)
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    useEffect(() => {
        getServices();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.search_section}>
                <Ionicons name="search" size={20} color="#4f297a" style={styles.search_icon} />
                <TextInput
                    style={styles.search_input}
                    placeholder="Pesquise aqui..."
                    placeholderTextColor="#666"
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
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Ionicons name="close-circle" size={30} color="#4f297a" />
                        </TouchableOpacity>
                        <Text style={styles.modalText}>AgendAI!</Text>
                        <Text style={styles.labelText}>Serviço: {selectedService ? selectedService.name : ''}</Text>
                        <Text style={styles.labelText}>Profissional: {selectedService ? selectedService.professional_name : ''}</Text>
                        <Text style={styles.labelText}>Preço: R${selectedService ? selectedService.price : ''}</Text>
                        <Text style={styles.labelText}>Empresa: {selectedService ? selectedService.company_name : ''}</Text>
                        <Text style={styles.labelText}>Endereço: {selectedService ? selectedService.address : ''}</Text>
                        <TouchableOpacity
                            style={styles.schedule_button}
                            onPress={() => scheduleService(selectedService)}
                        >
                            <Text style={styles.schedule_text}>Agendar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>

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
        width: '90%',
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
});