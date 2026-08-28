
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Button from './ui/Button';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      size="icon"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      variant="secondary"
    >
      {isDark ? (
        <Sun aria-hidden="true" className="h-4 w-4" />
      ) : (
        <Moon aria-hidden="true" className="h-4 w-4" />
      )}
    </Button>
  );
}
