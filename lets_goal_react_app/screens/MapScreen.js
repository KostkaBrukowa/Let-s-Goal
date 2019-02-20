import React from 'react';
import { Text } from 'react-native';
import { MapView } from 'expo';
import { Marker, Callout } from 'react-native-maps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchNearFields } from '../redux/actions/gameAPIActions';
import PickFieldMarker from '../components/PickFieldMarker';

const defaultRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

class Map extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    fields: PropTypes.array.isRequired,
    fetchNearFields: PropTypes.func.isRequired,
  };

  state = { region: defaultRegion };

  componentDidMount = () => {
    const { fetchNearFields } = this.props;
    fetchNearFields({ longitude: 10, latitude: 10 });
  };

  onRegionChange = (region) => {};

  render() {
    const { region } = this.state;
    const { fields } = this.props;

    const fieldMarkers = fields.map(field => <PickFieldMarker {...field} />);
    return (
      <MapView style={{ flex: 1 }} initialRegion={region} onRegionChange={this.onRegionChange}>
        {fieldMarkers}
      </MapView>
    );
  }
}

const mapStateToProps = state => ({ fields: state.gameAPI.nearFields });

export default connect(
  mapStateToProps,
  { fetchNearFields },
)(Map);
