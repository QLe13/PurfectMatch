import React, { Component, useState } from 'react'
import { Text, StyleSheet, View, Button, TextInput, SectionList } from 'react-native'

interface Props {
    navigation: any;
}

const petTypes = ["Cat", "Dog", "Fish", "Squirrel", "Reptile", "Amphibian", "Racoon", "Hamster", "Rabbit", "Spider", "Insect"]

const PetManager: React.FC<Props> = ({ navigation }) => {
    let petList: { title: string, data: string[] }[] = [{ title: "No Pets Yet", data: [] }]
    myPets()

    // function handlePressToProfile() {
    //     navigation.navigate('UserProfile');
    // }
    // function handlePressToPetManager() {
    //     navigation.navigate('PetManager');
    // }

    let update = true

    function myPets() {
        petList = [
            {
                title: "Cats",
                data: ["Socks", "Francine"]
            }
        ]
        update = !update;
    }

    function favorited() {
        petList = [
            {
                title: "Dogs",
                data: ["Frank"]
            }
        ]
        update = !update
    }

    function requests() {
        petList = [
            {
                title: "Cats",
                data: ["Asjal wants Francine!"]
            }
        ]
        update = !update
    }

    return (
        <View style={styles.container}>
            {/* <View style={styles.header}>
                <Button title="Profile" onPress={handlePressToProfile} />
                <Text style={styles.headerText}>Purfect Match</Text>
                <Button title="Pet Manager" onPress={handlePressToPetManager} />
            </View> */}
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
                            <Text style={styles.item}>{item}</Text>
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
        flexGrow: 1,
        height: '100%',
        flexDirection: 'column',
    },
    listcontainer: {
        padding: 10,
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
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