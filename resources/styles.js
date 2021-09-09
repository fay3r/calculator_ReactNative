const React = require('react-native');
const {StyleSheet} = React;

export default {
  container: {
    flex: 1,
  },
  result: {
    flex: 1.5,
    backgroundColor: '#4e4f4d',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  resultText: {
    fontSize: 25,
    color: 'white',
    paddingEnd: 15,
  },
  calculations: {
    flex: 1.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 1,
  },
  calculationsText: {
    flex: 3,
    fontSize: 30,
    color: 'black',
    alignItems: 'center',
    alignSelf: 'stretch',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  calulationsSign: {
    flex: 1,
    fontSize: 40,
    color: 'black',
    alignSelf: 'stretch',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  numbers: {
    flex: 6,
    alignContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    backgroundColor: 'black',
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'black',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%',
    margin: 0.2,
  },
  buttonsText: {
    fontSize: 25,
  },
  button2: {
    flex: 2,
  },
  opButton: {
    flex: 2,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'orange',
    margin: 1,
  },
};
