// SchedulesDetailsScreen.js
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SchedulesDetailsScreen({ route, navigation }) {
    const { serviceDetails } = route.params;

    const formattedDate = new Date(serviceDetails.date).toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const isAccepted = serviceDetails.descr_status.toLowerCase() === 'aceito';
    const statusColor = isAccepted ? 'green' : 'red';
    const statusBackgroundColor = isAccepted ? '#e0f7e9' : '#f1f1f1';

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{serviceDetails.name_company}</Text>
                <Text style={styles.headerSubtitle}>CNPJ: {serviceDetails.cnpj_company}</Text>
                {serviceDetails.email_company && (
                    <Text style={styles.headerSubtitle}>Email: {serviceDetails.email_company}</Text>
                )}
                <Text style={styles.headerSubtitle}>Pedido nº {serviceDetails.id} • {formattedDate}</Text>
            </View>

            <View style={[styles.statusContainer, { backgroundColor: statusBackgroundColor }]}>
                <Ionicons name="checkmark-circle" size={24} color={statusColor} />
                <Text style={[styles.statusText, { color: statusColor }]}>Status: {serviceDetails.descr_status}</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Detalhes do Agendamento</Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailText}>Serviço: {serviceDetails.name}</Text>
                    <Text style={styles.detailText}>Dia: {serviceDetails.description}</Text>
                    <Text style={styles.detailText}>Horário: {serviceDetails.start_time}</Text>
                    <Text style={styles.detailText}>Profissional: {serviceDetails.professional_name}</Text>
                </View>

                <View style={styles.separator} />

                <Text style={styles.sectionTitle}>Endereço da Empresa</Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailText}>{serviceDetails.address_company}</Text>
                    {serviceDetails.contact_phone_company && (
                        <Text style={styles.detailText}>Telefone: {serviceDetails.contact_phone_company}</Text>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        backgroundColor: '#4f297a',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#fff',
        marginTop: 5,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        marginBottom: 20,
    },
    statusText: {
        fontSize: 16,
        marginLeft: 10,
    },
    content: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailsContainer: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 5,
    },
    separator: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
});

