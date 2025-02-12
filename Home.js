import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";
import AsyncStorage from '@react-native-async-storage/async-storage';

let originalData = [];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    filterContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "flex-start",
        marginBottom: 10,
    },
    filterButton: {
        height: 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 5, // Space between wrapped buttons
    },
    activeFilter: {
        backgroundColor: '#007bff',
    },
    filterButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    activeFilterText: {
        color: '#fff',
    },
    listContainer: {
        flex: 1,
    },
    list: {
        paddingBottom: 20,
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});

const Home = ({ navigation }) => {
    const [mydata, setMyData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [favourite, setFavourite] = useState([]);

    useEffect(() => {
        fetch('https://data.gov.sg/api/action/datastore_search?resource_id=d_17f5382f26140b1fdae0ba2ef6239d2f')
            .then((response) => response.json())
            .then((myJson) => {
                if (originalData.length < 1) {
                    originalData = myJson.result.records;
                }
                setMyData(originalData);
            });

        loadFavourites();
    }, []);

    const loadFavourites = async () => {
            const favourites = await AsyncStorage.getItem('favourites');
            if (favourites !== null) {
                setFavourite(JSON.parse(favourites));
            }
    };

    const saveFavourites = async (favourites) => {
        await AsyncStorage.setItem('favourites', JSON.stringify(favourites));
    };

    const toggleFavourite = (item) => {
        const isFavourite = favourite.some(fav => fav._id === item._id);
        let newFavourites;
        if (isFavourite) {
            newFavourites = favourite.filter(fav => fav._id !== item._id);
        } else {
            newFavourites = [...favourite, item];
        }
        setFavourite(newFavourites);
        saveFavourites(newFavourites);
    };

    const FilterData = (text) => {
        if (text !== '') {
            let myFilteredData = originalData.filter((item) =>
                item.street.includes(text.toUpperCase())
            );
            setMyData(myFilteredData);
        } else {
            applyFilter(selectedFilter);
        }
    };

    const applyFilter = (category) => {
        setSelectedFilter(category);
        if (category === 'All') {
            setMyData(originalData);
        } else if (category === 'favourites') {
            setMyData(favourite);
        } else {
            const filteredData = originalData.filter((item) =>
                item[category.toLowerCase()] === 'Y'
            );
            setMyData(filteredData);
        }
    };

    const renderItem = ({ item, index }) => {
        const isFavourite = favourite.some(fav => fav._id === item._id);
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    navigation.navigate('Details', {
                        index: index,
                        street: item.street,
                        id: item._id,
                        blk_no: item.blk_no,
                        max_floor_lvl: item.max_floor_lvl,
                        year_completed: item.year_completed,
                        residential: item.residential,
                        commercial: item.commercial,
                        market_hawker: item.market_hawker,
                        multistorey_carpark: item.multistorey_carpark,
                        precinct_pavilion: item.precinct_pavilion,
                        total_dwelling_units: item.total_dwelling_units,
                    });
                }}
            >
                <View>
                    <Text style={styles.itemText}>
                        {item.blk_no} {item.street}
                    </Text>
                </View>

                <TouchableOpacity onPress={() => toggleFavourite(item)}>
                    <Icon name='heart' size={20} color={isFavourite ? "red" : "grey"} />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.heading}>HDB Property Information</Text>
            <Text>Search:</Text>
            <TextInput style={styles.input} onChangeText={(text) => FilterData(text)} />

            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[styles.filterButton, selectedFilter === 'All' ? styles.activeFilter : {}]}
                    onPress={() => applyFilter('All')}
                >
                    <Text style={[styles.filterButtonText, selectedFilter === 'All' ? styles.activeFilterText : {}]}>
                        All
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.filterButton, selectedFilter === 'Residential' ? styles.activeFilter : {}]}
                    onPress={() => applyFilter('Residential')}
                >
                    <Text style={[styles.filterButtonText, selectedFilter === 'Residential' ? styles.activeFilterText : {}]}>
                        Residential
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.filterButton, selectedFilter === 'Commercial' ? styles.activeFilter : {}]}
                    onPress={() => applyFilter('Commercial')}
                >
                    <Text style={[styles.filterButtonText, selectedFilter === 'Commercial' ? styles.activeFilterText : {}]}>
                        Commercial
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.filterButton, selectedFilter === 'Market_hawker' ? styles.activeFilter : {}]}
                    onPress={() => applyFilter('Market_hawker')}
                >
                    <Text style={[styles.filterButtonText, selectedFilter === 'Market_hawker' ? styles.activeFilterText : {}]}>
                        Market Hawker
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.filterButton, selectedFilter === 'Multistorey_carpark' ? styles.activeFilter : {}]}
                    onPress={() => applyFilter('Multistorey_carpark')}
                >
                    <Text style={[styles.filterButtonText, selectedFilter === 'Multistorey_carpark' ? styles.activeFilterText : {}]}>
                        Multistorey Carpark
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.filterButton, selectedFilter === 'Precinct_pavilion' ? styles.activeFilter : {}]}
                    onPress={() => applyFilter('Precinct_pavilion')}
                >
                    <Text style={[styles.filterButtonText, selectedFilter === 'Precinct_pavilion' ? styles.activeFilterText : {}]}>
                        Precinct Pavilion
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, selectedFilter === 'favourites' ? styles.activeFilter : {}]}
                    onPress={() => applyFilter('favourites')}
                >
                    <Text style={[styles.filterButtonText, selectedFilter === 'favourites' ? styles.activeFilterText : {}]}>
                        <Icon name='heart' size={15} color={selectedFilter === 'favourites' ? "white" : "black"}  />
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={mydata}
                renderItem={renderItem}
            />
        </View>
    );
};

export default Home;

