# NioPD Agents Directory

This directory contains all the specialized AI agents used by the NioPD system. Each agent is defined by a markdown file that provides detailed instructions for a specific task.

## Agent Structure

Each agent file follows a consistent structure:

```
---
name: agent-name
description: Brief description of what the agent does
tools: [List of tools the agent is allowed to use]
model: claude-3-5-sonnet-20240620
color: 🤖
---

# Agent: {{agent-name}}

## Purpose
A detailed explanation of what this agent is designed to do.

## Input
Description of what input the agent expects.

## Process
Step-by-step instructions on how the agent should process the input.

## Output
Description of what the agent should produce as output.

## Error Handling
Guidance on how the agent should handle various error conditions.

```

## Available Agents

### 🤖 [competitor-analyzer.md](niopd/competitor-analyzer.md)
Analyzes a competitor's website to extract key features and value propositions.

### 🤖 [data-analyst.md](niopd/data-analyst.md)
Performs analysis on structured data files (e.g., CSV) based on natural language queries.

### 🤖 [feedback-synthesizer.md](niopd/feedback-synthesizer.md)
Processes raw user feedback to identify key themes, pain points, and feature requests.

### 🤖 [interview-summarizer.md](niopd/interview-summarizer.md)
Reads user interview transcripts to extract critical insights and quotes.

### 🤖 [kpi-tracker.md](niopd/kpi-tracker.md)
Tracks key performance indicators for initiatives and reports on progress.

### 🤖 [market-researcher.md](niopd/market-researcher.md)
Researches and summarizes market trends on a given topic using web search.

### 🤖 [persona-generator.md](niopd/persona-generator.md)
Creates detailed user personas from synthesized user feedback.

### 🤖 [presentation-builder.md](niopd/presentation-builder.md)
Creates concise project updates for business stakeholders.

### 🤖 [roadmap-generator.md](niopd/roadmap-generator.md)
Generates visual product roadmaps from initiative files.

### 🤖 [story-writer.md](niopd/story-writer.md)
Specialized AI agent expert in writing detailed user stories and acceptance criteria from PRD documents. Transforms high-level requirements into specific, testable user stories following the 'As a [persona], I want to [action], so that [benefit]' format. Identifies edge cases, alternative flows, and non-functional requirements with clear acceptance criteria for development teams.

### 🤖 [faq-generator.md](niopd/faq-generator.md)
Specialized AI agent expert in creating comprehensive FAQ documents from PRD documents. Identifies key features, functionalities, and potential user questions to generate a well-structured FAQ with clear, concise answers. Organizes questions by category and provides supplemental information for complex topics.

### 🤖 [nio.md](niopd/nio.md)
Acts as a senior product manager supervisor to guide the user through product design.

## Tools Available to Agents

Claude Code has access to a set of powerful tools that help it understand and modify your codebase:

| Tool | Description | Permission Required |
|------|-------------|---------------------|
| Bash | Executes shell commands in your environment | Yes |
| Edit | Makes targeted edits to specific files | Yes |
| Glob | Finds files based on pattern matching | No |
| Grep | Searches for patterns in file contents | No |
| LS | Lists files and directories | No |
| MultiEdit | Performs multiple edits on a single file atomically | Yes |
| NotebookEdit | Modifies Jupyter notebook cells | Yes |
| NotebookRead | Reads and displays Jupyter notebook contents | No |
| Read | Reads the contents of files | No |
| Task | Runs a sub-agent to handle complex, multi-step tasks | No |
| TodoWrite | Creates and manages structured task lists | No |
| WebFetch | Fetches content from a specified URL | Yes |
| WebSearch | Performs web searches with domain filtering | Yes |
| Write | Creates or overwrites files | Yes |

Permission rules can be configured using /allowed-tools or in permission settings.

## Creating New Agents

To create a new agent:

1. Create a new markdown file with the naming convention `[agent-name].md` and place it in the `NioPD` subdirectory
2. Follow the structure outlined above
3. Ensure the agent has a single, clear purpose
4. Define clear input, process, and output sections
5. Include error handling guidance
6. Add the agent to this README with a brief description
7. To encourage more proactive subagent use, include phrases like "use PROACTIVELY" or "MUST BE USED" in your description field.

**Example of create a new agent:**
```
Creating New Agents: Feature is [function description]. To create a new agent, please refer to the method and specifications in agents/README.md
```

## Best Practices

1. **Single Responsibility**: Each agent should have one clearly defined purpose
2. **Clear Instructions**: Provide detailed step-by-step instructions for complex processes
3. **Consistent Formatting**: Use the same structure and formatting across all agents
4. **Error Handling**: Include guidance for handling common error scenarios
5. **Tool Usage**: Specify only the tools that are necessary for the agent's function