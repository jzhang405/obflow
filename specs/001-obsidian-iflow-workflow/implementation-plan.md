# iFlow Obsidian Workflow 实现计划

## 项目概述

基于NioPD项目的设计模式，构建一个专为Obsidian笔记应用设计的iFlow工作流系统。该系统将通过本地文件操作与Obsidian进行深度集成，提供智能化的笔记管理和知识工作流。

## 核心设计理念

### 1. 分层上下文管理（借鉴NioPD）
- **企业策略层**: 系统级配置和原则
- **组织策略层**: 工作流特定的Output Style
- **项目记忆层**: 项目特定的上下文和规范
- **用户记忆层**: 个人偏好设置
- **工作空间层**: 实际的Obsidian笔记文件

### 2. 五部分命令模式（继承NioPD架构）
每个工作流命令由以下组件构成：
1. **用户命令**: 用户输入的入口点
2. **命令提示**: AI执行的详细指令
3. **Agent定义**: 专业领域的AI代理
4. **模板文件**: 结构化输出模板
5. **脚本文件**: 本地文件操作系统

### 3. Obsidian集成策略
- **双模式集成**: 支持本地文件操作和Local REST API插件两种方式
- **Local REST API集成**: 通过插件提供的REST API进行安全的vault操作
- **本地文件操作**: 作为备用方案，直接操作Markdown文件
- **配置灵活性**: 用户可选择集成方式并配置API密钥和URL

## 系统架构设计

### 核心目录结构
```
obflow-obsidian-workflow/
├── core/                          # 统一核心系统
│   ├── agents/obflow/            # AI代理定义
│   ├── commands/obflow/          # 命令提示
│   ├── scripts/obflow/           # 文件操作脚本
│   ├── templates/                # 输出模板
│   └── iflow.md                 # 系统集成配置
├── config/                       # 配置文件
│   ├── settings.json            # 用户设置（包含API配置）
│   └── vaults.json              # vault路径配置
└── docs/                        # 文档和指南
```

### 工作流组件设计

#### 1. 用户命令设计
采用 `/ob:<command>` 或 `/obflow:<command>` 格式，例如：
- `/ob:new-note "会议记录"`
- `/ob:link-notes "主题A" "主题B"`
- `/ob:generate-summary`
- `/ob:extract-tasks`
- `/ob:organize-folder`

#### 2. 命令提示设计
每个命令对应一个Markdown文件，包含：
- **前置检查**: 参数验证和环境检查
- **执行逻辑**: AI需要执行的详细步骤
- **输出格式**: 期望的输出结构和格式
- **错误处理**: 异常情况的处理方式

#### 3. Agent设计
专业化AI代理，每个负责特定领域：
- **笔记管理器**: 笔记创建、编辑、组织
- **链接分析器**: 笔记间关系分析和链接优化
- **内容总结器**: 长文档摘要和关键信息提取
- **任务提取器**: 从笔记中提取行动项
- **知识图谱构建器**: 构建主题关联图

#### 4. 模板设计
标准化的输出模板：
- **笔记模板**: 不同类型笔记的结构模板
- **总结模板**: 内容摘要的标准格式
- **任务模板**: 行动项的提取格式
- **链接报告模板**: 关系分析的报告格式

#### 5. 脚本设计
本地文件操作脚本：
- **文件创建**: 新建笔记文件
- **链接管理**: 创建和维护笔记链接
- **元数据操作**: Front Matter处理
- **文件夹组织**: 笔记分类和整理
- **备份同步**: 工作空间备份

## Obsidian集成策略

### 1. 双模式集成架构
- **Local REST API模式**（推荐）:
  - 通过Obsidian的Local REST API插件进行安全操作
  - 需要配置插件URL（默认：http://localhost:27124）和API密钥
  - 支持vault的CRUD操作，更安全可靠
  - 实时同步，避免文件锁定问题
- **本地文件操作模式**（备用）:
  - 直接操作vault中的Markdown文件
  - 适用于API插件不可用的情况
  - 需要用户指定vault路径

