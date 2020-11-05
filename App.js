import React, {Component,useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen'

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ToastAndroid,
    Dimensions,
} from 'react-native';
import styles from './styles';
import OwnTouchableOpacity from './OwnTouchableOpacity';

const portraitButtons = [
    {content: 'AC', color: 'gray', width: '25%'}, {content: '+/-', color: 'gray', width: '49.6%'}, {
        content: '+',
        color: 'orange',
        width: '25%',
    },
    {content: '1', color: 'gray', width: '25%'}, {content: '2', color: 'gray', width: '25%'}, {
        content: '3',
        color: 'gray',
        width: '24.5%',
    }, {content: '-', color: 'orange', width: '25%'},
    {content: '4', color: 'gray', width: '25%'}, {content: '5', color: 'gray', width: '25%'}, {
        content: '6',
        color: 'gray',
        width: '24.5%',
    }, {content: '*', color: 'orange', width: '25%'},
    {content: '7', color: 'gray', width: '25%'}, {content: '8', color: 'gray', width: '25%'}, {
        content: '9',
        color: 'gray',
        width: '24.5%',
    }, {content: '/', color: 'orange', width: '25%'},
    {content: '0', color: 'gray', width: '25%'}, {content: '.', color: 'gray', width: '49.6%'}, {
        content: '=',
        color: 'orange',
        width: '25%',
    },
];

const landscapeButtons = [
    {content: '√x', color: 'gray', width: '16%'}, {content: 'x!', color: 'gray', width: '16%'}, {
        content: 'AC',
        color: 'gray',
        width: '17%',
    }, {content: '+/-', color: 'gray', width: '17%'}, {content: '%', color: 'gray', width: '17%'}, {
        content: '+',
        color: 'orange',
        width: '16.5%',
    },
    {content: 'e^x', color: 'gray', width: '16%'}, {content: '10^x', color: 'gray', width: '16%'}, {
        content: '1',
        color: 'gray',
        width: '17%',
    }, {content: '2', color: 'gray', width: '17%'}, {content: '3', color: 'gray', width: '17%'}, {
        content: '-',
        color: 'orange',
        width: '16.5%',
    },
    {content: 'ln(x)', color: 'gray', width: '16%'}, {content: 'log10', color: 'gray', width: '16%'}, {
        content: '4',
        color: 'gray',
        width: '17%',
    }, {content: '5', color: 'gray', width: '17%'}, {content: '6', color: 'gray', width: '17%'}, {
        content: '*',
        color: 'orange',
        width: '16.5%',
    },
    {content: 'e', color: 'gray', width: '16%'}, {content: 'x^2', color: 'gray', width: '16%'}, {
        content: '7',
        color: 'gray',
        width: '17%',
    }, {content: '8', color: 'gray', width: '17%'}, {content: '9', color: 'gray', width: '17%'}, {
        content: '/',
        color: 'orange',
        width: '16.5%',
    },
    {content: 'pi', color: 'gray', width: '16%'}, {content: 'x^3', color: 'gray', width: '16%'}, {
        content: '0',
        color: 'gray',
        width: '17%',
    }, {content: '.', color: 'gray', width: '34.1%'}, {content: '=', color: 'orange', width: '16.5%'},
];

var logo = require('./android/app/src/main/res/drawable/splash_icon.png');

