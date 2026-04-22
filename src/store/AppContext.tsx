import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';

interface AppState {
  favorites: string[];
  recentTools: string[];
}

interface ToastState {
  message: string;
  visible: boolean;
}

interface AppContextValue {
  state: AppState;
  toast: ToastState;
  showToast: (message: string, duration?: number) => void;
  addFavorite: (toolId: string) => void;
  removeFavorite: (toolId: string) => void;
  addRecentTool: (toolId: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => ({
    favorites: loadFromStorage('favorites', []),
    recentTools: loadFromStorage('recentTools', []),
  }));

  const [toast, setToast] = useState<ToastState>({ message: '', visible: false });

  const showToast = useCallback((message: string, duration = 2000) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), duration);
  }, []);

  const updateState = useCallback((updates: Partial<AppState>) => {
    setState((prev) => {
      const newState = { ...prev, ...updates };
      saveToStorage('favorites', newState.favorites);
      saveToStorage('recentTools', newState.recentTools);
      return newState;
    });
  }, []);

  const addFavorite = useCallback(
    (toolId: string) => {
      setState((prev) => {
        if (prev.favorites.includes(toolId)) return prev;
        const newFavorites = [...prev.favorites, toolId];
        saveToStorage('favorites', newFavorites);
        return { ...prev, favorites: newFavorites };
      });
    },
    []
  );

  const removeFavorite = useCallback((toolId: string) => {
    setState((prev) => {
      const newFavorites = prev.favorites.filter((id) => id !== toolId);
      saveToStorage('favorites', newFavorites);
      return { ...prev, favorites: newFavorites };
    });
  }, []);

  const addRecentTool = useCallback((toolId: string) => {
    setState((prev) => {
      const filtered = prev.recentTools.filter((id) => id !== toolId);
      const newRecent = [toolId, ...filtered].slice(0, 10);
      saveToStorage('recentTools', newRecent);
      return { ...prev, recentTools: newRecent };
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        toast,
        showToast,
        addFavorite,
        removeFavorite,
        addRecentTool,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};