import { execSync } from 'child_process';
import { rmSync } from 'fs';
import { resolve } from 'path';

const projectRoot = '/vercel/share/v0-project';

console.log('Removing node_modules...');
try {
  rmSync(resolve(projectRoot, 'node_modules'), { recursive: true, force: true });
} catch (e) {
  console.log('node_modules already removed or does not exist');
}

console.log('Reinstalling dependencies...');
try {
  execSync('npm install', { cwd: projectRoot, stdio: 'inherit' });
  console.log('Dependencies installed successfully');
} catch (e) {
  console.error('Failed to install dependencies:', e);
  process.exit(1);
}
