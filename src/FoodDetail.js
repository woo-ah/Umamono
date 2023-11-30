import { View, Text, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../config';
import { ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const FoodDetail = ({ route }) => {
  const [todoDate, setTodoDate] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigation = useNavigation();
  const { itemId } = route.params;

  useEffect(() => {
    const starCountRef = ref(db, 'ConvenienceStore/FamilyMart/product/');

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setTodoDate(newPosts);
    });
  }, []);

  const filteredItems = todoDate.filter(
    (item) =>
      (itemId === item.Category) && (searchKeyword === '' || item.Name_Korean.toLowerCase().includes(searchKeyword.toLowerCase()))
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>카테고리</Text>
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
          <View key={index}>
            <Image source={{ uri: item.Image }} style={styles.image} />
            <Text style={styles.text}>{item.Name_Korean}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 80,
    fontWeight: 'bold',
    marginBottom: 20,

  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
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
});

export default FoodDetail;
