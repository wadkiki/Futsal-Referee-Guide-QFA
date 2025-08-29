import React from 'react';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, totalQuestions, onRestart }) => {
  const incorrectAnswers = totalQuestions - score;

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-center border border-gray-700 animate-fade-in relative">
       <button
        onClick={onRestart}
        className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
        aria-label="العودة إلى الشاشة الرئيسية"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>

      <h2 className="text-4xl font-extrabold mb-6 text-red-300">النتائج</h2>
      
      <div className="flex justify-around items-center my-8">
        <div className="p-4 rounded-lg">
          <p className="text-5xl font-bold text-green-500">{score}</p>
          <p className="text-lg text-gray-300 mt-2">إجابات صحيحة</p>
        </div>
        <div className="p-4 rounded-lg">
          <p className="text-5xl font-bold text-red-500">{incorrectAnswers}</p>
          <p className="text-lg text-gray-300 mt-2">إجابات خاطئة</p>
        </div>
      </div>

      <p className="text-xl text-gray-200 mb-8">
        لقد أكملت الاختبار بنجاح!
      </p>

      <button
        onClick={onRestart}
        className="bg-red-800 text-white font-bold py-3 px-8 rounded-full text-xl hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
      >
        إعادة الاختبار
      </button>
    </div>
  );
};

export default ResultsScreen;
