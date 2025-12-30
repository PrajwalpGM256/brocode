import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Copy, ChevronRight } from 'lucide-react';

import { APP_INFO } from '../../data/app.data';
import { SETUP_STEPS, FEATURE_TAGS, ABOUT_DESCRIPTION } from '../../data/about.data';
import './AboutPage.css';

const ICON_COLORS = ['amber', 'purple', 'cyan', 'green'];

const AboutPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [copied, setCopied] = useState(false);

  const steps = SETUP_STEPS.map((step, i) => ({
    ...step,
    icon: <step.icon size={22} strokeWidth={1.5} />,
    colorClass: ICON_COLORS[i],
  }));

  const goToStep = (idx) => {
    if (idx >= 0 && idx < steps.length) {
      setCurrentStep(idx);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentStepData = steps[currentStep];

  return (
    <main className="about-page">
      {/* Background */}
      <div className="about-page__orb about-page__orb--teal" />
      <div className="about-page__orb about-page__orb--purple" />
      <div className="about-page__grid" />

      {/* Header - Fixed at top */}
      <header className="about-header">
        <Link to="/" className="about-header__back">
          <ArrowLeft size={16} />
          Back to Editor
        </Link>
        <div className="about-header__brand">
          <APP_INFO.LOGO style={{ width: '20px', height: '20px', opacity: 0.6 }} />
          {APP_INFO.name}
        </div>
      </header>

      {/* Content - Split Layout */}
      <div className="about-page__content">
        {/* LEFT: About Info */}
        <div className="about-page__left">
          <section className="about-hero">
            <APP_INFO.LOGO className="about-hero__logo" />
            <div className="about-hero__badge">
              <span className="about-hero__badge-dot" />
              AI-Powered Code Review
            </div>
            <h1 className="about-hero__title">{APP_INFO.SLOGAN}</h1>
            <p className="about-hero__description">{ABOUT_DESCRIPTION}</p>
            
            <div className="about-pills">
              {FEATURE_TAGS.map((tag) => (
                <span key={tag} className="about-pills__item">{tag}</span>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT: Setup Wizard */}
        <div className="about-page__right">
          <section className="about-setup">
            <div className="about-setup__header">
              <p className="about-setup__label">Quick Setup</p>
              <h2 className="about-setup__title">Connect GitHub in 4 steps</h2>
            </div>

            {/* Tabs */}
            <div className="about-tabs">
              {steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => goToStep(i)}
                  className={`about-tabs__item ${i === currentStep ? 'about-tabs__item--active' : ''}`}
                >
                  <span className={`about-tabs__number ${
                    i < currentStep ? 'about-tabs__number--done' : 
                    i === currentStep ? 'about-tabs__number--active' : 
                    'about-tabs__number--pending'
                  }`}>
                    {i < currentStep ? <Check size={14} /> : i + 1}
                  </span>
                  {i === currentStep && (
                    <span className="about-tabs__label">{step.title}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Card */}
            <article className="about-card">
              <div className="about-card__header">
                <div className={`about-card__icon about-card__icon--${currentStepData.colorClass}`}>
                  {currentStepData.icon}
                </div>
                <div>
                  <h3 className="about-card__title">{currentStepData.title}</h3>
                  <p className="about-card__subtitle">{currentStepData.subtitle}</p>
                </div>
              </div>

              <div className="about-card__body">
                {currentStepData.content && (
                  <div className="about-code">
                    <pre>{currentStepData.content}</pre>
                    {currentStepData.copyable && (
                      <button
                        onClick={() => handleCopy(currentStepData.content)}
                        className={`about-code__copy ${copied ? 'about-code__copy--copied' : ''}`}
                      >
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    )}
                  </div>
                )}

                {currentStepData.bullets && (
                  <ul className="about-bullets">
                    {currentStepData.bullets.map((bullet, i) => (
                      <li key={i} className="about-bullets__item">
                        <ChevronRight 
                          size={14} 
                          className="about-bullets__icon" 
                          style={{ color: currentStepData.color }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                {currentStepData.emoji && (
                  <div className="about-emoji">
                    <span className="about-emoji__icon">{currentStepData.emoji}</span>
                    <p className="about-emoji__text">
                      You're all set! Open a PR to see BroCode in action.
                    </p>
                  </div>
                )}
              </div>

              <div className="about-card__footer">
                <button
                  onClick={() => goToStep(currentStep - 1)}
                  disabled={currentStep === 0}
                  className="about-btn about-btn--secondary"
                >
                  <ArrowLeft size={14} />
                  Previous
                </button>
                <button
                  onClick={() => goToStep(currentStep + 1)}
                  disabled={currentStep === steps.length - 1}
                  className="about-btn about-btn--primary"
                >
                  {currentStep === steps.length - 1 ? 'Done' : 'Continue'}
                  {currentStep !== steps.length - 1 && <ArrowRight size={14} />}
                </button>
              </div>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
