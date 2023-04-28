import React, { Component, useState, useEffect } from 'react'
import { Text, StyleSheet, View, Button, TextInput, SectionList, Image, TouchableOpacity } from 'react-native'

interface Props {
    navigation: any;
}

type PetList = {
    title: string,
    data: Pet[]
}[]

const PetManager: React.FC<Props> = ({ navigation }) => {
    const init: PetList = [{ title: "No Pets Yet", data: [] }]
    const [petList, setPetList]: [PetList, React.Dispatch<React.SetStateAction<PetList>>] = useState(init)

    function handlePressToFilterSearch() {
        navigation.navigate('FilterSearch');
    }
    function handlePressToUserProfile() {
        navigation.navigate('UserProfile');
    }
    function handlePressToSwipeInterface() {
        navigation.navigate('SwipingInterface');
    }

    const [update, setUpdate] = useState(true)
    const [myPetsUpdate, setMyPetsUpdate] = useState(true)
    const [favoritedUpdate, setFavoritedUpdate] = useState(false)
    const [requestsUpdate, setRequestsUpdate] = useState(false)

    function myPets() {
        setPetList([{
            title: "Cats",
            data: [
                {
                    name: "Slay",
                    age: 10,
                    type: "Cat",
                    price: 1000,
                    location: [0, 0],
                },
                {
                    name: "Boss",
                    age: 4,
                    type: "Cat",
                    price: 500,
                    location: [0, 0],
                },
            ]
        },
        {
            title: "Dogs",
            data: [
                {
                    name: "Socks",
                    age: 11,
                    type: "Dog",
                    price: 100,
                    location: [0, 0],
                },
                {
                    name: "Francine",
                    age: 1,
                    type: "Dog",
                    price: 750,
                    location: [0, 0],
                },
                {
                    name: "Queen",
                    age: 9,
                    type: "Dog",
                    price: 900,
                    location: [0, 0],
                },
                {
                    name: "Man",
                    age: 2,
                    type: "Dog",
                    price: 1000,
                    location: [0, 0],
                }
            ]
        },
        {
            title: "Rats",
            data: [
                {
                    name: "Ratty",
                    age: 1,
                    type: "Rat",
                    price: 50,
                    location: [0, 0],
                },
                {
                    name: "Rat Boy",
                    age: 4,
                    type: "Rat",
                    price: 100,
                    location: [0, 0],
                },
                {
                    name: "Dirt",
                    age: 0,
                    type: "Dog",
                    price: 10,
                    location: [0, 0],
                },
                {
                    name: "Dirt",
                    age: 0,
                    type: "Dog",
                    price: 10,
                    location: [0, 0],
                },
                {
                    name: "Dirt",
                    age: 0,
                    type: "Dog",
                    price: 10,
                    location: [0, 0],
                },
                {
                    name: "Dirt",
                    age: 0,
                    type: "Dog",
                    price: 10,
                    location: [0, 0],
                }
            ]
        }])
        setUpdate(!update)
        setMyPetsUpdate(true)
        setFavoritedUpdate(false)
        setRequestsUpdate(false)
    }

    function favorited() {
        setPetList([{
            title: "Dogs",
            data: [
                {
                    name: "Frank",
                    age: 2,
                    type: "Dog",
                    price: 400,
                    location: [0, 0],
                },
            ]
        }])
        setUpdate(!update)
        setMyPetsUpdate(false)
        setFavoritedUpdate(true)
        setRequestsUpdate(false)
    }

    function requests() {
        setPetList([{
            title: "Cats",
            data: [{
                name: "Asjal Wants Francine",
                age: 1000,
                type: "Cat",
                price: 100000,
                location: [0, 0],
            }]
        }])
        setUpdate(!update)
        setMyPetsUpdate(false)
        setFavoritedUpdate(false)
        setRequestsUpdate(true)
    }
    //init whenever the page is loaded 
    useEffect(() => {
        myPets()
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handlePressToFilterSearch}>
                    <Image
                        source={require('../.././assets/searchicon.png')}
                        style={{ width: 50, height: 50, alignContent: 'center' }}
                    ></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressToSwipeInterface}>
                    <Image
                        source={require('../.././assets/icon.png')}
                        style={{ width: 50, height: 50, alignContent: 'center' }}
                    ></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressToUserProfile}>
                    <Image
                        source={require('../.././assets/profileicon.webp')}
                        style={{ width: 50, height: 50, alignContent: 'center' }}
                    ></Image>
                </TouchableOpacity>
            </View >
            <View style={styles.swapButtons}>
                <TouchableOpacity style={[styles.topButton, myPetsUpdate && { backgroundColor: '#ffffaa' }]} onPress={myPets}>
                    <Text style={styles.buttonText}>My Pets</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.topButton, favoritedUpdate && { backgroundColor: '#ffffaa' }]} onPress={favorited}>
                    <Text style={styles.buttonText}>Favorited</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.topButton, requestsUpdate && { backgroundColor: '#ffffaa' }]} onPress={requests}>
                    <Text style={styles.buttonText}>Requests</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listcontainer}>
                <SectionList
                    sections={petList}
                    extraData={update}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.petlabel} onPress={() => navigation.navigate('PetProfile', { pet: item })}>
                            <Text style={{ fontSize: 26 }}>{item.name}</Text>
                            <Text style={{ fontSize: 24 }}>{'>'}</Text>
                        </TouchableOpacity>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    listcontainer: {
        padding: 10,
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    buttonText: {
        fontSize: 20,
    },
    swapButtons: {
        fontSize: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
    },
    topButton: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 28,
        fontWeight: 'bold',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    petlabel: {
        backgroundColor: '#ffffaa',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingLeft: 20,
        marginHorizontal: 10,
        marginVertical: 6,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});
export default PetManager;