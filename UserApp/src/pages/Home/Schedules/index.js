import React, { useState } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Avatar, Card } from "react-native-paper";

export default function Schedule() {
    const [items, setItems] = useState({});

    function loadItemsForMonth(day) {
        setTimeout(() => {
            const newItems = { ...items };
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = new Date(time).toISOString().split('T')[0];
                if (!newItems[strTime]) {
                    newItems[strTime] = [];
                }
                // Preenchendo com um item falso se não houver nenhum item real
                if (newItems[strTime].length === 0) {
                    newItems[strTime].push({
                        name: 'Item fictício para ' + strTime,
                        height: 60,
                    });
                }
            }
            setItems(newItems);
        }, 1000);
    }

    const renderItens = (item) => {
        return (
            <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
                <Card>
                    <Card.Content>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>{item.name}</Text>
                            <Avatar.Text size={24} label='XD' />
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Agenda
                items={items}
                loadItemsForMonth={loadItemsForMonth}
                selected={'2024-05-16'}
                renderItem={renderItens}
            />
        </View>
    );
}
