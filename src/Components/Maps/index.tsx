import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Flex, HStack, Input, SkeletonText } from "@chakra-ui/react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { sessionActions } from "../../store/session-slice";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

type LatLng = {
  lat: number;
  lng: number;
};

type GeocoderResult = google.maps.GeocoderResult;
type DirectionsResult = google.maps.DirectionsResult;

export const Maps: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB5AmjhnysxqkFp4piatfCdWbRjy8m1puw",
    libraries: ["places"],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autoc, setautoc] = useState<any>(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<DirectionsResult | null>(null);
  const [center, setCenter] = useState<LatLng>({ lat: 0, lng: 0 });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        dispatch(
          sessionActions.addSessionLocation({
            location: { latitude: latitude, longitude: longitude },
          })
        );
        setCenter({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  const originRef = useRef<HTMLInputElement | null>(null);

  if (!isLoaded) {
    return <SkeletonText />;
  }

  const onChangeAddress = (autocomplete: any) => {
    const place = autocomplete.getPlace();
    // console.log(place.geometry.location.lat(), place.geometry.location.lng());
  };

  const onLoad = (autocomplete: any) => {
    setautoc(autocomplete);
  };

  const PlaceChanged = () => {
    if (autoc !== null) {
      setCenter({
        lat: autoc.getPlace().geometry.location.lat(),
        lng: autoc.getPlace().geometry.location.lng(),
      });
    } else {
      // console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => {
            setMap(map);
            const geocoder = new window.google.maps.Geocoder();
            const latLng = new window.google.maps.LatLng(
              center.lat,
              center.lng
            );
            geocoder.geocode(
              { location: latLng },
              (
                results: GeocoderResult[] | null,
                status: google.maps.GeocoderStatus
              ) => {
                if (status === "OK" && results && results.length > 0) {
                  if (originRef.current) {
                    originRef.current.value = results[0].formatted_address;
                  }
                } else {
                  // console.log("Geocoder failed due to: ", status);
                }
              }
            );
          }}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete onLoad={onLoad} onPlaceChanged={PlaceChanged}>
              <Input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete>
          </Box>
          <Button
            onClick={() => {
              dispatch(
                sessionActions.addSessionLocation({
                  location: { latitude: center.lat, longitude: center.lng },
                })
              );
              navigate("/timeandkm");
            }}
            className=" hover:scale-105"
          >
            Confirm
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Maps;
