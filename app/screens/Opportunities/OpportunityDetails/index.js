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
import DropDownPicker from 'react-native-dropdown-picker';
import config from 'app/config/styles';
import styles from './styles';
import * as opportunityActions from 'app/actions/opportunityActions';
import * as leadsActions from 'app/actions/leadsActions';
import { useDispatch, useSelector } from 'react-redux';

const OpportunityDetails = ({ navigation, route }) => {
  const {
    opportunityReducer: {
      singleOpportunityError,
      opportunity,
      changeStatusError,
    },
    loadingReducer: {
      isOpportunityLoading,
      isDropDownListLoading,
      isStatusChanging,
    },
    leadsReducer: { dropdownList, dropDownError },
  } = useSelector(state => state);

  const [showModal, setShowModal] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [typeValue, setTypeValue] = useState('comment');
  const [statusValue, setStatusValue] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    if (!isDropDownListLoading && dropdownList.length > 0) {
      setStatusValue(dropdownList[0].slug);
    }
  }, [dropdownList, isDropDownListLoading]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(opportunityActions.requestSingleOpportunityFetch(route.params.id));
    dispatch(leadsActions.requestLeadsDropdown());
  }, [dispatch, route.params.id]);

  const toggleModal = () => setShowModal(value => !value);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: config.color.COLOR_PRIMARY },
      headerTitle: 'Opportunity Details',
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

  const validateData = () => {
    if (!statusValue || !textValue || !typeValue) {
      setError('All Fields Are Requied!');
      return false;
    }
    setError('');

    return true;
  };
  const submitData = () => {
    if (!validateData()) {
      return;
    }

    dispatch(
      opportunityActions.changeStatusRequest(
        opportunity[0].id,
        statusValue,
        textValue,
        typeValue,
      ),
    );
    setTextValue('');
    setStatusValue('');
    setTypeValue('');
    toggleModal();
  };

  const renderModal = () => {
    return isDropDownListLoading ? (
      <ActivityIndicator size={20} color="black" />
    ) : dropDownError ? (
      <Text style={styles.error}>{dropDownError}</Text>
    ) : (
      <Card containerStyle={styles.modalCard}>
        <TouchableOpacity onPress={toggleModal}>
          <Icon
            type="antdesign"
            name="close"
            style={{ alignSelf: 'flex-end' }}
          />
        </TouchableOpacity>

        <DropDownPicker
          items={[
            {
              label: 'Comment',
              value: 'comment',
            },
            {
              label: 'Call',
              value: 'call',
            },
            {
              label: 'Meeting',
              value: 'meeting',
            },
            {
              label: 'Status',
              value: 'status',
            },
          ]}
          defaultValue={typeValue}
          containerStyle={styles.picker}
          placeholder="Comment"
          style={{
            backgroundColor: config.color.COLOR_WHITE,
            borderRadius: 38,
          }}
          itemStyle={styles.pickerItemStyle}
          arrowColor="#BDBDBD"
          activeLabelStyle={styles.selectedLabelStyle}
          labelStyle={styles.pickerLabel}
          onChangeItem={item => setTypeValue(item.value)}
        />
        {!isDropDownListLoading && (
          <DropDownPicker
            items={dropdownList.map(item => ({
              label: item.name,
              value: item.slug,
            }))}
            defaultValue={statusValue}
            containerStyle={styles.picker}
            style={{
              backgroundColor: config.color.COLOR_WHITE,
              borderRadius: 38,
            }}
            placeholder={dropdownList ? dropdownList[0].name : 'Loading'}
            itemStyle={styles.pickerItemStyle}
            arrowColor="#BDBDBD"
            activeLabelStyle={styles.selectedLabelStyle}
            labelStyle={styles.pickerLabel}
            onChangeItem={item => setStatusValue(item.value)}
          />
        )}

        <View style={styles.inputContainer}>
          <TextInput
            value={textValue}
            multiline
            onChangeText={setTextValue}
            style={styles.input}
            placeholder="Enter Text.."
          />
        </View>
        <Text style={[styles.error, { alignSelf: 'center' }]}>
          {error && error}
        </Text>
        <Text style={[styles.error, { alignSelf: 'center' }]}>
          {changeStatusError && changeStatusError}
        </Text>
        <Button
          title="Save"
          loading={isStatusChanging}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.button}
          titleStyle={styles.btnText}
          onPress={submitData}
        />
      </Card>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            {isOpportunityLoading ? (
              <View style={styles.center}>
                <ActivityIndicator
                  size={50}
                  color={config.color.COLOR_PRIMARY}
                />
              </View>
            ) : singleOpportunityError ? (
              <Text style={styles.error}>{singleOpportunityError}</Text>
            ) : (
              <>
                {opportunity && (
                  <>
                    <View style={styles.row}>
                      <Text style={styles.title}>Opportunity:</Text>
                      <Text style={styles.subTitle}>
                        {opportunity[0].opportunity}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.title}>Company:</Text>
                      <Text style={styles.subTitle}>
                        {opportunity[0].customer}
                      </Text>
                    </View>

                    <View style={styles.row}>
                      <Text style={styles.title}>Phone:</Text>
                      <Text style={styles.subTitle}>
                        {opportunity[0].phone}
                      </Text>
                    </View>

                    <View style={styles.row}>
                      <Text style={styles.title}>Email:</Text>
                      <Text style={styles.subTitle}>
                        {opportunity[0].email}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.title}>Sales Team:</Text>
                      <Text style={styles.subTitle}>
                        {opportunity[0].sales_team_id}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.title}>Priority:</Text>
                      <Text style={styles.subTitle}>
                        {opportunity[0].priority}
                      </Text>
                    </View>
                    <Button
                      title="Change Status"
                      containerStyle={styles.btnContainer}
                      buttonStyle={styles.button}
                      titleStyle={styles.btnText}
                      onPress={toggleModal}
                    />
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

export default OpportunityDetails;
