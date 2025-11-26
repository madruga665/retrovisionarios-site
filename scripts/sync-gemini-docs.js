const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');
const configPath = path.join(__dirname, '..', '.gemini', 'config.json');

// Check if docs directory exists
if (!fs.existsSync(docsDir)) {
  console.error('Docs directory not found:', docsDir);
  process.exit(1);
}

// Check if config file exists
if (!fs.existsSync(configPath)) {
  console.error('Config file not found:', configPath);
  process.exit(1);
}

try {
  // Read current config
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  
  // Initialize documentation_index if it doesn't exist
  if (!config.documentation_index) {
    config.documentation_index = {};
  }

  // Read files from docs directory
  const docFiles = fs.readdirSync(docsDir).filter(file => file.endsWith('.md'));
  
  // Create a map of current docs
  const currentDocs = {};
  docFiles.forEach(file => {
    // Create a key from filename (e.g., 'arquitetura-backend.md' -> 'arquitetura_backend')
    const key = file.replace('.md', '').replace(/-/g, '_');
    currentDocs[key] = `docs/${file}`;
  });

  // Update config with new docs, preserving existing custom keys if they point to valid files
  // Note: This simple version overwrites the index with what's found in docs/
  // to ensure it's always in sync with the filesystem.
  config.documentation_index = currentDocs;

  // Write back to config file
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  
  console.log('Successfully synced documentation index to .gemini/config.json');
  console.log('Current docs:', Object.keys(config.documentation_index).join(', '));

} catch (error) {
  console.error('Error syncing docs:', error);
  process.exit(1);
}