### 2. vault配置管理
- **开发阶段**: vault独立于本软件，通过配置连接
- **部署阶段**: 可配置为与vault在同一目录或指定路径
- **多vault支持**: 支持连接和管理多个Obsidian vault
- **路径配置**: 在`config/vaults.json`中配置vault路径和API设置

### 3. Local REST API集成细节（基于OpenAPI规范）
- **插件依赖**: 需要用户安装并启用Local REST API插件（参考ref/openapi.yaml完整规范）
- **认证配置**: 支持API密钥认证（Bearer Token），在`config/settings.json`中配置
- **完整端点映射**:
  
  **Vault文件操作**:
  - `GET /vault/` - 列出vault根目录文件
  - `GET /vault/{filename}` - 获取指定文件内容（支持application/vnd.olrapi.note+json格式）
  - `PUT /vault/{filename}` - 创建或更新文件
  - `POST /vault/{filename}` - 追加内容到文件末尾
  - `PATCH /vault/{filename}` - 相对定位插入内容（支持heading、block、frontmatter）
  - `DELETE /vault/{filename}` - 删除指定文件
  
  **活动文件操作**:
  - `GET /active/` - 获取当前活动文件内容
  - `PUT /active/` - 更新活动文件内容
  - `POST /active/` - 追加内容到活动文件
  - `PATCH /active/` - 相对定位修改活动文件内容
  - `DELETE /active/` - 删除活动文件
  
  **搜索功能**:
  - `POST /search/simple?query={query}` - 简单文本搜索
  - `POST /search/` - 高级搜索（支持Dataview DQL和JsonLogic查询）
  
  **系统命令**:
  - `POST /commands/{commandId}/` - 执行Obsidian命令
  - `GET /commands/` - 获取可用命令列表
  
  **文件打开**:
  - `POST /open/{filename}?newLeaf={boolean}` - 在Obsidian界面中打开文件
  
  **Periodic Notes**（如果安装插件）:
  - `GET /periodic/{period}/` - 获取当前周期性笔记
  - `PUT /periodic/{period}/` - 更新周期性笔记
  - `POST /periodic/{period}/` - 追加到周期性笔记
  - `PATCH /periodic/{period}/` - 相对定位修改周期性笔记
  - `DELETE /periodic/{period}/` - 删除周期性笔记

- **高级功能支持**:
  - **Frontmatter操作**: 通过PATCH请求修改YAML frontmatter
  - **块引用支持**: 支持block ID定位(`^blockid`)
  - **标题导航**: 支持多级标题定位(`Heading 1::Subheading 1:1`)
  - **表格操作**: 支持JSON格式表格数据插入
  - **标签解析**: 获取解析后的标签列表
  - **文件元数据**: 获取创建时间、修改时间、文件大小等

- **内容类型支持**:
  - `text/markdown` - 纯Markdown内容
  - `application/vnd.olrapi.note+json` - 包含frontmatter、标签、元数据的完整笔记对象
  - `application/json` - 用于表格数据和frontmatter操作

- **错误处理**: 完整的错误代码和消息处理（基于OpenAPI的Error schema）
  - 404: 文件不存在
  - 405: 路径引用的是目录而非文件
  - 400: 请求格式错误
  - 401: 认证失败

### 4. 文件操作集成
- **Markdown语法**: 完全兼容Obsidian语法
- **Front Matter**: 支持YAML元数据处理
- **内部链接**: 使用 `[[笔记名称]]` 格式
- **附件管理**: 处理图片和其他附件文件

### 5. 工作空间组织
- **文件夹结构**: 基于Obsidian的文件夹体系
- **标签系统**: 支持Obsidian标签语法
- **图谱视图**: 生成兼容的知识图谱数据
- **搜索集成**: 利用Obsidian的搜索功能

### 6. 元数据管理
- **笔记属性**: 自动维护创建时间、修改时间等
- **关系映射**: 跟踪笔记间的链接关系
- **版本控制**: 支持笔记版本历史
- **分类标签**: 智能标签建议和分类

## 核心工作流程（基于OpenAPI规范）

