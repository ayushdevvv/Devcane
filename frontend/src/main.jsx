import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import eruda from "eruda";

// Initialize Eruda only in production
if (import.meta.env.PROD) {
  eruda.init();
}

// Global JavaScript Errors
window.onerror = (message, source, line, column, error) => {
  console.error("========== GLOBAL ERROR ==========");
  console.error({
    message,
    source,
    line,
    column,
    error,
  });

  alert(
    `JavaScript Error\n\n${message}\n\n${source}\nLine: ${line}:${column}`
  );
};

// Unhandled Promise Rejections
window.onunhandledrejection = (event) => {
  console.error("========== PROMISE ERROR ==========");
  console.error(event.reason);

  alert(
    `Promise Error\n\n${
      event.reason?.message ||
      event.reason ||
      "Unknown Promise Rejection"
    }`
  );
};

// Browser Information
console.log("========== BROWSER INFO ==========");
console.log("User Agent:", navigator.userAgent);
console.log("Platform:", navigator.platform);
console.log("Language:", navigator.language);
console.log("Cookies Enabled:", navigator.cookieEnabled);
console.log("Online:", navigator.onLine);
console.log("Secure Context:", window.isSecureContext);

console.log("========== FEATURE SUPPORT ==========");
console.table({
  Fetch: !!window.fetch,
  FormData: !!window.FormData,
  FileReader: !!window.FileReader,
  Clipboard: !!navigator.clipboard,
  LocalStorage: !!window.localStorage,
  SessionStorage: !!window.sessionStorage,
  ServiceWorker: "serviceWorker" in navigator,
  BackdropFilter:
    window.CSS?.supports?.("backdrop-filter", "blur(10px)") ?? false,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);