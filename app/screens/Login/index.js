import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Button } from 'react-native-elements';
import * as loginActions from 'app/actions/loginActions';
import styles from './styles';
import { LocalNotification } from '../../config/LocalNotifications';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleButtonPress = () => {
    LocalNotification();
  };

  const dispatch = useDispatch();
  const {
    loadingReducer: { isLoginLoading },
    loginReducer: { loginError },
  } = useSelector(state => state);

  const onLogin = () => {
    if (validateEmail() || validatePassword()) {
      return;
    }
    dispatch(loginActions.requestLogin(email, password));
  };

  const validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false && !email) {
      setEmailError('email is invalid');
      return true;
    } else {
      setEmailError(null);
      return false;
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('password is invalid');
      return true;
    } else {
      setPasswordError(false);
      return false;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => BackHandler.exitApp()}>
              <Icon
                type="antdesign"
                name="left"
                size={25}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <View style={styles.form}>
              <Text style={styles.heading}>Sign in</Text>
              <View
                style={{
                  marginTop: 50,
                }}>
                <View style={styles.inputContainer}>
                  <Icon
                    type="antdesign"
                    name="mail"
                    size={20}
                    style={styles.inputLogo}
                  />
                  <TextInput
                    value={email}
                    placeholder="Email ID"
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    autoCompleteType="email"
                    onEndEditing={validateEmail}
                  />
                </View>
                {emailError ? (
                  <Text style={styles.errorText}>{emailError}</Text>
                ) : null}
                <View style={styles.inputContainer}>
                  <Icon
                    type="antdesign"
                    name="lock"
                    size={20}
                    style={styles.inputLogo}
                  />
                  <TextInput
                    value={password}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    onEndEditing={validatePassword}
                  />
                </View>
                {passwordError ? (
                  <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}
                {/* <Text
                  style={styles.darkLabel}
                  onPress={() => navigation.navigate('Forget')}>
                  Forgot Password?
                </Text> */}

                <View style={styles.formBottomContainer}>
                  {loginError ? (
                    <Text style={styles.errorText}>{loginError}</Text>
                  ) : null}
                  <Button
                    loading={isLoginLoading}
                    title="Sign in"
                    // onPress={onLogin}
                    onPress={handleButtonPress}
                    buttonStyle={styles.signInBtn}
                    titleStyle={styles.signInBtnText}
                    containerStyle={styles.signInBtnContainer}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Login;
