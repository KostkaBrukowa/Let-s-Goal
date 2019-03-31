import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InputImage from '../InputImage';
import { pickDate } from '../../../redux/actions/gameFormActions';
import { ERROR_COLOR } from '../../../const/const';

const styles = StyleSheet.create({
  error: {
    color: ERROR_COLOR,
    textAlign: 'center',
    fontSize: 17,
  },
});

class DateTimePickerTester extends Component {
  static defaultProps = {
    date: Date.now(),
  };

  static propTypes = {
    pickDate: PropTypes.func.isRequired,
    date: PropTypes.instanceOf(Date),
    dateErrors: PropTypes.string,
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
    const { date, dateErrors } = this.props;
    const isSelected = date != null && !dateErrors;
    return (
      <View>
        <InputImage
          icon="calendar"
          onPress={this.showDateTimePicker}
          title="Pick a date"
          isSelected={isSelected}
          isInvalid={dateErrors != null}
        />
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode="datetime"
          date={date || undefined}
        />
        {dateErrors && <Text style={styles.error}>{dateErrors}</Text>}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  date: state.gameForm.date.value,
  dateErrors: state.gameForm.date.errors,
});

export default connect(
  mapStateToProps,
  { pickDate },
)(DateTimePickerTester);
