/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { MapView } from 'expo';
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
  static navigationOptions = {
    title: 'Pick field',
  };

  static propTypes = {
    fields: PropTypes.array.isRequired,
    chosenField: PropTypes.number,
    fetchNearFields: PropTypes.func.isRequired,
  };

  state = { region: defaultRegion };

  componentDidMount = () => {
    const { fetchNearFields } = this.props;
    fetchNearFields({ longitude: defaultRegion.longitude, latitude: defaultRegion.latitude });
  };

  onRegionChange = (newRegion) => {
    const { region } = this.state;
    const diff = (x, y) => Math.abs(x - y);

    if (
      diff(region.latitude, newRegion.latitude) > 0.5
      || diff(region.longitude, newRegion.longitude) > 0.5
    ) {
      const { longitude, latitude } = newRegion;
      const { fetchNearFields } = this.props;

      this.setState({ region: newRegion });
      fetchNearFields({ longitude, latitude });
    }
  };

  componentDidUpdate = (prevProps) => {
    const { chosenField: prevChosenField } = prevProps;
    const { chosenField, navigation } = this.props;
    if (chosenField != null && prevChosenField !== chosenField) {
      navigation.goBack();
    }
  };

  render() {
    const { region } = this.state;
    const { fields } = this.props;

    const fieldMarkers = fields.map(field => (
      <PickFieldMarker key={field.id} price={field.price_per_hour} {...field} />
    ));
    return (
      <MapView style={{ flex: 1 }} initialRegion={region} onRegionChange={this.onRegionChange}>
        {fieldMarkers}
      </MapView>
    );
  }
}

const mapStateToProps = state => ({
  fields: state.gameAPI.fields,
  chosenField: state.gameForm.playingField.value,
});

export default connect(
  mapStateToProps,
  { fetchNearFields },
)(Map);
