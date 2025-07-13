"use client";

import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { doSignOut } from '../../firebase/auth';

export default function Dashboard() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    try {
      await doSignOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Welcome to AgriSmart Dashboard</h1>
            <button
              onClick={handleSignOut}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Account Information</h2>
              <div className="space-y-2">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Email Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</p>
                <p><strong>Account Created:</strong> {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
              {userProfile ? (
                <div className="space-y-2">
                  <p><strong>Full Name:</strong> {userProfile.fullName}</p>
                  <p><strong>Role:</strong> {userProfile.userRole}</p>
                  <p><strong>Profile Created:</strong> {userProfile.createdAt ? userProfile.createdAt.toLocaleDateString() : 'N/A'}</p>
                  {userProfile.photoURL && (
                    <div className="mt-4">
                      <img 
                        src={userProfile.photoURL} 
                        alt="Profile" 
                        className="w-16 h-16 rounded-full"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">Profile information not available</p>
              )}
            </div>
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Role-Based Features</h3>
            {userProfile?.userRole === 'Farmer' && (
              <p>As a Farmer, you can access crop management tools, weather forecasts, and market prices.</p>
            )}
            {userProfile?.userRole === 'Investor' && (
              <p>As an Investor, you can view investment opportunities, portfolio management, and market analysis.</p>
            )}
            {userProfile?.userRole === 'Trader' && (
              <p>As a Trader, you can access trading platforms, market trends, and commodity prices.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 