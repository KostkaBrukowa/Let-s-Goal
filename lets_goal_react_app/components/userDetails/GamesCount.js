import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import appStyle from '../../const/appStyles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  countContainer: {
    ...appStyle.container,
    flex: 1,
  },
  count: {
    ...appStyle.smallTitle,
  },
  description: {
    color: 'lightgrey',
    fontSize: 15,
  },
});

// eslint-disable-next-line react/prop-types
const GameCount = ({ description, count }) => (
  <View style={styles.countContainer}>
    <Text style={appStyle.smallTitle}>{count}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

function GamesCountRow(props) {
  const {
    descriptionLeft, descriptionRight, countLeft, countRight,
  } = props;
  return (
    <View style={styles.container}>
      <GameCount description={descriptionLeft} count={countLeft} />
      <GameCount description={descriptionRight} count={countRight} />
    </View>
  );
}

GamesCountRow.propTypes = {
  descriptionLeft: PropTypes.string.isRequired,
  descriptionRight: PropTypes.string.isRequired,
  countLeft: PropTypes.number.isRequired,
  countRight: PropTypes.number.isRequired,
};

export default GamesCountRow;
