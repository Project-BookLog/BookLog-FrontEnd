import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,     
      gcTime: 1000 * 60 * 30,        
      refetchOnWindowFocus: false,   
      refetchOnReconnect: true,
      retry: 1,
    },
    mutations: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  </StrictMode>
);
