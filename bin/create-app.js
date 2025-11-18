#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get project name from command line arguments
const projectName = process.argv[2] || 'neon-flux-app';

// ASCII Art Banner
console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║     ███╗   ██╗███████╗ ██████╗ ███╗   ██╗               ║
║     ████╗  ██║██╔════╝██╔═══██╗████╗  ██║               ║
║     ██╔██╗ ██║█████╗  ██║   ██║██╔██╗ ██║               ║
║     ██║╚██╗██║██╔══╝  ██║   ██║██║╚██╗██║               ║
║     ██║ ╚████║███████╗╚██████╔╝██║ ╚████║               ║
║     ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝               ║
║                                                           ║
║     ███████╗██╗     ██╗   ██╗██╗  ██╗                   ║
║     ██╔════╝██║     ██║   ██║╚██╗██╔╝                   ║
║     █████╗  ██║     ██║   ██║ ╚███╔╝                    ║
║     ██╔══╝  ██║     ██║   ██║ ██╔██╗                    ║
║     ██║     ███████╗╚██████╔╝██╔╝ ██╗                   ║
║     ╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝                   ║
║                                                           ║
║              Cyberpunk Next.js Template                  ║
║                     v1.0.0                               ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝

🚀 Creating ${projectName}...
`);

try {
  // Check if directory already exists
  if (fs.existsSync(projectName)) {
    console.error(`❌ Error: Directory "${projectName}" already exists.`);
    process.exit(1);
  }

  console.log('📦 Cloning Neon Flux template...');

  // Clone the repository
  execSync(
    `git clone https://github.com/yourusername/neon-flux-template.git ${projectName}`,
    { stdio: 'inherit' }
  );

  // Change to project directory
  process.chdir(projectName);

  console.log('🗑️  Removing git history...');

  // Remove .git directory
  if (process.platform === 'win32') {
    execSync('rmdir /s /q .git', { stdio: 'inherit' });
  } else {
    execSync('rm -rf .git', { stdio: 'inherit' });
  }

  console.log('📝 Installing dependencies...');

  // Install dependencies
  execSync('npm install', { stdio: 'inherit' });

  console.log('✅ Setup complete!');
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║  ✨ Success! Your Neon Flux project is ready!            ║
║                                                           ║
║  📁 Project: ${projectName.padEnd(44)} ║
║                                                           ║
║  Get started with:                                        ║
║                                                           ║
║    cd ${projectName.padEnd(48)} ║
║    npm run dev                                            ║
║                                                           ║
║  🌐 Open http://localhost:3000                            ║
║                                                           ║
║  📚 Documentation: README.md                              ║
║  🐛 Issues: github.com/yourusername/neon-flux-template    ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝

💡 Tips:
  - Customize colors in tailwind.config.ts
  - Configure features in .env.example (copy to .env)
  - Check out components/ for pre-built cyberpunk components
  - Visit the documentation for more advanced features

Happy coding! 🎮✨
  `);
} catch (error) {
  console.error('❌ Error creating project:', error.message);
  process.exit(1);
}
