import { execSync } from 'node:child_process';

/**
 * 🚀 Fix Changed Files Script
 *
 * Scans for files changed against HEAD (staged + unstaged),
 * filters them by extension, and runs ESLint/Prettier on them.
 * Finally runs a global type check.
 */
const EXTENSIONS = {
  lint: /\.(js|mjs|cjs|ts|jsx|tsx|astro)$/,
  format: /\.(js|mjs|cjs|ts|jsx|tsx|astro|json|md|yml|yaml|css)$/,
};

const getChangedFiles = (): string[] => {
  try {
    // --name-only: filenames only
    // --diff-filter=ACMR: Added, Copied, Modified, Renamed (Exclude Deleted)
    // HEAD: Compare against the last commit
    const output = execSync('git diff --name-only --diff-filter=ACMR HEAD', {
      encoding: 'utf8',
    });
    return output
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);
  } catch {
    console.error('⚠️ Could not determine changed files. Are you in a git repo?');
    return [];
  }
};

const run = () => {
  const files = getChangedFiles();

  if (files.length === 0) {
    console.log('✨ No changed files to fix.');
    return;
  }

  const lintFiles = files.filter((f) => EXTENSIONS.lint.test(f));
  const formatFiles = files.filter((f) => EXTENSIONS.format.test(f));

  console.log(`🔍 Found ${files.length} changed file(s).`);

  // 1. ESLint (Fix)
  if (lintFiles.length > 0) {
    console.log('🛠️  Linting...');
    try {
      // We explicitly pass the files to eslint
      execSync(`pnpm eslint --fix ${lintFiles.join(' ')}`, { stdio: 'inherit' });
    } catch (error) {
      console.error('❌ Linting failed.');
      throw error;
    }
  }

  // 2. Prettier (Write)
  if (formatFiles.length > 0) {
    console.log('🎨 Formatting...');
    try {
      execSync(`pnpm prettier --write ${formatFiles.join(' ')}`, { stdio: 'inherit' });
    } catch (error) {
      console.error('❌ Formatting failed.');
      throw error;
    }
  }

  // 3. Astro Check (Validation)
  // We run this globally because a change in one file might break types in another file
  console.log('✅ Verifying Types...');
  try {
    execSync('pnpm astro check', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Type check failed.');
    throw error;
  }

  console.log('✨ All changes fixed and validated!');
};

run();
