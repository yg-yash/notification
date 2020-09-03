import React, { useState, useLayoutEffect, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import config from 'app/config/styles';
import styles from './styles';
import * as leadsActions from 'app/actions/leadsActions';

const LeadsDetails = ({ navigation, route }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const toggleModal = () => setShowModal(value => !value);
  const dispatch = useDispatch();
  const {
    loadingReducer: {
      isLeadLoading,
      isChangeToCustomerLoading,
      isChangeToQuotationLoading,
    },
    leadsReducer: { error, lead, changeToCustomerErrorMessage },
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(leadsActions.requestSingleLeadsFetch(route.params.id));
  }, [dispatch, route.params.id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: config.color.COLOR_PRIMARY },
      headerTitle: 'Lead Details',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: config.color.COLOR_SECONDARY,
        fontSize: 15,
        lineHeight: 17,
        letterSpacing: 5,
      },

      headerTintColor: config.color.COLOR_SECONDARY,
    });
  }, [navigation]);

  const renderModal = () => (
    <Card containerStyle={styles.modalCard}>
      <TouchableOpacity onPress={toggleModal}>
        <Icon type="antdesign" name="close" style={{ alignSelf: 'flex-end' }} />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          height: '100%',
        }}>
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
            value={email}
            onChange={setEmail}
            style={styles.input}
            placeholder="Enter Email"
          />
        </View>

        <Button
          title="Save"
          containerStyle={[styles.btnContainer]}
          buttonStyle={styles.button}
          titleStyle={styles.btnText}
          onPress={toggleModal}
        />
      </ScrollView>
    </Card>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            {isLeadLoading ? (
              <View style={styles.center}>
                <ActivityIndicator
                  size={50}
                  color={config.color.COLOR_PRIMARY}
                />
              </View>
            ) : error ? (
              <Text style={styles.error}>{error}</Text>
            ) : (
              <>
                {lead && (
                  <>
                    <View style={styles.row}>
                      <Text style={styles.title}>Name:</Text>
                      <Text style={styles.subTitle}>{lead[0].opportunity}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.title}>Company Name:</Text>
                      <Text style={styles.subTitle}>
                        {lead[0].company_name}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.title}>Contact Name:</Text>
                      <Text style={styles.subTitle}>
                        {lead[0].contact_name}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.title}>Mobile Number:</Text>
                      <Text style={styles.subTitle}>{lead[0].mobile}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.title}>Email:</Text>
                      <Text style={styles.subTitle}>{lead[0].email}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.title}>Phone:</Text>
                      <Text style={styles.subTitle}>{lead[0].phone}</Text>
                    </View>

                    <View style={styles.row}>
                      <Text style={styles.title}>Priority:</Text>
                      <Text style={styles.subTitle}>{lead[0].priority}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                      {changeToCustomerErrorMessage !== '' && (
                        <Text style={styles.changeToCustomerErrorMessage}>
                          {changeToCustomerErrorMessage}
                        </Text>
                      )}
                      <Button
                        title="Convert To Customer"
                        loading={isChangeToCustomerLoading}
                        containerStyle={styles.btnContainer}
                        buttonStyle={styles.button}
                        titleStyle={styles.btnText}
                        onPress={() => {
                          dispatch(
                            leadsActions.changeToCustomerRequest(lead[0].id),
                          );
                        }}
                      />
                      <Button
                        title="Convert To Opportunity"
                        loading={isChangeToQuotationLoading}
                        containerStyle={styles.btnContainer}
                        buttonStyle={styles.button}
                        titleStyle={styles.btnText}
                        onPress={() =>
                          dispatch(
                            leadsActions.changeToQuotationRequest(lead[0].id),
                          )
                        }
                      />
                    </View>
                  </>
                )}
              </>
            )}

            {showModal && renderModal()}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LeadsDetails;
