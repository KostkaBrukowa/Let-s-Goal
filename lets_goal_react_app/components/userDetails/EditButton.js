import React from 'react';
import PropTypes from 'prop-types';
import SwitchButton from '../common/SwitchButton';

function EditButton(props) {
  const { editMode, visible } = props;
  if (!visible) return null;

  return <SwitchButton title1="Save" title2="Edit" displayFirst={editMode} {...props} />;
}

EditButton.propTypes = {
  editMode: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object,
};

EditButton.defaultProps = {
  buttonStyle: {},
};

export default EditButton;
