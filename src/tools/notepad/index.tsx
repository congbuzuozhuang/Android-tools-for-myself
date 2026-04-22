import type { ToolMeta } from '../types';
import { registerTool } from '../index';
import Notepad from './Notepad';

const meta: ToolMeta = {
  id: 'notepad',
  name: '记事本',
  icon: '📝',
  description: '快速记录',
  category: 'daily',
  route: '/tool/notepad',
  order: 3,
};

registerTool(meta, Notepad);

export { meta as notepadMeta };
export default Notepad;