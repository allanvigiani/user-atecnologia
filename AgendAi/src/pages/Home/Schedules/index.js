import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { Card } from "react-native-paper";
import { useFocusEffect } from '@react-navigation/native';
import { getToken } from "../../../secure/GetToken";
import { getUserId } from "../../../secure/GetUserId";
import axios from "axios";
import baseURLScheduleStatus from "../../../apis/ScheduleStatus";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';  // Importando ícones do Material Design

const colors = {
    primary: '#6A1B9A',
    secondary: '#FFFFFF',
    accent: '#FFFFFF',
};

LocaleConfig.locales['pt-br'] = {
    monthNames: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ],
    monthNamesShort: [
        "Jan.",
        "Fev.",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul.",
        "Ago",
        "Set.",
        "Out.",
        "Nov.",
        "Dez."
    ],
    dayNames: [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado"
    ],
    dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."]
};

LocaleConfig.defaultLocale = "pt-br";

export default function Schedule({ navigation }) {
    const [items, setItems] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userAppointments, setUserAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [noAppointments, setNoAppointments] = useState(false);

    useEffect(() => {
        fetchAppointmentData();
    }, []);

    const fetchAppointmentData = async () => {
        setLoading(true);
        try {
            const token = await getToken();

            if (!token) {
                logOut();
                return;
            }

            const userId = await getUserId();

            const response = await axios.get(
                baseURLScheduleStatus + `/appointments-app/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const appointments = response.data.message;
            setUserAppointments(appointments);

            if (appointments.length === 0) {
                setNoAppointments(true);
            } else {
                setNoAppointments(false);

                const closestDate = findClosestAppointmentDate(appointments);
                setSelectedDate(closestDate);
                loadItemsForMonth(new Date(closestDate), appointments);
            }

        } catch (error) {
            console.error(`Erro ao buscar dados de agendamento: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const findClosestAppointmentDate = (appointments) => {
        const today = new Date();
        let closestDate = null;
        let minDiff = Infinity;

        appointments.forEach(appointment => {
            const appointmentDate = new Date(appointment.date);
            if (isNaN(appointmentDate.getTime())) {
                return;
            }
            const diff = Math.abs(appointmentDate - today);

            if (diff < minDiff) {
                minDiff = diff;
                closestDate = appointmentDate.toISOString().split('T')[0];
            }
        });

        return closestDate || today.toISOString().split('T')[0];
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchAppointmentData();
        setRefreshing(false);
    };

    const navigateToScreen = (screenName) => () => {
        navigation.navigate(screenName);
    };

    const loadItemsForMonth = (day, appointments = userAppointments) => {
        if (!(day instanceof Date) || isNaN(day.getTime())) {
            day = new Date();
        }

        const newItems = { ...items };
        for (let i = -15; i < 85; i++) {
            const time = day.getTime() + i * 24 * 60 * 60 * 1000;
            const strTime = new Date(time).toISOString().split('T')[0];
            if (!newItems[strTime]) {
                newItems[strTime] = [];
            }
        }

        appointments.forEach(message => {
            const strDate = message.date.split('T')[0];
            if (!newItems[strDate]) {
                newItems[strDate] = [];
            }
            if (!newItems[strDate].find(item => item.id === message.id)) {
                newItems[strDate].push({
                    id: message.id,
                    name: message.name,
                    description: message.description,
                    start_time: message.start_time,
                    address_company: message.address_company,
                    name_company: message.name_company,
                    cnpj_company: message.cnpj_company,
                    descr_status: message.descr_status,
                    professional_name: message.professional_name,
                    company_id: message.company_id,
                    contact_phone_company: message.contact_phone_company,
                    email_company: message.email_company,
                    date: message.date,
                    height: 60,
                });
            }
        });

        setItems(newItems);
    };

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate('SchedulesAgendaDetailsScreen', { serviceDetails: item })}>
                <Card style={styles.card}>
                    <Card.Content>
                        <View style={styles.cardContent}>
                            <View>
                                <Text style={styles.cardTitle}>{item.name_company}</Text>
                                <Text style={styles.cardTitle}>{item.name}</Text>
                                <Text style={styles.cardDescription}>{item.description}</Text>
                                <Text style={styles.cardTime}>{item.start_time}</Text>
                            </View>
                            <Icon name="calendar" size={40} color={colors.accent} />
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };

    useFocusEffect(
        useCallback(() => {
            fetchAppointmentData();
        }, [])
    );

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color={colors.primary} />
                ) : noAppointments ? (
                    <View style={styles.noAppointmentsContainer}>
                        <Text style={styles.noAppointmentsText}>Nenhum Agendamento Realizado</Text>
                    </View>
                ) : (
                    <Agenda
                        items={items}
                        loadItemsForMonth={loadItemsForMonth}
                        selected={selectedDate}
                        renderItem={renderItem}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        theme={{
                            agendaDayTextColor: colors.primary,
                            agendaDayNumColor: colors.primary,
                            agendaTodayColor: colors.primary,
                            agendaKnobColor: colors.primary,
                            selectedDayBackgroundColor: colors.primary,
                            dotColor: colors.accent,
                            todayBackgroundColor: colors.primary,
                            dayTextColor: colors.primary,
                            monthTextColor: colors.primary,
                            selectedDotColor: colors.accent,
                            textSectionTitleColor: colors.primary,
                            backgroundColor: colors.secondary,
                            calendarBackground: colors.secondary,
                        }}
                    />
                )}
            </SafeAreaView>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
    },
    cardContainer: {
        marginRight: 10,
        marginTop: 17,
    },
    card: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        padding: 10,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.secondary,
    },
    cardDescription: {
        fontSize: 14,
        color: colors.secondary,
    },
    cardTime: {
        fontSize: 12,
        color: colors.accent,
    },
    noAppointmentsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noAppointmentsText: {
        fontSize: 18,
        color: colors.primary,
    },
};
