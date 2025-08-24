import { useVoice } from "@humeai/voice-react";
import { Hume } from "hume";

// Use the SessionSettings type from the Hume SDK
type SessionSettings = Hume.empathicVoice.SessionSettings;

/**
 * Hook to update dynamic variables during a conversation with the Hume AI voice interface
 * @returns A function to update dynamic variables
 */
export const useSessionVariables = () => {
  const voice = useVoice();
  
  /**
   * Formats the current date/time for dynamic variables
   */
  const getFormattedDateTime = () => {
    return new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Gets the default session settings with dynamic variables
   */
  const getDefaultSessionSettings = (): SessionSettings => {
    return {
      type: "session_settings",
      variables: {
        username: "User",
        datetime: getFormattedDateTime()
      }
    };
  };

  return {
    getDefaultSessionSettings,
    getFormattedDateTime
  };
};
