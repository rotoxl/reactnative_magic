import React, { Component } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, FlatList,StatusBar  } from 'react-native';
// import { Constants } from 'expo';

import CardRow from './components/CardRow'
import CustomSearchBar from './components/CustomSearchBar'

export default class App extends Component {
  constructor() {
    super()
    this.state={
      loading: false,
      data: [],
      page: 1,
      
      refreshing: false,
      firstload:true, 
      autopagination:false,

      searchquery:null,
      color:null,
    }

    this.tempsearchquery=null
  }

  componentDidMount() {
    // console.log('About to makeRemoteRequest')
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, autopagination, searchquery, color } = this.state;
    var url = `https://api.magicthegathering.io/v1/cards?page=${page}&pageSize=30&contains=imageUrl`

    if (searchquery!=null)
      url+=`&name=${searchquery}`
      
    if (color!=null)
      url+=`&colors=${color}`

    console.log(url)

    fetch(url)
      .then(res => res.json())
      .then(res => {
        // console.log('data!')
        // console.log(res)

        var data
        var nextChunkData=res.cards
        if (page==1)
          data=nextChunkData
        else if (autopagination)
          data=[...this.state.data, ...res.cards]
        else if (searchquery!=null || color!=null)
          data=nextChunkData
        else 
          data=[...this.state.data, ...res.cards]

        this.setState({
          data: data,
          error: res.error || null,
          loading: false,
          refreshing: false,
          firstload:false,
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render(){
    //TODO catch this.state.error and show retry button
    if (this.state.firstload)
      return (<ActivityIndicator style={styles.admonition} size="large"/>)
    else 
      return this.render_list()
  }

  render_list() {
    return (
      <View style={styles.container}>
      <StatusBar />
      
      <CustomSearchBar
          style={styles.searchBar}
          
          value={this.state.searchquery}
          active={this.state.color}
          
          onClickColor={(color) => {
            this.setState({
                searchquery:this.state.searchquery,
                color:color,
                page:1,
                loading:true,
              }, this.makeRemoteRequest )
          }}
          onTextChanged={(value) => {
              this.setState({
                searchquery:value,
                color:this.state.color,
                page:1,
              }, this.makeRemoteRequest )
          }}
          
          onClear={() => {
             this.setState({
                searchquery:null,
                color:null,

                page:1,
                firstload:true,
              }, this.makeRemoteRequest )
          }}
         
          lightTheme={true}
          placeholder='Search by name' 
          /> 
    
      
          <FlatList
            style={{backgroundColor:'white', flex:1}}
            data={this.state.data}
            renderItem={({ item }) => (
              <CardRow
                item={item}
              />
            )}
            keyExtractor={(item, index) => item.id}

            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (this.state.page<10){
                this.setState({
                  page:this.state.page+1,
                  autopagination:true,
                }, this.makeRemoteRequest )
              }
            }}
            ListEmptyComponent={()=>{
              return <Text style={{flex:1, marginTop:50, textAlign:'center'}}>No data matched your criteria</Text>
            }}
            ListFooterComponent={()=> { 
              return (this.state.loading?
                <ActivityIndicator size="large" style={{marginTop: 10}}/>
                :<View/>
                )
            }}
            

          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection:'column',
    
    paddingTop:24, //Constants.statusBarHeight,
    backgroundColor: '#e1e8ee',
  },
  searchBar:{
    height:10,
  },
  admonition:{
    //marginTop:100, flex:1, 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
