import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import ColorBullet from './ColorBullet'
import { ListItem } from "react-native-elements"

export default class CardRow extends Component {
  render() {
    var item=this.props.item
    var colorList=[]

    if (item.colors==null)
        return colorList

    for (var i=0; i<item.colors.length; i++){
        var c=item.colors[i].toLowerCase()
        colorList.push (<ColorBullet color={c} key={c}/> ) 
    }
    
    
    return (
      <View style={styles.row} >

          <Image style={styles.logo} 
                source={{uri: item.imageUrl}}
                style={{width: 80, height: 80, marginRight:16, 
                resizeMode:'contain'}} />
        

        <View style={styles.sideContainer}>  
          <Text style={styles.title}>
            {item.name}
          </Text>
          {this.conditionalRender(item.setName, styles.subtitle)}
            
        <View style={styles.stats}>
            {this.cellRender('Type', item.type)}
            
            <View style={[styles.statsCell, {borderRightWidth:0}]}>
                <Text>
                    Colors
                </Text>
                <View style={styles.colorsContainer}>
                    {colorList}
                </View>
            </View>

          
          
        </View>
      </View>
      </View>
    );
  }
  cellRender(title, value){
      if (value==null)
        return (<View/>)
        
      return (
        <View style={styles.statsCell}>
            <Text>
                {title}
            </Text>
            <Text style={styles.statsCellValue}>
                {value}
            </Text>
        </View>)
  }
  conditionalRender(data, style){
    if (data==null)
        return (<View/>)
    else
        return (<Text style={style}>{data}</Text>)
  }
}

const styles = StyleSheet.create({
  row: {
      flex:1, 
      flexDirection:'row', 
      borderBottomWidth:1,
      borderColor:'#eee',

      padding:9,
  },
  line:{
    borderBottomWidth:1,
    borderColor:'#eee',
    marginTop:8, marginBottom:8, 
    
    width:180,
  },
  sideContainer:{
    flex:1,
  },
  title:{
    
    fontSize:18,
  },
  subtitle:{
    color:'gray'
  },
  colorsContainer:{
      marginBottom:6,
      marginTop:6,
      flexDirection:'row',

      alignSelf:'center'
  },
  logo:{
      margin:16,
      height:100, 
      width:100,
  },
  stats:{
      flexDirection:'row',
      marginTop:8, marginLeft:-6,

  },
  statsCell:{
    flexDirection:'column',
    borderRightWidth:1,
    borderColor:'#eee',
    
    paddingRight:6,
    paddingLeft:6,
  },
  statsCellValue:{
    marginTop:6,
    fontWeight:'bold',
    textAlign:'center'
  }

  
});
