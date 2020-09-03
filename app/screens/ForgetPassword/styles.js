import { StyleSheet } from 'react-native';
import config from 'app/config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'white',
  },
  backIcon: { alignSelf: 'flex-start' },
  form: {
    flex: 1,
    marginTop: 50,
    padding: 5,
  },
  heading: {
    fontSize: 20,
    lineHeight: 22,
    letterSpacing: 6,
    textTransform: 'uppercase',
    alignSelf: 'center',
    fontFamily: config.fonts.FONT_REGULAR,
  },

  inputContainer: {
    flexDirection: 'row',
    height: 46,
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
  formBottomContainer: {
    alignSelf: 'center',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  signInBtnContainer: {
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signInBtn: {
    width: 150,
    height: 45,
    backgroundColor: config.color.COLOR_PRIMARY,
  },
  signInBtnText: {
    fontFamily: config.fonts.FONT_BOLD,
    fontSize: 13,
    lineHeight: 14,
    letterSpacing: 7,
    textTransform: 'uppercase',
    color: config.color.COLOR_SECONDARY,
  },

  signInWithContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 170,
    alignItems: 'center',
  },
  signInWith: {
    fontSize: 16,
    lineHeight: 18,
    color: config.color.COLOR_PRIMARY,
    fontFamily: config.fonts.FONT_REGULAR,
  },
  logo: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  newUserContainer: { flexDirection: 'row', marginTop: 80 },
  newText: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: config.fonts.FONT_REGULAR,
  },
  signUpLabel: {
    color: config.color.COLOR_PRIMARY,
  },
});

export default styles;
