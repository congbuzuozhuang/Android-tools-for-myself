import { useParams, useNavigate, Link } from 'react-router-dom';
import { toolRegistry } from '../tools';
import { useApp } from '../store/AppContext';
import { loadToolConfig } from '../utils/storage';

const ToolPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const { showToast } = useApp();

  const tool = toolId ? toolRegistry.getTool(toolId) : null;

  const handleSaveConfig = (config: Record<string, unknown>) => {
    if (toolId) {
      saveToolConfig(toolId, config);
    }
  };

  if (!tool) {
    return (
      <div className="tool-page tool-not-found">
        <div className="not-found-content">
          <h2>🔍 工具不存在</h2>
          <p>找不到对应的工具</p>
          <Link to="/" className="back-link">
            ← 返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="tool-page">
      <div className="tool-page-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← 返回
        </button>
        <span className="tool-icon">{tool.icon}</span>
        <h2>{tool.name}</h2>
      </div>
      <div className="tool-page-content">
        <tool.component
          config={loadToolConfig(toolId!)}
          onSaveConfig={handleSaveConfig}
          showToast={showToast}
        />
      </div>
    </div>
  );
};

// 存储工具配置
function saveToolConfig(toolId: string, config: Record<string, unknown>): void {
  try {
    localStorage.setItem(`android-tools:tool:${toolId}:config`, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save config:', e);
  }
}

export default ToolPage;