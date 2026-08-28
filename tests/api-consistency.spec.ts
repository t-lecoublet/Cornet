// One name, one meaning, across sixty-one components.
//
// This is the check an API freeze is for. Nothing here is about behaviour: it
// is about a consumer being able to guess a prop name correctly on the second
// component without reading its documentation.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const componentsRoot = resolve(__dirname, '../components')

function files(dir: string, ext: string, suffix = ''): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      return files(full, ext, suffix)
    }
    return extname(entry) === ext && entry.endsWith(suffix) ? [full] : []
  })
}

const relative = (file: string) => file.slice(componentsRoot.length + 1)

describe('prop names', () => {
  it('use `ariaLabel` for an accessible name, never `label`', () => {
    // `label` is visible text everywhere else — DuButton's, a menu item's, a
    // tab's. Two meanings for one name is how an API stops being guessable.
    const offenders = files(componentsRoot, '.vue').filter((file) => {
      const content = readFileSync(file, 'utf-8')
      return /:aria-label="(?:props\.)?label"/.test(content)
    })

    expect(offenders.map(relative)).toEqual([])
  })

  it('spell every accessible-name prop the same way', () => {
    const offenders = files(componentsRoot, '.ts', '.types.ts').flatMap((file) => {
      const content = readFileSync(file, 'utf-8')
      // `aria-label` as a prop name (rather than the attribute) is the near miss.
      return /\n\s+'aria-label'\??:/.test(content) ? [relative(file)] : []
    })

    expect(offenders).toEqual([])
  })
})

describe('emit names', () => {
  it('pair every controllable prop with `update:` on the same name', () => {
    // `open` + `update:open`, `modelValue` + `update:modelValue`. A component
    // that takes a controllable prop and emits something else cannot be used
    // with `v-model:` at all.
    const offenders = files(componentsRoot, '.ts', '.types.ts').flatMap((file) => {
      const content = readFileSync(file, 'utf-8')
      const emits = [...content.matchAll(/\(e: 'update:(\w+)'/g)].map((match) => match[1]!)
      return emits
        .filter((name) => !new RegExp(`\\n\\s+${name}\\??:`).test(content))
        .map((name) => `${relative(file)} emits update:${name} with no ${name} prop`)
    })

    expect(offenders).toEqual([])
  })
})

describe('type exports', () => {
  it('name every props interface after its component', () => {
    const offenders = files(componentsRoot, '.ts', '.types.ts').flatMap((file) => {
      const content = readFileSync(file, 'utf-8')
      return [...content.matchAll(/export (?:interface|type) (\w*Props)\b/g)]
        .map((match) => match[1]!)
        .filter((name) => !name.startsWith('Du'))
        .map((name) => `${relative(file)}: ${name}`)
    })

    expect(offenders).toEqual([])
  })
})
