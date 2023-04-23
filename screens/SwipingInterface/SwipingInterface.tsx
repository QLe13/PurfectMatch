import React from 'react';
import {Button, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import { black } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import TinderCard from 'react-tinder-card';

interface Props {
  navigation: any;
}
const {width, height} = Dimensions.get('window');
const SwipingInterface = ({navigation}: Props) => {
  const [data, setData] = React.useState([
    {image: require('./petImages/redPanda.png'),id:1, name: 'Red Panda'},
    {image: require('./petImages/cat.jpeg'),id:2, name: 'Cat'},
    {image: require('./petImages/dog.jpeg'),id:3, name: 'Dog'}])
  const [activeCard, setActiveCard] = React.useState(data.length-1)
  function handlePressToProfile() {
    navigation.navigate('UserProfile');
  }
  function handlePressToMatchesManager() {
    navigation.navigate('MatchesManager');
  }
  const onSwipe = (direction: string) => {
    console.log('You swiped: ' + direction)
    setActiveCard((activeCard + 1)&(data.length-1))
  }
  
  const onCardLeftScreen = (myIdentifier:any) => {
    console.log(myIdentifier + ' left the screen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Profile" onPress={handlePressToProfile} />
        <Text style={styles.headerText}>Purfect Match</Text>
        <Button title="Message" onPress={handlePressToMatchesManager} />
      </View>
        {data.map((item, index) => 
          (<TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['up', 'down']}>
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
            }}>
            <Image
              source={require('./buttonImages/cancel.png')}
              style={{width: 34, height: 34}}
            />
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
            }}>
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
});

export default SwipingInterface;