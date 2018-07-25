import React, { Component } from 'react';
import { View, StyleSheet,TouchableOpacity } from 'react-native';

export default class ColorBullet extends Component {
  
  render() {
    if (this.props.size && this.props.size=='double'){
      var active= (this.props.color==this.props.activeColorId)?{borderWidth:4}:{}
      return (
          <TouchableOpacity 
            onPress={()=>{
              if (this.props.onClickColor)
                this.props.onClickColor(this.props.color)
            }} >
            <View style={[styles.bullet, styles.bulletx2, {backgroundColor:this.props.color}, active ]}/>
          </TouchableOpacity>
        );
    }
    else 
      return (
        <View style={[styles.bullet, {backgroundColor:this.props.color}]}/>
      );
  }
}

const styles = StyleSheet.create({
  bullet: {
    backgroundColor: "#056ecf",
    height: 20,
    width: 20,
    
    borderRadius:50,
    borderColor:'silver', borderWidth:1, opacity:.5,
  },
  bulletx2:{
    height: 25,
    width: 25,
    margin:7,
  }
});
