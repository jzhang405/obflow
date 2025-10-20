#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');

const program = new Command();

program
  .name('obflow')
  .description('Obsidian iFlow Workflow Automation CLI')
  .version('1.0.0');

// Load configuration
const configPath = path.join(__dirname, '..', 'config', 'settings.json');
let config = {};

try {
  config = fs.readJsonSync(configPath);
} catch (error) {
  console.error('Warning: Could not load configuration file');
}

// Auto-tag command
program
  .command('auto-tag')
  .alias('at')
  .description('Automatically add tags to Obsidian notes based on content analysis')
  .argument('[files...]', 'Files to process (optional - processes all if not specified)')
  .option('-c, --confidence <threshold>', 'Confidence threshold (0.0-1.0)', '0.7')
  .option('-m, --max-tags <number>', 'Maximum number of tags to add', '10')
  .option('-d, --dry-run', 'Show what would be done without making changes')
  .action(async (files, options) => {
    console.log('🎯 Auto-tag command executed');
    console.log('Files:', files.length ? files : 'All files');
    console.log('Options:', options);
    
    // TODO: Implement actual auto-tag logic
    console.log('🚧 Auto-tag functionality coming soon...');
  });

// Smart TOC command
program
  .command('smart-toc')
  .alias('st')
  .description('Generate and manage table of contents for Obsidian notes')
  .argument('[file]', 'File to process')
  .option('-d, --depth <number>', 'Maximum heading depth', '6')
  .option('-s, --style <type>', 'TOC style (numbered|bulleted|linked)', 'linked')
  .option('-u, --update', 'Update existing TOC')
  .action(async (file, options) => {
    console.log('📑 Smart TOC command executed');
    console.log('File:', file || 'All files');
    console.log('Options:', options);
    
    // TODO: Implement actual TOC logic
    console.log('🚧 Smart TOC functionality coming soon...');
  });

// Task priority command
program
  .command('task-priority')
  .alias('tp')
  .description('Manage task priorities in Obsidian notes')
  .option('-l, --list', 'List all tasks with priorities')
  .option('-s, --sort <criteria>', 'Sort by (priority|deadline|effort)', 'priority')
  .option('-f, --filter <status>', 'Filter by status (pending|in-progress|completed)')
  .action(async (options) => {
    console.log('⚡ Task priority command executed');
    console.log('Options:', options);
    
    // TODO: Implement actual task priority logic
    console.log('🚧 Task priority functionality coming soon...');
  });

// Config command
program
  .command('config')
  .description('Manage ObFlow configuration')
  .option('-s, --show', 'Show current configuration')
  .option('-e, --edit', 'Edit configuration file')
  .option('-r, --reset', 'Reset to default configuration')
  .action(async (options) => {
    if (options.show) {
      console.log('⚙️  Current configuration:');
      console.log(JSON.stringify(config, null, 2));
    } else if (options.edit) {
      console.log('📝 Opening configuration file for editing...');
      // TODO: Open editor with config file
    } else if (options.reset) {
      console.log('🔄 Resetting configuration to defaults...');
      // TODO: Reset configuration
    } else {
      program.help();
    }
  });

// Status command
program
  .command('status')
  .description('Show system status and health')
  .action(async () => {
    console.log('🏥 ObFlow System Status');
    console.log('======================');
    console.log(`Version: ${program.version()}`);
    console.log(`Config loaded: ${Object.keys(config).length > 0 ? '✅' : '❌'}`);
    console.log(`Workspace: ${path.join(__dirname, '..', 'workspace')}`);
    console.log('🚧 Detailed status coming soon...');
  });

// Help command enhancement
program
  .command('help [command]')
  .description('Display help for command')
  .action((command) => {
    if (command) {
      program.commands.find(cmd => cmd.name() === command)?.help();
    } else {
      console.log('');
      console.log('🚀 ObFlow - Obsidian iFlow Workflow Automation');
      console.log('');
      console.log('Available Commands:');
      console.log('  auto-tag, at     - Automatically add tags to notes');
      console.log('  smart-toc, st    - Generate smart table of contents');
      console.log('  task-priority, tp - Manage task priorities');
      console.log('  config           - Manage configuration');
      console.log('  status           - Show system status');
      console.log('');
      console.log('Examples:');
      console.log('  obflow auto-tag my-note.md');
      console.log('  obflow smart-toc --update');
      console.log('  obflow task-priority --list');
      console.log('  obflow config --show');
      console.log('');
      program.help();
    }
  });

// Error handling
program.configureHelp({
  sortSubcommands: true,
  subcommandTerm: (cmd) => cmd.name() + (cmd.aliases()[0] ? '|' + cmd.aliases()[0] : '')
});

program.parse();