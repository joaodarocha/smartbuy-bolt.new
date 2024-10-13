import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const [subscriptionType, setSubscriptionType] = useState(user?.type || 'advanced');
  const [message, setMessage] = useState('');

  const handleSubscriptionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setSubscriptionType(newType);

    try {
      await axios.put('http://localhost:3001/api/user/update-subscription', {
        userId: user?.id,
        subscriptionType: newType
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage('Subscription updated successfully');
    } catch (error) {
      console.error('Error updating subscription:', error);
      setMessage('Failed to update subscription');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">User Profile</h2>
      <div className="mb-4">
        <p><strong>Email:</strong> {user?.email}</p>
      </div>
      <div className="mb-4">
        <label htmlFor="subscriptionType"
               className="block text-sm font-medium text-gray-700">
          Subscription Type
        </label>
        <select
          id="subscriptionType"
          value={subscriptionType}
          onChange={handleSubscriptionChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="advanced">Advanced</option>
          <option value="premium">Premium</option>
        </select>
      </div>
      {message && (
        <div
          className={`mt-4 p-2 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
      <button
        onClick={logout}
        className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
