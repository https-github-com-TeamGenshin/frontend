import React, { useEffect, useRef, useState } from 'react'

const GoogleAPIUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB5AmjhnysxqkFp4piatfCdWbRjy8m1puw&libraries=places&v=weekly"

function loadAsyncScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        Object.assign(script, {
            type: 'text/javascript',
            async: true,
            src,
        });
        script.addEventListener('load', () => resolve(script), false);
        document.body.appendChild(script);
    }
    );
}


export const New = () => {

    const searchInput = useRef(null);

    const initMapScript = async () => {
        if (window.google) {
            console.log('google maps already loaded');
            return Promise.resolve();
        }
        return await loadAsyncScript(GoogleAPIUrl);
    }

    const onChangeAddress = (autocomplete) => {
        const place = autocomplete.getPlace();
        console.log(place.geometry.location.lat(), place.geometry.location.lng())
    }

    const initAutocomplete = () => {
        if (!searchInput.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
        autocomplete.setFields(["address_component", "geometry"]);
        autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));

    }

    useEffect(() => {
        initMapScript().then(() => initAutocomplete())
    }, [])

    return (
        <div className="App">
            <div>
                    <input ref={searchInput} type="text" placeholder="Search location...." />
            </div>
        </div>
    )
}
