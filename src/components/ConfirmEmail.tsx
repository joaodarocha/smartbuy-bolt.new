import React, { useState } from 'react';

const ConfirmEmail: React.FC = () => {
  const [email, setEmail] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirmEmail = async () => {
    setLoading(true);
    // Simulate an API call to confirm the email
    try {
      // Replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setConfirmationMessage('Your email has been confirmed successfully!');
    } catch (error) {
      setConfirmationMessage('Failed to confirm your email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Confirm Your Email</h2>
      <p className="mb-4">
        Please enter your email address to confirm your registration.
      </p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="p-2 mb-4 border border-gray-300 rounded w-full"
        required
      />
      <button
        onClick={handleConfirmEmail}
        className={`p-2 rounded w-full text-white ${
          loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        } transition`}
        disabled={loading}
      >
        {loading ? 'Confirming...' : 'Confirm Email'}
      </button>
      {confirmationMessage && (
        <p
          className={`mt-4 ${
            confirmationMessage.includes('successfully')
              ? 'text-green-600'
              : 'text-red-600'
          }`}
        >
          {confirmationMessage}
        </p>
      )}
    </div>
  );
};

export default ConfirmEmail;
