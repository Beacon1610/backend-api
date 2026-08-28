
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Toaster } from 'sonner';

function AppContent() {
  const { theme } = useTheme();

  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster position="top-right" richColors closeButton theme={theme} />
    </AuthProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
