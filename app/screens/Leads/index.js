import React, { useLayoutEffect, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Icon, Card } from 'react-native-elements';
import config from 'app/config/styles';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import * as leadsActions from 'app/actions/leadsActions';

const Leads = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(leadsActions.requestLeadsFetch());
  }, [dispatch]);
  const {
    loadingReducer: { isLeadsLoading },
    leadsReducer: { error, leads },
  } = useSelector(state => state);

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
      headerTitle: 'Total Leads',
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
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          {isLeadsLoading ? (
            <View style={styles.center}>
              <ActivityIndicator size={50} color={config.color.COLOR_PRIMARY} />
            </View>
          ) : error ? (
            <View style={styles.center}>
              <Text style={styles.error}>{error}</Text>
            </View>
          ) : (
            <FlatList
              data={leads}
              contentContainerStyle={{ paddingBottom: 20 }}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({ item, index }) => (
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('Lead Details', item)}>
                  <Card containerStyle={styles.card}>
                    <Text style={styles.opportunityName}>
                      {item.opportunity}
                    </Text>
                    <Text style={styles.companyName}>
                      By: {item.company_name}
                    </Text>
                  </Card>
                </TouchableWithoutFeedback>
              )}
              ListEmptyComponent={
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: 50,
                  }}>
                  <Text style={styles.title}>No Leads Yet</Text>
                </View>
              }
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Leads;
