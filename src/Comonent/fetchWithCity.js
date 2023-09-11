import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export default function FetchWithCity() {

    const [longtitude, setlongtitude] = useState('')
    const [latitude, setlatitude] = useState('')

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        setlatitude(position.coords.latitude);
        setlongtitude(position.coords.longitude);
    });

    const [value, setValue] = useState(null);

    return (
        <>
            <GooglePlacesAutocomplete
                apiKey='AIzaSyCuJXjp5CZIeUdVA4_Nm1k07bhQlOPQEi4'
                autocompletionRequest={{
                    bounds: [
                        { lat: 50, lng: 50 },
                        { lat: 100, lng: 100 }
                    ],
                }}
            />
            {
                value
            }
        </>

    )
}