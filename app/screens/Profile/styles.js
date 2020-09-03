import { StyleSheet } from 'react-native';
import config from 'app/config/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    marginVertical: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    height: 70,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 2,
  },
  inputLogo: {
    marginLeft: 15,
    color: '#999999',
  },
  input: {
    marginLeft: '5%',
    flex: 1,
    fontFamily: config.fonts.FONT_REGULAR,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
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
});