### 1. 笔记创建工作流（API模式）
```
用户输入 → 命令验证 → AI处理 → 模板填充 → API调用 → Obsidian集成
详细流程：
1. 用户输入: /ob:new-note "会议记录 2025-01-15"
2. 命令验证: 检查参数、验证API连接（GET /）
3. AI处理: 生成笔记内容结构
4. 模板填充: 应用笔记模板
5. API调用: PUT /vault/meeting-2025-01-15.md (Content-Type: text/markdown)
6. 确认创建: 检查响应状态，提供Obsidian中打开选项（POST /open/）
```

### 2. 智能内容分析工作流（基于搜索API）
```
内容提取 → 搜索分析 → 关系识别 → 链接建议 → 用户确认 → 批量更新
详细流程：
1. 内容提取: 获取当前笔记（GET /active/ Accept: application/vnd.olrapi.note+json）
2. 搜索分析: 使用搜索API找出相关内容
   - 简单搜索: POST /search/simple?query=关键词
   - 高级搜索: POST /search/ Content-Type: application/vnd.olrapi.jsonlogic+json
3. 关系识别: AI分析内容关联性
4. 链接建议: 生成[[内部链接]]建议
5. 用户确认: 展示建议链接列表
6. 批量更新: PATCH /vault/{filename} 添加链接（Target-Type: heading/block）
```

### 3. Frontmatter智能管理工作流
```
元数据分析 → 标签提取 → 属性更新 → 批量应用 → 一致性检查
详细流程：
1. 元数据分析: 解析笔记内容提取元数据
2. 标签提取: 从内容中提取潜在标签
3. 属性更新: 生成标准化的frontmatter
4. 批量应用: 
   - PATCH /vault/{filename} 
   - Headers: Operation=replace, Target-Type=frontmatter, Target=tags
   - Body: ["标签1", "标签2", "标签3"]
5. 一致性检查: 验证所有相关笔记的frontmatter格式
```

### 4. 知识图谱构建工作流（基于搜索结果）
```
图谱分析 → 关系映射 → 可视化生成 → 图谱更新 → 交互优化
详细流程：
1. 图谱分析: 使用Dataview DQL查询构建知识结构
   POST /search/ Content-Type: application/vnd.olrapi.dataview.dql+txt
2. 关系映射: 将搜索结果转换为图谱节点和边
3. 可视化生成: 生成Mermaid或Graphviz格式的图谱
4. 图谱更新: PUT /vault/knowledge-graph.md 保存可视化图谱
5. 交互优化: 添加交互式元素和导航链接
```

### 5. 批量操作工作流（事务性）
```
操作计划 → 预检查 → 批量执行 → 错误处理 → 回滚机制
详细流程：
1. 操作计划: 生成批量操作清单
2. 预检查: 
   - 验证所有目标文件存在（GET /vault/{filename}）
   - 检查文件锁定状态
   - 备份关键文件内容
3. 批量执行: 按顺序执行API调用
4. 错误处理: 捕获并记录每个操作的错误
5. 回滚机制: 失败时恢复到操作前状态
```

## 技术实现要点

### 1. 文件系统操作
- **双模式文件操作**: 支持API调用和本地文件操作两种模式
- **Local REST API客户端**: 实现HTTP客户端与Obsidian插件通信
  - 支持Bearer Token认证（基于ref/openapi.yaml的securitySchemes）
  - 实现完整的CRUD操作（基于OpenAPI规范的paths）
  - 支持高级功能：frontmatter操作、块引用、标题导航
  - 处理内容协商（Accept头）以获取JSON格式的笔记数据
- **本地文件操作**: 作为备用方案，直接读写vault文件
- **事务机制**: 确保操作的原子性和一致性
- **错误恢复**: 操作失败时的自动回滚和恢复机制
- **并发处理**: 处理vault被Obsidian占用时的文件锁定问题

### 2. 数据持久化
- 本地JSON文件存储元数据
- Markdown文件存储内容
- 支持数据导出和备份
- 实现数据一致性检查

### 3. 安全性考虑
- 文件操作权限控制
- 路径安全检查
- 用户输入验证
- 备份和恢复机制

### 4. 配置管理（基于OpenAPI规范）
- **API配置**: 在`config/settings.json`中管理Local REST API的连接设置
  - **服务器配置**: URL（默认http://localhost:27124）、端口、超时设置
  - **认证配置**: Bearer Token（API Key）、证书信任设置
  - **SSL/TLS**: 处理自签名证书（参考openapi.yaml中的证书端点）
