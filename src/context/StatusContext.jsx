import { createContext, useContext } from "react";

// Lets a route component (e.g. an invalid service slug) signal a non-200
// HTTP status back to the SSR response. Only meaningful on the server: the
// client render passes no statusRef, so the context value stays null there
// and consumers no-op.
const StatusContext = createContext(null);

export const StatusProvider = StatusContext.Provider;

export function useSetStatus(code) {
  const statusRef = useContext(StatusContext);
  if (statusRef) statusRef.code = code;
}
