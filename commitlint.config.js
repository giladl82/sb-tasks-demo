import { rules } from "eslint-plugin-react-refresh";

export default { extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'always', 'sentence-case']
  }
 };
