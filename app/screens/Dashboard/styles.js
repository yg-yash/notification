import { StyleSheet } from 'react-native';
import config from 'app/config/styles';

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#64b5f6',
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  secondCard: {
    marginTop: 20,
    backgroundColor: '#ec407a',
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  titleStyle: {
    fontSize: 21,
    lineHeight: 25,
    color: 'white',
    fontFamily: config.fonts.FONT_BOLD,
  },
  error: {
    fontSize: 18,
    lineHeight: 21,
    fontFamily: config.fonts.FONT_REGULAR,
    color: 'red',
    textTransform: 'capitalize',
    alignSelf: 'center',
  },
  btnContainer: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: config.color.COLOR_PRIMARY,
  },
  btnText: {
    marginLeft: 10,
    fontSize: 18,
    lineHeight: 21,
    fontFamily: config.fonts.FONT_REGULAR,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: config.color.COLOR_SECONDARY,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginHorizontal: 20,
  },
});
