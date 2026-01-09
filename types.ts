
export interface TimeZone {
  name: string;
  id: string;
}

export interface TemporalInsight {
  fact: string;
  category: 'History' | 'Science' | 'Philosophy' | 'Culture';
  relevance: string;
}

export enum TabType {
  CLOCK = 'clock',
  WORLD = 'world',
  TOOLS = 'tools'
}
