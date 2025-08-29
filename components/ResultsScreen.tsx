import React from 'react';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, totalQuestions, onRestart }) => {
  const incorrectAnswers = totalQuestions - score;

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-center border border-gray-700 animate-fade-in">
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
