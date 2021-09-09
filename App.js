import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {Text, View, ToastAndroid, Dimensions} from 'react-native';
import styles from './resources/styles';
import OwnTouchableOpacity from './components/OwnTouchableOpacity';
import {LANDSCAPE_BUTTONS, PORTRAIT_BUTTONS} from './resources/constants';

const mexp = require('math-expression-evaluator');

// const logo = require('./android/app/src/main/res/drawable/splash_icon.png');

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  constructor() {
    super();

    const isLandscape = () => {
      const resolution = Dimensions.get('window');
      return resolution.height < resolution.width;
    };

    this.state = {
      resultText: '',
      calculations: '0',
      numSign: '+',
      operationSign: '',
      isDot: false,
      screenWidth: null,
      screenHeight: null,
      landscape: isLandscape(),
      available: false,
    };

    Dimensions.addEventListener('change', () => {
      this.setState({
        landscape: isLandscape(),
      });
    });
  }

  buttonPressed(text) {
    if (text === 'AC') {
      this.setState({
        resultText: '',
        calculations: '0',
        numSign: '+',
        operationSign: '',
        isDot: false,
        available: false,
      });
    } else if (this.state.calculations !== 'Infinity') {
      if (
        text === '1' ||
        text === '2' ||
        text === '3' ||
        text === '4' ||
        text === '5' ||
        text === '6' ||
        text === '7' ||
        text === '8' ||
        text === '9' ||
        text === '0'
      ) {
        this.setState({
          calculations:
            this.state.calculations === 0 && this.state.isDot === false
              ? text
              : this.state.calculations + text.toString(),
          available: true,
        });
      } else if (text === '.') {
        if (this.state.isDot === false) {
          this.setState({
            isDot: true,
            calculations:
              this.state.calculations === ''
                ? '0.'
                : this.state.calculations + '.',
          });
        }
      } else if (text === '+/-') {
        let tempString = this.state.calculations.toString();
        let minTempString = tempString.substring(1, tempString.length);
        if (this.state.calculations !== 0) {
          this.setState({
            calculations:
              this.state.numSign === '+' ? '-' + tempString : minTempString,
            numSign: this.state.numSign === '+' ? '-' : '+',
          });
        }
      } else if (text === '=') {
        if (this.state.resultText !== '') {
          let result = mexp.eval(
            this.state.resultText + this.state.calculations,
          );
          this.setState({
            operationSign: '',
            calculations: result,
            resultText: '',
            numSign: result < 0 ? '-' : '+',
            available: true,
          });
        }
      } else if (text === '%') {
        if (this.state.calculations !== 0) {
          this.setState({
            calculations: this.state.calculations / 100,
            isDot: this.state.calculations < 99,
          });
        }
      } else if (text === 'pi') {
        this.setState({
          calculations: 'pi',
          available: true,
        });
      } else if (text === 'e') {
        this.setState({
          calculations: 'e',
          available: true,
        });
      } else if (text === '+' || text === '-' || text === '/' || text === '*') {
        if (this.state.operationSign === '') {
          this.setState({
            operationSign: text,
            resultText: this.state.calculations + text,
            calculations: '0',
            numSign: '+',
            available: true,
          });
        } else {
          if (text === '/' && this.state.calculations === 0.0) {
            this.showToast('cant divide by 0');
          } else {
            this.setState({
              operationSign: text,
              resultText:
                this.state.resultText + this.state.calculations + text,
              calculations: '0',
              numSign: '+',
              available: true,
            });
          }
        }
      } else if (
        this.state.available === true ||
        this.state.calculations !== 0.0
      ) {
        if (this.state.calculations !== '') {
          if (text === 'x^2') {
            this.setState({
              calculations: mexp.eval(this.state.calculations + '^2'),
            });
          } else if (text === 'x^3') {
            this.setState({
              calculations: mexp.eval(this.state.calculations + '^3'),
            });
          } else if (text === 'e^x') {
            this.setState({
              calculations: mexp
                .eval('e^' + this.state.calculations)
                .toFixed(5),
              isDot: true,
            });
          } else if (text === '10^x') {
            this.setState({
              calculations: mexp.eval('10^' + this.state.calculations),
              isDot: false,
            });
          } else if (text === 'ln(x)') {
            if (this.state.calculations > 0) {
              this.setState({
                calculations: mexp
                  .eval('log' + this.state.calculations)
                  .toFixed(2),
                isDot: true,
              });
            } else {
              this.showToast('liczba musi byc wieksza od 0');
            }
          } else if (text === 'log10') {
            if (this.state.calculations > 0) {
              this.setState({
                calculations: mexp
                  .eval('log' + this.state.calculations)
                  .toFixed(2),
                isDot: true,
              });
            } else {
              this.showToast('liczba musi byc wieksza od 0');
            }
          } else if (text === '√x') {
            if (this.state.calculations !== 0) {
              this.setState({
                isDot:
                  mexp
                    .eval('root' + this.state.calculations)
                    .toString()
                    .includes('.') !== false,
                calculations: mexp
                  .eval('root' + this.state.calculations)
                  .toFixed(2),
              });
            }
          } else if (text === 'x!') {
            if (
              this.state.calculations !== 0 &&
              this.state.calculations.toString().includes('.') === false
            ) {
              this.setState({
                calculations: mexp.eval(this.state.calculations + '!'),
              });
            } else {
              this.showToast('musi byc liczba calkowita');
            }
          }
          this.setState({
            available: false,
          });
        }
      } else {
        this.showToast('podaj liczbe');
      }
    } else {
      this.showToast('zacznij od nowa');
    }
  }

  showToast(txt) {
    ToastAndroid.showWithGravity(txt, ToastAndroid.SHORT, ToastAndroid.TOP);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculations}>
          <Text style={styles.calculationsText}>{this.state.calculations}</Text>
        </View>
        <View style={styles.numbers}>
          {this.state.landscape === false
            ? PORTRAIT_BUTTONS.map((el) => {
                return (
                  <OwnTouchableOpacity
                    key={el.content}
                    content={el.content}
                    color={el.color}
                    width={el.width}
                    onBtnPress={this.buttonPressed.bind(this, el.content)}
                  />
                );
              })
            : LANDSCAPE_BUTTONS.map((el) => {
                return (
                  <OwnTouchableOpacity
                    key={el.content}
                    content={el.content}
                    color={el.color}
                    width={el.width}
                    onBtnPress={this.buttonPressed.bind(this, el.content)}
                  />
                );
              })}
        </View>
      </View>
    );
  }
}
