import React, { Component, useState } from 'react'
import { Text, StyleSheet, View, Button, TextInput, Image, TouchableOpacity } from 'react-native'
//import { icon } from '../.././assets'


interface Props {
  navigation: any;
}

const UserProfile: React.FC<Props> = ({ navigation }) => {
  const defaultUserName: string = "John Doe"
  const [userName, setUserName] = useState<string>(defaultUserName);
  const defaultLocation: string = "San Francisco, CA"
  const [location, setLocation] = useState<string>(defaultLocation);
  const [isEditingLocation, setIsEditingLocation] = useState<boolean>(false);
  const defaultEmail: string = "hehe@gmail.com"
  const [email, setEmail] = useState<string>(defaultEmail);
  const defaultPhoneNumber: string = "123-456-7890"
  const [phoneNumber, setPhoneNumber] = useState<string>(defaultPhoneNumber);
  const defaultBio: string = "I love animals!"
  const [bio, setBio] = useState<string>(defaultBio);

  const handleEditLocation = () => {
    setIsEditingLocation(true);
  }

  const handleSaveLocation = () => {
    setIsEditingLocation(false);
  }

  function handlePressToAddPet() {
    navigation.navigate('AddPet')
  }

  function handlePressToSwipeInterface() {
    navigation.navigate('SwipingInterface')
  }

  function handlePressToSearchPet() {
    navigation.navigate('FilterSearch')
  }

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePressToAddPet}>
          <Image
            source={require('../.././assets/plusicon.png')}
            style={{ width: 50, height: 50, alignContent: 'center' }}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressToSwipeInterface}></TouchableOpacity>
        <Image
          source={require('../.././assets/icon.png')}
          style={{ width: 55, height: 50, alignContent: 'center' }}
        ></Image>
        <TouchableOpacity onPress={handlePressToSearchPet}>
          <Image
            source={require('../.././assets/searchicon.png')}
            style={{ width: 50, height: 50, alignContent: 'center' }}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.userNameView}>
          <Text style={styles.userNameText}>{userName}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location:</Text>
          <View style={styles.locationInputContainer}>
            {isEditingLocation ? (
              <>
                <TextInput
                  style={styles.locationInput}
                  value={location}
                  onChangeText={setLocation} />
              </>
            ) : (
              <>
                <Text style={styles.locationInputInactive}>{location}</Text>
              </>
            )}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contact Information:</Text>
          <View style={styles.locationInputContainer}>
            {isEditingLocation ? (
              <>
                <TextInput
                  style={styles.locationInput}
                  value={email}
                  onChangeText={setEmail} />
                <TextInput
                  style={styles.locationInput}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber} />
              </>
            ) : (
              <>
                <Text style={styles.locationInputInactive}> - Email: {email}</Text>
                <Text style={styles.locationInputInactive}> - Phone #: {phoneNumber}</Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bio:</Text>
          <View style={styles.locationInputContainer}>
            {isEditingLocation ? (
              <>
                <TextInput
                  style={styles.locationInput}
                  value={bio}
                  onChangeText={setBio} />
              </>) : (
              <>
                <Text style={styles.locationInputInactive}>{bio}</Text>
              </>)}
          </View>
        </View>
        <View style={styles.editButton}>
          {isEditingLocation ? (
            <Button title="Save" onPress={handleSaveLocation} />
          ) : (
            <Button title="Edit Profile" onPress={handleEditLocation} />)}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
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
export default UserProfile;