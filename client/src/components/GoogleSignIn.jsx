import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './GoogleSignIn.css';

const GoogleSignIn = ({ onSuccess, onError, text = "Continue with Google" }) => {
  const { googleAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Load Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load Google Identity Services');
      onError?.(new Error('Failed to load Google Sign-In'));
    };

    document.head.appendChild(script);

    return () => {
      // Clean up script if component unmounts
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [onError]);

  useEffect(() => {
    if (isScriptLoaded && window.google && buttonRef.current) {
      try {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        // Render the Google Sign-In button
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'continue_with',
          shape: 'rectangular',
        });
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
        onError?.(error);
      }
    }
  }, [isScriptLoaded]);

  const handleCredentialResponse = async (response) => {
    setIsLoading(true);
    try {
      const result = await googleAuth(response.credential);
      onSuccess?.(result);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback button if Google script fails to load
  if (!isScriptLoaded) {
    return (
      <button
        type="button"
        className="google-signin-btn"
        disabled={true}
      >
        <div className="loading-spinner"></div>
        Loading Google Sign-In...
      </button>
    );
  }

  return (
    <div className="google-signin-container">
      <div ref={buttonRef} className="google-signin-button"></div>
    </div>
  );
};

export default GoogleSignIn;
