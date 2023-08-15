export function isInIframe() {
  return window && window !== window.parent
}
