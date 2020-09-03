import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Avatar, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import config from 'app/config/styles';
import * as loginActions from 'app/actions/loginActions';
import * as dashboardActions from 'app/actions/dashboardActions';

const CustomDrawerContent = props => {
  const dispatch = useDispatch();

  const {
    dashboardReducer: { headerLogo },
    loadingReducer: { isDashboardLoading },
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(dashboardActions.getDashboardHeaderRequest());
  }, [dispatch]);
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <View style={styles.backIcon}>
          <Icon
            type="antdesign"
            name="left"
            color={config.color.COLOR_SECONDARY}
            size={25}
            onPress={() => props.navigation.closeDrawer()}
          />
        </View>
        <View style={styles.avatarContainer}>
          <Avatar
            source={{
              uri: headerLogo,
            }}
            size={80}
            rounded
            containerStyle={{
              borderWidth: 2,
              borderColor: '#FFE56A',
              padding: 2,
            }}
          />
        </View>
      </View>
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Dashboard');
          }}
          style={styles.itemTouchable}>
          <Text style={styles.itemLabel}>Dashboard</Text>
          <Icon
            type="antdesign"
            name="right"
            color={config.color.COLOR_BLACK}
            size={15}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Leads');
          }}
          style={styles.itemTouchable}>
          <Text style={styles.itemLabel}>Leads</Text>
          <Icon
            type="antdesign"
            name="right"
            color={config.color.COLOR_BLACK}
            size={15}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Opportunities');
          }}
          style={styles.itemTouchable}>
          <Text style={styles.itemLabel}>Opportunities</Text>
          <Icon
            type="antdesign"
            name="right"
            color={config.color.COLOR_BLACK}
            size={15}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.itemTouchable}
          onPress={() => {
            props.navigation.navigate('Add Leads');
          }}>
          <Text style={styles.itemLabel}>Add Leads</Text>
          <Icon
            type="antdesign"
            name="right"
            color={config.color.COLOR_BLACK}
            size={15}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => {
            dispatch(loginActions.logOut());
          }}
          style={styles.itemTouchable}>
          <Text style={styles.itemLabel}>Logout</Text>
          <Icon
            type="antdesign"
            name="right"
            color={config.color.COLOR_BLACK}
            size={15}
          />
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    backgroundColor: config.color.COLOR_PRIMARY,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backIcon: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'flex-start',
  },
  userName: {
    marginLeft: 10,
    fontSize: 18,
    lineHeight: 21,
    fontFamily: config.fonts.FONT_REGULAR,
    color: config.color.COLOR_SECONDARY,
  },
  avatarContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  email: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 18,
    fontFamily: config.fonts.FONT_REGULAR,
    color: config.color.COLOR_SECONDARY,
  },
  itemContainer: {
    marginTop: 10,
  },
  itemTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  itemLabel: {
    fontSize: 20,
    lineHeight: 22,
    color: config.color.COLOR_BLACK,
    fontFamily: config.fonts.FONT_REGULAR,
    paddingLeft: 5,
    paddingVertical: 15,
  },
});
