import React from 'react';
import PropTypes from 'prop-types';

function AirlineLogo({ iataCode }) {
  const logoUrl = `https://pics.avs.io/99/36/${iataCode}.png`;

  return <img src={logoUrl} alt={`${iataCode} logo`} width="99" height="36" />;
}

AirlineLogo.propTypes = {
  iataCode: PropTypes.string.isRequired,
};

export default AirlineLogo;
