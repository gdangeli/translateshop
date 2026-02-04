'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from '@/i18n/I18nProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function HomePage() {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm fixed w-full z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-bold text-slate-800">
            🌐 TranslateShop<span className="text-red-600">.ch</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#demo" className="text-slate-600 hover:text-slate-800">{t('nav.howItWorks')}</Link>
            <Link href="#pricing" className="text-slate-600 hover:text-slate-800">{t('nav.pricing')}</Link>
            <Link href="/blog" className="text-slate-600 hover:text-slate-800">{t('nav.blog')}</Link>
            <Link href="/faq" className="text-slate-600 hover:text-slate-800">{t('nav.faq')}</Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link href="/login" className="text-slate-600 hover:text-slate-800">
              {t('nav.login')}
            </Link>
            <Link href="/register" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
              {t('nav.register')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 -mr-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="px-4 py-4 space-y-3">
              <Link href="#demo" className="block py-2 text-slate-600" onClick={() => setMobileMenuOpen(false)}>{t('nav.howItWorks')}</Link>
              <Link href="#pricing" className="block py-2 text-slate-600" onClick={() => setMobileMenuOpen(false)}>{t('nav.pricing')}</Link>
              <Link href="/blog" className="block py-2 text-slate-600" onClick={() => setMobileMenuOpen(false)}>{t('nav.blog')}</Link>
              <Link href="/faq" className="block py-2 text-slate-600" onClick={() => setMobileMenuOpen(false)}>{t('nav.faq')}</Link>
              <hr className="my-3" />
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-600">Sprache:</span>
                <LanguageSwitcher />
              </div>
              <Link href="/login" className="block py-2 text-slate-600" onClick={() => setMobileMenuOpen(false)}>{t('nav.login')}</Link>
              <Link href="/register" className="block w-full text-center bg-red-600 text-white py-3 rounded-lg font-semibold" onClick={() => setMobileMenuOpen(false)}>
                {t('nav.register')}
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-12 md:py-20">
            <div className="inline-block bg-red-100 text-red-700 px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
              {t('hero.badge')}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4 md:mb-6 leading-tight">
              {t('hero.title')} <span className="text-red-600">{t('hero.titleHighlight')}</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>{t('hero.titleEnd')}
            </h1>
            <p className="text-base md:text-xl text-slate-600 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4">
              <Link 
                href="/register" 
                className="bg-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-red-700 transition shadow-lg hover:shadow-xl"
              >
                {t('hero.cta')}
              </Link>
              <Link 
                href="#demo" 
                className="bg-white text-slate-700 px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold border border-slate-200 hover:border-slate-300 transition"
              >
                {t('hero.demo')}
              </Link>
            </div>
            <p className="mt-4 text-slate-500 text-xs md:text-sm px-4">
              {t('hero.benefits')}
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-8 py-6 md:py-8 border-y border-slate-200">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-slate-800">500+</div>
              <div className="text-xs md:text-sm text-slate-500">{t('trust.shops')}</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-slate-800">50&apos;000+</div>
              <div className="text-xs md:text-sm text-slate-500">{t('trust.products')}</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-slate-800">4.9/5</div>
              <div className="text-xs md:text-sm text-slate-500">{t('trust.rating')}</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-slate-800">🇨🇭</div>
              <div className="text-xs md:text-sm text-slate-500">{t('trust.madeIn')}</div>
            </div>
          </div>

          {/* Problem/Solution */}
          <div className="py-12 md:py-20">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start md:items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{t('problem.title')}</h2>
                <p className="text-slate-600 mb-4 md:mb-6 text-sm md:text-base">{t('problem.subtitle')}</p>
                <ul className="space-y-3 md:space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-lg md:text-xl flex-shrink-0">✗</span>
                    <div>
                      <span className="font-semibold text-slate-800 text-sm md:text-base">{t('problem.manual')}</span>
                      <p className="text-slate-600 text-xs md:text-sm">{t('problem.manualDesc')}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-lg md:text-xl flex-shrink-0">✗</span>
                    <div>
                      <span className="font-semibold text-slate-800 text-sm md:text-base">{t('problem.google')}</span>
                      <p className="text-slate-600 text-xs md:text-sm">{t('problem.googleDesc')}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-lg md:text-xl flex-shrink-0">✗</span>
                    <div>
                      <span className="font-semibold text-slate-800 text-sm md:text-base">{t('problem.self')}</span>
                      <p className="text-slate-600 text-xs md:text-sm">{t('problem.selfDesc')}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 md:p-8 rounded-2xl border border-green-100">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-green-700">{t('solution.title')}</h3>
                <ul className="space-y-3 md:space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg md:text-xl flex-shrink-0">✓</span>
                    <div>
                      <span className="font-semibold text-slate-800 text-sm md:text-base">{t('solution.fast')}</span>
                      <p className="text-slate-600 text-xs md:text-sm">{t('solution.fastDesc')}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg md:text-xl flex-shrink-0">✓</span>
                    <div>
                      <span className="font-semibold text-slate-800 text-sm md:text-base">{t('solution.quality')}</span>
                      <p className="text-slate-600 text-xs md:text-sm">{t('solution.qualityDesc')}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg md:text-xl flex-shrink-0">✓</span>
                    <div>
                      <span className="font-semibold text-slate-800 text-sm md:text-base">{t('solution.fair')}</span>
                      <p className="text-slate-600 text-xs md:text-sm">{t('solution.fairDesc')}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg md:text-xl flex-shrink-0">✓</span>
                    <div>
                      <span className="font-semibold text-slate-800 text-sm md:text-base">{t('solution.systems')}</span>
                      <p className="text-slate-600 text-xs md:text-sm">{t('solution.systemsDesc')}</p>
                    </div>
                  </li>
                </ul>
                <Link href="/register" className="mt-4 md:mt-6 inline-block w-full sm:w-auto text-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                  {t('solution.cta')}
                </Link>
              </div>
            </div>
          </div>

          {/* How it Works */}
          <div className="py-12 md:py-20 bg-slate-50 -mx-4 px-4 rounded-2xl md:rounded-3xl" id="demo">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4">{t('steps.title')}</h2>
            <p className="text-slate-600 text-center mb-8 md:mb-12 max-w-xl mx-auto text-sm md:text-base px-4">{t('steps.subtitle')}</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl shadow-sm text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-4 md:mb-6">1</div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{t('steps.step1')}</h3>
                <p className="text-slate-600 text-sm md:text-base">{t('steps.step1Desc')}</p>
              </div>
              <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl shadow-sm text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-4 md:mb-6">2</div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{t('steps.step2')}</h3>
                <p className="text-slate-600 text-sm md:text-base">{t('steps.step2Desc')}</p>
              </div>
              <div className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl shadow-sm text-center sm:col-span-2 md:col-span-1">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-4 md:mb-6">3</div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{t('steps.step3')}</h3>
                <p className="text-slate-600 text-sm md:text-base">{t('steps.step3Desc')}</p>
              </div>
            </div>
            <div className="text-center mt-8 md:mt-12">
              <Link href="/register" className="inline-block bg-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-red-700 transition shadow-lg">
                {t('steps.cta')}
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="py-12 md:py-20">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4">{t('features.title')}</h2>
            <p className="text-slate-600 text-center mb-8 md:mb-12 max-w-xl mx-auto text-sm md:text-base px-4">{t('features.subtitle')}</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">🇨🇭</div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">{t('features.swiss')}</h3>
                <p className="text-slate-600 text-sm md:text-base">{t('features.swissDesc')}</p>
              </div>
              <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">🤖</div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">{t('features.ai')}</h3>
                <p className="text-slate-600 text-sm md:text-base">{t('features.aiDesc')}</p>
              </div>
              <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">⚡</div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">{t('features.fast')}</h3>
                <p className="text-slate-600 text-sm md:text-base">{t('features.fastDesc')}</p>
              </div>
              <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">💰</div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">{t('features.fair')}</h3>
                <p className="text-slate-600 text-sm md:text-base">{t('features.fairDesc')}</p>
              </div>
              <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">🔄</div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">{t('features.systems')}</h3>
                <p className="text-slate-600 text-sm md:text-base">{t('features.systemsDesc')}</p>
              </div>
              <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">🔒</div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">{t('features.secure')}</h3>
                <p className="text-slate-600 text-sm md:text-base">{t('features.secureDesc')}</p>
              </div>
            </div>

            {/* New Features Row */}
            <div className="mt-6 md:mt-8">
              <p className="text-center text-sm text-red-600 font-medium mb-4 md:mb-6">🆕 Neue Power-Features</p>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 md:p-6 rounded-xl shadow-sm border border-purple-200 hover:shadow-md transition">
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4">📖</div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{t('features.glossary')}</h3>
                  <p className="text-slate-600 text-sm md:text-base">{t('features.glossaryDesc')}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 md:p-6 rounded-xl shadow-sm border border-blue-200 hover:shadow-md transition">
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4">✏️</div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{t('features.edit')}</h3>
                  <p className="text-slate-600 text-sm md:text-base">{t('features.editDesc')}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 md:p-6 rounded-xl shadow-sm border border-green-200 hover:shadow-md transition">
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4">🔗</div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{t('features.integration')}</h3>
                  <p className="text-slate-600 text-sm md:text-base">{t('features.integrationDesc')}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 md:p-6 rounded-xl shadow-sm border border-orange-200 hover:shadow-md transition">
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4">🔑</div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{t('features.api')}</h3>
                  <p className="text-slate-600 text-sm md:text-base">{t('features.apiDesc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="py-12 md:py-20" id="pricing">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4">{t('pricing.title')}</h2>
            <p className="text-slate-600 text-center mb-3 md:mb-4 text-sm md:text-base">{t('pricing.subtitle')}</p>
            <p className="text-center mb-8 md:mb-12">
              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                {t('pricing.creditInfo')}
              </span>
            </p>
            
            {/* Mobile: Horizontal scroll or stacked */}
            <div className="overflow-x-auto -mx-4 px-4 md:overflow-visible md:mx-0 md:px-0">
              <div className="flex md:grid md:grid-cols-5 gap-3 md:gap-4 max-w-6xl mx-auto min-w-max md:min-w-0 pb-4 md:pb-0">
                {/* Free */}
                <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 w-48 md:w-auto flex-shrink-0 md:flex-shrink">
                  <h3 className="font-semibold text-base md:text-lg">{t('pricing.free')}</h3>
                  <div className="text-2xl md:text-3xl font-bold my-2 md:my-3">0 <span className="text-sm md:text-lg font-normal text-slate-500">CHF</span></div>
                  <p className="text-slate-600 text-xs md:text-sm mb-2 md:mb-3">{t('pricing.freeDesc')}</p>
                  <ul className="text-xs md:text-sm space-y-1 mb-3 md:mb-4 text-slate-600">
                    <li>✓ {t('pricing.features.languages')}</li>
                    <li>✓ {t('pricing.features.csvExport')}</li>
                    <li>✓ {t('pricing.features.editTranslations')}</li>
                  </ul>
                  <Link href="/register" className="block text-center py-2 md:py-3 bg-red-600 text-white rounded-lg font-semibold text-sm md:text-base hover:bg-red-700 transition">
                    {t('pricing.startFree')}
                  </Link>
                </div>
                {/* Starter */}
                <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 w-48 md:w-auto flex-shrink-0 md:flex-shrink">
                  <h3 className="font-semibold text-base md:text-lg">{t('pricing.starter')}</h3>
                  <div className="text-2xl md:text-3xl font-bold my-2 md:my-3">9 <span className="text-sm md:text-lg font-normal text-slate-500">CHF</span></div>
                  <p className="text-slate-600 text-xs md:text-sm mb-2 md:mb-3">{t('pricing.starterDesc')}</p>
                  <ul className="text-xs md:text-sm space-y-1 mb-3 md:mb-4 text-slate-600">
                    <li>✓ {t('pricing.features.languages')}</li>
                    <li>✓ {t('pricing.features.csvExport')}</li>
                    <li>✓ {t('pricing.features.editTranslations')}</li>
                    <li>✓ {t('pricing.features.glossary')}</li>
                  </ul>
                  <Link href="/register" className="block text-center py-2 md:py-3 border border-slate-300 rounded-lg font-semibold text-sm md:text-base hover:bg-slate-50 transition">
                    {t('pricing.register')}
                  </Link>
                </div>
                {/* Pro (Popular) */}
                <div className="bg-red-600 text-white p-4 md:p-6 rounded-xl shadow-xl md:scale-105 relative w-48 md:w-auto flex-shrink-0 md:flex-shrink">
                  <div className="absolute -top-2 md:-top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-yellow-900 text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full whitespace-nowrap">{t('pricing.popular')}</span>
                  </div>
                  <h3 className="font-semibold text-base md:text-lg mt-1 md:mt-2">{t('pricing.pro')}</h3>
                  <div className="text-2xl md:text-3xl font-bold my-2 md:my-3">29 <span className="text-sm md:text-lg font-normal opacity-80">CHF</span></div>
                  <p className="opacity-80 text-xs md:text-sm mb-2 md:mb-3">{t('pricing.proDesc')}</p>
                  <ul className="text-xs md:text-sm space-y-1 mb-3 md:mb-4 opacity-90">
                    <li>✓ {t('pricing.features.languages')}</li>
                    <li>✓ {t('pricing.features.shopIntegration')}</li>
                    <li>✓ {t('pricing.features.glossary')}</li>
                    <li>✓ {t('pricing.features.emailSupport')}</li>
                  </ul>
                  <Link href="/register" className="block text-center py-2 md:py-3 bg-white text-red-600 rounded-lg font-semibold text-sm md:text-base hover:bg-red-50 transition">
                    {t('pricing.register')}
                  </Link>
                </div>
                {/* Business */}
                <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 w-48 md:w-auto flex-shrink-0 md:flex-shrink">
                  <h3 className="font-semibold text-base md:text-lg">{t('pricing.business')}</h3>
                  <div className="text-2xl md:text-3xl font-bold my-2 md:my-3">79 <span className="text-sm md:text-lg font-normal text-slate-500">CHF</span></div>
                  <p className="text-slate-600 text-xs md:text-sm mb-2 md:mb-3">{t('pricing.businessDesc')}</p>
                  <ul className="text-xs md:text-sm space-y-1 mb-3 md:mb-4 text-slate-600">
                    <li>✓ {t('pricing.features.shopIntegration')}</li>
                    <li>✓ {t('pricing.features.apiAccess')}</li>
                    <li>✓ {t('pricing.features.prioritySupport')}</li>
                    <li>✓ {t('pricing.features.glossary')}</li>
                  </ul>
                  <Link href="/register" className="block text-center py-2 md:py-3 border border-slate-300 rounded-lg font-semibold text-sm md:text-base hover:bg-slate-50 transition">
                    {t('pricing.register')}
                  </Link>
                </div>
                {/* Unlimited */}
                <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 w-48 md:w-auto flex-shrink-0 md:flex-shrink">
                  <h3 className="font-semibold text-base md:text-lg">{t('pricing.unlimited')}</h3>
                  <div className="text-2xl md:text-3xl font-bold my-2 md:my-3">49 <span className="text-sm md:text-lg font-normal text-slate-500">CHF{t('pricing.perMonth')}</span></div>
                  <p className="text-slate-600 text-xs md:text-sm mb-2 md:mb-3">{t('pricing.unlimitedDesc')}</p>
                  <ul className="text-xs md:text-sm space-y-1 mb-3 md:mb-4 text-slate-600">
                    <li>✓ {t('pricing.features.unlimited')}</li>
                    <li>✓ {t('pricing.features.shopIntegration')}</li>
                    <li>✓ {t('pricing.features.apiAccess')}</li>
                    <li>✓ {t('pricing.features.prioritySupport')}</li>
                  </ul>
                  <Link href="/register" className="block text-center py-2 md:py-3 border border-slate-300 rounded-lg font-semibold text-sm md:text-base hover:bg-slate-50 transition">
                    {t('pricing.register')}
                  </Link>
                </div>
              </div>
            </div>
            <p className="text-center mt-6 md:mt-8 text-slate-500 text-xs md:text-sm">{t('pricing.noExpiry')}</p>
          </div>

          {/* CTA */}
          <div className="py-12 md:py-20 text-center bg-gradient-to-r from-red-600 to-red-700 -mx-4 px-4 rounded-2xl md:rounded-3xl text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 px-4">{t('cta.title')}</h2>
            <p className="text-base md:text-xl opacity-90 mb-6 md:mb-8 max-w-xl mx-auto px-4">{t('cta.subtitle')}</p>
            <Link href="/register" className="inline-block bg-white text-red-600 px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-red-50 transition shadow-lg">
              {t('cta.button')}
            </Link>
            <p className="mt-4 md:mt-6 text-xs md:text-sm opacity-75">{t('cta.trust')}</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-8 md:py-12 mt-12 md:mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="text-white font-bold text-base md:text-lg mb-3 md:mb-4">🌐 TranslateShop.ch</div>
              <p className="text-xs md:text-sm">{t('footer.description')}</p>
            </div>
            <div>
              <div className="font-semibold text-white mb-3 md:mb-4 text-sm md:text-base">{t('footer.product')}</div>
              <ul className="space-y-2 text-xs md:text-sm">
                <li><Link href="#demo" className="hover:text-white transition">{t('footer.howItWorks')}</Link></li>
                <li><Link href="/docs" className="hover:text-white transition">{t('footer.documentation')}</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition">{t('nav.pricing')}</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">{t('nav.blog')}</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-3 md:mb-4 text-sm md:text-base">{t('footer.support')}</div>
              <ul className="space-y-2 text-xs md:text-sm">
                <li><a href="mailto:support@translateshop.ch" className="hover:text-white transition break-all">support@translateshop.ch</a></li>
                <li><Link href="/faq" className="hover:text-white transition">{t('footer.help')}</Link></li>
                <li><Link href="/docs" className="hover:text-white transition">{t('footer.documentation')}</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-3 md:mb-4 text-sm md:text-base">{t('footer.legal')}</div>
              <ul className="space-y-2 text-xs md:text-sm">
                <li><Link href="/impressum" className="hover:text-white transition">{t('footer.imprint')}</Link></li>
                <li><Link href="/datenschutz" className="hover:text-white transition">{t('footer.privacy')}</Link></li>
                <li><Link href="/agb" className="hover:text-white transition">{t('footer.terms')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-xs md:text-sm text-center md:text-left">{t('footer.copyright')}</p>
            <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm">
              <span>{t('footer.ssl')}</span>
              <span>{t('footer.hosting')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
