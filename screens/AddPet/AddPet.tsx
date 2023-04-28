import React, {Component,useState, ChangeEvent, useEffect} from "react";

import {Image, ScrollView,Text,StyleSheet,View,Button,TextInput, NativeSyntheticEvent, TextInputChangeEventData, Dimensions, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, TouchableOpacity} from "react-native";

import Avatar from "./Avatar/Avatar";
import { Picker } from "@react-native-picker/picker";
import ShowMap from "../ShowMap/ShowMap";



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
const {width, height} = Dimensions.get('window')

const petTypes = ["Cat", "Dog", "Fish", "Squirrel","Reptile", "Amphibian","Racoon", "Hamster", "Rabbit", "Spider", "Insect", "Pig"]

const AddPet: React.FC<Props> = ({navigation}) => {
    const [petForm, setPetForm] = useState<Pet>(initPetForm)
    const [name, setName] = useState<string>('')
    const [age, setAge] = useState<number>(0)
    const [type, setType] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [location, setLocation] = useState<Coordinate>([0,0])
    const [showMap, setShowMap] = useState<boolean>(false)
    const initCoordinates: Coordinate = [0,0]
   
    const handleNameChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setPetForm({...petForm, name: event.nativeEvent.text})
        setName(event.nativeEvent.text)
    }
    const handleAgeChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setPetForm({...petForm, age: parseInt(event.nativeEvent.text)||0})
        setAge(parseInt(event.nativeEvent.text)||0)
    }
    function isPetType(type: string): type is Pet['type'] {
        return ["Cat", "Dog", "Fish", "Squirrel", "Reptile", "Amphibian", "Racoon", "Hamster", "Rabbit", "Spider", "Insect", "Pig", ''].includes(type);
      }
    const handleTypeChange = (t:string) => {
        if(!isPetType(t)) return
        setPetForm({...petForm, type: t})
        setType(t)
    }
    const handlePriceChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setPetForm({...petForm, price: parseInt(event.nativeEvent.text)}||0)
        setPrice(parseInt(event.nativeEvent.text)||0)
    }


    const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPetForm({...petForm, location: [0,0]})
        setLocation([0,0])
    }

    useEffect(() => {
        console.log(JSON.stringify(location)==="[0,0]")
        console.log(JSON.stringify(location))
    }, [location])

    function handlePressToProfile() {
        navigation.navigate('UserProfile')
    }


    function handlePressToPetManager() {
        navigation.navigate('PetManager')
    }

    function handlePressToSwipeInterface() {
        navigation.navigate('SwipingInterface')
    }

    return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
        <View style={styles.header}>
            <TouchableOpacity onPress = {handlePressToProfile}>
                <Image 
                    source={require('../.././assets/cancel.png')}
                    style={{width: 50, height: 50, alignContent: 'center'}}
                ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress = {handlePressToSwipeInterface}>
                <Image 
                    source={require('../.././assets/icon.png')}
                    style={{width: 50, height: 50, alignContent: 'center'}}
                ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress = {handlePressToPetManager}>
                <Image 
                    source={require('../.././assets/greencheck.png')}
                    style={{width: 50, height: 50, alignContent: 'center'}}
                ></Image>
            </TouchableOpacity>
        </View>
        <ScrollView style= {{height:'100%'}} >
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
                                return <Picker.Item key={petType} label={petType} value={petType}/>
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
                <View style={styles.locationContainer}>
                    <Text style={styles.locationText}>Location:</Text>
                    <TouchableOpacity style={styles.locationInput} onPress={()=>{
                        setShowMap(!showMap)
                    }}>
                        <Text>{JSON.stringify(location)!=="[0,0]"?`${location[0].toFixed(2)},${location[1].toFixed(2)}`:"Set Location..."}</Text>
                    </TouchableOpacity>
                </View>
                {showMap && 
                <View style={styles.mapContainer}>
                    <ShowMap setLocation={setLocation} setShowMap={setShowMap}/>
                </View>}  
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
        flex: 1,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
    },
    nameContainer: {
        fontWeight: 'bold',
        display: 'flex',
        marginTop: 15,
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
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        width: '90%',
    },
    ageContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
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
        marginTop: 15,
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
    locationContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        width: '90%',
    },
    locationText: {
        fontSize: 20,
    },
    locationInput: {
        fontSize: 20,
        width: '74%',
        height: 50,
        textAlign: 'center',
        borderRadius: 7,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapContainer: {
        width: '80%',
        height: height*0.7,//change this later when you have an active button inside the popup
        position: 'absolute',
        top: '5%',
        left: '10%',
        zIndex: 10000,
        backgroundColor: '#fff',
        borderRadius: 7,
        display: 'flex',
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .25,
    }
});


export default AddPet;