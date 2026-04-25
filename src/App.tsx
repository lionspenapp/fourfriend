import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LionsPenProvider } from "@/context/LionsPenContext";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import ParentAuth from "./pages/ParentAuth.tsx";
import ParentDashboard from "./pages/ParentDashboard.tsx";
import StudentPortal from "./pages/StudentPortal.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import SubscribePage from "./pages/SubscribePage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-primary-foreground font-cinzel text-xl animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <LionsPenProvider>
      <BrowserRouter>
        <Routes>
          {/* Student is the main entry point */}
          <Route path="/" element={<Index />} />
          <Route path="/student" element={<Index />} />
          <Route path="/student/portal" element={<StudentPortal />} />

          {/* Parent routes */}
          <Route
            path="/parent"
            element={user ? <Navigate to="/parent/dashboard" replace /> : <ParentAuth />}
          />
          <Route
            path="/parent/dashboard"
            element={user ? <ParentDashboard /> : <Navigate to="/parent" replace />}
          />

          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/subscribe" element={<SubscribePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LionsPenProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
