import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Feather';
import NextIcon from 'react-native-vector-icons/MaterialIcons';
import config from 'app/config/styles';
import AsyncStorage from '@react-native-community/async-storage';

const slides = [
  {
    key: 1,
    title: 'What is Lorem Ipsum?',
    text:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    backgroundColor: '#F56164',
  },
  {
    key: 2,
    title: 'What is Lorem Ipsum?',
    text:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',

    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'What is Lorem Ipsum?',
    text:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    backgroundColor: '#22bcb5',
  },
];

export default ({ setShowRealApp }) => {
  const _renderItem = ({ item }) => {
    return (
      <>
        <View
          style={[styles.slide, { marginTop: item.key === 3 ? '61%' : '40%' }]}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
          {item.key !== 3 && (
            <View style={styles.paginationContainer}>
              <View
                style={[
                  styles.pagination,
                  { opacity: item.key === 1 ? 1 : 0.25 },
                ]}
              />
              <View
                style={[
                  styles.pagination,
                  { opacity: item.key === 2 ? 1 : 0.25 },
                ]}
              />
              <View
                style={[
                  styles.pagination,
                  { opacity: item.key === 3 ? 1 : 0.25 },
                ]}
              />
            </View>
          )}
        </View>

        {item.key === 3 && (
          <View style={styles.slideThreeContent}>
            <Icon
              name="check-circle"
              color={config.color.COLOR_SECONDARY}
              size={50}
            />
            <Text style={styles.allSetText}>ALL SET !</Text>

            <Text
              onPress={() => {
                AsyncStorage.setItem('first_time', 'true').then(() => {
                  setShowRealApp(true);
                });
              }}
              style={styles.start}>
              Start Now
            </Text>
          </View>
        )}
      </>
    );
  };

  const renderNextButton = () => (
    <Text style={styles.nextButton}>
      Next
      <NextIcon name="navigate-next" />
    </Text>
  );

  const renderSkipButton = () => (
    <View style={styles.skipContainer}>
      <Text style={styles.skipText}>Skip</Text>
    </View>
  );

  return (
    <AppIntroSlider
      data={slides}
      keyExtractor={item => item.key.toString()}
      renderItem={_renderItem}
      dotClickEnabled={false}
      dotStyle={{ opacity: 0 }}
      contentContainerStyle={{ backgroundColor: config.color.COLOR_PRIMARY }}
      activeDotStyle={{ opacity: 0 }}
      showSkipButton={true}
      showDoneButton={false}
      renderNextButton={renderNextButton}
      renderSkipButton={renderSkipButton}
    />
  );
};

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: config.color.COLOR_SECONDARY,
    fontFamily: config.fonts.FONT_BOLD,
    fontSize: 14,
    lineHeight: 21,
    textTransform: 'uppercase',
  },
  text: {
    fontFamily: config.fonts.FONT_REGULAR,
    color: config.color.COLOR_SECONDARY,
    marginTop: 10,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    paddingHorizontal: 50,
  },
  nextButton: {
    color: config.color.COLOR_SECONDARY,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
    fontFamily: config.fonts.FONT_REGULAR,
  },
  slideThreeContent: {
    flex: 1,
    alignItems: 'center',
  },
  skipContainer: {
    flex: 1,
  },
  skipText: {
    color: 'white',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
    fontFamily: config.fonts.FONT_REGULAR,
    opacity: 0.5,
  },
  allSetText: {
    marginTop: 5,
    fontSize: 18,
    lineHeight: 27,
    color: config.color.COLOR_SECONDARY,
    marginBottom: 13,
    fontFamily: config.fonts.FONT_REGULAR,
  },
  paginationContainer: {
    flexDirection: 'row',
    marginTop: '5%',
    justifyContent: 'center',
  },
  pagination: {
    width: 35,
    height: 4,
    backgroundColor: config.color.COLOR_SECONDARY,
    borderRadius: 3,
    marginHorizontal: 5,
  },
  start: {
    fontSize: 22,
    lineHeight: 33,
    color: config.color.COLOR_SECONDARY,
    borderBottomColor: config.color.COLOR_SECONDARY,
    borderBottomWidth: 1,
    fontFamily: config.fonts.FONT_REGULAR,
  },
});
