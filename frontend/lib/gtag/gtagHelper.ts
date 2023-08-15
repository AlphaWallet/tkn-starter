export const pageview = (GA_MEASUREMENT_ID: string, url: string) => {
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

export const initGoogleAnalytics = (cookieConsent: boolean = true) => {
  const newValue = cookieConsent ? "granted" : "denied"
  window.gtag("consent", "update", {
    analytics_storage: newValue,
  })
}
