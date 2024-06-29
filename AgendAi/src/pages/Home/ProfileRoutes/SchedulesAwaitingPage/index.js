import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getUserId } from '../../../../secure/GetUserId';
import baseURLScheduleStatus from '../../../../apis/ScheduleStatus';
import { getToken } from '../../../../secure/GetToken';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function SchedulesAwaitingScreen({ navigation }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchAppointmentData();
    }, []);

    const fetchAppointmentData = async () => {
        try {
            const token = await getToken();

            if (!token) {
                logOut();
                return;
            }

            const userId = await getUserId();

            const response = await axios.get(
                baseURLScheduleStatus + `/appointments-app/${userId}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const resultData = response.data.message;

            setData(resultData.filter(item => item.id_status === 1));
        } catch (error) {
            console.error(`Erro ao buscar dados de agendamento: ${error}`);
        }
    };
    const renderItem = ({ item }) => {
        const formattedDate = format(parseISO(item.created_at), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
        return (
            <View style={styles.appointmentContainer}>
                <View style={styles.appointmentDetails}>
                    <Text style={styles.companyText}>{item.name}</Text>
                    <Text style={styles.appointmentIdText}>Aguardando Confirmação • Nº {item.id}</Text>
                    <Text style={styles.detailsText}>{item.description}, {item.start_time}</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity onPress={() => navigation.navigate('SchedulesAwaitingDetailsScreen', { serviceDetails: item })} style={styles.button}>
                            <Text style={styles.buttonText}>Detalhes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {data.length === 0 ? (
                <View style={styles.noRecordsContainer}>
                    <Text style={styles.noRecordsText}>Nenhum agendamento pendente</Text>
                </View>
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff'
    },
    appointmentContainer: {
        marginBottom: 20
    },
    dateText: {
        fontSize: 16,
        color: '#888'
    },
    appointmentDetails: {
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    companyText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    appointmentIdText: {
        fontSize: 14,
        color: '#666'
    },
    detailsText: {
        fontSize: 16,
        marginVertical: 5
    },
    actions: {
        flexDirection: 'flex',
        justifyContent: 'center',
        AlignItems: 'center'
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#4f297a',
        borderRadius: 5,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 14
    },
    noRecordsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noRecordsText: {
        fontSize: 18,
        color: '#888'
    },
});
