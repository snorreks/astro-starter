// commitlint.config.ts
import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // strictness: body must allow empty line
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    // strictness: max line length 100 chars
    'header-max-length': [2, 'always', 100],
  },
};

export default Configuration;
