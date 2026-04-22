import type { Tool, ToolMeta, ToolComponent, ToolCategory } from './types';
export { CATEGORY_LABELS } from './types';
export type { Tool, ToolMeta, ToolComponent, ToolCategory } from './types';

class ToolRegistry {
  private tools: Map<string, Tool> = new Map();
  private categories: Set<ToolCategory> = new Set();

  register(meta: ToolMeta, component: ToolComponent): void {
    if (this.tools.has(meta.id)) {
      console.warn(`Tool ${meta.id} is already registered, skipping...`);
      return;
    }

    this.tools.set(meta.id, { ...meta, component });
    this.categories.add(meta.category);
  }

  getAllTools(): Tool[] {
    return Array.from(this.tools.values())
      .filter((tool) => tool.enabled !== false)
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  }

  getToolsByCategory(category: ToolCategory): Tool[] {
    return this.getAllTools().filter((tool) => tool.category === category);
  }

  getTool(id: string): Tool | undefined {
    return this.tools.get(id);
  }

  getToolByRoute(route: string): Tool | undefined {
    return this.getAllTools().find((tool) => tool.route === route);
  }

  getCategories(): ToolCategory[] {
    return Array.from(this.categories);
  }

  search(query: string): Tool[] {
    const q = query.toLowerCase();
    return this.getAllTools().filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q)
    );
  }

  unregister(id: string): boolean {
    return this.tools.delete(id);
  }
}

export const toolRegistry = new ToolRegistry();

export function registerTool(meta: ToolMeta, component: ToolComponent): void {
  toolRegistry.register(meta, component);
}