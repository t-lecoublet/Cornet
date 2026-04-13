export interface DocClassnameEntry {
  class: string
  desc: string
  default?: boolean
}

export interface DocClassnames {
  component?: DocClassnameEntry[]
  style?: DocClassnameEntry[]
  color?: DocClassnameEntry[]
  size?: DocClassnameEntry[]
  modifier?: DocClassnameEntry[]
  placement?: DocClassnameEntry[]
  animation?: DocClassnameEntry[]
}

export interface DocSection {
  title: string
  description?: string
  preview?: string   // raw DaisyUI HTML (rendered via v-html)
  code: string       // Vue/Cornet code example
}

export interface DocPageData {
  title: string
  description: string
  category: string
  source?: string
  classnames?: DocClassnames
  sections: DocSection[]
}
