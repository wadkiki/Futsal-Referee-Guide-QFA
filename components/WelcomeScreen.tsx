import React, { useMemo } from 'react';
import { quizData } from '../constants/quizData';

interface WelcomeScreenProps {
  onStartFullQuiz: () => void;
  onStartPractice: (law: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartFullQuiz, onStartPractice }) => {
  const laws = useMemo(() => {
    const uniqueLaws = new Set(quizData.map(q => q.law));
    return Array.from(uniqueLaws);
  }, []);

  return (
    <div className="bg-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl text-center border border-gray-700 animate-fade-in">
      <img
        src="https://www.qfa.qa/assets/public/media/logo/header-logo.svg"
        alt="QFA Logo"
        className="mx-auto mb-6 h-20"
      />
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-red-300">
        دليل حكام كرة الصالات
      </h1>
      <p className="text-lg font-bold text-gray-300 mb-8">
        تحت إشراف الخبير الفني لحكام الصالات بإدارة التحكيم: محمد حسن
      </p>
      <p className="text-lg text-gray-300 mb-8">
        اختبر معلوماتك في قوانين اللعبة أو تدرب على قانون معين.
      </p>

      <button
        onClick={onStartFullQuiz}
        className="bg-red-800 text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg w-full md:w-auto mb-10"
      >
        ابدأ الاختبار الكامل
      </button>
      
      <div className="border-t border-gray-600 pt-6">
        <h2 className="text-2xl font-bold mb-4 text-red-300">أو تدرب حسب القانون</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {laws.map(law => (
            <button
              key={law}
              onClick={() => onStartPractice(law)}
              className="bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-800 transition-all duration-200 text-right"
            >
              {law}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;