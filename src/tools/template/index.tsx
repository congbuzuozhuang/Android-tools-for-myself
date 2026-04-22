// 工具模板 - 复制此文件创建新工具
import type { ToolMeta, ToolProps } from '../types';
import { registerTool } from '../index';

const TemplateTool: React.FC<ToolProps> = ({ showToast }) => {
  return (
    <div className="tool-page">
      <h2>工具模板</h2>
      <p>复制此模板创建新工具</p>
    </div>
  );
};

const meta: ToolMeta = {
  id: 'template',
  name: '模板工具',
  icon: '📦',
  description: '新工具的模板',
  category: 'daily',
  route: '/tool/template',
  order: 999,
};

registerTool(meta, TemplateTool);

export default TemplateTool;
export { meta as templateMeta };