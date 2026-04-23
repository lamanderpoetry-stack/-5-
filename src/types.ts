export interface MagicSurge {
  id: string;
  title: string;
  flavor: string;
  mechanic: string;
  duration: string;
  type: 'buff' | 'debuff' | 'neutral' | 'chaotic';
  timestamp: number;
}
