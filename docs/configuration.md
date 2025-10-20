# ObFlow Configuration Guide

## Overview

ObFlow uses a **clean configuration system** with minimal files and no duplication:

1. **settings.json** - Core application settings
2. **llm.json** - LLM provider configurations  
3. **obsidian.json** - Obsidian API settings
4. **vaults.json** - Simple vault list (separate for modularity)

## Configuration Files

### Core Files (No Duplication)

```
config/
├── settings.json    # Application workflow & system settings
├── llm.json        # Multi-provider LLM configuration
├── obsidian.json   # Obsidian API connection settings
└── vaults.json     # Vault list (loaded into obsidian config)
```

## Environment Variables

### LLM Provider API Keys

```bash
# Kimi (Primary Provider - Enabled by Default)
KIMI_API_KEY=your_kimi_api_key_here

# Optional Providers
OPENAI_API_KEY=your_openai_api_key_here
DEEPSEEK_API_KEY=your_deepseek_api_key_here
LOCAL_LLM_BASE_URL=http://localhost:8080/v1
```

### Obsidian Configuration

```bash
# Vault path (optional, defaults to ~/Documents/Obsidian/Primary)
OBSIDIAN_VAULT_PATH=~/Documents/Obsidian/MyVault
```

### Feature Flags

```bash
# Enable specific providers (Kimi enabled by default)
ENABLE_OPENAI=false
ENABLE_DEEPSEEK=false
ENABLE_LOCAL_LLM=false
```

## Quick Setup

### 1. Copy Environment Template

```bash
cp .env.example .env
```

### 2. Configure API Keys

Edit `.env` and add your API keys:

```bash
# Minimum: Set up Kimi (primary provider)
KIMI_API_KEY=your_actual_kimi_key_here
```

### 3. Test Configuration

```bash
# Test basic configuration (no external calls)
node bin/obflow.js config --show
```

## Configuration Priority

1. **Environment Variables** (highest priority)
2. **JSON Configuration Files** 
3. **Default Values** (built-in fallbacks)

## Clean Architecture Benefits

- ✅ **No Duplication** - Each setting exists in one place only
- ✅ **Modular Design** - Separate concerns (LLM, Obsidian, App settings)
- ✅ **Environment Safe** - No testing until you're ready
- ✅ **Simple Maintenance** - Easy to understand and modify

## File Responsibilities

| File | Purpose | Contains |
|------|---------|----------|
| `settings.json` | App behavior | Workflows, cache, logging, performance |
| `llm.json` | AI providers | Models, endpoints, rate limits |
| `obsidian.json` | API connection | REST API settings, validation |
| `vaults.json` | Vault registry | List of vaults and basic settings |

## Next Steps

1. **Set up your API keys** in `.env` when ready
2. **Configure Obsidian** Local REST API plugin
3. **Test connection** with `obflow status`

**No testing required now** - configuration is clean and ready for when you are!