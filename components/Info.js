import React from 'react'
import { SafeAreaView, StyleSheet, Image } from "react-native";
import { Text } from 'react-native-paper';

const Info = () => {

  const B = (props) => <Text style={{fontWeight: '800'}}>{props.children}</Text>

    return (
      <SafeAreaView style={{flex:1, flexDirection: 'column'}}>
        <Text variant="titleLarge" style={{marginLeft: 10}}>Pourquoi utiliser une API météo ?</Text>
        <Text style={styles.text} variant="titleMedium">Le moyen simple et efficace d'automatiser la récupération de données météo géolocalisées</Text>
        <Text style={styles.text} variant="titleSmall">Notre API (Application Programming Interface) permet aux développeurs de site internet ou d'applications d'intégrer des <B>données météorologiques de prévisions ou d'observations</B> pour un lieu ou une station météo souhaité. Ainsi, l'API météo permet par exemple de <B>fournir une page météo sur un site internet, une application mobile</B> ou encore d'ajouter un <B>encart ou un widget météo</B> en complément d'information</Text>
        <Text style={styles.text} variant="titleSmall">L'API météo n'est pas destinée uniquement au web et au mobile. Utilisez l'API comme base de données pour <B>alimenter des programmes ou algorithmes d'aide à la décision</B>. Les utilisations sont infinies : agriculture, agroalimentaire, énergie, marketing publicitaire, etc...</Text>
        <Text style={styles.text} variant="titleSmall">Les données de prévisions météo sont générées par Météo Concept et sont améliorées en continu par notre service de Recherche & Développement.</Text>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    text: {
      marginTop: 15,
      marginLeft: 10,
      marginRight: 10, 
      textAlign: 'center',
      lineHeight: 30
    },
});

export default Info;