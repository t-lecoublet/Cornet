import { createHighlighter, type Highlighter } from 'shiki'

let highlighterPromise: Promise<Highlighter> | null = null

export function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['solarized-light'],
      langs: ['vue', 'typescript', 'javascript', 'html', 'css', 'bash', 'sh', 'json', 'shell'],
    })
  }
  return highlighterPromise
}
