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

const styles = StyleSheet.create({
  scrollStyle: {
    flex: 1,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageStyle: {
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: -10,
  },
});

const BackgroundImageScroll = (props) => {
  const {
    children, containerStyle, source, onRefresh, isLoading,
  } = props;
  const { width, height } = Dimensions.get('window');
  return (
    <ScrollView
      style={styles.scrollStyle}
      contentContainerStyle={[styles.container, containerStyle]}
      refreshControl={onRefresh && <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
    >
      <View style={{ width: '100%', height: '100%' }}>
        <ImageBackground
          style={styles.container}
          imageStyle={[styles.imageStyle, { width, height: 1116 }]}
          source={require('../assets/images/background-field-dim.png')}
        >
          {children}
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

BackgroundImageScroll.propTypes = {};

export default BackgroundImageScroll;
