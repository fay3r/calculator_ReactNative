import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity} from 'react-native';
import styles from '../resources/styles';

class OwnTouchableOpacity extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
  };

  render() {
    const {color, content, width, onBtnPress} = this.props;

    return (
      <TouchableOpacity
        style={[
          styles.button,
          {
            width: width,
            backgroundColor: color,
          },
        ]}
        onPress={() => onBtnPress({content})}>
        <Text style={styles.buttonsText}>{content}</Text>
      </TouchableOpacity>
    );
  }
}

export default OwnTouchableOpacity;
