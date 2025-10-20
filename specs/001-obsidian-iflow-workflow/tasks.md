# Tasks: Obsidian iFlow Workflow Automation

**Input**: Design documents from `/specs/001-obsidian-iflow-workflow/`
**Prerequisites**: implementation-plan.md (required), spec.md (required for user stories)

**Tests**: Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions
Based on the NioPD-inspired five-part architecture from implementation-plan.md:
- `core/agents/obflow/` - AI代理定义
- `core/commands/obflow/` - 命令提示
- `core/scripts/obflow/` - 文件操作脚本
- `core/templates/` - 输出模板
- `config/` - 配置文件

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure based on five-part architecture

- [ ] T001 Create core directory structure: `core/agents/obflow/`, `core/commands/obflow/`, `core/scripts/obflow/`, `core/templates/`
- [ ] T002 Initialize Node.js project with package.json and dependencies (commander, fs-extra, axios)
- [ ] T003 [P] Create base configuration files: `config/settings.json` and `config/vaults.json`
- [ ] T004 [P] Setup ESLint and Prettier configuration files
- [ ] T005 Create main CLI entry point `bin/obflow.js` with commander framework
- [ ] T006 [P] Create workspace directory structure: `workspace/logs/`, `workspace/memory/`, `workspace/cache/`, `workspace/backups/`, `workspace/reports/`, `workspace/temp/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T007 Create base agent framework in `core/agents/obflow/base-agent.md`
- [ ] T008 [P] Implement Local REST API client in `core/scripts/obflow/api-client.sh`
- [ ] T009 [P] Implement local file operation utilities in `core/scripts/obflow/file-utils.sh`
- [ ] T010 Create configuration management system in `lib/config.js`
- [ ] T011 Implement error handling and logging framework in `lib/logger.js`
- [ ] T012 Create vault connection validator in `lib/vault-validator.js`
- [ ] T013 [P] Implement workspace management system in `lib/workspace-manager.js`
- [ ] T014 [P] Create execution logger in `lib/execution-logger.js`
- [ ] T015 [P] Implement cache manager in `lib/cache-manager.js`
- [ ] T016 [P] Create backup service in `lib/backup-service.js`
- [ ] T017 [P] Implement memory manager in `lib/memory-manager.js`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - 自动标签管理 (Priority: P1) 🎯 MVP

**Goal**: 实现基于内容分析的自动标签系统，包括关键词提取、文件类型识别、时间周期标签、项目关联标签和情绪分析标签

**Independent Test**: 创建测试笔记文件并验证系统是否正确自动添加相关标签

### Implementation for User Story 1

- [ ] T012 [P] [US1] Create 标签管理器 Agent in `core/agents/obflow/tag-manager.md`
- [ ] T013 [P] [US1] Implement 关键词提取服务 in `core/scripts/obflow/keyword-extractor.sh`
- [ ] T014 [P] [US1] Create 文件类型识别服务 in `core/scripts/obflow/file-type-detector.sh`
- [ ] T015 [P] [US1] Implement 时间周期分析服务 in `core/scripts/obflow/time-period-analyzer.sh`
- [ ] T016 [P] [US1] Create 项目关联分析器 in `core/scripts/obflow/project-context-analyzer.sh`
- [ ] T017 [P] [US1] Implement 情绪分析服务 in `core/scripts/obflow/sentiment-analyzer.sh`
- [ ] T018 [US1] Create 自动标签命令提示 in `core/commands/obflow/auto-tag.md`
- [ ] T019 [US1] Implement 标签应用脚本 in `core/scripts/obflow/apply-tags.sh`
- [ ] T020 [US1] Create 标签模板 in `core/templates/tag-application-template.md`
- [ ] T021 [US1] Add 用户命令: `/ob:auto-tag` in main CLI

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - 智能目录管理 (Priority: P2)

**Goal**: 实现自动识别标题层级生成目录、目录随内容更新自动同步、支持自定义目录样式和目录深度智能调节

**Independent Test**: 创建包含多级标题的笔记并验证系统是否正确生成对应的多级目录

### Implementation for User Story 2

- [ ] T022 [P] [US2] Create 目录管理器 Agent in `core/agents/obflow/directory-manager.md`
- [ ] T023 [P] [US2] Implement 标题层级识别器 in `core/scripts/obflow/heading-level-detector.sh`
- [ ] T024 [P] [US2] Create 目录生成器 in `core/scripts/obflow/toc-generator.sh`
- [ ] T025 [P] [US2] Implement 目录同步服务 in `core/scripts/obflow/toc-sync-service.sh`
- [ ] T026 [P] [US2] Create 目录样式管理器 in `core/scripts/obflow/toc-style-manager.sh`
- [ ] T027 [P] [US2] Implement 目录深度调节器 in `core/scripts/obflow/toc-depth-adjuster.sh`
- [ ] T028 [US2] Create 智能目录命令提示 in `core/commands/obflow/smart-toc.md`
- [ ] T029 [US2] Implement 目录更新脚本 in `core/scripts/obflow/update-toc.sh`
- [ ] T030 [US2] Create 目录模板 in `core/templates/toc-template.md`
- [ ] T031 [US2] Add 用户命令: `/ob:smart-toc` in main CLI

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - 任务优先级管理 (Priority: P3)

**Goal**: 实现基于多维度因素的任务优先级计算、依赖关系识别、截止时间提醒和任务进度可视化

**Independent Test**: 创建多个任务并验证系统是否正确计算优先级和显示提醒

### Implementation for User Story 3

- [ ] T032 [P] [US3] Create 任务管理器 Agent in `core/agents/obflow/task-manager.md`
- [ ] T033 [P] [US3] Implement 任务提取器 in `core/scripts/obflow/task-extractor.sh`
- [ ] T034 [P] [US3] Create 优先级计算器 in `core/scripts/obflow/priority-calculator.sh`
- [ ] T035 [P] [US3] Implement 依赖关系分析器 in `core/scripts/obflow/dependency-analyzer.sh`
- [ ] T036 [P] [US3] Create 截止时间提醒器 in `core/scripts/obflow/deadline-reminder.sh`
- [ ] T037 [P] [US3] Implement 进度可视化生成器 in `core/scripts/obflow/progress-visualizer.sh`
- [ ] T038 [US3] Create 任务优先级命令提示 in `core/commands/obflow/task-priority.md`
- [ ] T039 [US3] Implement 任务排序脚本 in `core/scripts/obflow/sort-tasks.sh`
- [ ] T040 [US3] Create 任务报告模板 in `core/templates/task-report-template.md`
- [ ] T041 [US3] Add 用户命令: `/ob:task-priority` in main CLI

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T042 [P] Create 统一配置管理界面 in `core/commands/obflow/config.md`
- [ ] T043 [P] Implement 批量操作脚本 in `core/scripts/obflow/batch-operations.sh`
- [ ] T044 [P] Create 错误恢复机制 in `core/scripts/obflow/error-recovery.sh`
- [ ] T045 [P] Implement 性能监控和日志 in `lib/performance-monitor.js`
- [ ] T046 [P] Create 用户帮助系统 in `core/commands/obflow/help.md`
- [ ] T047 [P] Implement 数据备份和恢复 in `core/scripts/obflow/backup-restore.sh`
- [ ] T048 [P] Create 系统状态检查命令 in `core/commands/obflow/status.md`
- [ ] T049 Update 主CLI帮助文档和命令列表
- [ ] T050 Create 快速开始指南 in `docs/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Agent定义 before 脚本实现
- 服务脚本 before 命令提示
- 核心功能 before 用户命令集成
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Different services within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1 (自动标签管理)

