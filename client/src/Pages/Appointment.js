import React, { useState } from 'react';
import axios from 'axios';

export const Appointment = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload on form submission
    try {
      const response = await axios.post('http://localhost:3001/api/appointments/book', {
        name:name,
        email:email,
        date:date,
        time:time,
        reason:reason,
      });
      alert('Appointment booked successfully!');
      // console.log(response.data); // Optionally log the response
    } catch (error) {
      console.error('Error booking appointment:');
      alert('Failed to book appointment');
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-teal-500">
      <div className="w-full max-w-lg bg-white bg-opacity-95 p-10 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Book an Appointment
        </h1>
        <form onSubmit={handleSubmit}> {/* Added onSubmit */}
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your full name"
            />
          </div>

          {/* Repeat for other fields: Email, Date, Time, Reason */}
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="date">
              Appointment Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="time">
              Appointment Time
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="reason">
              Reason for Appointment
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Describe the reason for your appointment"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold text-lg px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};
