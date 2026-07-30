import { useEffect } from 'react';

/**
 * Cross-Tab Session Synchronization Custom Hook
 * Listens to browser storage events across open tabs of the same origin.
 * Synchronizes login / logout state immediately without page reload.
 */
export function useSessionSync(onSessionChange) {
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'vitaiq_current_session') {
        const newSession = e.newValue ? JSON.parse(e.newValue) : null;
        onSessionChange(newSession);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [onSessionChange]);
}
