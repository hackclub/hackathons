import nextVitals from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier'

export default [
  ...nextVitals,
  prettier,
  {
    rules: {
      'import/no-anonymous-default-export': 'off',
      'react/display-name': 'off',
      'react-hooks/exhaustive-deps': 'off'
    }
  }
]
