import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../config';
import { ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const ConvienceStore = () => {
  const [todoDate, setTodoDate] = useState([]);
  const navigation = useNavigation();
  const [searchKeyword, setSearchKeyword] = useState('');
  const route = useRoute();
  const { store } = route.params;

  useEffect(() => {
    const starCountRef = ref(db, 'ConvenienceStore/' + store + '/Category/');


    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setTodoDate(newPosts);
    });
  }, []);

  const handleItemPress = (itemId) => {
    navigation.navigate('FoodDetail', { itemId, store });
  };

  const filteredItems = todoDate.filter(
    (item) =>
      (searchKeyword === '' || item.id.toLowerCase().includes(searchKeyword.toLowerCase()))
  );

  const itemsInRows = [];
  for (let i = 0; i < filteredItems.length; i += 3) {
    itemsInRows.push(filteredItems.slice(i, i + 3));
  }


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>{store}</Text>
            <View style={styles.searchContainer}>
            <Feather name="search" size={24} color="black" style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                onChangeText={(text) => setSearchKeyword(text)}
                value={searchKeyword}
            />
            </View>
        </View>
   
        {itemsInRows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.rowContainer}>
            {row.map((item, colIndex) => (
              <TouchableOpacity key={colIndex} onPress={() => handleItemPress(item.id)}>
                <View style={styles.gridItem}>
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: item.url }} style={styles.image} />
                  </View>
                  <Text style={styles.text}>{item.id}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );


};

const styles = StyleSheet.create({
  container:{
      flex: 1, 
      backgroundColor: '#f1f1f1',
      
  },
  title:{
    fontSize: 20,
    textAlign: 'center',
    marginTop: 80,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text:{
    fontSize:15,
    textAlign:'center',
    fontWeight: 'bold',
    
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderColor:'white',
    height:45,
    marginBottom: 20,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: 'gray',
    fontSize: 20,
    marginLeft: 20,
    marginRight: 0,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 15,

  },
  header:{
    backgroundColor: '#FF7373'
  },
  gridContainer: {
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
  },
})

export default ConvienceStore