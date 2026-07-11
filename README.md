# Cozanet OS: Database and Storage Agents

[![CozanetOS Core](https://img.shields.io/badge/OS-AI--native-blueviolet.svg)](#)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](#)

The multi-paradigm database engine of CozanetOS, powering structured, semantic, and relational persistence for memory, workflows, session states, and user configurations.

---

## 🌌 Overview

The `cozanet-database` repository coordinates high-performance relational storage alongside advanced vector indexing. By wrapping database adapters into distinct agent responsibilities, it guarantees that AI agents can query context, history, and schemas fluidly.

Developed specifically for **CozanetOS**—the world's first AI-native operating system—this module runs as an autonomous microservice, continuously communicating with neighboring engines to deliver frictionless operational efficiency.

---

## ✨ Core Capabilities

- **User management**: user profiles, preferences, settings
- **Memory storage**: persists all memory layer data
- **Knowledge storage**: structured knowledge base
- **Project storage**: project state, files, history
- **Workflow storage**: workflow definitions and run history
- **Task storage**: task queue and completion records
- **Analytics**: usage stats, performance data, insights
- **Audit logs**: immutable record of all system actions
- **Semantic search**: vector similarity search across all data
- **Configuration management**: system and engine configs
- **Multi-database support**: PostgreSQL, SQLite, Qdrant, Redis
- **Schema management**: automatic migrations
- **Backup and restore**: scheduled and on-demand
- Data encryption at rest

---

## 🛠️ System Architecture

This engine operates as a decoupled service under the orchestration of CozanetOS. It leverages message queues and secure IPC channels to coordinate operations with low-latency responsiveness.

```
       ┌────────────────────────────────────────────────────────┐
       │                 CozanetOS Core Engine                  │
       └──────────────────────────┬─────────────────────────────┘
                                  │ (Secure IPC / Events)
                                  ▼
       ┌────────────────────────────────────────────────────────┐
       │             COZANET-DATABASE (This Module)          │
       └──────────────────────────┬─────────────────────────────┘
                                  │
         ┌────────────────────────┴────────────────────────┐
         ▼                                                 ▼
   Capabilities Layer                             State Persistence
   (Core Logic & Routines)                        (Cache / Local DB)
```

---

## 🔗 Integration Ecosystem

`cozanet-database` is deeply integrated with:

- `cozanet-memory` (to persist vector embeds, short-term buffers, and long-term associations)
- `cozanet-security` (for enterprise-grade row-level security and transparent data encryption)
- `cozanet-monitoring` (for database query performance monitoring, slow-log diagnostics, and alerts)
- All engines (serving as the shared state and configuration backbone)

---

## 🚀 Quick-Start Guide

Get up and running with the development environment in just a few steps.

### Prerequisites

- Node.js (v18 or higher)
- Rust Toolchain (if compiling native bindings)
- Docker (optional, for localized testing)

### Installation

Clone and install dependencies within the monorepo context or as a standalone module:

```bash
git clone https://github.com/CozanetOS/cozanet-database.git
cd cozanet-database
npm install
```

### Running Development Server

To boot the module with hot-reloading and development-level logging:

```bash
npm run dev
```

### Running Tests

Execute the unit and integration suite to verify performance standards:

```bash
npm test
```

---

## 📄 License

This repository is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
