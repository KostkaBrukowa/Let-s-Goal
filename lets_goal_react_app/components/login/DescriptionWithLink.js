import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import appStyle from '../../const/globalStyles';

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  description: {
    fontSize: 17,
    color: 'lightgrey',
    textAlign: 'center',
  },
  textLink: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: 'white',
  },
});

function DescriptionWithLink({ description, linkTitle, onLinkPress }) {
  return (
    <View style={[styles.container, appStyle.container]}>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity onPress={onLinkPress}>
        <Text style={styles.textLink}>{linkTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}

DescriptionWithLink.propTypes = {
  description: PropTypes.string.isRequired,
  linkTitle: PropTypes.string.isRequired,
  onLinkPress: PropTypes.func.isRequired,
};

export default DescriptionWithLink;
