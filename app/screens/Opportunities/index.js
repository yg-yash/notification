import React, { useLayoutEffect, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { Icon, Card } from 'react-native-elements';
import config from 'app/config/styles';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import * as opportunityActions from 'app/actions/opportunityActions';

const Opportunities = ({ navigation }) => {
  const {
    opportunityReducer: { error, opportunities },
    loadingReducer: { isOpportunitiesLoading },
  } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(opportunityActions.requestOpportunitiesFetch());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: props => (
        <TouchableWithoutFeedback onPress={() => navigation.toggleDrawer()}>
          <Icon
            {...props}
            type="feather"
            name="menu"
            style={{ marginLeft: 10 }}
            color={config.color.COLOR_SECONDARY}
          />
        </TouchableWithoutFeedback>
      ),
      headerStyle: { backgroundColor: config.color.COLOR_PRIMARY },
      headerTitle: 'Total Opportunities',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: config.color.COLOR_SECONDARY,
        fontSize: 15,
        lineHeight: 17,
        letterSpacing: 5,
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {isOpportunitiesLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size={50} color={config.color.COLOR_PRIMARY} />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={opportunities}
          contentContainerStyle={{ paddingBottom: 10 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Opportunity Details', item)}>
              <Card containerStyle={styles.card}>
                <Text style={styles.opportunityName}>{item.opportunity}</Text>
                <Text style={styles.companyName}>{item.email}</Text>
              </Card>
            </TouchableWithoutFeedback>
          )}
          ListEmptyComponent={
            <View
              style={{
                alignSelf: 'center',
                marginTop: 50,
              }}>
              <Text style={styles.title}>No Opportunities Yet</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default Opportunities;
