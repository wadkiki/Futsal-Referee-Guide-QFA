
export interface QuizQuestion {
  law: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export type GameState = 'welcome' | 'playing' | 'results';
