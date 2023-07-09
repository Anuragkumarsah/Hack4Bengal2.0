import React, { useState } from 'react';
import './FAQSection.css';
//eslint-disable-next-line
const FAQSection = ({ faqData }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section">

      { //eslint-disable-next-line
        faqData.map((item, index) => (
          <div
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            key={index}
          >
            <div
              className="faq-question"
              onClick={() => toggleAccordion(index)}
            >
              <span>{item.question}</span>
              <span className="toggle-icon">
                {/* {activeIndex === index ? '-' : '+'} */}
                +
              </span>
            </div>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FAQSection;
