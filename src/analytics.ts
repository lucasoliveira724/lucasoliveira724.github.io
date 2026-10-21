export type AnalyticsConsent = 'accepted' | 'rejected' | null

type AnalyticsEvent = 'contact_whatsapp' | 'contact_linkedin' | 'view_project_showcase'
type EventParameters = { project_name?: string }

declare global {
  interface Window {
    dataLayer?: IArguments[]
    gtag?: (...args: unknown[]) => void
  }
}

const measurementId = 'G-PVXF545KNJ'
const consentStorageKey = 'portfolio-analytics-consent'
let currentConsent: AnalyticsConsent = null
let analyticsInitialized = false

export function getStoredAnalyticsConsent(): AnalyticsConsent {
  try {
    const consent = localStorage.getItem(consentStorageKey)
    return consent === 'accepted' || consent === 'rejected' ? consent : null
  } catch {
    return null
  }
}

export function setAnalyticsConsent(consent: AnalyticsConsent) {
  const previousConsent = currentConsent
  currentConsent = consent
  if (consent === 'accepted') {
    if (!analyticsInitialized) {
      initializeAnalytics()
    } else if (previousConsent !== 'accepted') {
      window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
      sendPageView()
    }
  } else if (analyticsInitialized) {
    window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
  }
}

export function storeAnalyticsConsent(consent: Exclude<AnalyticsConsent, null>) {
  try {
    localStorage.setItem(consentStorageKey, consent)
  } catch {
    // Keep the preference for this page session if browser storage is unavailable.
  }
  setAnalyticsConsent(consent)
}

function initializeAnalytics() {
  if (analyticsInitialized || currentConsent !== 'accepted') return
  analyticsInitialized = true

  const dataLayer = (window.dataLayer = window.dataLayer || [])
  window.gtag = function gtag() {
    dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', measurementId, { send_page_view: false })
  sendPageView()

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)
}

function sendPageView() {
  if (currentConsent !== 'accepted') return

  const isEnglish = document.documentElement.lang === 'en'
  window.gtag?.('event', 'page_view', {
    page_title: isEnglish
      ? 'Portfolio | Digital Solutions Developer | Martech & Salesforce'
      : 'Portfólio | Desenvolvedor de Soluções Digitais | Martech & Salesforce',
    page_location: `${window.location.origin}${window.location.pathname}`,
  })
}

export function trackAnalyticsEvent(event: AnalyticsEvent, parameters?: EventParameters) {
  if (currentConsent !== 'accepted') return
  window.gtag?.('event', event, parameters)
}
