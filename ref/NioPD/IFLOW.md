# NioPD - AI驱动的产品管理工具包

## 项目概述

NioPD（Nio Product Director）是一个专为AI代理（如iFlow CLI或Claude Code）设计的下一代产品管理工具包。它为产品经理提供即时访问虚拟产品专家团队的能力，由Nio（AI驱动的产品合作伙伴）协调领导。

**项目类型**：Node.js CLI工具包
**主要技术栈**：
- Node.js (>=16.0.0)
- Commander.js (CLI框架)
- ESLint + Jest (代码质量和测试)
- 文件系统操作 (fs-extra, glob)

## 核心功能

NioPD提供以下主要功能：
- **虚拟产品专家团队**：10个专业代理（如竞争对手分析器、反馈合成器、市场研究员等）
- **结构化工作流程**：从想法到执行的完整产品管理流程
- **文件驱动协作**：基于Markdown文件的协作系统
- **智能自我演进**：自动识别重复任务模式并建议创建新代理

## 系统架构

```
NioPD/
├── core/                 # 统一核心系统（单一事实来源）
│   ├── agents/niopd/     # 专业PM代理定义（10个代理）
│   ├── commands/niopd/   # 所有/niopd:命令定义（16个命令）
│   ├── scripts/niopd/    # 自动化辅助脚本
│   └── templates/        # 可重用模板
├── lib/                  # CLI安装工具
│   ├── install.js        # 安装编排逻辑
│   ├── config.js         # 配置管理
│   ├── file-manager.js   # 文件操作
│   └── utils.js          # 工具函数
├── bin/niopd.js          # CLI入口点
└── test/                 # 测试文件
```

## 构建和运行

### 安装依赖
```bash
npm install
```

### 运行测试
```bash
npm test                    # 运行所有测试
npm run test:watch         # 监视模式运行测试
npm run test:coverage      # 生成测试覆盖率报告
```

### 代码质量检查
```bash
npm run lint               # 代码检查
npm run lint:fix           # 自动修复代码问题
```

### 构建项目
```bash
npm run build              # 构建项目（检查+测试）
```

### 发布准备
```bash
npm run prepublishOnly     # 发布前构建检查
```

## 开发约定

### 代码风格
- **ESLint配置**：使用项目根目录的.eslintrc.json
- **测试框架**：Jest
- **文件命名**：kebab-case（短横线分隔）
- **目录结构**：清晰的功能模块分离

### 代理系统架构
NioPD使用5部分命令模式：
1. **用户命令**：`/niopd:<command_name>`
2. **命令提示**：`core/commands/niopd/<command_name>.md`
3. **代理定义**：`core/agents/niopd/<agent_name>.md`（可选）
4. **模板文件**：`core/templates/<template_name>.md`（可选）
5. **执行脚本**：`core/scripts/niopd/<script_name>.sh`（可选）

### 工作空间管理
- **数据目录**：`niopd-workspace/`
- **文件命名**：`[YYYYMMDD]-<identifier>-<document-type>-v[version].md`
- **自动归档**：系统自动保存重要讨论和研究结果

## 测试策略

### 测试结构
- **核心功能测试**：`test/core-functionality-test.js`
- **文件管理器测试**：`test/file-manager.test.js`
- **安装测试**：`test/install.test.js`
- **端到端测试**：`test/test-end-to-end.js`

### 测试运行
```bash
# 运行特定测试文件
node test/core-functionality-test.js
node test/test-end-to-end.js

# 使用Jest运行测试
npx jest test/file-manager.test.js
```

## 部署和分发

### 全局安装
```bash
npm install -g @iflow-ai/niopd
```

### CLI使用
```bash
niopd install              # 交互式安装
niopd install --silent     # 静默安装
niopd --help               # 查看帮助
```

### 项目集成
NioPD支持同时安装到多个IDE环境：
- **Claude Code**：安装到`.claude/`目录
- **iFlow CLI**：安装到`.iflow/`目录
- **同时安装**：支持多IDE环境

## 开发指南

### 添加新命令
1. 在`core/commands/niopd/`创建命令文件
2. 定义命令参数和验证逻辑
3. 创建配套的脚本（如需要）
4. 更新`COMMANDS.md`文档

### 添加新代理
1. 在`core/agents/niopd/`创建代理定义
2. 明确代理的角色、输入、输出
3. 更新`AGENTS.md`文档

### 配置管理
- **用户配置**：`~/.niopd/config.json`
- **环境变量**：支持NIOPD_INSTALL_PATH等
- **项目配置**：支持`niopd.config.js`等配置文件

## 故障排除

### 常见问题
- **权限错误**：使用`sudo npm install -g`或`npx`
- **路径问题**：使用绝对路径参数
- **网络问题**：配置npm镜像源

### 验证安装
```bash
niopd --version            # 检查版本
npx @iflow-ai/niopd install --dry-run  # 模拟安装
```

## 文档资源

- **README.md**：项目概述和使用指南
- **AGENTS.md**：代理系统详细说明
- **COMMANDS.md**：完整命令参考
- **测试文档**：`test/`目录包含详细测试说明

## 贡献指南

1. 遵循现有代码风格和架构模式
2. 添加相应的测试用例
3. 更新相关文档
4. 确保所有测试通过
5. 提交前运行完整构建流程

---

*最后更新：2025-10-19*