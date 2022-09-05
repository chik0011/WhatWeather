import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';
import TOKEN from '../Token';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import { Card, Title, Paragraph, ActivityIndicator, MD2Colors  } from 'react-native-paper';
 
const About = () => {
  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState('...');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('...');
  const [
    locationStatus,
    setLocationStatus
  ] = useState('');

  const [
    meteo,
    setMeteo
  ] = useState([]);

  const [
    urlPicture,
    setUrlPicture
  ] = useState(require('../assets/img/carte.png'));

  const [
    displaySpinner,
    setDisplaySpinner
  ] = useState(false);
 
  const getOneTimeLocation = async () => {
    setDisplaySpinner(true);
    setLocationStatus('Un instant ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('');
 
        //getting the Longitude from the location json
        const currentLongitude = 
          JSON.stringify(position.coords.longitude);
 
        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);
 
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);

        submitSearchCity(currentLongitude, currentLatitude)
      },
      (error) => {
        setLocationStatus(error.message);
        setDisplaySpinner(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  let city = "";
  const submitSearchCity = async (longitude, latitude) => {
    let headers = {"Content-Type": "application/json"};
    const resSearchCity = await fetch(`http://api.positionstack.com/v1/reverse?access_key=${TOKEN.TokenAdress}&query=${latitude},${longitude}`, {headers,})
    const resJsonSearchCity = await resSearchCity.json();

    if (resJsonSearchCity) {
      if (resJsonSearchCity.data.length > 0) {
          console.log("ville trouvé avec les coordonées");
          console.log(resJsonSearchCity.data[0].county);
          city = resJsonSearchCity.data[0].county;
          setCity()
      } else {
          console.log('ville non trouvé avec les coordonées');
          setDisplaySpinner(false);
      }
    }
  }

  const setCity = async () => {
    let headers = {"Content-Type": "application/json"};
    const responseCity = await fetch(`https://api.meteo-concept.com/api/location/cities?token=${TOKEN.TOKEN}&search=${city}`, {headers,})
    const resCity = await responseCity.json();
    if (resCity) {
      if (resCity.cities.length > 0) {
        console.log("insee ville trouvé");
        console.log(resCity.cities[0].insee);
        submitSearch(resCity.cities[0].insee);
      } else {
          console.log('insee ville non trouvé');
          setDisplaySpinner(false);
      } 
    }
  }

  const submitSearch = async (insee) => {
    let headers = {"Content-Type": "application/json"};
    const response = await fetch(`https://api.meteo-concept.com/api/forecast/daily?token=${TOKEN.TOKEN}&insee=${insee}`, {headers,});
    const resMeteo = await response.json();
    if (resMeteo) {
      if (resMeteo.forecast.length > 0) {
        console.log("météo trouvé la suivante");
        console.log(resMeteo.forecast[0]);
        setMeteo(resMeteo.forecast[0])

        if (resMeteo.forecast[0].probarain > 60) {
          setUrlPicture(require('../assets/img/leau.png'));
        } else if (resMeteo.forecast[0].tmax > 25) {
          setUrlPicture(require('../assets/img/soleil.png'));
        } else if (resMeteo.forecast[0].tmax < 25 && resMeteo.forecast[0].tmax > 20) {
          setUrlPicture(require('../assets/img/soleil-nuage.png'));
        } else {
          setUrlPicture(require('../assets/img/nuage.png'));
        }
      } else {
        console.log('météo non trouvé');
      }

      setDisplaySpinner(false);
    }
  }
  
  let outputDate = moment(meteo.datetime).format("DD/MM/YYYY") 
  
  return (
    <SafeAreaView style={{flex: 1}}>
      
      <View style={{width: "100%", height: 350}}>
          <Image source={urlPicture} style={{width: '100%', height: 400, resizeMode:'contain', flex: 1, marginBottom: 30, marginTop: 30}} />
      </View>

      <Card.Content style={{marginLeft: 30, marginTop: 30}}>
        <Title>{outputDate}</Title>
        <Paragraph>{meteo.tmin} C° min</Paragraph>
        <Paragraph>{meteo.tmax} C° max</Paragraph>
        <Paragraph>{meteo.probarain}% (Probabilité de pluie entre 0 et 100%)</Paragraph>
        <Paragraph>{meteo.sunHours} heures de soleil</Paragraph>
      </Card.Content>

      <View style={styles.container}>
        <View style={styles.container}>
          <ActivityIndicator animating={displaySpinner} color={MD2Colors.red800} />
          <View style={{marginTop: 20}}>
            <Button
              title="Ma position"
              onPress={getOneTimeLocation}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 25,
    color: 'red',
    marginVertical: 16,
  },
});
 
export default About;