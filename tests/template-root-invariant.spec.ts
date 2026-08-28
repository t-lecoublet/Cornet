// No component template may open with a comment.
//
// This is not style. A `<template>` whose first node is a comment renders one
// vnode more than its author counted, and Vue only auto-inherits attributes
// onto a *single* root. So a leading comment silently stops the component
// passing a consumer's `class`, `aria-label` or `data-*` to anything — and it
// does so only in development, because production builds strip comments and
// the component becomes single-root again. A dev-only difference in attribute
// inheritance is about the worst shape a bug can take.
//
// It has been introduced three times in this repository (DuInputField's
// fragment root, then six components in one pass, then two more), which is what
// this test is for. The explanation belongs in the `<script>`, where it costs
// nothing.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const componentsRoot = resolve(__dirname, '../components')

function vueFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      return vueFiles(full)
    }
    return extname(entry) === '.vue' ? [full] : []
  })
}

describe('template roots', () => {
  it('never open with a comment', () => {
    const offenders = vueFiles(componentsRoot).filter((file) => {
      const content = readFileSync(file, 'utf-8')
      const template = content.slice(content.indexOf('<template>') + '<template>'.length)
      return /^\s*<!--/.test(template)
    })

    expect(offenders.map((file) => file.slice(componentsRoot.length + 1))).toEqual([])
  })
})
