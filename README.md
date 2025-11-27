## Deploy to GitHub Pages

1. 将代码推送到 GitHub 仓库的 `main` 分支（或直接在现有仓库启用 Actions）。
2. 在仓库 `Settings -> Secrets and variables -> Actions` 中添加 `GEMINI_API_KEY`（可选，若你需要在线读取该变量）。
3. 在 `Settings -> Pages` 中启用 Pages，并选择 “GitHub Actions” 作为发布来源。
4. 每次 push 到 `main` 会触发 `.github/workflows/deploy.yml`：自动安装依赖、使用 `VITE_BASE_PATH=/<repo_name>/` 构建、再部署到 Pages。
5. 访问地址形如 `https://<username>.github.io/<repo_name>/`。

### 本地验证 Pages 构建

运行 `VITE_BASE_PATH=/<repo_name>/ npm run build`，确认静态资源和 Markdown 文件在子路径下可以正常加载。
