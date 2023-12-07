import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../config';
import { ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const FoodDetail = ({ route }) => {
  const [todoDate, setTodoDate] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [visibleItems, setVisibleItems] = useState(15); // Set the initial number of visible items
  const navigation = useNavigation();
  const { itemId } = route.params;
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateScreenWidth);

    return () => {
      Dimensions.removeEventListener('change', updateScreenWidth);
    };
  }, []);

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
      (itemId === item.Category) &&
      (searchKeyword === '' || item.Name_Korean.toLowerCase().includes(searchKeyword.toLowerCase()))
  );

  const itemsInRows = [];
  for (let i = 0; i < filteredItems.length; i += 3) {
    itemsInRows.push(filteredItems.slice(i, i + 3));
  }

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 15); // Increase the number of visible items
  };

  const containerSize = screenWidth / 3 - 11; // Subtracting margin


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

        {Array.from({ length: Math.ceil(visibleItems / 3) }).map((_, rowIndex) => (
          <View key={rowIndex} style={styles.rowContainer}>
            {filteredItems.slice(rowIndex * 3, (rowIndex + 1) * 3).map((item, index) => (
              <View key={index} style={[styles.itemContainer, { width: containerSize, height: containerSize }]}>
                <Image
                  source={{ uri: item.Image }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.text}>{item.Name_Korean}</Text>
              </View>
            ))}
          </View>
        ))}

        {filteredItems.length > visibleItems && (
          <TouchableOpacity onPress={loadMoreItems} style={styles.loadMoreButton}>
            <Text style={styles.loadMoreButtonText}>Load More</Text>
          </TouchableOpacity>
        )}
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
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
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

  loadMoreButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7373',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  loadMoreButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    overflow: 'show',
  },

});

export default FoodDetail;
