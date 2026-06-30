import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./features/auth/services/auth.context";
import { AIProvider } from "./features/AI/services/ai.context";
import { router } from "./app.routes";

const App = () => {
  return (
    <AuthProvider>
      <AIProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          theme="dark"
          toastStyle={{
            background: "#0f1322",
            border: "1px solid #1e2440",
            color: "#e2e8f0",
          }}
        />
      </AIProvider>
    </AuthProvider>
  );
};

export default App;