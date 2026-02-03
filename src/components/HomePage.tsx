'use client';

import Link from 'next/link';
import { useTranslations } from '@/i18n/I18nProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-slate-800">
            🌐 TranslateShop<span className="text-red-600">.ch</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#demo" className="text-slate-600 hover:text-slate-800">{t('nav.howItWorks')}</Link>
            <Link href="#pricing" className="text-slate-600 hover:text-slate-800">{t('nav.pricing')}</Link>
            <Link href="/blog" className="text-slate-600 hover:text-slate-800">{t('nav.blog')}</Link>
            <Link href="#faq" className="text-slate-600 hover:text-slate-800">{t('nav.faq')}</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Link href="/login" className="text-slate-600 hover:text-slate-800">
              {t('nav.login')}
            </Link>
            <Link href="/register" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
              {t('nav.register')}
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-20">
            <div className="inline-block bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium mb-6">
              {t('hero.badge')}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              {t('hero.title')} <span className="text-red-600">{t('hero.titleHighlight')}</span>
              <br />{t('hero.titleEnd')}
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/register" 
                className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition shadow-lg hover:shadow-xl"
              >
                {t('hero.cta')}
              </Link>
              <Link 
                href="#demo" 
                className="bg-white text-slate-700 px-8 py-4 rounded-lg text-lg font-semibold border border-slate-200 hover:border-slate-300 transition"
              >
                {t('hero.demo')}
              </Link>
            </div>
            <p className="mt-4 text-slate-500 text-sm">
              {t('hero.benefits')}
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 py-8 border-y border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">500+</div>
              <div className="text-sm text-slate-500">{t('trust.shops')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">50&apos;000+</div>
              <div className="text-sm text-slate-500">{t('trust.products')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">4.9/5</div>
              <div className="text-sm text-slate-500">{t('trust.rating')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">🇨🇭</div>
              <div className="text-sm text-slate-500">{t('trust.madeIn')}</div>
            </div>
          </div>

          {/* Problem/Solution */}
          <div className="py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">{t('problem.title')}</h2>
                <p className="text-slate-600 mb-6">{t('problem.subtitle')}</p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-xl">✗</span>
                    <div>
                      <span className="font-semibold text-slate-800">{t('problem.manual')}</span>
                      <p className="text-slate-600 text-sm">{t('problem.manualDesc')}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-xl">✗</span>
                    <div>
                      <span className="font-semibold text-slate-800">{t('problem.google')}</span>
                      <p className="text-slate-600 text-sm">{t('problem.googleDesc')}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-xl">✗</span>
                    <div>
                      <span className="font-semibold text-slate-800">{t('problem.self')}</span>
                      <p className="text-slate-600 text-sm">{t('problem.selfDesc')}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
                <h3 className="text-2xl font-bold mb-6 text-green-700">{t('solution.title')}</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <div>
                      <span className="font-semibold text-slate-800">{t('solution.fast')}</span>
                      <p className="text-slate-600 text-sm">{t('solution.fastDesc')}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <div>
                      <span className="font-semibold text-slate-800">{t('solution.quality')}</span>
                      <p className="text-slate-600 text-sm">{t('solution.qualityDesc')}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <div>
                      <span className="font-semibold text-slate-800">{t('solution.fair')}</span>
                      <p className="text-slate-600 text-sm">{t('solution.fairDesc')}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <div>
                      <span className="font-semibold text-slate-800">{t('solution.systems')}</span>
                      <p className="text-slate-600 text-sm">{t('solution.systemsDesc')}</p>
                    </div>
                  </li>
                </ul>
                <Link href="/register" className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                  {t('solution.cta')}
                </Link>
              </div>
            </div>
          </div>

          {/* How it Works */}
          <div className="py-20 bg-slate-50 -mx-4 px-4 rounded-3xl" id="demo">
            <h2 className="text-3xl font-bold text-center mb-4">{t('steps.title')}</h2>
            <p className="text-slate-600 text-center mb-12 max-w-xl mx-auto">{t('steps.subtitle')}</p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
                <h3 className="text-xl font-semibold mb-3">{t('steps.step1')}</h3>
                <p className="text-slate-600">{t('steps.step1Desc')}</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
                <h3 className="text-xl font-semibold mb-3">{t('steps.step2')}</h3>
                <p className="text-slate-600">{t('steps.step2Desc')}</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
                <h3 className="text-xl font-semibold mb-3">{t('steps.step3')}</h3>
                <p className="text-slate-600">{t('steps.step3Desc')}</p>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link href="/register" className="inline-block bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition shadow-lg">
                {t('steps.cta')}
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="py-20">
            <h2 className="text-3xl font-bold text-center mb-4">{t('features.title')}</h2>
            <p className="text-slate-600 text-center mb-12 max-w-xl mx-auto">{t('features.subtitle')}</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-4xl mb-4">🇨🇭</div>
                <h3 className="text-xl font-semibold mb-2">{t('features.swiss')}</h3>
                <p className="text-slate-600">{t('features.swissDesc')}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold mb-2">{t('features.ai')}</h3>
                <p className="text-slate-600">{t('features.aiDesc')}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">{t('features.fast')}</h3>
                <p className="text-slate-600">{t('features.fastDesc')}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-2">{t('features.fair')}</h3>
                <p className="text-slate-600">{t('features.fairDesc')}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-semibold mb-2">{t('features.systems')}</h3>
                <p className="text-slate-600">{t('features.systemsDesc')}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-2">{t('features.secure')}</h3>
                <p className="text-slate-600">{t('features.secureDesc')}</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="py-20" id="pricing">
            <h2 className="text-3xl font-bold text-center mb-4">{t('pricing.title')}</h2>
            <p className="text-slate-600 text-center mb-4">{t('pricing.subtitle')}</p>
            <p className="text-center mb-12">
              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {t('pricing.creditInfo')}
              </span>
            </p>
            <div className="grid md:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {/* Free */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-lg">{t('pricing.free')}</h3>
                <div className="text-3xl font-bold my-4">0 <span className="text-lg font-normal text-slate-500">CHF</span></div>
                <p className="text-slate-600 text-sm mb-4">{t('pricing.freeDesc')}</p>
                <Link href="/register" className="block text-center py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">
                  {t('pricing.startFree')}
                </Link>
              </div>
              {/* Starter */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-lg">{t('pricing.starter')}</h3>
                <div className="text-3xl font-bold my-4">9 <span className="text-lg font-normal text-slate-500">CHF</span></div>
                <p className="text-slate-600 text-sm mb-4">{t('pricing.starterDesc')}</p>
                <Link href="/register" className="block text-center py-3 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition">
                  {t('pricing.register')}
                </Link>
              </div>
              {/* Pro (Popular) */}
              <div className="bg-red-600 text-white p-6 rounded-xl shadow-xl scale-105 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">{t('pricing.popular')}</span>
                </div>
                <h3 className="font-semibold text-lg mt-2">{t('pricing.pro')}</h3>
                <div className="text-3xl font-bold my-4">29 <span className="text-lg font-normal opacity-80">CHF</span></div>
                <p className="opacity-80 text-sm mb-4">{t('pricing.proDesc')}</p>
                <Link href="/register" className="block text-center py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50 transition">
                  {t('pricing.register')}
                </Link>
              </div>
              {/* Business */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-lg">{t('pricing.business')}</h3>
                <div className="text-3xl font-bold my-4">79 <span className="text-lg font-normal text-slate-500">CHF</span></div>
                <p className="text-slate-600 text-sm mb-4">{t('pricing.businessDesc')}</p>
                <Link href="/register" className="block text-center py-3 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition">
                  {t('pricing.register')}
                </Link>
              </div>
              {/* Unlimited */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-lg">{t('pricing.unlimited')}</h3>
                <div className="text-3xl font-bold my-4">49 <span className="text-lg font-normal text-slate-500">CHF{t('pricing.perMonth')}</span></div>
                <p className="text-slate-600 text-sm mb-4">{t('pricing.unlimitedDesc')}</p>
                <Link href="/register" className="block text-center py-3 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition">
                  {t('pricing.register')}
                </Link>
              </div>
            </div>
            <p className="text-center mt-8 text-slate-500 text-sm">{t('pricing.noExpiry')}</p>
          </div>

          {/* CTA */}
          <div className="py-20 text-center bg-gradient-to-r from-red-600 to-red-700 -mx-4 px-4 rounded-3xl text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto">{t('cta.subtitle')}</p>
            <Link href="/register" className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-50 transition shadow-lg">
              {t('cta.button')}
            </Link>
            <p className="mt-6 text-sm opacity-75">{t('cta.trust')}</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-white font-bold text-lg mb-4">🌐 TranslateShop.ch</div>
              <p className="text-sm">{t('footer.description')}</p>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">{t('footer.product')}</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="#demo" className="hover:text-white transition">{t('footer.howItWorks')}</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition">{t('nav.pricing')}</Link></li>
                <li><Link href="#faq" className="hover:text-white transition">{t('nav.faq')}</Link></li>
                <li><Link href="/login" className="hover:text-white transition">{t('nav.login')}</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">{t('footer.support')}</div>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:support@translateshop.ch" className="hover:text-white transition">support@translateshop.ch</a></li>
                <li><Link href="#faq" className="hover:text-white transition">{t('footer.help')}</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">{t('footer.legal')}</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/impressum" className="hover:text-white transition">{t('footer.imprint')}</Link></li>
                <li><Link href="/datenschutz" className="hover:text-white transition">{t('footer.privacy')}</Link></li>
                <li><Link href="/agb" className="hover:text-white transition">{t('footer.terms')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">{t('footer.copyright')}</p>
            <div className="flex items-center gap-4 text-sm">
              <span>{t('footer.ssl')}</span>
              <span>{t('footer.hosting')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
