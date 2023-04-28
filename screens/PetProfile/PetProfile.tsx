import React, { Component, useState, ChangeEvent, useEffect } from "react";
import { ScrollView, Text, StyleSheet, View, NativeSyntheticEvent, TextInputChangeEventData, KeyboardAvoidingView, Image } from "react-native";
import Avatar from "../AddPet/Avatar/Avatar";

interface Props {
    navigation: any;
    route: any;
}

const initPetForm: Pet = {
    name: '',
    age: 0,
    type: '',
    price: 0,
    location: [0, 0],
}

const petTypes = ["Cat", "Dog", "Fish", "Squirrel", "Reptile", "Amphibian", "Racoon", "Rodent", "Rabbit", "Spider", "Insect", "Pig"]


const PetProfile: React.FC<Props> = ({ navigation, route }) => {
    const pet: Pet = route.params.pet
    const petJSON = route.params.petJSON
    const [petForm, setPetForm] = useState<Pet>(initPetForm)
    const [name, setName] = useState<string>('')
    const [age, setAge] = useState<number>(0)
    const [type, setType] = useState<string>('')
    const [price, setPrice] = useState<number>(0)

    const handleNameChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setPetForm({ ...petForm, name: event.nativeEvent.text })
        setName(event.nativeEvent.text)
    }
    const handleAgeChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setPetForm({ ...petForm, age: parseInt(event.nativeEvent.text) || 0 })
        setAge(parseInt(event.nativeEvent.text) || 0)
    }
    const handleTypeChange = (t: string) => {
        setPetForm({ ...petForm, type: t })
        setType(t)
    }
    const handlePriceChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setPetForm({ ...petForm, price: parseInt(event.nativeEvent.text) } || 0)
        setPrice(parseInt(event.nativeEvent.text) || 0)
    }


    const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPetForm({ ...petForm, location: [0, 0] })
    }




    return (
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}>
            <View style={styles.header}>
                <Image
                    source={require('../.././assets/icon.png')}
                    style={{ width: 55, height: 50, alignContent: 'center' }}
                ></Image>
            </View>
            <ScrollView style={{ height: "100%" }}>
                <View style={styles.container}>
                    <Avatar />
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameInput}>{pet.name}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <View style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Text style={styles.label}>Type:</Text>
                            <Text style={styles.locationInputInactive}>{pet.type}</Text>
                        </View>
                    </View>
                    <View style={styles.textContainer}>
                        <View style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Text style={styles.label}>Age:</Text>
                            <Text style={styles.locationInputInactive}>{pet.age}</Text>
                        </View>
                    </View>
                    <View style={styles.textContainer}>
                        <View style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Text style={styles.label}>Price:</Text>
                            <Text style={styles.locationInputInactive}>${pet.price}</Text>
                        </View>
                    </View>
                    <View style={styles.textContainer}>
                        <View style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Text style={styles.label}>Bio:</Text>
                            <Text style={styles.locationInputInactive}>Adorable!</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    nameContainer: {
        fontWeight: 'bold',
        display: 'flex',
        marginTop: 10,
    },
    nameInput: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        width: '90%',
    },
    priceText: {
        fontSize: 20,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    locationInputInactive: {
        fontSize: 16,
        padding: 10,
        flexGrow: 1,
        marginRight: 10,
    },
});

export default PetProfile;