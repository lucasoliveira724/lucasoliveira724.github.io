import type { AnalyticsConsent } from './analytics'
import { translations, type Language } from './i18n'

type AnalyticsConsentBannerProps = {
  language: Language
  open: boolean
  onChoice: (consent: Exclude<AnalyticsConsent, null>) => void
}

export default function AnalyticsConsentBanner({ language, open, onChoice }: AnalyticsConsentBannerProps) {
  if (!open) return null
  const copy = translations[language].analytics

  return (
    <aside className="analytics-consent" role="region" aria-labelledby="analytics-consent-title">
      <h2 id="analytics-consent-title">{copy.title}</h2>
      <p>{copy.description}</p>
      <div className="analytics-consent-actions">
        <button type="button" className="analytics-consent-accept" onClick={() => onChoice('accepted')}>
          {copy.accept}
        </button>
        <button type="button" className="analytics-consent-reject" onClick={() => onChoice('rejected')}>
          {copy.reject}
        </button>
      </div>
    </aside>
  )
}