```bash
# Launch all service analyzers for User Story 1 together:
Task: "Implement 关键词提取服务 in core/scripts/obflow/keyword-extractor.sh"
Task: "Create 文件类型识别服务 in core/scripts/obflow/file-type-detector.sh"
Task: "Implement 时间周期分析服务 in core/scripts/obflow/time-period-analyzer.sh"
Task: "Create 项目关联分析器 in core/scripts/obflow/project-context-analyzer.sh"
Task: "Implement 情绪分析服务 in core/scripts/obflow/sentiment-analyzer.sh"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (自动标签管理)
   - Developer B: User Story 2 (智能目录管理)
   - Developer C: User Story 3 (任务优先级管理)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify core functionality before implementing user commands
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

## Summary

**Summary**:

**Total Tasks**: 56 tasks
**User Story Distribution**:
- User Story 1 (P1 - 自动标签管理): 10 tasks
- User Story 2 (P2 - 智能目录管理): 10 tasks  
- User Story 3 (P3 - 任务优先级管理): 10 tasks
- Setup & Foundational: 17 tasks (包含workspace系统)
- Polish & Integration: 9 tasks

**新增Workspace系统**: 6个核心任务专门构建workspace管理基础设施
**Parallel Opportunities Identified**: 41 tasks marked with [P] for parallel execution
**Independent Test Criteria**: Each user story has clear independent test scenarios
**Suggested MVP Scope**: User Story 1 (自动标签管理) provides immediate value with 10 focused tasks