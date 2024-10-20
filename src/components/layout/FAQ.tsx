import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FAQItem: React.FC<{ question: string; answer: string }> = ({
                                                                   question,
                                                                   answer
                                                                 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500"/>
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500"/>
        )}
      </button>
      {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
};

const FAQ: React.FC = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t('faq.whatIsSmartBuy'),
      answer: t('faq.whatIsSmartBuyAnswer'),
    },
    {
      question: t('faq.howCalculateCosts'),
      answer: t('faq.howCalculateCostsAnswer'),
    },
    {
      question: t('faq.compareScenarios'),
      answer: t('faq.compareScenariosAnswer'),
    },
    {
      question: t('faq.affordHouse'),
      answer: t('faq.affordHouseAnswer'),
    },
    {
      question: t('faq.suitableFor'),
      answer: t('faq.suitableForAnswer'),
    },
  ];

  return (
    <div id="faq" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t('faq.title')}</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
