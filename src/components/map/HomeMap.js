import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const HomeMap = ({ fields }) => {
    const initialRegion = {
        latitude: 42.882004,
        longitude: 74.582748,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <View style={styles.mapContainer}> 
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
            >
                { fields && (
                    fields?.map((field, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: Number(field.location[0]),
                                longitude: Number(field.location[1])
                            }}
                        />
                    ))
                ) }
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default HomeMap;