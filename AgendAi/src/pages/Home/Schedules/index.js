import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Avatar, Card } from "react-native-paper";
import { useFocusEffect } from '@react-navigation/native';
import { getToken } from "../../../secure/GetToken";
import { getUserId } from "../../../secure/GetUserId";
import axios from "axios";
import baseURLScheduleStatus from "../../../apis/ScheduleStatus";

export default function Schedule() {
    const [items, setItems] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    const [userAppointments, setUserAppointments] = useState([]);

    const fetchAppointmentData = async () => {
        try {
            const token = await getToken();

            if (!token) {
                logOut();
                return;
            }

            const userId = await getUserId();

            const response = await axios.get(
                baseURLScheduleStatus + `/appointments/${userId}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const appointments = response.data.message;
            setUserAppointments(appointments);
        } catch (error) {
            console.error(`Erro ao buscar dados de agendamento: ${error}`);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        console.log(new Date());
        loadItemsForMonth(new Date());
        setRefreshing(false);
    };

    const navigateToScreen = (screenName) => () => {
        navigation.navigate(screenName);
    };

    const loadItemsForMonth = (day) => {
        // Ensure 'day' is a Date object
        if (!(day instanceof Date)) {
            day = new Date();
        }

        setTimeout(() => {
            console.log(day);
            const newItems = { ...items };
            for (let i = -15; i < 85; i++) {
                const time = day.getTime() + i * 24 * 60 * 60 * 1000;
                const strTime = new Date(time).toISOString().split('T')[0];
                if (!newItems[strTime]) {
                    newItems[strTime] = [];
                }
            }

            userAppointments.forEach(message => {
                const strDate = message.date.split('T')[0];
                if (!newItems[strDate]) {
                    newItems[strDate] = []; // Ensure it's initialized
                }
                if (!newItems[strDate].find(item => item.id === message.id)) {
                    newItems[strDate].push({
                        id: message.id,
                        name: message.name,
                        description: message.description,
                        start_time: message.start_time,
                        height: 60,
                    });
                }
            });

            setItems(newItems);
        }, 1000);
    };



    const renderItens = (item) => {
        return (
            <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
                <Card>
                    <Card.Content>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text>{item.name}</Text>
                                <Text>{item.description}</Text>
                                <Text>{item.start_time}</Text>
                            </View>
                            <Avatar.Text size={24} label='XD' />
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };

    useFocusEffect(
        useCallback(() => {
            fetchAppointmentData();
            onRefresh();
        }, [])
    );

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <Agenda
                    items={items}
                    loadItemsForMonth={loadItemsForMonth}
                    selected={'2024-05-16'}
                    renderItem={renderItens}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
};
