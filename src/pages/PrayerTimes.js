import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        // Get current coordinates using Geolocation API
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

            const response = await axios.get(
              `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${latitude}&longitude=${longitude}&method=2`,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );

            setPrayerTimes(response.data.data.timings);
            setLoading(false);
          },
          (error) => {
            console.error('Error getting location:', error);
            setLoading(false);
          }
        );
      } catch (error) {
        console.error('Error fetching prayer times:', error);
      }
    };

    fetchPrayerTimes();
  }, []);

  return (
    <div>
      <h2>Prayer Times</h2>
      {loading ? (
        <p>Loading prayer times...</p>
      ) : prayerTimes ? (
        <ul>
          <li>Fajr: {prayerTimes.Fajr}</li>
          <li>Dhuhr: {prayerTimes.Dhuhr}</li>
          <li>Asr: {prayerTimes.Asr}</li>
          <li>Maghrib: {prayerTimes.Maghrib}</li>
          <li>Isha: {prayerTimes.Isha}</li>
        </ul>
      ) : (
        <p>Failed to fetch prayer times.</p>
      )}
    </div>
  );
};

export default PrayerTimes;
