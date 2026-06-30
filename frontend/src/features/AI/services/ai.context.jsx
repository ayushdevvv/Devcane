import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { sendPrompt, getSessions, getHistory, deleteSession, getQuota } from "./ai.api";
import { toast } from "react-toastify";

const AIContext = createContext(null);

export const AIProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("generate");
  const [currentTitle, setCurrentTitle] = useState("");
  const [quota, setQuota] = useState(null);

  const fetchSessions = useCallback(async () => {
    try {
      const data = await getSessions();
      setSessions(data.sessions || []);
    } catch {
      // silent
    }
  }, []);

  const fetchQuota = useCallback(async () => {
    try {
      const data = await getQuota();
      setQuota(data.quota);
    } catch {
      // silent — don't block UI if quota check fails
    }
  }, []);


  useEffect(() => {
    fetchQuota();
  }, [fetchQuota]);

  const sendMessage = useCallback(async (prompt) => {
    
    if (quota && quota.remaining <= 0) {
      toast.error("Today's quota completed. Please come back tomorrow!");
      return;
    }

    try {
      setLoading(true);
      setMessages((prev) => [...prev, { role: "user", content: prompt }]);

      const data = await sendPrompt(prompt, sessionId, mode);

      if (!sessionId && data.sessionId) {
        setSessionId(data.sessionId);
        setCurrentTitle(data.title || prompt.slice(0, 40));
        fetchSessions();
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);

      if (data.quota) {
        setQuota(data.quota);
      }

      return data;
    } catch (error) {
      const status = error?.response?.status;
      const data = error?.response?.data;

      if (status === 429 && data?.quota) {
       
        setQuota(data.quota);
        toast.error(data.message || "Today's quota completed. Please come back tomorrow!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }

      setMessages((prev) => prev.slice(0, -1)); 
    } finally {
      setLoading(false);
    }
  }, [sessionId, mode, fetchSessions, quota]);

  const loadChat = useCallback(async (id) => {
    try {
      const data = await getHistory(id);
      setSessionId(id);
      setCurrentTitle(data.title || "");
      setMessages(data.messages || []);
    } catch {
      toast.error("Failed to load chat.");
    }
  }, []);

  const removeSession = useCallback(async (id) => {
    try {
      await deleteSession(id);
      setSessions((prev) => prev.filter((s) => s.sessionId !== id));
      if (sessionId === id) newChat();
      toast.success("Chat deleted.");
    } catch {
      toast.error("Failed to delete chat.");
    }
  }, [sessionId]);

  const newChat = useCallback(() => {
    setSessionId(null);
    setMessages([]);
    setCurrentTitle("");
  }, []);

  return (
    <AIContext.Provider value={{
      messages, sessions, sessionId, loading, mode, currentTitle, quota,
      setMode, sendMessage, fetchSessions, loadChat, removeSession, newChat, fetchQuota,
    }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAIContext = () => useContext(AIContext);