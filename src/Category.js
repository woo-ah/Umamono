import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Category = () => {

  const navigation = useNavigation();

  const handlePress = (storeName) => {
    // Navigate to ConvenienceStore screen and pass the storeName as a parameter
    navigation.navigate('ConvienceStore', { store: storeName });
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>카테고리</Text>
      </View>
      <ScrollView style={styles.category}>
        <View style={styles.categoryItem}>
          <Image
            style={styles.categoryImage}
            source={require('../assets/popular_menu.png')}
            resizeMode="cover"
          />
        </View>
        <TouchableOpacity style={styles.categoryItem} onPress={() => handlePress('FamilyMart')}>
          <Image
            style={styles.categoryImage}
            source={require('../assets/store_familymart.png')}
            resizeMode="cover"
          />
        </TouchableOpacity>
        
        <View style={styles.categoryItem}>
          <Image
            style={styles.categoryImage}
            source={require('../assets/store_seveneleven.png')}
            resizeMode="cover"
          />
        </View>

        <TouchableOpacity style={styles.categoryItem} onPress={() => handlePress('LAWSON')}>
          <Image
            style={styles.categoryImage}
            source={require('../assets/store_lawson.png')}
            resizeMode="cover"
          />
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#FF7373',
    flex: 0.15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop : 40,
  },
  category: {
    flex: 0.65,
    
  },
  categoryItem: {
    width: '100%',
    marginBottom: 7,
    alignItems: 'center',
  },
  categoryImage: {
    flex: 1, // 이미지를 카테고리 아이템에 꽉 채우도록 설정
    borderRadius: 15,
  },
  footer: {
    flex: 0.2,
  },
  footerImage: {
    width: '100%',
    height: '100%',
  },
});

export default Category;