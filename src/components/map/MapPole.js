import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapPole = ({ location_one = 0, location_two = 0 }) => {
    const initialRegion = {
        latitude: location_one,
        longitude: location_two,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <View style={styles.mapContainer}> 
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
            >
                {location_one && location_two && (
                    <Marker
                        coordinate={{ latitude: location_one, longitude: location_two }}
                    />
                )}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: 265,
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: 15
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default MapPole;