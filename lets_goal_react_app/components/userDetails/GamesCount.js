import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import appStyle from '../../const/globalStyles';

const test = {
  borderWidth: 2,
  borderColor: 'white',
};
const styles = StyleSheet.create({
  container: {},
  count: {
    ...appStyle.smallTitle,
  },
  description: {
    color: 'grey',
    fontSize: 15,
  },
});

// eslint-disable-next-line react/prop-types
const GameCount = ({ description, count }) => (
  <View style={{ flex: 1, ...appStyle.container }}>
    <Text style={styles.count}>{count}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

function GamesCountRow(props) {
  const {
    descriptionLeft, descriptionRight, countLeft, countRight,
  } = props;
  return (
    <View style={{ flexDirection: 'row', width: '100%' }}>
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
