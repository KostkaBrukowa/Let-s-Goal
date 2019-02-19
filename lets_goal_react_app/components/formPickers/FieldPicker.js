import React, { Component } from 'react';
import { Text, View } from 'react-native';

import InputImage from '../InputImage';

export default class FieldPicker extends Component {
  state = { a: 1 };

  render() {
    const { navigation } = this.props;
    console.log(navigation);

    return (
      <View>
        <InputImage
          icon="map"
          iconSize={50}
          onPress={() => console.log('map pressed')}
          isSelected={false}
          title="Pick a field"
        />
      </View>
    );
  }
}
