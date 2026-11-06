export const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${url}`)
  return res.json()
}
