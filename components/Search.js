import React, {useEffect, useState} from 'react'
import { SafeAreaView, StyleSheet, ScrollView, Text, Bouton } from "react-native";
import { Searchbar } from 'react-native-paper';
import CardWethear from '../ui/Card';
import TOKEN from '../Token';
import { Button } from 'react-native-paper';

const Search = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query) => {
        setSearchQuery(query);   
        if (!query) {
            getListeCities([])
            getListeWeatherCities([])
        }     
    } 

    const [listeCities, getListeCities] = useState([]);

    const submitSearchCity = () => {
        getListeCities([])

        let headers = {"Content-Type": "application/json"};
        fetch(`https://api.meteo-concept.com/api/location/cities?token=${TOKEN.TOKEN}&search=${searchQuery}`, {headers,})
        .then(json => json.json()) 
        .then(resultat => {
            if (resultat.cities.length > 0) {
                console.log("ville trouvé");
                getListeCities(resultat.cities);
            } else {
                console.log('ville non trouvé');
            }
        });
    }

    const submitSearch = (insee) => {
        console.log(insee);

        let headers = {"Content-Type": "application/json"};
        fetch(`https://api.meteo-concept.com/api/forecast/daily?token=${TOKEN.TOKEN}&insee=${insee}`, {headers,})
        .then(json => json.json())
        .then(resultat => {
            if (resultat.forecast.length > 0) {
                console.log("météo trouvé");
                getListeWeatherCities(resultat.forecast);
                getListeCities([])
            } else {
                console.log('météo non trouvé');
            }
        });
    }

    const [listeWeatherCities, getListeWeatherCities] = useState([]);
    
    const renderElement = (listeWeatherCities) => {
        if (listeWeatherCities.listeWeatherCities.length > 0) {
            return(
                <SafeAreaView style={{marginTop: 20}}>
                    {listeWeatherCities.listeWeatherCities.map(weather => (
                        <CardWethear
                            key={weather.day}
                            datetime={weather.datetime}
                            tmin={weather.tmin}
                            tmax={weather.tmax}
                            probarain={weather.probarain}
                            sunHours={weather.sun_hours}
                        />
                    ))}
                </SafeAreaView>
            )
        }
    }

    const renderCity = (listeCities) => {
        if (listeCities.listeCities) {
            return(
                <SafeAreaView>
                    {listeCities.listeCities.map((city, index) => (
                        <Button key={index} style={{marginTop:8, backgroundColor: '#DA291C', borderRadius: 3}} icon="" mode="contained" onPress={() => submitSearch(city.insee)}>
                            {city.name}
                        </Button>
                    ))}
                </SafeAreaView>
            )
        } else {
            return(
                <SafeAreaView>
                    <Text style={{marginLeft: 10, marginTop: 10}}>Auncune ville trouvé</Text>
                </SafeAreaView>
            )
        }
    }

    return (
        <SafeAreaView>
            <Searchbar
                placeholder="Rechercher une ville"
                onChangeText={onChangeSearch}
                onSubmitEditing={() => {
                    submitSearchCity()
                }}
                value={searchQuery}
                style={styles.input}
            />

            <ScrollView contentInsetAdjustmentBehavior="automatic">  
                {renderCity({listeCities})}
                {renderElement({listeWeatherCities})}
            </ScrollView>            
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    input: {
        width: '95%',
        height: 30,
        marginTop: 3
    },
});

export default Search;