import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: 'What is ROI in real estate?',
      answer: 'ROI (Return on Investment) in real estate is a metric used to evaluate the profitability of a property investment. It\'s calculated by dividing the net profit from the investment by the original cost of the investment, expressed as a percentage.',
    },
    {
      question: 'How accurate are the calculations?',
      answer: 'Our ROI calculator uses industry-standard formulas and takes into account various factors to provide accurate estimates. However, real-world results may vary due to unforeseen circumstances or market changes.',
    },
    {
      question: 'Can I calculate ROI for multiple properties?',
      answer: 'Yes, depending on your plan, you can calculate and compare ROI for multiple properties. The Basic plan allows up to 5 properties, Advanced up to 20, and Pro offers unlimited property calculations.',
    },
    {
      question: 'Is my data secure?',
      answer: 'We take data security seriously. All your information is encrypted and stored securely. We never share your personal data or property information with third parties.',
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
    },
  ];

  return (
    <div id="faq" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;