import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView,TouchableOpacity } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerInfo: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    content: {
        width: '100%',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 5,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    info: {
        fontSize: 16,
        color: '#555',
    },
    buttonContainer: {
        alignItems: 'flex-end',
        marginTop: 20,
    },
    backButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
const Details = ({ navigation, route }) => {
    const { blk_no, street, max_floor_lvl, year_completed, residential, commercial, market_hawker, multistorey_carpark, precinct_pavilion, total_dwelling_units } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text style={styles.header}>{blk_no} {street}</Text>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Max Floor Level:</Text>
                        <Text style={styles.info}>{max_floor_lvl}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Year Completed:</Text>
                        <Text style={styles.info}>{year_completed}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Residential:</Text>
                        <Text style={styles.info}>{residential}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Commercial:</Text>
                        <Text style={styles.info}>{commercial}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Market & Hawker:</Text>
                        <Text style={styles.info}>{market_hawker}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Multi-storey Carpark:</Text>
                        <Text style={styles.info}>{multistorey_carpark}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Precinct Pavilion:</Text>
                        <Text style={styles.info}>{precinct_pavilion}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Total Dwelling Units:</Text>
                        <Text style={styles.info}>{total_dwelling_units}</Text>
                    </View>
                </ScrollView>

                {/* Back Button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};



export default Details;

