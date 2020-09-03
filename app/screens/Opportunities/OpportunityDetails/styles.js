import { StyleSheet } from 'react-native';
import config from 'app/config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 21,
    lineHeight: 24,
    fontFamily: config.fonts.FONT_REGULAR,
  },
  subTitle: {
    marginLeft: 10,
    fontSize: 18,
    lineHeight: 21,
    textTransform: 'capitalize',
    fontFamily: config.fonts.FONT_REGULAR,
  },
  btnContainer: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 30,
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
  modalCard: {
    top: '10%',
    height: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    backgroundColor: 'white',

    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    position: 'absolute',
    right: 0,
    left: 0,
    borderRadius: 10,
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
  picker: {
    borderRadius: 5,
    height: 70,
    marginVertical: 10,
  },
  pickerLabel: {
    marginLeft: '5%',
    fontFamily: config.fonts.FONT_REGULAR,
    fontSize: 14,
    lineHeight: 16,
    color: '#999999',
  },
  pickerItemStyle: {
    marginLeft: '5%',
    justifyContent: 'flex-start',
  },
  selectedLabelStyle: {
    fontFamily: config.fonts.FONT_REGULAR,
    fontSize: 14,
    lineHeight: 16,
    color: config.color.COLOR_PRIMARY,
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
