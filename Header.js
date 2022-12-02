import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Header extends Component {
  render() {
    return (
    <View style={styles.container}>
        <Text style={styles.title}>Academic Chat Bot</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        marginTop : 40, 
        height : 60,
        textAlignVertical : 'center',
        justifyContent: 'center',
        
      // padding: 5,
    },
    title: {
        fontSize : 25,
        fontWeight : 'bold',
        textSize : 25,
        textAlign : 'center',
        textAlignVertical : 'center',
    }
  });

export default Header;