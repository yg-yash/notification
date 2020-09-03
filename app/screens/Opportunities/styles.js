import { StyleSheet } from 'react-native';
import config from 'app/config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flex: 1,
    elevation: 5,
    minHeight: 100,
    borderRadius: 10,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: config.color.COLOR_SECONDARY,
  },
  title: {
    fontSize: 18,
    lineHeight: 21,
    fontFamily: config.fonts.FONT_REGULAR,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 18,
    lineHeight: 21,
    fontFamily: config.fonts.FONT_REGULAR,
    color: 'red',
    textTransform: 'capitalize',
  },
  opportunityName: {
    fontSize: 18,
    lineHeight: 21,
    fontFamily: config.fonts.FONT_BOLD,

    textTransform: 'capitalize',
  },
  companyName: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: config.fonts.FONT_REGULAR,
    marginTop: 20,
    textTransform: 'capitalize',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 18,
    lineHeight: 21,
    fontFamily: config.fonts.FONT_REGULAR,
    color: 'red',
    textTransform: 'capitalize',
  },
});

export default styles;
