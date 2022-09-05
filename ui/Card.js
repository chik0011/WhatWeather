import React from "react";
import { SafeAreaView, Image, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from 'react-native-paper';
import moment from 'moment';

const CardWethear = ({datetime, tmin, tmax, probarain, sunHours}) => {

  let urlPicture = "";
  let outputDate = moment(datetime).format("DD/MM/YYYY") 
  
  if (probarain > 60) {
    urlPicture = require('../assets/img/leau.png');
  } else if (tmax > 25) {
    urlPicture = require('../assets/img/soleil.png');
  } else if (tmax < 25 && tmax > 20) {
    urlPicture = require('../assets/img/soleil-nuage.png');
  } else {
    urlPicture = require('../assets/img/nuage.png');
  }

  return (
      <SafeAreaView>
          <Card style={{marginTop: 0, marginBottom: 30}}>
            <Image source={urlPicture}
            style={{width: '100%', height: 200, resizeMode:'contain', flex: 1, marginBottom: 30, marginTop: 30}} />

            <Card.Content>
              <Title>{outputDate}</Title>
              <Paragraph>{tmin} C° min</Paragraph>
              <Paragraph>{tmax} C° max</Paragraph>
              <Paragraph>{probarain}% (Probabilité de pluie entre 0 et 100%)</Paragraph>
              <Paragraph>{sunHours} heures de soleil</Paragraph>
            </Card.Content>
          </Card>
      </SafeAreaView>
  );
}

export default CardWethear;