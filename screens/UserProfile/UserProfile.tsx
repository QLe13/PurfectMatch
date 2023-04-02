import React, { Component, useState } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'

interface Props {
  navigation: any;
}

const UserProfile: React.FC<Props> = ({ navigation }) => {
  const defaultUserName:string = "John Doe"
  const [userName, setUserName] = useState<string>(defaultUserName);
  const defaultLocation:string = "San Francisco, CA"
  const [location, setLocation] = useState<string>(defaultLocation);

{
    return (
      <View>
        <View style={styles.header}>
          <Button title="Add Pet" onPress={()=>{}} />
          <Text style={styles.headerText}>Purfect Match</Text>
          <Button title="Find Pet" onPress={()=>{}} />
        </View>
        <View style={styles.container}>
          <View style={styles.userNameView}>
              <Text style={styles.userNameText}>{userName}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Location:</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
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
  }
})

export default UserProfile;