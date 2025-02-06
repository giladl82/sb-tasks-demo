import chalk from 'chalk';
import { execSync } from 'child_process';

// Define allowed branch name patterns (customize this to your needs)
const allowedBranchPattern = /^(main|develop|feat\/.+|bug\/.+|chore\/.+)$/;

// Get the current branch name using Git
let branchName;
try {
  branchName = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
} catch (error) {
  console.error(chalk.bold.red('🚨 Error fetching the current branch name.'));
  console.error(chalk.red(error.message));
  process.exit(1);
}

// Validate the branch name
if (!allowedBranchPattern.test(branchName)) {
  console.error(
    chalk.bold.red(`\n🚨 Invalid branch name: ${chalk.yellow(branchName)}\n`)
  );
  console.log(
    chalk.bold.green('Valid branch name formats are:') +
    `\n- ${chalk.cyan('main')}` +
    `\n- ${chalk.cyan('develop')}` +
    `\n- ${chalk.cyan('feat/<your-feature>')}` +
    `\n- ${chalk.cyan('bug/<your-bugfix>')}\n`
  );
  console.error(
    chalk.red('💡 Please rename your branch to follow the naming conventions.')
  );
  process.exit(1); // Exit with an error
}

// If branch name is valid
console.log(chalk.green(`✅ Branch name "${branchName}" is valid.`));
process.exit(0);