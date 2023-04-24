import React, {Component,useState, ChangeEvent} from "react";

import {ScrollView,Text,StyleSheet,View,Button,TextInput, NativeSyntheticEvent, TextInputChangeEventData, Dimensions} from "react-native";
import Avatar from "./Avatar/Avatar";
import { Picker } from "@react-native-picker/picker";


const {height, width} = Dimensions.get('window')

interface Props {
    navigation: any;
}

const initPetForm: Pet = {
    name: '',
    age: 0,
    type: '',
    price: 0,
    location: [0,0],
}

const petTypes = ["Cat", "Dog", "Fish", "Squirrel","Reptile", "Amphibian","Racoon", "Hamster", "Rabbit", "Spider", "Insect"]

const AddPet: React.FC<Props> = ({navigation}) => {
    const [petForm, setPetForm] = useState<Pet>(initPetForm)
    const [name, setName] = useState<string>('')
    const [age, setAge] = useState<number>(0)
    const [type, setType] = useState<string>('Cat')
    const [price, setPrice] = useState<number>(0)

    const handleNameChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setPetForm({...petForm, name: event.nativeEvent.text})
        setName(event.nativeEvent.text)
    }
    const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPetForm({...petForm, age: parseInt(event.target.value)})
        setAge(parseInt(event.target.value))
    }
    const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPetForm({...petForm, type: event.target.value})
        setType(event.target.value)
    }
    const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPetForm({...petForm, price: parseInt(event.target.value)})
        setPrice(parseInt(event.target.value))
    }
    const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPetForm({...petForm, location: [0,0]})
    }

    return (

        <View>
            <View style={styles.header}>
                <Button title="Add Pet" onPress={()=>{}} />
                <Text style={styles.headerText}>Purfect Match</Text>
                <Button title="Find Pet" onPress={()=>{}} />
            </View>
            <View style={styles.container}>
                <Avatar />
                <View style={styles.nameContainer}>
                    <TextInput style={styles.nameInput} value={name} onChange={handleNameChange} placeholder="Name:"/>
                </View>
                <View style={styles.typeContainer}>
                    <View style={styles.picker}>
                        <Picker selectedValue={type}
                        onValueChange={(itemValue, itemIndex) => setType(itemValue)}> 
                            {petTypes.map((petType) => {
                                return <Picker.Item label={petType} value={petType} />
                            })}
                        </Picker>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
      headerText: {
        fontSize: 20,
        fontWeight: 'bold',
      },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
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
    picker: {
        width: width,
        borderColor: '#ccc',
        borderRadius: 2,
        height: 1,
      },
    typeContainer: {
        display: 'flex',
        marginTop: 10,
    },

});


export default AddPet;