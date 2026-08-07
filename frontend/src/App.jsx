import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./features/auth/services/auth.context";
import { ChatProvider } from "./features/assistant/services/chat.context";
import { ResumeAnalysisProvider } from "./features/resume/analysis/services/Analysis.context";
import { ResumeGenerateProvider } from "./features/resume/generate/services/generate.context";

import { router } from "./app.routes";

const App = () => (
  <AuthProvider>
    <ChatProvider>
      <ResumeAnalysisProvider>
        <ResumeGenerateProvider>
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
        </ResumeGenerateProvider>
      </ResumeAnalysisProvider>
    </ChatProvider>
  </AuthProvider>
);

export default App;