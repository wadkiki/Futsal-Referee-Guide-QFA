import React, { useState, useEffect } from 'react';
import type { QuizQuestion } from '../types';

interface QuizScreenProps {
  questionData: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ questionData, questionNumber, totalQuestions, onAnswer, onNext }) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
  }, [questionData]);

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    
    setSelectedAnswerIndex(index);
    setIsAnswered(true);
    onAnswer(index === questionData.correctAnswerIndex);
  };

  const getButtonClass = (index: number) => {
    if (!isAnswered) {
      return "bg-gray-700 hover:bg-red-800";
    }
    if (index === questionData.correctAnswerIndex) {
      return "bg-green-600";
    }
    if (index === selectedAnswerIndex) {
      return "bg-red-600";
    }
    return "bg-gray-700 opacity-60";
  };

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 w-full">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 text-red-300">
          <span className="font-bold text-lg">{questionData.law}</span>
          <span className="text-sm">{`السؤال ${questionNumber} من ${totalQuestions}`}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div className="bg-red-800 h-2.5 rounded-full" style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}></div>
        </div>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-white leading-relaxed">{questionData.question}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questionData.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            disabled={isAnswered}
            className={`w-full text-right p-4 rounded-lg text-white font-medium transition-all duration-300 disabled:cursor-not-allowed ${getButtonClass(index)}`}
          >
            {option}
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className="text-center mt-8">
          <button
            onClick={onNext}
            className="bg-red-800 text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300"
          >
            التالي
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;
