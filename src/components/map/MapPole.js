import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapPole = ({ location }) => {
    const initialRegion = {
        latitude: location ? location[0] : 16.97274101999902,
        longitude: location ? location[1] : 8.789062500000002,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
            >
                <Marker
                    coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                    title={"Заголовок маркера"}
                    description={"Описание маркера"}
                />
            </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        width: 340,
        height: 265,
        borderRadius: 20,
        position: "static"
    }
});

export default MapPole