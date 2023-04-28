import React from 'react';
import { Button, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import TinderCard from 'react-tinder-card';
import { useMemo, useRef, useState } from 'react';


interface Props {
  navigation: any;
  route: any;
}
const db = [
  { image: require('./petImages/redPanda.png'), id: 1, name: 'Red Panda', age: 5, type: "Rodent", price: 9000, location: [0, 0] },
  { image: require('./petImages/cat.jpeg'), id: 2, name: 'Cat', age: 10, type: "Cat", price: 690, location: [0, 0] },
  { image: require('./petImages/dog.jpeg'), id: 3, name: 'Dog', age: 1, type: "Dog", price: 120, location: [0, 0] }
]
const { width, height } = Dimensions.get('window');
const SwipingInterface: React.FC<Props> = ({ navigation, route }: Props) => {
  const [data, setData] = useState(db)
  const [activeCard, setActiveCard] = useState(data.length - 1)
  const canSwipe = activeCard >= 0

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )
  const swipe = async (dir) => {
    if (canSwipe && activeCard < db.length) {
      await childRefs[activeCard].current.swipe(dir) // Swipe the card!
      setActiveCard(activeCard - 1)
    }
  }

  const pluralDict: any = {
    "Cat": "Cats",
    "Dog": "Dogs",
    "Fish": "Fish",
    "Squirrel": "Squirrels",
    "Reptile": "Reptiles",
    "Amphibian": "Amphibians",
    "Racoon": "Raccoons",
    "Rodent": "Rodents",
    "Rabbit": "Rabbits",
    "Spider": "Spiders",
    "Insect": "Insects",
    "Pig": "Pigs"
  }

  const petJSON = route.params.p

  function handlePressToProfile() {
    navigation.navigate('UserProfile', { p: petJSON });
  }
  function handlePressToMatchesManager() {
    navigation.navigate('PetManager', { p: petJSON });
  }
  function handlePressToFilterSearchInterface() {
    navigation.navigate('FilterSearch', { p: petJSON })
  }
  const onSwipe = (direction: string) => {
    let d: any = data[activeCard]
    if (direction == 'right') {
      if (!(pluralDict[d.type] in petJSON.favorited)) {
        petJSON.favorited[pluralDict[d.type]] = []
      }
      petJSON.favorited[pluralDict[d.type]].push({ name: d.name, age: d.age, type: d.type, price: d.price, location: d.location })
    }
    console.log('You swiped: ' + direction)
    setActiveCard(activeCard - 1)
  }

  const onCardLeftScreen = (myIdentifier: any) => {
    console.log(myIdentifier + ' left the screen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePressToProfile}>
          <Image
            source={require('../.././assets/profileicon.webp')}
            style={{ width: 50, height: 50, alignContent: 'center' }}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressToFilterSearchInterface}>
          <Image
            source={require('../.././assets/searchicon.png')}
            style={{ width: 50, height: 50, alignContent: 'center' }}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressToMatchesManager}>
          <Image
            source={require('../.././assets/14558.png')}
            style={{ width: 50, height: 50, alignContent: 'center' }}
          ></Image>
        </TouchableOpacity>
      </View>
      {data.map((item, index) =>
      (<TinderCard
        key={item.id} //right now it just the number of the image order
        ref={childRefs[index]}
        onSwipe={onSwipe}
        onCardLeftScreen={() => onCardLeftScreen('fooBar')}
        preventSwipe={['up', 'down']}>
        <Image style={
          {
            width: width - 20,
            height: height - 300,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 20,
            top: 20,
            zIndex: index
          }
        } source={item.image}></Image>
        <Text style={styles.animalName}>{item.name}</Text>
      </TinderCard>)
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            backgroundColor: '#fff',
            elevation: 5,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => swipe('left')}>
          <Image
            source={require('./buttonImages/cancel.png')}
            style={{ width: 34, height: 34 }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            backgroundColor: '#fff',
            elevation: 5,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => swipe('right')}>
          <Image
            source={require('./buttonImages/heart.png')}
            style={{ width: 34, height: 34 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
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
  imageSize: {
    width: width,
    height: height * 0.8,
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  buttonContainer: {
    width: '100%',
    height: 100,
    position: 'relative',
    top: height - 275,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  animalName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    top: height - 400,
    zIndex: 100,
    left: 20,
  }
});

export default SwipingInterface;