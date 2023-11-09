import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


const TermsOfUse = () => {
  const [agreed, setAgreed] = useState(false);
  const [details, setDetails] = useState([false, false, false, false]);
  const navigation = useNavigation(); // 네비게이션 훅 사용
  const route = useRoute();
  const { email, password, nickName } = route.params;
  
  
  const handleCheckboxToggle = () => {
    setAgreed(prevState => !prevState);
  };

  const handleDetailToggle = index => {
    setDetails(prevState =>
      prevState.map((detail, i) => (i === index ? !detail : detail))
    );
  };

  const handleAllCheckboxes = () => {
    if (details.every(detail => detail)) {
      setDetails(prevState => prevState.map(() => false));
    } else {
      setDetails(prevState => prevState.map(() => true));
    }
  };

  const handleNext = () => {
    if (agreed && details.every(detail => detail)) {
      registerUser(email, password, nickName);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TermsOfUse</Text>
      {details.map((detail, index) => (
        <View key={index} style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => handleDetailToggle(index)} style={styles.checkbox}>
            {detail && <Text>?</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDetailToggle(index)}>
            <Text>TermsOfUse {index + 1} Detail</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={handleAllCheckboxes} style={styles.checkbox}>
          {details.every(detail => detail) && <Text>?</Text>}
        </TouchableOpacity>
        <Text>All Agree</Text>
      </View>
      <TouchableOpacity onPress={()=>registerUser(email, password, nickName)} style={styles.nextButton}>
        <Text style={[styles.nextButtonText, agreed && details.every(detail => detail) && styles.nextButtonTextActive]}>Next</Text>
        
      </TouchableOpacity>
    </View>
  );
};

export default TermsOfUse;

const styles = StyleSheet.create({

  container: {
    flex: 1, 
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between', // Adjusted to space items evenly
    paddingTop: 40, // Added paddingTop to create space between text inputs and top edge
    paddingBottom: 0, // Added paddingBottom to create space between button and bottom edge
},
  header: {
    fontWeight: 'bold',
    fontSize: 23,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    height: 100,
    width: 400,
    backgroundColor: '#FF7373',
    alignItems: 'center',
    justifyContent: 'center',
   
    marginBottom:0,
  },
  nextButtonTextActive: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#ff69b4', // 핑크색
  },
  nextButtonTextInactive: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#ccc', // 회색
  },

  nextButtonText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'white', // 검정색
  },

  nextButtonTextActive: {
    color: '#ff69b4', // 핑크색
  },
});
