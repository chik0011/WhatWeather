import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import About from './components/About';
import Search from './components/Search';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Info from './components/Info';

const Tab = createBottomTabNavigator();

function AboutScreen() {
  return (
    <View style={styles.container}>
      <About/>
    </View>
  );
}

function SearchScreen() {
  return (
    <View style={styles.container}>
      <Search/>
    </View>
  );
}

function InfoScreen() {
  return (
    <View style={styles.container}>
      <Info/>
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Météo') {
              iconName = 'cloud'
            } else if (route.name === 'Rechercher') {
              iconName = 'ios-list';
            }else if (route.name === 'Info') {
              iconName = 'information-circle-sharp';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#DA291C',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Météo" component={AboutScreen} />
        <Tab.Screen name="Rechercher" component={SearchScreen} />
        <Tab.Screen name="Info" component={InfoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;