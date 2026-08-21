import { ref, computed } from 'vue'

export type RepoPref = 'gitlab' | 'github' | 'npm'

const STORAGE_KEY = 'cornet-repo-preference'

const GITLAB_BASE = 'https://gitlab.limos.fr/hub-isima/daisyui-vue-kit'
const GITHUB_BASE = 'https://github.com/t-lecoublet/Cornet-UI'
const NPM_BASE    = 'https://www.npmjs.com/package/cornet-ui'
const GITLAB_SSH  = 'git@gitlab.limos.fr:hub-isima/daisyui-vue-kit.git'
const GITHUB_SSH  = 'git@github.com:t-lecoublet/Cornet-UI.git'

const stored = typeof localStorage !== 'undefined'
  ? (localStorage.getItem(STORAGE_KEY) as RepoPref | null)
  : null

const preference = ref<RepoPref | null>(stored)

export function useRepoPreference() {
  function set(pref: RepoPref) {
    preference.value = pref
    localStorage.setItem(STORAGE_KEY, pref)
  }

  function transformUrl(text: string): string {
    if (preference.value !== 'github') return text
    return text
      .replace(/https:\/\/gitlab\.limos\.fr\/hub-isima\/daisyui-vue-kit\/-\/tree\//g, `${GITHUB_BASE}/tree/`)
      // The `(?![-\w])` boundary matters: without it this also matches the
      // `daisyui-vue-kit-nuxt-starter` repo and rewrites it to a Cornet-UI-nuxt-starter
      // that does not exist. Sibling repos have no GitHub mirror, so leave them on GitLab.
      .replace(/https:\/\/gitlab\.limos\.fr\/hub-isima\/daisyui-vue-kit(?![-\w])/g, GITHUB_BASE)
      .replace(/git@gitlab\.limos\.fr:hub-isima\/daisyui-vue-kit\.git/g, GITHUB_SSH)
  }

  const repoUrl = computed(() => {
    if (preference.value === 'github') return GITHUB_BASE
    if (preference.value === 'npm') return NPM_BASE
    return GITLAB_BASE
  })

  return { preference, set, transformUrl, repoUrl }
}
