import type { ToolMeta } from '../types';
import { registerTool } from '../index';
import Countdown from './Countdown';

const meta: ToolMeta = {
  id: 'countdown',
  name: '倒计时',
  icon: '⏱️',
  description: '设置倒计时',
  category: 'daily',
  route: '/tool/countdown',
  order: 2,
};

registerTool(meta, Countdown);

export { meta as countdownMeta };
export default Countdown;