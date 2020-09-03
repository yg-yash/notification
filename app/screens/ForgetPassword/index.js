import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { Icon, CheckBox, Button } from 'react-native-elements';
import styles from './styles';

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

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
              <Text style={styles.heading}>Forgot Password ?</Text>
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
                  />
                </View>

                <View style={styles.formBottomContainer}>
                  <Button
                    title="Send Mail"
                    buttonStyle={styles.signInBtn}
                    titleStyle={styles.signInBtnText}
                    containerStyle={styles.signInBtnContainer}
                  />

                  <View style={styles.newUserContainer}>
                    <Text style={styles.newText}>Remeber Password?</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Sign In')}>
                      <Text style={[styles.newText, styles.signUpLabel]}>
                        {' '}
                        Sign In
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ForgetPassword;
