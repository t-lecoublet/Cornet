import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

import themeSolarizedLight from 'shiki/themes/solarized-light.mjs'
import langVue from 'shiki/langs/vue.mjs'
import langTs from 'shiki/langs/typescript.mjs'
import langJs from 'shiki/langs/javascript.mjs'
import langHtml from 'shiki/langs/html.mjs'
import langCss from 'shiki/langs/css.mjs'
import langBash from 'shiki/langs/bash.mjs'
import langJson from 'shiki/langs/json.mjs'

let highlighterPromise: ReturnType<typeof createHighlighterCore> | null = null

export function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [themeSolarizedLight],
      langs: [langVue, langTs, langJs, langHtml, langCss, langBash, langJson],
      engine: createJavaScriptRegexEngine(),
    })
  }
  return highlighterPromise
}
