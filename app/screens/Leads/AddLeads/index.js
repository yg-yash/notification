import React, { useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Text,
} from 'react-native';
import { Header, Icon, Button } from 'react-native-elements';
import config from 'app/config/styles';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import * as leadsActions from 'app/actions/leadsActions';
import DropDownPicker from 'react-native-dropdown-picker';

const AddLeads = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactPersonName, setContactPersonName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [priority, setPriority] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState([]);
  const [emailError, setEmailError] = useState();
  const dispatch = useDispatch();
  const {
    leadsReducer: { addLeadError, isAddLeadSuccess },
    loadingReducer: { isAddLeadLoading },
  } = useSelector(state => state);

  const leftHeaderComponent = () => (
    <Icon
      type="feather"
      name="menu"
      onPress={() => navigation.openDrawer()}
      color={config.color.COLOR_SECONDARY}
    />
  );

  const validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      setEmailError('email is invalid');
      return true;
    } else {
      setEmailError(null);
      return false;
    }
  };

  const isEmpty = () => {
    const newArr = [
      title,
      companyName,
      contactPersonName,
      mobileNumber,
      email,
    ].map((item, index) => ({ name: index, isEmpty: !item }));
    setErrors(newArr);
    return isEmpty.length > 0;
  };

  const submitData = () => {
    if (isEmpty() || validateEmail()) {
      return;
    }

    dispatch(
      leadsActions.requestAddLeads({
        title,
        compname: companyName,
        cname: contactPersonName,
        mobileno: mobileNumber,
        emailid: email,
        priority,
        notes,
      }),
    );

    clearData();
  };
  const clearData = () => {
    setTitle('');
    setCompanyName('');
    setContactPersonName('');
    setMobileNumber('');
    setEmail('');
    setNotes('');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        leftComponent={leftHeaderComponent}
        centerComponent={{
          text: 'Add Lead',
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
            <View style={styles.contentContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  style={styles.input}
                  placeholder="Opportunity Title"
                  onEndEditing={isEmpty}
                  maxLength={255}
                />
              </View>
              {errors.length > 0 && errors[0].isEmpty && (
                <Text style={styles.errorText}>This Field is Required</Text>
              )}
              <View style={styles.inputContainer}>
                <TextInput
                  value={companyName}
                  onChangeText={setCompanyName}
                  style={styles.input}
                  placeholder="Company Name"
                  onEndEditing={isEmpty}
                  maxLength={255}
                />
              </View>
              {errors.length > 0 && errors[1].isEmpty && (
                <Text style={styles.errorText}>This Field is Required</Text>
              )}
              <View style={styles.inputContainer}>
                <TextInput
                  value={contactPersonName}
                  onChangeText={setContactPersonName}
                  style={styles.input}
                  placeholder="Contact Person Name"
                  onEndEditing={isEmpty}
                  maxLength={255}
                />
              </View>
              {errors.length > 0 && errors[2].isEmpty && (
                <Text style={styles.errorText}>This Field is Required</Text>
              )}
              <View style={styles.inputContainer}>
                <TextInput
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                  style={styles.input}
                  placeholder="Mobile Number"
                  onEndEditing={isEmpty}
                  keyboardType="number-pad"
                  maxLength={55}
                />
              </View>
              {errors.length > 0 && errors[3].isEmpty && (
                <Text style={styles.errorText}>This Field is Required</Text>
              )}
              <View style={styles.inputContainer}>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  placeholder="Email Id"
                  onEndEditing={validateEmail}
                  keyboardType="email-address"
                  maxLength={55}
                />
              </View>

              {emailError && <Text style={styles.errorText}>{emailError}</Text>}

              <DropDownPicker
                items={[
                  {
                    label: 'High',
                    value: 'high',
                  },
                  {
                    label: 'Medium',
                    value: 'medium',
                  },
                  {
                    label: 'Low',
                    value: 'low',
                  },
                ]}
                defaultValue={priority}
                containerStyle={styles.picker}
                style={{
                  backgroundColor: 'transparent',
                  borderRadius: 38,
                  zIndex: 5,
                }}
                placeholder="High"
                itemStyle={styles.pickerItemStyle}
                arrowColor="#BDBDBD"
                dropDownStyle={{ zIndex: 5 }}
                activeLabelStyle={styles.selectedLabelStyle}
                labelStyle={styles.pickerLabel}
                onChangeItem={item => setPriority(item.value)}
              />

              <View style={styles.inputContainer}>
                <TextInput
                  value={notes}
                  onChangeText={setNotes}
                  style={styles.input}
                  placeholder="Notes"
                />
              </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              {addLeadError && (
                <Text style={styles.mainErrorText}>{addLeadError}</Text>
              )}

              <Button
                title="Add Lead"
                loading={isAddLeadLoading}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.button}
                titleStyle={styles.btnText}
                onPress={submitData}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddLeads;
