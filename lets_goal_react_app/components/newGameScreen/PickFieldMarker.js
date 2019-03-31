import React from 'react';
import PropTypes from 'prop-types';
import { Marker, Callout } from 'react-native-maps';
import { connect } from 'react-redux';

import { pickField } from '../../redux/actions/gameFormActions';
import PickFieldCallout from './PickFieldCallout';

const PickFieldMarker = (props) => {
  const {
    latitude, longitude, id, pickField,
  } = props;
  const latlng = { latitude, longitude };

  return (
    <Marker coordinate={latlng}>
      <Callout onPress={() => pickField(id)}>
        <PickFieldCallout {...props} />
      </Callout>
    </Marker>
  );
};

PickFieldMarker.propTypes = {
  id: PropTypes.number.isRequired,
  street: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  pickField: PropTypes.func.isRequired,
};

export default connect(
  null,
  { pickField },
)(PickFieldMarker);