- **Vault配置**: 在`config/vaults.json`中配置多个vault的连接信息
  - **多vault支持**: 每个vault独立的API配置和路径设置
  - **默认vault**: 主vault配置和备用vault列表
- **内容格式配置**: 
  - 默认Accept头设置（application/vnd.olrapi.note+json vs text/markdown）
  - PATCH操作默认分隔符（Target-Delimiter，默认"::"）
  - 目标修剪空格设置（Trim-Target-Whitespace）
- **敏感信息**: API密钥等敏感数据的安全存储和加密
- **环境隔离**: 开发、测试、生产环境的配置分离
- **动态发现**: 通过`GET /`端点获取API版本和认证状态

## 扩展性和维护性

### 1. 模块化设计
- 独立的命令、代理、模板模块
- 插件式架构支持功能扩展
- 统一的接口和规范
- 版本控制和兼容性管理

### 2. 自迭代能力
- 自动识别重复任务模式
- 智能建议新的工作流
- 用户行为学习和适应
- 持续优化的建议机制

### 3. 文档和指南
- 详细的使用文档
- 开发和扩展指南
- 最佳实践分享
- 社区贡献机制

## 实施阶段规划

### 阶段1: 基础框架 (MVP)
- 核心架构搭建
- 基础命令实现
- 文件操作系统
- 简单笔记管理

### 阶段2: 核心功能
- 高级Agent实现
- 复杂工作流支持
- Obsidian深度集成
- 知识图谱构建

### 阶段3: 智能化增强
- AI驱动的建议
- 自动化工作流
- 智能分类和标签
- 高级搜索和分析

### 阶段4: 生态扩展
- 社区插件支持
- 第三方集成
- 高级自定义
- 协作功能

## 质量保证

### 1. 测试策略
- 单元测试覆盖核心功能
- 集成测试验证工作流
- 用户接受度测试
- 性能和压力测试

### 2. 代码质量
- 代码审查机制
- 静态代码分析
- 文档完整性检查
- 安全性审计

### 3. 用户体验
- 直观的命令设计
- 清晰的错误提示
- 详细的帮助文档
- 快速响应时间

## 风险评估和缓解

### 1. 技术风险
- **文件系统兼容性**: 多平台测试和适配
- **数据一致性**: 事务机制和错误恢复
- **性能问题**: 优化算法和数据结构

### 2. 用户体验风险
- **学习曲线**: 提供详细的教程和示例
- **命令复杂性**: 渐进式功能展示
- **错误处理**: 友好的错误提示和帮助

### 3. 集成风险
- **Obsidian更新**: 版本兼容性检查，Local REST API插件变更适配
- **Local REST API插件依赖**: 插件未安装或配置错误的降级处理
- **网络连接问题**: API连接失败时的本地文件操作备用方案
- **文件锁定**: vault被Obsidian占用时的并发处理机制
- **数据一致性**: API操作和本地操作之间的数据同步问题

## 成功标准

### 1. 功能性指标
- 核心命令完整实现
- 文件操作成功率 >99%
- 响应时间 <2秒
- 错误率 <1%

### 2. 用户体验指标
- 用户满意度 >4.5/5
- 学习完成率 >80%
- 功能发现率 >70%
- 日常使用频率增长

### 3. 技术指标
- 代码覆盖率 >80%
- 文档完整性 >90%
- 安全漏洞为0
- 性能指标达标

## 后续规划

### 1. 社区建设
- 用户社区建立
- 贡献者指南
- 插件开发生态
- 最佳实践分享

### 2. 持续改进
- 用户反馈收集
- 功能迭代优化
- 性能持续提升
- 新功能探索

### 3. 生态扩展
- 与其他工具集成
- API接口开放
- 云端服务支持
- 移动端适配

---

本实现计划基于NioPD的成功经验，结合Obsidian的特点，旨在构建一个强大、易用、可扩展的知识工作流系统。通过分层架构、模块化设计和智能化功能，为用户提供卓越的知识管理体验。