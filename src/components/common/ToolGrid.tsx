import { useState } from 'react';
import type { Tool, ToolCategory } from '../../tools/types';
import { toolRegistry, CATEGORY_LABELS } from '../../tools';
import ToolCard from './ToolCard';
import SearchBar from './SearchBar';

interface ToolGridProps {
  initialCategory?: ToolCategory;
}

const ToolGrid: React.FC<ToolGridProps> = ({ initialCategory }) => {
  const [category, setCategory] = useState<ToolCategory | 'all'>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...toolRegistry.getCategories()] as const;
  const tools = searchQuery
    ? toolRegistry.search(searchQuery)
    : category === 'all'
      ? toolRegistry.getAllTools()
      : toolRegistry.getToolsByCategory(category);

  return (
    <div className="tool-grid-container">
      <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="搜索工具..." />

      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-tab ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat === 'all' ? '全部' : CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      <div className="tool-grid">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
        {tools.length === 0 && <div className="empty-state">没有找到相关工具</div>}
      </div>
    </div>
  );
};

export default ToolGrid;