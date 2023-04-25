import React, { Component, useState, useEffect } from 'react'
import { Text, StyleSheet, View, Button, TextInput, SectionList } from 'react-native'

interface Props {
    navigation: any;
}

const petTypes = ["Cat", "Dog", "Fish", "Squirrel", "Reptile", "Amphibian", "Racoon", "Hamster", "Rabbit", "Spider", "Insect"]

type PetList = {
    title: string,
    data: string[]
}[]

const PetProfile: React.FC<Props> = ({ navigation }) => {
    const init: PetList = [{ title: "No Pets Yet", data: [] }]
    const [petList, setPetList]: [PetList, React.Dispatch<React.SetStateAction<PetList>>] = useState(init)

    // function handlePressToProfile() {
    //     navigation.navigate('UserProfile');
    // }
    // function handlePressToPetManager() {
    //     navigation.navigate('PetManager');
    // }

    const [update, setUpdate] = useState(true)

    //init whenever the page is loaded 
    useEffect(() => {
    }, [])
    return (
        <View style={styles.container}>
            <Text>hey</Text>
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
        paddingVertical: 10
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
export default PetProfile;