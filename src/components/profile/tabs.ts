// Shared by the server ProfileTabs and the client ProfileTabsView: a server
// component can't read plain values exported from a 'use client' module.
export const TABS = [
  'overview',
  'experience',
  'projects',
  'achievements',
  'stack',
  'posts'
] as const

export type Tab = (typeof TABS)[number]

export function isTab(value: string): value is Tab {
  return (TABS as readonly string[]).includes(value)
}
