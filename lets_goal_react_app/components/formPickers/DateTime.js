import React, { Component } from 'react';
import { View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InputImage from '../InputImage';
import { pickDate } from '../../redux/actions/gameFormActions';

class DateTimePickerTester extends Component {
  static defaultProps = {
    date: Date.now(),
  };

  static propTypes = {
    pickDate: PropTypes.func.isRequired,
    date: PropTypes.instanceOf(Date),
  };

  state = {
    isDateTimePickerVisible: false,
  };

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (date) => {
    const { pickDate } = this.props;

    this.hideDateTimePicker();
    pickDate(date);
  };

  render() {
    const { isDateTimePickerVisible } = this.state;
    const { date } = this.props;
    const isSelected = date != null; // TODO and there is no errors
    // TODO ERROR HANDLING
    return (
      <View>
        <InputImage
          icon="calendar"
          onPress={this.showDateTimePicker}
          title="Pick a date"
          isSelected={isSelected}
        />
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode="datetime"
          date={date || undefined}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  date: state.gameForm.date.value,
});

export default connect(
  mapStateToProps,
  { pickDate },
)(DateTimePickerTester);
