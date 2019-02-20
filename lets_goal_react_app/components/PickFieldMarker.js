import React from 'react';
import PropTypes from 'prop-types';
import { Marker, Callout } from 'react-native-maps';

import PickFieldCallout from './PickFieldCallout';

const PickFieldMarker = (props) => {
  const { latitude, longitude } = props;
  const latlng = { latitude, longitude };
  return (
    <Marker coordinate={latlng}>
      <Callout>
        <PickFieldCallout {...props} />
      </Callout>
    </Marker>
  );
};

PickFieldMarker.propTypes = {
  street: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default PickFieldMarker;
