import { useState, useEffect } from "react";
import { useStates } from './utilities/states';

export default function ScreeningsOverview() {
  const [screenings, setScreenings] = useState([]);

  useEffect(() => {
    async function fetchScreenings() {
      const response = await fetch("/api/screenings_overview");
      const data = await response.json();
      setScreenings(data);
    }
    fetchScreenings();
  }, []);

  const sortedScreenings = screenings.sort(
    (a, b) => new Date(a.screeningTime) - new Date(b.screeningTime)
  );

  const groupedScreenings = {};
  sortedScreenings.forEach((screening) => {
    const date = new Date(screening.screeningTime).toLocaleDateString();
    if (!groupedScreenings[date]) {
      groupedScreenings[date] = [];
    }
    groupedScreenings[date].push(screening);
  });

  return (
    <div>
      {Object.keys(groupedScreenings).map((date) => (
        <div key={date}>
          <h2>{new Date(date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h2>
          <ul>
            {groupedScreenings[date].map((screening) => (
              <li key={screening.screeningId}>
                {new Date(screening.screeningTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {screening.movie} ({screening.auditorium})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}