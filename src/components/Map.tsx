import React, { useMemo } from 'react';
import location from '../assets/location.svg';
import { useAppSelector } from '../store';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

function Map() {
  const { data } = useAppSelector((state) => state.product);
  const address = data?.company.address;
  const center = useMemo(() => {
    return {
      lat: parseFloat(address?.latitude || '0'),
      lng: parseFloat(address?.longitude || '0'),
    };
  }, [address]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
  });

  return (
    <div className='mt-[1.875rem]'>
      <div className='flex gap-[.3125rem]'>
        <div>
          <img src={location} alt='address' />
        </div>
        {address && (
          <div className='text-greyText text-[.875rem]'>
            {address.street} {address.house},<br />
            {address.zipCode} {address.city.name}, {address.country.name}
          </div>
        )}
      </div>
      <div className='w-full h-[12.5rem] mt-[.625rem]'>
        {!isLoaded ? (
          <h1>Loading map...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName='map-container'
            center={center}
            zoom={18}
            options={{
              disableDefaultUI: true,
            }}
          >
            <Marker position={center} />
          </GoogleMap>
        )}
      </div>
    </div>
  );
}

export default Map;
