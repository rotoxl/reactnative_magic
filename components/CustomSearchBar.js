import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { SearchBar,Button } from 'react-native-elements'

import ColorBullet from './ColorBullet'

export default class CustomSearchBar extends Component {
  render() {
    return (
      <View style={styles.searchBarContainer}>
        <View style={{flex: 1, flexDirection:'column'}}>
          <SearchBar
              value={this.tempsearchquery}
              
              onChangeText={(value) => {
                this.tempsearchquery=value
                if (this.to)
                  clearTimeout(this.to) 
    
                this.to=setTimeout(() => {
                  console.log('fire!')
                  this.props.onTextChanged(this.tempsearchquery)
                }, 500)
                console.log('wait 500+')
    
              }}
            
              lightTheme={true}
              placeholder='Search by name' 
              />
              
            <View style={styles.colorContainer}>
              <Text style={{marginRight:16, marginTop:12,}}>Filter by color</Text>
              <ColorBullet size="double" activeColorId={this.props.active} color='red'  onClickColor={this.props.onClickColor}/>
              <ColorBullet size="double" activeColorId={this.props.active} color='blue'  onClickColor={this.props.onClickColor}/>
              <ColorBullet size="double" activeColorId={this.props.active} color='green' onClickColor={this.props.onClickColor}/>
              <ColorBullet size="double" activeColorId={this.props.active} color='white' onClickColor={this.props.onClickColor}/>
              <ColorBullet size="double" activeColorId={this.props.active} color='black' onClickColor={this.props.onClickColor}/>
            </View>
        </View>
        <Button 
            style={{width:30, marginTop:16,}} icon={{name: 'clear', type: 'material'}}
            color='black'
            onPress={this.props.onClear}
            />
        
        
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  searchBarContainer:{
    backgroundColor: '#e1e8ee',
    height:90,
    
    flexDirection: 'row',
    
    }, 
  colorContainer:{      
    flexDirection:'row',
    //alignSelf:'start', 
    marginLeft:16, 
    }
});
