import React from 'react';
import {Button, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity}   from 'react-native';
import TinderCard from 'react-tinder-card';
import { useMemo, useRef, useState } from 'react';


interface Props {
  navigation: any;
}
const db = [
  {image: require('./petImages/redPanda.png'),id:1, name: 'Red Panda'},
  {image: require('./petImages/cat.jpeg'),id:2, name: 'Cat'},
  {image: require('./petImages/dog.jpeg'),id:3, name: 'Dog'}
]
const {width, height} = Dimensions.get('window');
const SwipingInterface:React.FC<Props> = ({navigation}: Props) => {
  const [data, setData] = useState(db)
  const [activeCard, setActiveCard] = useState(data.length-1)
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

  
  function handlePressToProfile() {
    navigation.navigate('UserProfile');
  }
  function handlePressToMatchesManager() {
    navigation.navigate('PetManager');
  }
  function handlePressToSwipeInterface() {
    navigation.navigate('SwipingInterface')
  }
  const onSwipe = (direction: string) => {
    console.log('You swiped: ' + direction)
    setActiveCard(activeCard - 1)
  }
  
  const onCardLeftScreen = (myIdentifier:any) => {
    console.log(myIdentifier + ' left the screen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePressToProfile}>  
          <Image 
            source={require('../.././assets/profileicon.webp')}
            style={{width: 50, height: 50, alignContent: 'center'}}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress = {handlePressToSwipeInterface}>
          <Image 
            source={require('../.././assets/icon.png')}
            style={{width: 50, height: 50, alignContent: 'center'}}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressToMatchesManager}>
          <Image 
            source={require('../.././assets/14558.png')}
            style={{width: 50, height: 50, alignContent: 'center'}}
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
              width: width-20,
              height: height-300,
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
              style={{width: 34, height: 34}}/>
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
            onPress={()=> swipe('right')}>
            <Image
              source={require('./buttonImages/heart.png')}
              style={{width: 34, height: 34}}
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
    backgroundColor: '#fff',
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
  imageSize : {
    width: width,
    height: height*0.8,
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '100%',
    height: 100,
    position: 'relative',
    top: height-275,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  animalName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    top: height-400,
    zIndex: 100,
    left: 20,
  }
});

export default SwipingInterface;