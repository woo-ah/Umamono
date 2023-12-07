import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { db } from '../config';
import { ref, onValue } from 'firebase/database';

const Food = ({ route }) => {
  const [itemData, setItemData] = useState(null);
  const { itemId, store } = route.params;

  useEffect(() => {
    const starCountRef = ref(db, 'ConvenienceStore/' + store + '/product/' + itemId);

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setItemData(data);
    });
  }, [itemId, store]);


    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{itemId} 상세페이지</Text>
        </View>
  
        <View style={styles.content}>
          {itemData && (
            <View style={styles.itemContainer}>
              <Image source={{ uri: itemData.Image }} style={styles.image} />
              <Text style={styles.text}>이름: {itemData.Name}</Text>
              <Text style={styles.text}>번역이름: {itemData.Name_Korean}</Text>
              <Text style={styles.text}>가격: {itemData.Price}¥</Text>
              {/* 다른 필드들도 필요한 만큼 추가 */}
            </View>
          )}
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      backgroundColor: '#FF7373',
      paddingVertical: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: 80,
      fontWeight: 'bold',
      marginBottom: 20,
  
    },
    content: {
      flex: 1,
      paddingTop: 30,
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    itemContainer: {
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 10,
      marginBottom: 20,
    },
    text: {
      fontSize: 18,
      marginVertical: 5,
    },
  });
  
  export default Food;