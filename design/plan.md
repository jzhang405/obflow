## Obflow 系统概述

Obflow 是一个 AI 驱动的笔记辅助工具包，为 Obsidian 用户提供虚拟笔记专家团队。它作为 iflow workflow, iflow CLI 运行在obsidian vault目录。

## 核心理念

Obflow 采用"AI 驱动的笔记专家组织"模型，包含三个核心角色：
1. **Obsidian 用户** - 笔记体系的构建者和决策者
2. **Obflow Core（核心代理）** - 虚拟笔记主管，通过引导式提问优化笔记逻辑
3. **子代理（领域专家）** - 10 个专业代理，如笔记整理、链接分析、模板生成、知识图谱优化等

## 系统架构

### 单一事实来源架构
所有组件维护在统一的 `core/` 目录中，安装时动态部署到 Obsidian 插件目录：

- `core/agents/obflow/` - 10 个 AI 代理定义（如笔记结构化代理、关联推荐代理等）
- `core/commands/obflow/` - 16 个命令实现
- `core/scripts/obflow/` - 自动化脚本（如批量处理笔记）
- `core/templates/` - 笔记模板（如读书卡、会议纪要、项目规划等）

### 5 部分命令模式
每个命令由最多 5 个部分组成：

1. 用户命令（`/obflow:command-name`）
2. 命令提示（`.md` 文件，指导代理行为）
3. 代理（可选，处理复杂笔记分析）
4. 模板（可选，结构化笔记内容）
5. 脚本（可选，笔记批量操作）

### 交互时序图

```mermaid
sequenceDiagram
    participant User as Obsidian 用户
    participant CMD as Command Prompt<br/>(.md 文件)
    participant Agent as Specialized Agent<br/>(.md 文件)
    participant Template as Note Template<br/>(.md 文件)
    participant Script as Shell Script<br/>(.sh 文件)
    participant Vault as Obsidian 库<br/>(vault/)

    User->>CMD: 1. 输入命令<br/>/obflow:command-name [args]

    activate CMD
    CMD->>CMD: 2. 验证输入参数<br/>(检查笔记库路径、参数格式等)

    alt 需要复杂笔记处理
        CMD->>Agent: 3a. 调用专业 Agent<br/>(处理"重活")
        activate Agent
        Agent->>Agent: 执行笔记分析/关联任务<br/>(如提取关键词、推荐链接)
        Agent-->>CMD: 返回简洁结果<br/>(如关联笔记列表、摘要)
        deactivate Agent
    else 简单笔记操作
        CMD->>CMD: 3b. 直接处理
    end

    alt 需要标准化笔记
        CMD->>Template: 4. 应用笔记模板
        activate Template
        Template-->>CMD: 返回格式化笔记内容<br/>(含 frontmatter、结构框架)
        deactivate Template
    end

    alt 需要库文件操作
        CMD->>Script: 5. 调用 Shell 脚本
        activate Script
        Script->>Vault: 执行库内操作<br/>(创建笔记、更新链接、生成目录)
        Vault-->>Script: 操作结果<br/>(文件路径、是否成功)
        Script-->>CMD: 成功/错误反馈
        deactivate Script
    end

    CMD-->>User: 6. 返回处理结果<br/>(如笔记预览、操作状态、跳转链接)
    deactivate CMD
```



## 工作空间结构

Obsidian Vault（库）目录下自动生成 `obflow-workspace/` 存储所有辅助工件：

- `notes-optimized/` - 优化后的笔记版本
- `templates-generated/` - 自动生成的笔记模板
- `graph-analysis/` - 知识图谱分析报告
- `links-recommendations/` - 笔记关联推荐结果
- `sources-imported/` - 导入的外部资料（如网页、PDF 转换笔记）

## 核心功能

系统提供 16 个命令，涵盖完整的 Obsidian 笔记工作流：

- 笔记结构化（`/obflow:structure-note`）
- 关联链接推荐（`/obflow:recommend-links`）
- 模板生成（`/obflow:generate-template`）
- 知识图谱优化（`/obflow:optimize-graph`）
- 批量格式转换（`/obflow:batch-convert`）
- 内容摘要提取（`/obflow:extract-summary`）

## obsidian和iflow生态 （尽可能利用obsidian和iflow的生态）
- obsidian plugin：local REST api
- obsidian plugin：tasks
- obsidian plugin：excalidraw
- iflow MCPs，agents，commands
