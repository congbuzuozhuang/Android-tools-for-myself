# Android Tools

安卓小工具应用 - 使用 Vite + React + Capacitor 构建

## 项目简介

这是一个面向个人的安卓工具箱应用，集成了日常生活中常用的实用小工具。

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **移动端框架**: Capacitor 7
- **目标平台**: Android (SDK 34)
- **样式方案**: CSS3

## 功能特点

- 跨平台开发，一套代码同时支持 Web 和 Android
- 热更新开发，体验流畅
- 原生 Android 性能
- 轻松打包发布

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9
- Java JDK 21
- Android SDK 34
- Gradle 8.11.1

### 安装依赖

```bash
npm install
```

### 开发

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:5173 查看效果
```

### 构建 APK

```bash
# 一键构建（需要配置好 Android SDK）
npm run android:build
```

### 同步更新

修改代码后，需要同步到 Android 项目：

```bash
# 构建 Web 应用
npm run build

# 同步到 Android
npx cap sync

# 打开 Android Studio
npx cap open android
```

## 项目结构

```
├── src/                          # React 源代码
│   ├── components/               # 组件
│   ├── pages/                    # 页面
│   ├── styles/                   # 样式文件
│   ├── utils/                    # 工具函数
│   ├── App.tsx                   # 主组件
│   └── main.tsx                  # 入口文件
├── android/                      # Android 原生项目
│   └── app/
│       └── src/main/assets/      # Web 资源目录
├── dist/                         # 构建输出
├── node_modules/                 # npm 依赖
└── package.json
```

## 命令说明

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run android:build` | 构建 APK |
| `npx cap sync` | 同步到 Android |
| `npx cap open android` | 在 Android Studio 打开 |

## APK 输出

构建完成后，APK 文件位于：

```
android/app/build/outputs/apk/debug/app-debug.apk
```

## 开发调试

### VSCode 调试配置

项目已配置好 VSCode 调试：

1. 按 `F5` 启动 Chrome 调试
2. 使用 `Launch Chrome` 配置调试 Web
3. 使用 `npm dev` 配置调试 Node 服务

### Android 调试

1. 连接 Android 设备或启动模拟器
2. 运行 `npx cap open android`
3. 在 Android Studio 中调试

## Git 工作流

```bash
# 1. 开发代码
# 2. 构建并同步
npm run build && npx cap sync

# 3. 提交代码
git add .
git commit -m "描述"
git push
```

## 许可证

MIT License

## 作者

**怀仙**

---

如果对你有帮助，欢迎 Star