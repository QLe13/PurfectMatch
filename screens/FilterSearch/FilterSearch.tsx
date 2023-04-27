import React, { Component, useState } from 'react';
import { ScrollView, Text, StyleSheet, View, Button, TextInput } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Chip } from 'react-native-paper';

const petTypes = ["Cat", "Dog", "Fish", "Squirrel", "Reptile", "Amphibian", "Racoon", "Hamster", "Rabbit", "Spider", "Insect"]
interface Props {
  navigation: any;
}
const FilterSearch: React.FC<Props> = ({ navigation }) => {
  const [selectedTypes, setselectedTypes] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
  const [selectedAge, setSelectedAge] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('$0-$500');
  const [selectedDistance, setSelectedDistance] = useState<number>(20);
  function handlePressToProfile() {
    navigation.navigate('UserProfile');
  }
  function handlePressToPetManager() {
    navigation.navigate('PetManager');
  }
  function handlePressToSwipeInterface() {
    console.log("search")
    navigation.navigate('SwipingInterface')
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
        <Button title="Profile" onPress={handlePressToProfile} />
        <Text style={styles.headerText}>Purfect Match</Text>
        <Button title="Pet Manager" onPress={handlePressToPetManager} />
      </View>
      {/* This part ^ is the header of the page, you can reapply it to any page you want */}

      <ScrollView contentContainerStyle={styles.container}>
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
          <Button title="Search for purfect match!" onPress={handlePressToSwipeInterface}          />
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
  },
  mileDisplay: {
    alignItems: 'center',
  }
});

export default FilterSearch;