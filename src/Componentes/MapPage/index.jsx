import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import styled from 'styled-components';

const DivMapa = styled.div`
    width: 100%;
    height: 250px;
    border: 1px solid #50301E;
    padding: 5px;
    @media (max-width: 625px) {
        border: none;
    }
`

const MapPage = () => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCC48m9049u5zLxy7gQGSakX6HsXAi6S70"
    })
    
    const position = {
        lat: -19.6850085,
        lng: -44.8948068
    }

    return (
        <DivMapa>
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={{width: "100%", heigh: "100T"}}
                    center={{
                        lat: -19.6850085,
                        lng: -44.8948068
                    }}
                    zoom={19}
                >
                    <Marker position={position} />
                </GoogleMap>) 
            : 
                <></>}
        </DivMapa>
    )
}

export default MapPage