import { useSession } from "next-auth/react";

export const useSessionRefresh = () => {
  const { data: session, update } = useSession();

  const refreshSession = async () => {
    try {
      const response = await fetch("/api/auth/refresh", { method: "POST" });
      if (response.ok) {
        // Update the session with new data
        await update();
      }
    } catch (error) {
      console.error("Failed to refresh session:", error);
    }
  };

  return { refreshSession, session };
};
