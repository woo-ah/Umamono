import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../config';
import { ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const ConvienceStore = () => {
  const [todoDate, setTodoDate] = useState([]);
  const navigation = useNavigation();
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const starCountRef = ref(db, 'ConvenienceStore/FamilyMart/Category/');

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
    navigation.navigate('FoodDetail', { itemId });
  };

  const filteredItems = todoDate.filter(
    (item) =>
      (searchKeyword === '' || item.id.toLowerCase().includes(searchKeyword.toLowerCase()))
  );

  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.title}>FamilyMart</Text>
  //     {todoDate.map((item, index) => {
  //       return (
  //         <TouchableOpacity key={index} onPress={() => handleItemPress(item.id)}>
  //           <View>
  //           <Image source={{ uri: item.url }} style={styles.image} />
  //             <Text style={styles.text}>{item.id}</Text>

              
  //           </View>
  //         </TouchableOpacity>
  //       );
  //     })}
  //   </View>
  // );


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>FamilyMart</Text>
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
   
        {filteredItems.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handleItemPress(item.id)}>
          <View key={index}>
            <Image source={{ uri: item.url }} style={styles.image} />
            <Text style={styles.text}>{item.id}</Text>
          </View>
         </TouchableOpacity>
        
        ))}
      </View>
    </ScrollView>
  );


};

const styles = StyleSheet.create({
  container:{
      flex: 1, 
      backgroundColor: '#fff',
      
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
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius:20,
    marginBottom:10,
    marginTop: 10,
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
  }
})

export default ConvienceStore