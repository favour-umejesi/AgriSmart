"use client";

import React, { useState } from 'react';
import { User, Mail, Lock, Sprout, Users, TrendingUp, ChevronDown } from 'lucide-react';

export default function AgriSmartSignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    userRole: ''
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleSelect = (role: string) => {
    setFormData({
      ...formData,
      userRole: role
    });
    setIsDropdownOpen(false);
  };

  const handleSubmit = () => {
    console.log('Sign up data:', formData);
    // Handle form submission here
  };

  const handleGoogleSignUp = () => {
    console.log('Continue with Google');
    // Handle Google OAuth here
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Farmer':
        return <Sprout className="w-4 h-4" />;
      case 'Investor':
        return <TrendingUp className="w-4 h-4" />;
      case 'Trader':
        return <Users className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start px-4 pt-20 pb-8 overflow-y-auto">
      {/* Decorative Background Icons */}
      <div className="absolute inset-0 opacity-5 z-0 overflow-hidden">
        {/* ... */}
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10 mt-8 mb-12">
        {/* Logo/Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full mb-3 sm:mb-4 shadow-lg">
            <Sprout className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-2 px-4">AgriSmart Africa</h1>
          <p className="text-green-600 font-medium text-sm sm:text-base px-4">Empowering African Agriculture with Technology</p>
        </div>

        {/* Sign Up Form */}
        <div className="mx-4 sm:mx-0">
          <h2 className="text-xl sm:text-2xl font-bold text-black text-center mb-4 sm:mb-6">
            Create Your AgriSmart Account
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black bg-gray-50 text-sm sm:text-base text-black"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black bg-gray-50 text-sm sm:text-base text-black"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black bg-gray-50 text-sm sm:text-base text-black"
                  placeholder="Create a strong password"
                  required
                />
              </div>
            </div>

            {/* Role Dropdown */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">I am a...</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between pl-4 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black bg-gray-50 text-left text-sm sm:text-base text-black"
                >
                  <div className="flex items-center gap-2">
                    {formData.userRole && getRoleIcon(formData.userRole)}
                    <span className={formData.userRole ? 'text-black' : 'text-gray-400'}>
                      {formData.userRole || 'Select your role'}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-black transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
                    {['Farmer', 'Investor', 'Trader'].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => handleRoleSelect(role)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 text-sm sm:text-base text-black"
                      >
                        {getRoleIcon(role)}
                        <span className="text-black">{role}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sign Up Button */}
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base max-w-xs w-full"
              style={{ minWidth: '180px' }}
            >
              Create Account
            </button>
          </div>

          {/* Divider */}
          <div className="flex justify-center py-4">
            <div className="relative flex items-center" style={{ width: '180px' }}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative bg-white px-4 text-sm text-black mx-auto">or</div>
            </div>
          </div>

          {/* Google Sign Up Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="bg-white border border-gray-300 text-black py-3 px-8 rounded-lg font-semibold hover:bg-gray-100 focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md text-sm sm:text-base max-w-xs w-full"
              style={{ minWidth: '180px' }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-4 sm:mt-6">
            <p className="text-black text-sm sm:text-base">
              Already have an account?{' '}
              <a
                href="/login"
                className="font-semibold text-green-600 hover:text-green-700 transition-colors duration-200 hover:underline"
              >
                Log in here
              </a>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-black px-4">
          <p>Join thousands of African farmers, investors, and traders</p>
          <p>transforming agriculture with AI-powered insights</p>
        </div>
        {/* Optional: Farm-themed background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 left-10 text-green-200 opacity-20 text-4xl">🌾</div>
        <div className="absolute top-20 right-20 text-amber-200 opacity-20 text-3xl">🌻</div>
        <div className="absolute bottom-20 left-20 text-green-200 opacity-20 text-5xl">🌱</div>
        <div className="absolute bottom-10 right-10 text-amber-200 opacity-20 text-4xl">🌽</div>
        <div className="absolute top-1/2 left-5 text-green-200 opacity-15 text-3xl">🍃</div>
        <div className="absolute top-1/3 right-5 text-amber-200 opacity-15 text-3xl">🌾</div>
      </div>
    </div>
      
  </div> 
  );
}
