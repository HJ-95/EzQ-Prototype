import React from 'react';
import { Text, View, Alert, Picker, Button, FlatList, StyleSheet } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { Dropdown } from 'react-native-material-dropdown';



class LoginScreen extends React.Component {

  async componentDidMount() {
    this._configureGoogleSignIn();

  }

  _configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: '158837860037-q119dcdcd5gkgu2u0a4f8iru0ljdeenk.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        console.log('Something went wrong', error.toString());
        Alert.alert('Something went wrong', error.toString());
        this.setState({
          error,
        });
      }
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GoogleSigninButton
  style={{ width: 192, height: 48 }}
  size={GoogleSigninButton.Size.Wide}
  color={GoogleSigninButton.Color.Dark}
  onPress={this._signIn} />
      </View>
    );
  }
}

class CreateBookingScreen extends React.Component {

  render() {
    let dataLocation = [{
      value: 'Kuala Lumpur Hospital',
    }, {
      value: 'Prince Court Medical Centre',
    }, {
      value: 'Pantai Hospital Ampang',
    }, {
      value: 'Gleneagles Kuala Lumpur',
    }];

    return (
      <View style={{ justifyContent: 'center' }}>
        <Text>Select Hospotals ot Clinics location</Text>
        <Dropdown label='List of Hopitals' data={dataLocation} value={dataLocation.value}/>
        <Button
          title="Next"
          onPress={() => this.props.navigation.navigate('SelectService')}
        />
      </View>

    );
  }
}

class SelectServiceScreen extends React.Component {
  render() {
    let dataService = [{
      value: 'General Sickness',
    }, {
      value: 'Neurology',
    }, {
      value: 'Emergency department',
    }, {
      value: 'Cardiology',
    }];
    return (
      <View>
      <Text>Select Service</Text>
      <Dropdown label='List of Services' data={dataService} value={dataService.value}/>
      <Button
        title="Next"
        onPress={() => this.props.navigation.navigate('SelectBooking')}
      />
      </View>
    );
  }
}

class ViewCurrentBookingScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>View Current Booking</Text>
      <Text>You have estimated 2 hours 45 minutes more until your turn</Text>
      <Text>Current No: 0010</Text>
      <Text>Your Booking No: 0015</Text>

      </View>
    );
  }
}

class SelectBookingTimeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Select the slot you wish to book</Text>
      <Text>Current time: 9 am</Text>
      <Text>10 am</Text>
      <Text>11 am</Text>
      <Text>12 pm</Text>
      <Text>1 pm</Text>
      <Text>2 pm</Text>
      <Text>3 pm</Text>
      <Text>4 pm</Text>
      <Button
        title="Confirm"
        onPress={() => this.props.navigation.navigate('BookingConfirm')}
      />
      </View>


    );
  }
}

class BookingConfirmScreen extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Booking Details as follow:</Text>
      <Text>Booking no: 0015</Text>
      <Text>Booking time: 12 pm</Text>
      <Text>*Please arrive 15 mins earlier to avoid any disruption.</Text>

      </View>


    );
  }
}

const CreateStack = createStackNavigator({
  SelectLocation: CreateBookingScreen,
  SelectService: SelectServiceScreen,
  SelectBooking: SelectBookingTimeScreen,
  BookingConfirm: BookingConfirmScreen,
});

const TabNavigator = createBottomTabNavigator({
  Login: LoginScreen,
  Create: CreateStack,
  View: ViewCurrentBookingScreen,
});

export default createAppContainer(TabNavigator);
