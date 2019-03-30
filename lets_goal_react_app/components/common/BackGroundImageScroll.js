import React from 'react';
import {
  ScrollView,
  View,
  ImageBackground,
  Dimensions,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';

import appStyle from '../../const/appStyles';

const styles = StyleSheet.create({
  scrollStyle: {
    flex: 1,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageStyle: {
    ...appStyle.backgroundAbsoluteStyle,
  },
});

const BackgroundImageScroll = (props) => {
  const {
    children, containerStyle, onRefresh, isLoading, scrollRef,
  } = props;
  const { width } = Dimensions.get('window');
  return (
    <ScrollView
      style={styles.scrollStyle}
      contentContainerStyle={[styles.container, containerStyle]}
      refreshControl={onRefresh && <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
      ref={scrollRef}
    >
      <View style={{ width: '100%', height: '100%' }}>
        <ImageBackground
          style={styles.container}
          imageStyle={[styles.imageStyle, { width, height: 1116 }]}
          source={require('../../assets/images/background-field-dim.png')}
        >
          {children}
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

BackgroundImageScroll.propTypes = {
  containerStyle: PropTypes.object,
  onRefresh: PropTypes.func,
  isLoading: PropTypes.bool,
  scrollRef: PropTypes.func,
};

BackgroundImageScroll.defaultProps = {
  containerStyle: {},
  onRefresh: null,
  isLoading: false,
  scrollRef: null,
};

export default BackgroundImageScroll;
