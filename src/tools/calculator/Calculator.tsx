import type { ToolMeta } from '../types';
import { registerTool } from '../index';
import Calculator from './index';

const meta: ToolMeta = {
  id: 'calculator',
  name: '计算器',
  icon: '🧮',
  description: '简单易用的计算器',
  category: 'daily',
  route: '/tool/calculator',
  order: 1,
};

registerTool(meta, Calculator);

export { meta as calculatorMeta };
export default Calculator;