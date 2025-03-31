import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchId, fetchTickets } from '../store/actions/filtersActions';
import Ticket from './Ticket';
import Loader from './Loader';
import styles from '../styles/TicketList.module.scss';

function TicketList() {
  const dispatch = useDispatch();
  const { tickets, isLoading, error, searchId, stop, checkboxes, sortBy } = useSelector(
    (state) => state.filters
  );

  const [loadedTicketsCount, setLoadedTicketsCount] = useState(0);
  const [visibleTicketsCount, setVisibleTicketsCount] = useState(5);
  useEffect(() => {
    if (!searchId && !isLoading && !error) {
      dispatch(fetchSearchId());
    }
  }, [dispatch, searchId, isLoading, error]);

  useEffect(() => {
    if (searchId && !stop && loadedTicketsCount < 5) {
      const interval = setInterval(() => {
        dispatch(fetchTickets({ searchId, sortBy, checkboxes }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [dispatch, searchId, stop, sortBy, checkboxes, loadedTicketsCount]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (searchId && loadedTicketsCount < 5) {
      dispatch(fetchTickets({ searchId, sortBy, checkboxes }));
      setLoadedTicketsCount(loadedTicketsCount + 1);
    }
  }, [dispatch, searchId, sortBy, checkboxes, isLoading, loadedTicketsCount]);

  const filteredTickets = React.useMemo(() => {
    return tickets
      .filter((ticket) => {
        const stopsCounts = ticket.segments.map((segment) => segment.stops.length);
        const matchesStops =
          (checkboxes['0'] && stopsCounts.some((count) => count === 0)) ||
          (checkboxes['1'] && stopsCounts.some((count) => count === 1)) ||
          (checkboxes['2'] && stopsCounts.some((count) => count === 2)) ||
          (checkboxes['3'] && stopsCounts.some((count) => count === 3));

        return matchesStops;
      })
      .sort((a, b) => {
        if (sortBy === 'cheapest') {
          return a.price - b.price;
        }
        if (sortBy === 'fastest') {
          const durationA = a.segments.reduce((sum, segment) => sum + segment.duration, 0);
          const durationB = b.segments.reduce((sum, segment) => sum + segment.duration, 0);
          return durationA - durationB;
        }
        return 0;
      });
  }, [tickets, checkboxes, sortBy]);

  const showMoreTickets = () => {
    setVisibleTicketsCount((prevCount) => prevCount + 5);
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (filteredTickets.length === 0 && !isLoading) {
    return <div className="no-tickets">Рейсов, подходящих под заданные фильтры, не найдено</div>;
  }

  return (
    <div className={styles.ticket_list}>
      {isLoading && <Loader />}
      {filteredTickets.slice(0, visibleTicketsCount).map((ticket) => (
        <div
          key={`${ticket.price}-${ticket.carrier}-${ticket.segments[0].date}`}
          className={styles.ticket_item}
        >
          <Ticket ticket={ticket} />
        </div>
      ))}
      {filteredTickets.length > visibleTicketsCount && (
        <button className={styles.show_button} onClick={showMoreTickets}>
          Показать еще 5 билетов!
        </button>
      )}
    </div>
  );
}

export default TicketList;
