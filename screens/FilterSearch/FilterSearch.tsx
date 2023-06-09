import React, { Component, useState } from 'react';
import { ScrollView, Text, StyleSheet, View, Button, TextInput, Image, TouchableOpacity } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { Picker } from '@react-native-picker/picker';
import { Chip } from 'react-native-paper';
import petJSON from '../../pets.json'

const petTypes = ["Cat", "Dog", "Fish", "Squirrel", "Reptile", "Amphibian", "Racoon", "Hamster", "Rabbit", "Spider", "Insect"]
interface Props {
  navigation: any;
  route: any;
}
const FilterSearch: React.FC<Props> = ({ navigation, route }) => {
  const [selectedTypes, setselectedTypes] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
  const [selectedAge, setSelectedAge] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('$0-$500');
  const [selectedDistance, setSelectedDistance] = useState<number>(20);

  // const petJSON = route.params.p

  function handlePressToProfile() {
    navigation.navigate('UserProfile', { p: petJSON });
  }
  function handlePressToPetManager() {
    navigation.navigate('PetManager', { p: petJSON });
  }
  function handlePressToSwipeInterface() {
    console.log("search")
    navigation.navigate('SwipingInterface', { p: petJSON })
  }
  const handleSelect = (val: string) => {
    setselectedTypes((prev: string[]) =>
      prev.find((p) => p === val)
        ? prev.filter((cat) => cat !== val)
        : [...prev, val]
    );
  };


  return (
    <View style={styles.biggerContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePressToProfile}>
          <Image
            source={require('../.././assets/profileicon.webp')}
            style={{ width: 50, height: 50, alignContent: 'center' }}
          ></Image>
        </TouchableOpacity>
        <Image
          source={require('../.././assets/icon.png')}
          style={{ width: 55, height: 50, alignContent: 'center' }}
        ></Image>
        <TouchableOpacity onPress={handlePressToPetManager}>
          <Image
            source={require('../.././assets/caticon2.jpg')}
            style={{ width: 50, height: 70, alignContent: 'center', marginTop: 10 }}
          ></Image>
        </TouchableOpacity>
      </View>
      {/* This part ^ is the header of the page, you can reapply it to any page you want */}

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Pet Preferences:</Text>
          <View style={styles.filterContainer}>
            {petTypes.map((typ) => (
              <Chip
                key={typ}
                mode="outlined"
                style={styles.chipItem}
                textStyle={{ fontWeight: '400', color: 'black', padding: 1 }}
                selected={selectedTypes.find((c) => typ === c) ? true : false}
                showSelectedOverlay
                onPress={() => handleSelect(typ)}
              >
                {typ}
              </Chip>
            ))}
          </View>
        </View>
        <View style={styles.genderAndAgeContainer}>
          <View>
            <Text style={styles.label}>Gender:</Text>
            <View style={styles.genderFilterContainer}>
              <Chip
                mode="outlined"
                style={styles.chipItem}
                textStyle={{ fontWeight: '400', color: 'black', padding: 1 }}
                selected={selectedGender === 'male' ? true : false}
                showSelectedOverlay
                onPress={() => setSelectedGender('male')}>
                M
              </Chip>
              <Chip
                mode="outlined"
                style={styles.chipItem}
                textStyle={{ fontWeight: '400', color: 'black', padding: 1 }}
                selected={selectedGender === 'female' ? true : false}
                showSelectedOverlay
                onPress={() => setSelectedGender('female')}>
                F
              </Chip>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Age:</Text>
            <TextInput
              style={styles.ageInput}
              placeholder="Enter age"
              keyboardType="numeric"
              onChangeText={(age) => setSelectedAge(age)}
              value={selectedAge.toString()}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Price Range:</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedPriceRange}
              itemStyle={{ height: 44 }}
              onValueChange={(itemValue, itemIndex) => setSelectedPriceRange(itemValue)}>
              <Picker.Item label="$0-$500" value="$0-$500" />
              <Picker.Item label="$500-$1000" value="$500-$1000" />
              <Picker.Item label="$1000-$2000" value="$1000-$2000" />
              <Picker.Item label="$2000+" value="$2000+" />
            </Picker>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Distance:</Text>
          <View style={styles.mileDisplay}><Text>{selectedDistance} Miles</Text></View>
          <Slider
            minimumValue={20}
            maximumValue={100}
            step={10}
            value={selectedDistance}
            onValueChange={(value) => setSelectedDistance(Number(value))} />
        </View>
        <View>
          <TouchableOpacity style={styles.searchButton} onPress={handlePressToSwipeInterface}>
            <Text style={{ fontSize: 26, textAlign: 'center' }}>Search for purrfect match!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  biggerContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1
  },
  content: {
    padding: 16
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  chipItem: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  genderAndAgeContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  genderFilterContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  ageInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    padding: 5,
    marginVertical: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    marginVertical: 10,
    height: 44,
  },
  mileDisplay: {
    alignItems: 'center',
  },
  searchButton: {
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
});

export default FilterSearch;