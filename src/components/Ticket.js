import React from 'react';
import PropTypes from 'prop-types';
import AirlineLogo from './AirLaneLogo';
import styles from '../styles/Ticket.module.scss';

function Ticket({ ticket }) {
  const formatPrice = (price) => new Intl.NumberFormat('ru-RU').format(price) + ' Р';

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}ч ${mins}м`;
  };

  const [toSegment, fromSegment] = ticket.segments;

  return (
    <div className={styles.ticket}>
      <div className={styles.ticket_header}>
        <div className={styles.price}>{formatPrice(ticket.price)}</div>
        <AirlineLogo iataCode={ticket.carrier} />
      </div>
      <div className={styles.ticket_details}>
        {[toSegment, fromSegment].map((segment, i) => (
          <div key={`${segment.date}-${segment.destination}-${i}`} className={styles.segment}>
            <div className={styles.segment_part}>
              <div className={styles.segment_title}>
                {segment.origin} – {segment.destination}
              </div>
              <div className={styles.segment_value}>
                {formatTime(segment.date)} –{' '}
                {formatTime(new Date(new Date(segment.date).getTime() + segment.duration * 60000))}
              </div>
            </div>
            <div className={styles.segment_part}>
              <div className={styles.segment_title}>В пути</div>
              <div className={styles.segment_value}>{formatDuration(segment.duration)}</div>
            </div>
            <div className={styles.segment_part}>
              <div className={styles.segment_title}>{segment.stops.length} пересадки</div>
              <div className={styles.segment_value}>{segment.stops.join(', ')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Ticket.propTypes = {
  ticket: PropTypes.shape({
    price: PropTypes.number.isRequired,
    carrier: PropTypes.string.isRequired,
    segments: PropTypes.arrayOf(
      PropTypes.shape({
        origin: PropTypes.string.isRequired,
        destination: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        stops: PropTypes.arrayOf(PropTypes.string).isRequired,
        duration: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Ticket;
