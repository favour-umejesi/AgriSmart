"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sprout } from 'lucide-react';

const AgriSmartLoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  
  const handleSubmit = () => {
    // Handle login/signup logic here
    console.log(isLogin ? 'Login submitted' : 'Sign up submitted');
  };

  const handleSignUpRedirect = () => {
    router.push('/signup');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Logo/Header - styled like signup page */}
      <div className="w-full flex flex-col items-center mb-8 mt-8">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full mb-3 sm:mb-4 shadow-lg">
          <Sprout className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-2 px-4">AgriSmart Africa</h1>
        <p className="text-green-600 font-medium text-sm sm:text-base px-4">Grow Smarter with AgriSmart Africa</p>
      </div>
      {/* Login Form - no container */}
      <form className="w-full max-w-md mx-auto flex flex-col gap-4">
        <label className="block text-sm font-medium text-black mb-2">Email</label>
        <input 
          type="email" 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 text-black bg-white shadow-none"
          placeholder="Enter your email" 
        />
        <label className="block text-sm font-medium text-black mb-2">Password</label>
        <input 
          type="password" 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 text-black bg-white shadow-none"
          placeholder="Enter your password" 
        />
        {!isLogin && (
          <>
            <label className="block text-sm font-medium text-black mb-2">Confirm Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 text-black bg-white shadow-none"
              placeholder="Confirm your password" 
            />
          </>
        )}
        <div className="flex justify-center mt-2">
          <button 
            type="button"
            onClick={handleSubmit}
            className="bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-all duration-200 shadow-none hover:shadow-none transform hover:-translate-y-0.5 text-sm sm:text-base max-w-xs w-full"
            style={{ minWidth: '180px' }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </div>
        <div className="relative flex items-center justify-center py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative bg-white px-4 text-sm text-black">Or continue with</div>
        </div>
        <div className="flex justify-center">
          <button 
            type="button"
            className="bg-white border border-gray-300 text-black py-3 px-8 rounded-lg font-semibold hover:bg-gray-100 focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-none hover:shadow-none text-sm sm:text-base max-w-xs w-full"
            style={{ minWidth: '180px' }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-black">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            {isLogin ? (
              <button
                type="button"
                onClick={handleSignUpRedirect}
                className="text-green-600 hover:text-green-700 font-medium hover:underline"
              >
                Sign up here
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-green-600 hover:text-green-700 font-medium hover:underline"
              >
                Login here
              </button>
            )}
          </p>
        </div>
      </form>
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
  );
};

export default AgriSmartLoginPage;