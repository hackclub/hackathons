import { createElement } from 'react'

export function MDXProvider({ children }) {
  return children
}

export const components = {}
export const themed = () => ({})
export function Themed({ as: Tag = 'div', ...props }) {
  return createElement(Tag, props)
}
