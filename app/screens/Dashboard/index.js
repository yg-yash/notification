import React, { useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { Card, Header, Icon, Avatar, Button } from 'react-native-elements';
import styles from './styles';
import config from 'app/config/styles';
import { useDispatch, useSelector } from 'react-redux';
import * as dashboardActions from 'app/actions/dashboardActions';

const Dashboard = ({ navigation }) => {
  const {
    dashboardReducer: { leadsCount, error, opportunitesCount, headerName },
    loadingReducer: { isDashboardLoading },
  } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dashboardActions.requestLeadsCount());
    dispatch(dashboardActions.requestOpportunitiesCount());
    dispatch(dashboardActions.getDashboardHeaderRequest());
  }, [dispatch]);

  const leftHeaderComponent = () => (
    <Icon
      type="feather"
      name="menu"
      onPress={() => navigation.openDrawer()}
      color={config.color.COLOR_SECONDARY}
    />
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Header
        leftComponent={leftHeaderComponent}
        centerComponent={{
          text: headerName ? headerName : 'SRK',
          style: {
            color: config.color.COLOR_SECONDARY,
            fontSize: 15,
            lineHeight: 17,
            letterSpacing: 1,
          },
        }}
        containerStyle={{
          backgroundColor: config.color.COLOR_PRIMARY,
        }}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.screen}>
          {isDashboardLoading ? (
            <ActivityIndicator
              size={50}
              color={config.color.COLOR_PRIMARY}
              style={{ alignSelf: 'center' }}
            />
          ) : error ? (
            <Text style={styles.error}>{error}</Text>
          ) : (
            <>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Leads')}>
                <Card containerStyle={styles.card}>
                  <Text style={styles.titleStyle}>
                    Total Leads : {leadsCount ? leadsCount : 0}
                  </Text>
                </Card>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Opportunities')}>
                <Card containerStyle={styles.secondCard}>
                  <Text style={styles.titleStyle}>
                    Total Opportunities : {opportunitesCount}
                  </Text>
                </Card>
              </TouchableWithoutFeedback>
            </>
          )}
          <View style={styles.bottomContainer}>
            <Button
              title="Add Lead"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.button}
              titleStyle={styles.btnText}
              onPress={() => navigation.navigate('Add Leads')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
