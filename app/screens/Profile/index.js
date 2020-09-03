import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import { Header, Icon, Avatar, Button } from 'react-native-elements';
import config from 'app/config/styles';
import styles from './styles';

const Profile = ({ navigation }) => {
  const [email, setEmail] = useState('John Doe');
  const [name, setName] = useState('jdoe@gmail.com');
  const [password, setPassword] = useState('1234567');
  const leftHeaderComponent = () => (
    <Icon
      type="feather"
      name="menu"
      onPress={() => navigation.openDrawer()}
      color={config.color.COLOR_SECONDARY}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        leftComponent={leftHeaderComponent}
        centerComponent={{
          text: 'Profile',
          style: {
            color: config.color.COLOR_SECONDARY,
            fontSize: 15,
            lineHeight: 17,
            letterSpacing: 5,
          },
        }}
        containerStyle={{
          backgroundColor: config.color.COLOR_PRIMARY,
        }}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <Avatar
              source={{
                uri:
                  'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png',
              }}
              containerStyle={{ alignSelf: 'center' }}
              rounded
              size={120}
              showAccessory
            />
            <View style={styles.contentContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  value={email}
                  onChange={setEmail}
                  style={styles.input}
                  placeholder="Enter Email"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  value={name}
                  onChange={setName}
                  style={styles.input}
                  placeholder="Enter Name"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  value={password}
                  onChange={setPassword}
                  style={styles.input}
                  placeholder="Enter Password"
                  secureTextEntry
                />
              </View>
            </View>
            <Button
              title="Save Profile"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.button}
              titleStyle={styles.btnText}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