export default class App extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }

    constructor() {
        super();

        const isLandscape = () => {
            const resolution = Dimensions.get('window');
            if (resolution.height < resolution.width) {
                return true;
            }
            return false;
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
        };

        Dimensions.addEventListener('change', () => {
            this.setState({
                landscape: isLandscape(),
            });
        });
    }


    buttonPressed(text) {
        if (text == '1' || text == '2' || text == '3' || text == '4' || text == '5' || text == '6' || text == '7' || text == '8' || text == '9' || text == '0') {
            this.setState({
                calculations: (this.state.calculations == 0 && this.state.isDot == false) ? text : this.state.calculations + text.toString(),
            });
        } else if (text == '.') {
            if (this.state.isDot == false) {
                this.setState({
                    isDot: true,
                    calculations: ((this.state.calculations == '') ? '0.' : this.state.calculations + '.'),
                });
            }
        } else if (text == 'AC') {
            this.setState({
                resultText: '',
                calculations: '0',
                numSign: '+',
                operationSign: '',
                isDot: false,
            });
        } else if (text == '+/-') {
            let tempString = this.state.calculations.toString();
            let minTempString = tempString.substring(1, tempString.length);
            if (this.state.calculations != 0) {
                this.setState({
                    calculations: (this.state.numSign == '+') ? '-' + tempString : minTempString,
                    numSign: (this.state.numSign == '+') ? '-' : '+',
                });
            }
        } else if (text == '=') {
            if (this.state.resultText != '') {
                let firstInput = this.state.resultText.substring(0, this.state.resultText.length - 1);
                let mathOperation = this.state.resultText.substring(this.state.resultText.length - 1, this.state.resultText.length);
                let secondInput = this.state.calculations;
                if (mathOperation == '/' && secondInput == 0.0) {
                    this.showToast('cant divide by 0');
                } else {
                    let result = makeCount[mathOperation](parseFloat(firstInput), parseFloat(secondInput));
                    this.setState({
                        operationSign: '',
                        calculations: result,
                        resultText: '',
                        numSign: result < 0 ? '-' : '+',
                    });
                }
            }
        } else if (text == '%') {
            if (this.state.calculations != 0) {
                this.setState({
                    calculations: this.state.calculations / 100,
                    isDot: this.state.calculations < 99 ? true : false,
                });
            }
        } else if (text == '√x') {
            if (this.state.calculations != 0) {
                this.setState({
                    isDot: (Math.sqrt(this.state.calculations).toString().includes('.') == false) ? false : true,
                    calculations: Math.sqrt(this.state.calculations),
                });
            }
        } else if (text == 'x!') {
            if (this.state.calculations != 0 && (this.state.calculations).toString().includes('.') == false) {
                let result = 1;
                let count = this.state.calculations;
                while (count > 1) {
                    result = result * count;
                    count--;
                }
                this.setState({
                    calculations: result,
                });
            } else {
                this.showToast('musi byc liczba calkowita');
            }
        } else if (text == 'pi') {
            this.setState({
                calculations: Math.PI.toFixed(5),
            });
        } else if (text == 'e') {
            this.setState({
                calculations: Math.E.toFixed(5),
            });
        } else if (text == 'e^x') {
            this.setState({
                calculations: Math.pow(Math.E, Math.round(this.state.calculations)).toFixed(4),
                isDot: true,
            });

        } else if (text == '10^x') {
            this.setState({
                calculations: Math.pow(10, Math.round(this.state.calculations)),
                isDot: false,
            });

        } else if (text == 'ln(x)') {
            if (this.state.calculations > 0) {
                this.setState({
                    calculations: Math.log(this.state.calculations).toFixed(5),
                    isDot: true,
                });
            } else {
                this.showToast('liczba musi byc wieksza od 0');
            }

        } else if (text == 'log10') {
            if (this.state.calculations > 0) {
                this.setState({
                    calculations: Math.log10(this.state.calculations).toFixed(5),
                    isDot: true,
                });
            } else {
                this.showToast('liczba musi byc wieksza od 0');
            }

        } else if (text == 'x^2') {
            this.setState({
                calculations: Math.pow(this.state.calculations, 2),
            });
        } else if (text == 'x^3') {
            this.setState({
                calculations: Math.pow(this.state.calculations, 3),
            });
        } else {
            if (this.state.operationSign == '') {
                this.setState({
                    operationSign: text,
                    resultText: this.state.calculations + text,
                    calculations: '0',
                    numSign: '+',
                });
            } else {
                let firstInput = parseFloat(this.state.resultText.substring(0, this.state.resultText.length - 1));
                let mathOperation = this.state.resultText.substring(this.state.resultText.length - 1, this.state.resultText.length);
                let secondInput = parseFloat(this.state.calculations);
                if (mathOperation == '/' && secondInput == 0.0) {
                    this.showToast('cant divide by 0');
                } else {
                    this.setState({
                        operationSign: text,
                        resultText: makeCount[mathOperation](firstInput, secondInput) + text,
                        calculations: '0',
                        numSign: '+',
                    });
                }
            }
        }
    }

    showToast(txt) {
        ToastAndroid.showWithGravity(txt, ToastAndroid.LONG, ToastAndroid.TOP);
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
                    {
                        this.state.landscape == false ?
                            portraitButtons.map((el) => {
                                return (
                                    <OwnTouchableOpacity key={el.content} content={el.content} color={el.color} width={el.width}
                                                         onBtnPress={this.buttonPressed.bind(this, el.content)}/>
                                );
                            })
                            :
                            landscapeButtons.map((el) => {
                                return (
                                    <OwnTouchableOpacity key={el.content} content={el.content} color={el.color} width={el.width}
                                                         onBtnPress={this.buttonPressed.bind(this, el.content)}/>
                                );
                            })
                    }
                </View>
            </View>
        );
    }
}

const makeCount = {
    '+': function (x, y) {
        return x + y;
    },
    '-': function (x, y) {
        return x - y;
    },
    '*': function (x, y) {
        return x * y;
    },
    '/': function (x, y) {
        return x / y;
    },
};
