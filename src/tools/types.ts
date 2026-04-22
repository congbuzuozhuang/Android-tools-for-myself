import type React from 'react';

export type ToolCategory =
  | 'daily'        // 日常工具
  | 'productivity' // 效率工具
  | 'entertainment' // 娱乐
  | 'development'  // 开发工具
  | 'system';      // 系统工具

export interface ToolMeta {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: ToolCategory;
  route: string;
  enabled?: boolean;
  order?: number;
}

export interface ToolProps {
  config?: Record<string, unknown>;
  onSaveConfig?: (config: Record<string, unknown>) => void;
  showToast?: (message: string) => void;
}

export type ToolComponent = React.ComponentType<ToolProps>;

export interface Tool extends ToolMeta {
  component: ToolComponent;
}

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  daily: '日常工具',
  productivity: '效率工具',
  entertainment: '娱乐',
  development: '开发工具',
  system: '系统工具',
};