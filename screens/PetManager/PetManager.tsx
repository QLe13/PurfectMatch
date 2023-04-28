import React, { Component, useState, useEffect } from 'react'
import { Text, StyleSheet, View, Button, TextInput, SectionList, Image, TouchableOpacity } from 'react-native'

interface Props {
    navigation: any;
}

const petTypes = ["Cat", "Dog", "Fish", "Squirrel", "Reptile", "Amphibian", "Racoon", "Hamster", "Rabbit", "Spider", "Insect"]

type PetList = {
    title: string,
    data: string[]
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

    function myPets() {
        setPetList([{
            title: "Cats",
            data: ["Slay", "Boss"]
        },
        {
            title: "Dogs",
            data: ["Socks", "Francine", "Queen", "Man"]
        },
        {
            title: "Rats",
            data: ["Ratty", "Rat Boy", "Dirt"]
        }])
        setUpdate(!update)
    }

    function favorited() {
        setPetList([{
            title: "Dogs",
            data: ["Frank"]
        }])
        setUpdate(!update)
    }

    function requests() {
        setPetList([{
            title: "Cats",
            data: ["Asjal wants Francine"]
        }])
        setUpdate(!update)
    }
    //init whenever the page is loaded 
    useEffect(() => {
        myPets()
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity onPress = {handlePressToFilterSearch}>
                <Image 
                    source={require('../.././assets/searchicon.png')}
                    style={{width: 50, height: 50, alignContent: 'center'}}
                ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress = {handlePressToSwipeInterface}>
                <Image 
                    source={require('../.././assets/icon.png')}
                    style={{width: 50, height: 50, alignContent: 'center'}}
                ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress = {handlePressToUserProfile}>
                <Image 
                    source={require('../.././assets/profileicon.webp')}
                    style={{width: 50, height: 50, alignContent: 'center'}}
                ></Image>
            </TouchableOpacity>
        </View>
            <View style={styles.header}>
                <Button title="My Pets" onPress={myPets}></Button>
                <Button title="Favorited" onPress={favorited}></Button>
                <Button title="Requests" onPress={requests}></Button>
            </View>
            <View style={styles.listcontainer}>
                <SectionList
                    sections={petList}
                    extraData={update}
                    renderItem={({ item }) => (
                        <View style={styles.petlabel}>
                            <Text style={styles.item} onPress={() => navigation.navigate('PetProfile', { petName: item })}>{item}</Text>
                        </View>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
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
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 28,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 5,
        fontSize: 25,
        height: 44,
        borderRadius: 10
    },
    petlabel: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        borderRadius: 10
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        borderRadius: 10
    },
    inputContainer: {
        marginBottom: 16,
    },
    userNameText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    userNameView: {
        flexDirection: 'row',
        flexGrow: 1,
        padding: 16,
        justifyContent: 'center',
    },
    locationInputContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    locationInput: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        flexGrow: 1,
        marginRight: 10,
    },
    locationInputInactive: {
        fontSize: 16,
        padding: 10,
        flexGrow: 1,
        marginRight: 10,
    },
    editButton: {
        flexGrow: 1,
        padding: 16,
    },
});
export default PetManager;