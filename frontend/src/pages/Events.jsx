import React, { useContext } from "react";

import { DataContext } from "../context/DataProvider";
import EventCard from "../components/EventCard";

export default function Events() {
  const { events } = useContext(DataContext);

  return (

    <div className="relative h-screen w-full">
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {events.map((event,index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </div>
    </div>
  );
}