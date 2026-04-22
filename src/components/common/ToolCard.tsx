import { useNavigate } from 'react-router-dom';
import type { Tool } from '../../tools/types';
import { useApp } from '../../store/AppContext';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const navigate = useNavigate();
  const { addRecentTool, addFavorite, removeFavorite, state } = useApp();

  const isFavorite = state.favorites.includes(tool.id);

  const handleClick = () => {
    addRecentTool(tool.id);
    navigate(tool.route);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    isFavorite ? removeFavorite(tool.id) : addFavorite(tool.id);
  };

  return (
    <div className="tool-card" onClick={handleClick} role="button" tabIndex={0}>
      <button className={`favorite-btn ${isFavorite ? 'active' : ''}`} onClick={handleFavorite}>
        {isFavorite ? '★' : '☆'}
      </button>
      <span className="tool-icon">{tool.icon}</span>
      <h3>{tool.name}</h3>
      <p>{tool.description}</p>
    </div>
  );
};

export default ToolCard;