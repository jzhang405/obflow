<!--
Sync Impact Report:
- Version change: 0.1.0 → 1.0.0 (MAJOR - completely new constitution)
- Modified principles: All principles replaced with new focus areas
- Added sections: Quality Assurance, User Experience Standards, Performance Standards
- Removed sections: None (completely replaced)
- Templates requiring updates:
  ✅ plan-template.md - Constitution Check section updated
  ✅ spec-template.md - Requirements section aligned
  ✅ tasks-template.md - Testing and quality gates aligned
  ✅ speckit.constitution.md - Command file validated
  ✅ speckit.plan.md - Command file validated
- Follow-up TODOs: None - all placeholders resolved
-->

# obflow Constitution

## Core Principles

### I. Code Quality Standards (NON-NEGOTIABLE)
All code MUST adhere to SOLID principles and follow consistent style guidelines. Code reviews MUST enforce readability, maintainability, and proper documentation. Technical debt MUST be tracked and addressed within defined timeframes. Code duplication MUST be minimized through abstraction and reuse.

### II. Test-Driven Development (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement. Red-Green-Refactor cycle strictly enforced. Test coverage MUST exceed 80% for all critical paths. Integration tests required for all user journeys and API contracts.

### III. User Experience Consistency
User interfaces MUST maintain consistent interaction patterns and design language. Error messages MUST be clear, actionable, and user-friendly. Performance feedback MUST be provided for long-running operations. Accessibility standards MUST be followed for all user-facing components.

### IV. Performance Requirements
All features MUST meet defined performance targets for response times and resource usage. Performance benchmarks MUST be established and monitored. Scalability considerations MUST be addressed in architecture decisions. Memory and CPU usage MUST be optimized for target deployment environments.

### V. Documentation & Maintainability
All public APIs and interfaces MUST be fully documented. Code comments MUST explain "why" not "what" for complex logic. Architecture decisions MUST be documented and rationale preserved. Change management MUST include documentation updates.

## Quality Assurance

### Testing Standards
- Unit tests for all business logic and utility functions
- Integration tests for all external dependencies and data flows
- End-to-end tests for critical user journeys
- Performance tests for all time-sensitive operations
- Security tests for authentication and authorization flows

### Code Review Requirements
- Two-person review for all code changes
- Automated linting and static analysis required
- Security vulnerability scanning mandatory
- Performance impact assessment required
- Documentation completeness verified

## User Experience Standards

### Interface Consistency
- Consistent error handling patterns across all components
- Unified loading and feedback mechanisms
- Standardized user input validation
- Predictable navigation and interaction flows

### Accessibility Requirements
- WCAG 2.1 AA compliance for all user interfaces
- Keyboard navigation support
- Screen reader compatibility
- Color contrast and text sizing standards

## Performance Standards

### Response Time Targets
- API responses: < 200ms P95 latency
- UI interactions: < 100ms response time
- Data processing: < 1 second for standard operations
- Batch operations: Progress indicators for > 2 second operations

### Resource Management
- Memory usage optimized for target deployment scale
- CPU utilization monitored and optimized
- Database query optimization requirements
- Caching strategies for frequently accessed data

## Governance

Constitution supersedes all other practices. Amendments require documentation, approval, and migration plan. All PRs/reviews MUST verify compliance with constitution principles. Complexity MUST be justified with clear business value. Use this constitution for runtime development guidance.

**Version**: 1.0.0 | **Ratified**: 2025-10-19 | **Last Amended**: 2025-10-19

---

## 治理原则 (Governance Principles in Chinese)

### 代码质量标准 (不可协商)
所有代码必须遵循SOLID原则和一致的风格指南。代码审查必须强制执行可读性、可维护性和适当的文档。技术债务必须被跟踪并在规定时间内解决。必须通过抽象和重用最小化代码重复。

### 测试驱动开发 (不可协商)
TDD强制要求：编写测试 → 用户批准 → 测试失败 → 然后实现。严格执行红-绿-重构循环。关键路径的测试覆盖率必须超过80%。所有用户旅程和API契约都需要集成测试。

### 用户体验一致性
用户界面必须保持一致的交互模式和设计语言。错误信息必须清晰、可操作且用户友好。必须为长时间运行的操作提供性能反馈。所有面向用户的组件必须遵循无障碍标准。

### 性能要求
所有功能必须满足响应时间和资源使用的性能目标。必须建立并监控性能基准。架构决策必须考虑可扩展性。必须针对目标部署环境优化内存和CPU使用。

### 文档与可维护性
所有公共API和接口必须完全文档化。代码注释必须解释复杂逻辑的"为什么"而不是"是什么"。架构决策必须被记录并保留理由。变更管理必须包括文档更新。