import React, { Component, useState, useEffect } from 'react'
// import petJSON from '../../pets.json'
import { Text, StyleSheet, View, Button, TextInput, SectionList, Image, TouchableOpacity } from 'react-native'

interface Props {
    navigation: any;
    route: any;
}

type PetList = {
    title: string,
    data: Pet[]
}[]

const PetManager: React.FC<Props> = ({ navigation, route }) => {
    const init: PetList = [{ title: "No Pets Yet", data: [] }]
    const [petList, setPetList]: [PetList, React.Dispatch<React.SetStateAction<PetList>>] = useState(init)

    const petJSON = route.params.p

    function handlePressToFilterSearch() {
        navigation.navigate('FilterSearch', { p: petJSON });
    }
    function handlePressToUserProfile() {
        navigation.navigate('UserProfile', { p: petJSON });
    }

    const [update, setUpdate] = useState(true)
    const [myPetsUpdate, setMyPetsUpdate] = useState(true)
    const [favoritedUpdate, setFavoritedUpdate] = useState(false)
    const [requestsUpdate, setRequestsUpdate] = useState(false)

    function pullData(list: string) {
        const myPets: any = petJSON[list]
        let petList = []
        for (let k in myPets) {
            let lst = []
            for (let pet of myPets[k]) {
                lst.push(pet)
            }
            petList.push({ title: k, data: lst })
        }
        return petList
    }

    function myPets() {
        let petList = pullData('myPets')
        setPetList(petList)
        setUpdate(!update)
        setMyPetsUpdate(true)
        setFavoritedUpdate(false)
        setRequestsUpdate(false)
    }

    function favorited() {
        let petList = pullData('favorited')
        setPetList(petList)
        setUpdate(!update)
        setMyPetsUpdate(false)
        setFavoritedUpdate(true)
        setRequestsUpdate(false)
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
                <Image
                    source={require('../.././assets/icon.png')}
                    style={{ width: 55, height: 50, alignContent: 'center' }}
                ></Image>
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
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    topButton: {
        paddingHorizontal: 60,
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