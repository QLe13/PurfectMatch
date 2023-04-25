import React, {Component,useState, ChangeEvent, useEffect} from "react";
import {ScrollView,Text,StyleSheet,View,Button,TextInput, NativeSyntheticEvent, TextInputChangeEventData, Dimensions, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform} from "react-native";
import Avatar from "./Avatar/Avatar";
import { Picker } from "@react-native-picker/picker";




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

const petTypes = ["Cat", "Dog", "Fish", "Squirrel","Reptile", "Amphibian","Racoon", "Hamster", "Rabbit", "Spider", "Insect", "Pig"]

const AddPet: React.FC<Props> = ({navigation}) => {
    const [petForm, setPetForm] = useState<Pet>(initPetForm)
    const [name, setName] = useState<string>('')
    const [age, setAge] = useState<number>(0)
    const [type, setType] = useState<string>('')
    const [price, setPrice] = useState<number>(0)

    const handleNameChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setPetForm({...petForm, name: event.nativeEvent.text})
        setName(event.nativeEvent.text)
    }
    const handleAgeChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setPetForm({...petForm, age: parseInt(event.nativeEvent.text)||0})
        setAge(parseInt(event.nativeEvent.text)||0)
    }
    const handleTypeChange = (t:string) => {
        setPetForm({...petForm, type: t})
        setType(t)
    }
    const handlePriceChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setPetForm({...petForm, price: parseInt(event.nativeEvent.text)}||0)
        setPrice(parseInt(event.nativeEvent.text)||0)
    }


    const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPetForm({...petForm, location: [0,0]})
    }




    return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}>
        <View style={styles.header}>
            <Button title="Add Pet" onPress={()=>{}} />
            <Text style={styles.headerText}>Purfect Match</Text>
            <Button title="Find Pet" onPress={()=>{}} />
        </View>
        <ScrollView>
            <View style={styles.container}>
                <Avatar />
                <View style={styles.nameContainer}>
                    <TextInput style={styles.nameInput} value={name} onChange={handleNameChange} placeholder="Name:"/>
                </View>
                <View style={styles.typeContainer}>
                    <View style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                        <Text style={{fontSize: 20}}>Type:</Text>
                    </View>
                    <View style={styles.picker}>
                        <Picker selectedValue={type}
                        onValueChange={(itemValue,index) => handleTypeChange(itemValue)}
                        numberOfLines={1}
                        itemStyle={{ height: 50, opacity: 1}}> 
                            {petTypes.map((petType) => {
                                return <Picker.Item label={petType} value={petType}/>
                            })}
                        </Picker>
                    </View>
                    <View style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                        <Text>^</Text>
                        <Text style={{transform:[{ rotateX: '180deg' }]}}>^</Text>
                    </View>
                </View>
                <View style={styles.ageContainer}>
                    <View style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                            <Text style={{fontSize: 20}}>Age:</Text>
                    </View>

                        <TextInput style={styles.ageInput} value={age.toString()} onChange={handleAgeChange} keyboardType="numeric"/>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>$$$:</Text>
                    <TextInput
                        style={styles.priceInput}
                        value={price.toString()}
                        onChange={handlePriceChange}
                        keyboardType="numeric"
                        placeholder="Price:"
                    />
                </View>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
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
        display: 'flex',
        width: '85%',
        borderRadius: 2,
        height: 50,
      },
    typeContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        width: '90%',
    },
    ageContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        width: '90%',

    },
    ageInput: {
        fontSize: 20,
        width: '86%',
        height: 50,
        textAlign: 'center',
        borderRadius: 7,
        backgroundColor: '#fff',
    },
    priceContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        width: '90%',
    },
    priceText: {
        fontSize: 20,
    },
    priceInput: {
        fontSize: 20,
        width: '86%',
        height: 50,
        textAlign: 'center',
        borderRadius: 7,
        backgroundColor: '#fff',
    },
});


export default AddPet;