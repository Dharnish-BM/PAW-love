import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './GoogleSignIn.css';

const GoogleSignIn = ({ onSuccess, onError, text = "Continue with Google" }) => {
  const { googleAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const buttonContainerRef = useRef(null);

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
    if (isScriptLoaded && window.google && buttonContainerRef.current) {
      try {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: false,
        });

        // Clear previous renders (React StrictMode can run effects twice in dev)
        buttonContainerRef.current.innerHTML = '';

        // Render the official Google button visibly
        window.google.accounts.id.renderButton(buttonContainerRef.current, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'rectangular',
          text: 'continue_with',
          width: '100%'
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

  // No custom click handler needed; Google renders and handles the button

  return (
    <div className="google-signin-merged">
      {/* Visible themed mask */}
      <div className="google-styled-mask">
        <div className="google-icon">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </div>
        {text}
      </div>
      {/* Invisible official Google button layered on top for click/credentials */}
      <div ref={buttonContainerRef} className="google-signin-iframe-layer" />
    </div>
  );
};

export default GoogleSignIn;
