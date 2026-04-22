# 安卓小工具

作者：怀仙

## 项目概述

这是一个使用 Vite + React + TypeScript + Capacitor 构建的安卓小工具应用。

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **移动端框架**: Capacitor 7
- **目标平台**: Android (SDK 34)

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建 APK
npm run android:build
```

## 开发命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npx cap sync` | 同步到 Android |
| `npx cap open android` | 在 Android Studio 打开 |
| `npm run android:build` | 一键构建 APK |

## 环境要求

- Node.js >= 18
- Java JDK 21
- Android SDK 34

## 目录结构

```
src/              # React 源代码
android/          # Android 原生项目
dist/             # 构建输出
```