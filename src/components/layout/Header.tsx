import { Link } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeContext';

const Header: React.FC = () => {
  const { isDark, setMode, mode } = useTheme();

  const toggleTheme = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  return (
    <header className="header">
      <Link to="/" className="header-title">
        <h1>📱 安卓小工具</h1>
      </Link>
      <button className="theme-toggle" onClick={toggleTheme} title="切换主题">
        {isDark ? '☀️' : '🌙'}
      </button>
    </header>
  );
};

export default Header;