import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Booking Station'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
