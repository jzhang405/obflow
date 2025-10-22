const { TemplateProcessor } = require('../lib/template-processor');
const fs = require('fs-extra');
const path = require('path');

class ClaudeModeTester {
  constructor() {
    this.results = [];
    this.passed = 0;
    this.failed = 0;
  }

  log(testName, passed, expected, actual, error = null) {
    const result = {
      test: testName,
      passed,
      expected,
      actual,
      error: error?.message || null
    };
    
    this.results.push(result);
    if (passed) this.passed++;
    else this.failed++;
    
    const status = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} ${testName}`);
    if (!passed) {
      console.log(`   预期: ${expected}`);
      console.log(`   实际: ${actual}`);
      if (error) console.log(`   错误: ${error.message}`);
    }
  }

  async runAllTests() {
    console.log('🧪 开始Claude模式路径替换测试...\n');
    
    await this.testCommandFiles();
    await this.testScriptFiles();
    await this.testAgentFiles();
    await this.testTemplateFiles();
    
    this.printSummary();
  }

  async testCommandFiles() {
    console.log('\n📋 TC-005: Claude模式命令文件测试');
    
    const commandsDir = path.join(__dirname, '..', 'core', 'commands', 'niopd');
    const processor = new TemplateProcessor('claude');
    
    const commandFiles = [
      'init.md',
      'analyze-competitor.md',
      'draft-prd.md'
    ];
    
    for (const file of commandFiles) {
      const filePath = path.join(commandsDir, file);
      if (await fs.pathExists(filePath)) {
        const content = await fs.readFile(filePath, 'utf8');
        const processed = processor.processTemplate(content);
        
        const hasClaudePaths = processed.includes('.claude');
        const hasIflowPaths = processed.includes('.iflow');
        const hasTemplateVars = processed.includes('{{');
        
        this.log(
          `${file} - 路径正确性`,
          hasClaudePaths && !hasIflowPaths && !hasTemplateVars,
          '应包含.claude路径，不包含.iflow和模板变量',
          `claude: ${hasClaudePaths}, iflow: ${hasIflowPaths}, vars: ${hasTemplateVars}`
        );
      }
    }
  }

  async testScriptFiles() {
    console.log('\n📋 TC-006: Claude模式脚本文件测试');
    
    const scriptsDir = path.join(__dirname, '..', 'core', 'scripts', 'niopd');
    const processor = new TemplateProcessor('claude');
    
    const scriptFiles = [
      'init.sh',
      'analyze-competitor.sh',
      'draft-prd.sh'
    ];
    
    for (const file of scriptFiles) {
      const filePath = path.join(scriptsDir, file);
      if (await fs.pathExists(filePath)) {
        const content = await fs.readFile(filePath, 'utf8');
        const processed = processor.processTemplate(content);
        
        const hasClaudePaths = processed.includes('.claude');
        const hasIflowPaths = processed.includes('.iflow');
        const hasTemplateVars = processed.includes('{{');
        
        // If file contains template variables, verify path correctness
        // If file doesn't contain template variables, just verify no cross-IDE paths
        let passed, expected, actual;
        if (hasTemplateVars) {
          passed = hasClaudePaths && !hasIflowPaths && !hasTemplateVars;
          expected = '应包含.claude路径，不包含.iflow和模板变量';
          actual = `claude: ${hasClaudePaths}, iflow: ${hasIflowPaths}, vars: ${hasTemplateVars}`;
        } else {
          passed = !hasIflowPaths;
          expected = '不应包含iflow路径';
          actual = `iflow: ${hasIflowPaths}`;
        }
        
        this.log(
          `${file} - 路径正确性`,
          passed,
          expected,
          actual
        );
      }
    }
  }

  async testAgentFiles() {
    console.log('\n📋 TC-007: Claude模式代理文件测试');
    
    const agentsDir = path.join(__dirname, '..', 'core', 'agents', 'niopd');
    const processor = new TemplateProcessor('claude');
    
    const agentFiles = [
      'competitor-analyzer.md',
      'data-analyst.md',
      'persona-generator.md'
    ];
    
    for (const file of agentFiles) {
      const filePath = path.join(agentsDir, file);
      if (await fs.pathExists(filePath)) {
        const content = await fs.readFile(filePath, 'utf8');
        const processed = processor.processTemplate(content);
        
        const hasClaudePaths = processed.includes('.claude');
        const hasIflowPaths = processed.includes('.iflow');
        const hasTemplateVars = processed.includes('{{');
        
        // If file contains template variables, verify path correctness
        // If file doesn't contain template variables, just verify no cross-IDE paths
        let passed, expected, actual;
        if (hasTemplateVars) {
          passed = hasClaudePaths && !hasIflowPaths;
          expected = '应包含.claude路径，不包含.iflow路径';
          actual = `claude: ${hasClaudePaths}, iflow: ${hasIflowPaths}`;
        } else {
          passed = !hasIflowPaths;
          expected = '不应包含iflow路径';
          actual = `iflow: ${hasIflowPaths}`;
        }
        
        this.log(
          `${file} - 路径正确性`,
          passed,
          expected,
          actual
        );
      }
    }
  }

  async testTemplateFiles() {
    console.log('\n📋 TC-008: Claude模式模板文件验证');
    
    const processor = new TemplateProcessor('claude');
    
    // 测试模板变量在claude模式下保持不变
    const testTemplate = 'Check {{SCRIPTS_DIR}}/test.sh and {{IDE_DIR}}/directory';
    const processed = processor.processTemplate(testTemplate);
    
    const expectedClaude = 'Check .claude/scripts/niopd/test.sh and .claude/directory';
    
    this.log(
      '模板变量claude模式替换',
      processed === expectedClaude,
      expectedClaude,
      processed
    );
  }

  printSummary() {
    console.log('\n📊 Claude模式测试总结');
    console.log(`✅ 通过: ${this.passed}`);
    console.log(`❌ 失败: ${this.failed}`);
    console.log(`📈 成功率: ${((this.passed / (this.passed + this.failed)) * 100).toFixed(1)}%`);
    
    if (this.failed > 0) {
      console.log('\n❌ 失败的测试:');
      this.results.filter(r => !r.passed).forEach(r => {
        console.log(`   - ${r.test}: ${r.error || '结果不匹配'}`);
      });
    }
  }
}

// 运行测试
if (require.main === module) {
  const tester = new ClaudeModeTester();
  tester.runAllTests().catch(console.error);
}

module.exports = { ClaudeModeTester };