const fs = require('fs-extra');
const path = require('path');
require('dotenv').config();

/**
 * Smart Configuration Manager
 * Handles multi-environment configuration with env var override
 */
class ConfigManager {
  constructor() {
    this.configDir = path.join(__dirname, '..', 'config');
    this.env = process.env.NODE_ENV || 'development';
    this.configs = {};
    this.loaded = false;
  }

  /**
   * Load all configuration files
   */
  async loadAll() {
    if (this.loaded) return this.configs;

    try {
      // Load base configurations
      this.configs.settings = await this.loadJson('settings.json');
      this.configs.llm = await this.loadJson('llm.json');
      this.configs.obsidian = await this.loadJson('obsidian.json');
      this.configs.vaults = await this.loadJson('vaults.json');

      // Set vaults from vaults.json (single source of truth)
      if (this.configs.vaults && this.configs.vaults.vaults) {
        this.configs.obsidian.vaults = this.configs.vaults.vaults;
      } else {
        // Fallback: create default vaults if vaults.json is missing
        this.configs.obsidian.vaults = [{
          "id": "primary",
          "name": "Primary Vault", 
          "path": "${OBSIDIAN_VAULT_PATH:-~/Documents/Obsidian/Primary}",
          "isActive": true,
          "settings": {
            "autoTag": true,
            "smartToc": true,
            "taskPriority": true
          }
        }];
      }

      // Apply environment-specific overrides
      await this.applyEnvironmentOverrides();
      
      // Apply environment variable overrides (highest priority)
      this.applyEnvVarOverrides();
      
      // Validate configuration
      this.validate();
      
      this.loaded = true;
      return this.configs;
    } catch (error) {
      throw new Error(`Configuration loading failed: ${error.message}`);
    }
  }

  /**
   * Load JSON configuration file
   */
  async loadJson(filename) {
    const filepath = path.join(this.configDir, filename);
    try {
      const content = await fs.readFile(filepath, 'utf8');
      return JSON.parse(this.interpolateEnvVars(content));
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.warn(`Warning: Configuration file ${filename} not found`);
        return {};
      }
      throw error;
    }
  }

  /**
   * Interpolate environment variables in JSON content
   * Supports ${VAR_NAME} and ${VAR_NAME:-default_value} syntax
   */
  interpolateEnvVars(content) {
    return content.replace(/\$\{([^}]+)\}/g, (match, varExpr) => {
      const [varName, defaultValue] = varExpr.split(':-');
      const envValue = process.env[varName];
      return envValue !== undefined ? envValue : (defaultValue || match);
    });
  }

  /**
   * Apply environment-specific configuration overrides
   */
  async applyEnvironmentOverrides() {
    const envConfigFile = `settings.${this.env}.json`;
    const envConfigPath = path.join(this.configDir, envConfigFile);
    
    if (await fs.pathExists(envConfigPath)) {
      const envConfig = await this.loadJson(envConfigFile);
      this.configs.settings = this.deepMerge(this.configs.settings, envConfig);
    }
  }

  /**
   * Apply environment variable overrides for sensitive data
   */
  applyEnvVarOverrides() {
    // LLM Provider API Keys
    if (process.env.DEEPSEEK_API_KEY) {
      this.setNestedValue(this.configs.llm, 'providers.deepseek.apiKey', process.env.DEEPSEEK_API_KEY);
    }
    if (process.env.IFLOW_API_KEY) {
      this.setNestedValue(this.configs.llm, 'providers.iflow.apiKey', process.env.IFLOW_API_KEY);
    }
    if (process.env.IFLOW_BASE_URL) {
      this.setNestedValue(this.configs.llm, 'providers.iflow.baseUrl', process.env.IFLOW_BASE_URL);
    }

    // Obsidian Configuration
    if (process.env.OBSIDIAN_VAULT_PATH) {
      this.setNestedValue(this.configs.obsidian, 'vaults.0.path', process.env.OBSIDIAN_VAULT_PATH);
    }
    if (process.env.OBSIDIAN_BEARER_TOKEN) {
      this.setNestedValue(this.configs.obsidian, 'api.localRestApi.authentication.bearerToken', process.env.OBSIDIAN_BEARER_TOKEN);
    }

    // Feature flags
    if (process.env.ENABLE_DEEPSEEK) {
      this.setNestedValue(this.configs.llm, 'providers.deepseek.enabled', process.env.ENABLE_DEEPSEEK === 'true');
    }
    if (process.env.ENABLE_IFLOW) {
      this.setNestedValue(this.configs.llm, 'providers.iflow.enabled', process.env.ENABLE_IFLOW === 'true');
    }

    // Logging and debug
    if (process.env.LOG_LEVEL) {
      this.setNestedValue(this.configs.settings, 'logging.level', process.env.LOG_LEVEL);
    }
    if (process.env.DEBUG === 'true') {
      this.setNestedValue(this.configs.settings, 'logging.level', 'debug');
    }
  }

  /**
   * Deep merge two objects
   */
  deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  /**
   * Set nested object value using dot notation
   */
  setNestedValue(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current)) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
  }

  /**
   * Get configuration value using dot notation
   */
  get(path, defaultValue = null) {
    const keys = path.split('.');
    let current = this.configs;
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return defaultValue;
      }
    }
    return current;
  }

  /**
   * Validate configuration
   */
  validate() {
    const errors = [];

    // Validate LLM configuration
    if (!this.configs.llm || !this.configs.llm.providers) {
      errors.push('LLM configuration is missing');
    } else {
      const providers = this.configs.llm.providers;
      const enabledProviders = Object.keys(providers).filter(p => providers[p].enabled);
      
      if (enabledProviders.length === 0) {
        errors.push('At least one LLM provider must be enabled');
      }

      // Check API keys for enabled providers
      enabledProviders.forEach(provider => {
        const apiKey = providers[provider].apiKey;
        if (apiKey && apiKey.includes('${') && !process.env[apiKey.match(/\$\{([^}]+)\}/)?.[1]]) {
          errors.push(`${provider} API key environment variable is not set`);
        }
      });
    }

    // Validate Obsidian configuration
    if (!this.configs.obsidian || !this.configs.obsidian.api) {
      errors.push('Obsidian API configuration is missing');
    }

    // Validate vaults configuration
    if (!this.configs.obsidian.vaults || this.configs.obsidian.vaults.length === 0) {
      errors.push('No vaults configured - using vaults.json as single source');
    }

    if (errors.length > 0) {
      console.warn('Configuration validation warnings:');
      errors.forEach(error => console.warn(`  ⚠️  ${error}`));
    }
  }

  /**
   * Reload configuration
   */
  async reload() {
    this.loaded = false;
    this.configs = {};
    return await this.loadAll();
  }

  /**
   * Get all configurations
   */
  getAll() {
    return this.configs;
  }
}

module.exports = ConfigManager;