/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import { StyleSheet,
    Text,
    View,
  TouchableOpacity
}  from 'react-native';


export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>123</Text>
        </View>
        <View style={styles.calculations}>
          <Text style={styles.calculationsText}>123</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button}>
                <Text>0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text>{'0'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}><Text>{'0'}</Text></TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button}><Text>{'0'}</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button}><Text>{'0'}</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button}><Text>{'0'}</Text></TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity style={styles.button}><Text>{'0'}</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button}><Text>{'0'}</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button}><Text>{'0'}</Text></TouchableOpacity></View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button}><Text>{'0'}</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button}><Text>{'0'}</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button}><Text>{'0'}</Text></TouchableOpacity></View>
          </View>
          <View style={styles.operations}>
            <TouchableOpacity style={styles.button}><Text>{'0'}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text>{'0'}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text>{'0'}</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text>{'0'}</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  result:{
    flex:2,
    backgroundColor:'green',
    justifyContent:'center',
    alignItems: 'flex-end'
  },
  resultText:{
    fontSize: 25,
    color: 'white'
  },
  calculations:{
    flex:1,
    backgroundColor: 'gray'
  },
  calculationsText: {
    fontSize: 14,
    color: 'white',
    justifyContent:'center',
    alignItems: 'flex-end'
  },
  buttons:{
    flex: 6,
    flexDirection: 'row'
  },
  numbers:{
    flex: 3,
    backgroundColor: 'yellow'
  },
  operations:{
    flex:1,
    justifyContent: 'space-around',
    backgroundColor: 'orange'
  },
  row:{
    flexDirection:  'row',
    flex:1,
    justifyContent:'space-around',
    alignItems:'center'
  },
  button:{
    flex:1,
    alignItems:'center',
    alignSelf:'stretch',
    justifyContent: 'center'
  },
  buttonsText:{
    justifyContent:'center',
    alignItems:'center'
  }
})
