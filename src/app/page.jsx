'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import atlixlogo from '../../public/atlixlogo.png';
import destination from './destinations.json';
import accommodations from './accommodations.json';
import keyfeat from './keyfeat.json';
import steps from './steps.json';

const AtlixLandingPage = () => {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: { adults: 2, children: 0, rooms: 1 },
  });
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Fake data for Morocco destinations and accommodations
  const fakeData = {
    destinations: destination,
    accommodations: accommodations,
  };

  const handleSearch = () => {
    // Filter accommodations based on destination
    let results = fakeData.accommodations;
    if (searchData.destination) {
      results = results.filter((acc) =>
        acc.location
          .toLowerCase()
          .includes(searchData.destination.toLowerCase())
      );
    }
    setSearchResults(results);
    setShowResults(true);
  };

  const updateGuests = (type, operation) => {
    setSearchData((prev) => ({
      ...prev,
      guests: {
        ...prev.guests,
        [type]:
          operation === 'increment'
            ? prev.guests[type] + 1
            : Math.max(type === 'adults' ? 1 : 0, prev.guests[type] - 1),
      },
    }));
  };

  const handlePlanTrip = () => {
    console.log('Plan Your Trip clicked');
  };

  const handleDownloadApp = () => {
    console.log('Download App clicked');
  };

  const handleGetApp = () => {
    console.log('Get the App clicked');
  };

  const handleBuildJourney = () => {
    console.log('Build Your Journey clicked');
  };

  return (
    <div className="min-h-screen bg-[#fefae0] text-gray-800">
      {/* Header */}
      <header
        className="relative bg-cover bg-center pb-1 bg-no-repeat px-4 text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1531230689007-0b32d7a7c33e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <Image
            src={atlixlogo}
            alt="ATLIX Logo"
            width={200}
            height={100}
            className="mx-auto w-32 sm:w-48 md:w-56 lg:w-64 h-auto"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Explore Morocco like a Local with ATLIX
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Smart itineraries, real-time recommendations, offline navigation,
            and immersive cultural experiences—tailored just for you.
          </p>

          {/* Search Container */}
          <div className="bg-white bg-opacity-95 rounded-2xl p-2 sm:p-6 lg:p-4 mb-8 shadow-2xl">
            <h2 className="text-[#bc6c25] text-lg sm:text-xl md:text-2xl font-bold mb-6 text-center">
              Find Your Perfect Moroccan Stay
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 items-end">
              {/* Destination Input */}
              <div className="sm:col-span-2 lg:col-span-2">
                <label className="block text-gray-600 text-sm font-medium mb-2">
                  Where are you going?
                </label>
                <input
                  className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-800 focus:border-[#bc6c25] focus:outline-none focus:ring-2 focus:ring-[#bc6c25] focus:ring-opacity-20 transition-colors"
                  type="text"
                  placeholder="Search destinations in Morocco..."
                  value={searchData.destination}
                  onChange={(e) =>
                    setSearchData({
                      ...searchData,
                      destination: e.target.value,
                    })
                  }
                  list="destinations"
                />
                <datalist id="destinations">
                  {fakeData.destinations.map((dest) => (
                    <option key={dest} value={dest} />
                  ))}
                </datalist>
              </div>

              {/* Check-in Date */}
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">
                  Check-in date
                </label>
                <input
                  className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-800 focus:border-[#bc6c25] focus:outline-none focus:ring-2 focus:ring-[#bc6c25] focus:ring-opacity-20 transition-colors"
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) =>
                    setSearchData({ ...searchData, checkIn: e.target.value })
                  }
                />
              </div>

              {/* Check-out Date */}
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">
                  Check-out date
                </label>
                <input
                  className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-800 focus:border-[#bc6c25] focus:outline-none focus:ring-2 focus:ring-[#bc6c25] focus:ring-opacity-20 transition-colors"
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) =>
                    setSearchData({ ...searchData, checkOut: e.target.value })
                  }
                />
              </div>

              {/* Guests Selector */}
              <div className="relative">
                <label className="block text-gray-600 text-sm font-medium mb-2">
                  Guests & rooms
                </label>
                <input
                  className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-800 cursor-pointer focus:border-[#bc6c25] focus:outline-none focus:ring-2 focus:ring-[#bc6c25] focus:ring-opacity-20 transition-colors"
                  type="text"
                  readOnly
                  value={`${searchData.guests.adults} adults • ${searchData.guests.children} children • ${searchData.guests.rooms} room`}
                  onClick={() => setShowGuestSelector(!showGuestSelector)}
                />

                {showGuestSelector && (
                  <div className="absolute top-full left-0 right-0 bg-white border-2 border-gray-300 rounded-lg p-5 mt-2 shadow-xl z-50">
                    {/* Adults */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-800 font-medium">Adults</span>
                      <div className="flex items-center gap-3">
                        <button
                          className="w-8 h-8 rounded-full border-2 border-[#bc6c25] text-[#bc6c25] flex items-center justify-center font-bold hover:bg-[#bc6c25] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => updateGuests('adults', 'decrement')}
                          disabled={searchData.guests.adults <= 1}
                        >
                          -
                        </button>
                        <span className="text-gray-800 font-bold w-6 text-center">
                          {searchData.guests.adults}
                        </span>
                        <button
                          className="w-8 h-8 rounded-full border-2 border-[#bc6c25] text-[#bc6c25] flex items-center justify-center font-bold hover:bg-[#bc6c25] hover:text-white transition-colors"
                          onClick={() => updateGuests('adults', 'increment')}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-800 font-medium">
                        Children
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          className="w-8 h-8 rounded-full border-2 border-[#bc6c25] text-[#bc6c25] flex items-center justify-center font-bold hover:bg-[#bc6c25] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => updateGuests('children', 'decrement')}
                          disabled={searchData.guests.children <= 0}
                        >
                          -
                        </button>
                        <span className="text-gray-800 font-bold w-6 text-center">
                          {searchData.guests.children}
                        </span>
                        <button
                          className="w-8 h-8 rounded-full border-2 border-[#bc6c25] text-[#bc6c25] flex items-center justify-center font-bold hover:bg-[#bc6c25] hover:text-white transition-colors"
                          onClick={() => updateGuests('children', 'increment')}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Rooms */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-800 font-medium">Rooms</span>
                      <div className="flex items-center gap-3">
                        <button
                          className="w-8 h-8 rounded-full border-2 border-[#bc6c25] text-[#bc6c25] flex items-center justify-center font-bold hover:bg-[#bc6c25] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => updateGuests('rooms', 'decrement')}
                          disabled={searchData.guests.rooms <= 1}
                        >
                          -
                        </button>
                        <span className="text-gray-800 font-bold w-6 text-center">
                          {searchData.guests.rooms}
                        </span>
                        <button
                          className="w-8 h-8 rounded-full border-2 border-[#bc6c25] text-[#bc6c25] flex items-center justify-center font-bold hover:bg-[#bc6c25] hover:text-white transition-colors"
                          onClick={() => updateGuests('rooms', 'increment')}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      className="w-full p-2 mt-3 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
                      onClick={() => setShowGuestSelector(false)}
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Search Button */}
            <button
              className="w-full sm:w-auto mt-6 px-8 py-3 bg-[#bc6c25] text-white rounded-lg font-bold hover:bg-[#a0531a] transition-colors shadow-lg"
              onClick={() => {
                handleSearch();
                setShowGuestSelector(false);
              }}
            >
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Search Results Section */}
      {showResults && (
        <section className="px-4 py-12 md:py-16 lg:py-20 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-center text-[#bc6c25] font-bold mb-8">
            {searchResults.length > 0
              ? `Found ${searchResults.length} amazing stays${
                  searchData.destination ? ` in ${searchData.destination}` : ''
                }`
              : 'No results found - try a different destination'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {result.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {result.location} • {result.type}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span>⭐</span>
                    <span className="font-medium">{result.rating}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {result.description}
                  </p>
                  {/* <div className="text-2xl font-bold text-[#bc6c25]">
                    ${result.price}
                    <span className="text-sm text-gray-600 font-normal">
                      /night
                    </span>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What is ATLIX Section */}
      <section className="px-4 py-12 md:py-16 lg:py-20 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center text-[#bc6c25] font-bold mb-8">
          What is ATLIX?
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-center leading-relaxed max-w-4xl mx-auto">
          ATLIX is a smart, AI-powered travel platform that redefines how
          tourists explore Morocco. With personalized itineraries, offline maps,
          local insights, and ethically curated experiences, ATLIX bridges the
          gap between modern tech and authentic cultural discovery.
        </p>
      </section>

      {/* Key Features Section */}
      <section className="px-4 py-12 md:py-16 lg:py-20 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center text-[#bc6c25] font-bold mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyfeat.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-12 md:py-16 lg:py-20 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center text-[#bc6c25] font-bold mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-[#bc6c25] mb-4">
                {step.step}.
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 md:py-16 lg:py-20 bg-[#f4f3ee] text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#bc6c25] font-bold mb-8">
            Ready to Experience Morocco Differently?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-6">
            <button
              onClick={handleGetApp}
              className="px-8 py-3 bg-[#bc6c25] text-white rounded-lg font-bold hover:bg-[#a0531a] transition-colors"
            >
              Get the App
            </button>
            <button
              onClick={handleBuildJourney}
              className="px-8 py-3 bg-[#dda15e] text-white rounded-lg font-bold hover:bg-[#cc9754] transition-colors"
            >
              Build Your Journey
            </button>
          </div>
          <p className="text-gray-600">(Available on iOS & Android)</p>
        </div>
      </section>
    </div>
  );
};

export default AtlixLandingPage;
