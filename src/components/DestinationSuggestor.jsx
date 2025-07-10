import React, { useState } from 'react';

const DestinationSuggestor = () => {
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

   const getRandomDestination = async () => {
  setLoading(true);
  setError("");

  try {
    const res = await fetch("https://restcountries.com/v2/all?fields=name,capital,region");
    const data = await res.json();

    // Filter out countries missing capital or name
    const validCountries = data.filter(
      (country) => country.capital && country.name
    );

    const randomIndex = Math.floor(Math.random() * validCountries.length);
    const country = validCountries[randomIndex];

    const destination = `${country.capital}, ${country.name} (${country.region})`;
    setDestination(destination);
  } catch (err) {
    console.error("Fetch error:", err);
    setError("Failed to fetch destination.");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold mb-6">Travel Destination Suggestor</h1>
      <p className="text-lg mb-4">
        {loading
          ? "Loading..."
          : destination
          ? `How about visiting: ${destination}`
          : "Click the button to get a suggestion!"}
      </p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={getRandomDestination}
        className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-yellow-500 transition"
      >
        Suggest a destination
      </button>
    </div>
  );
};

export default DestinationSuggestor;
