#!/bin/bash

# GitHub Pages 部署腳本
# 用法: ./deploy.sh [倉庫URL]

echo "🚀 垃圾分類辨識器 - GitHub Pages 部署腳本"
echo "=========================================="

# 檢查必要的檔案
required_files=("index.html" "model.json" "metadata.json" "weights.bin")
missing_files=()

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -ne 0 ]; then
    echo "❌ 缺少必要的檔案:"
    printf '   - %s\n' "${missing_files[@]}"
    echo ""
    echo "請確保所有檔案都在當前目錄中。"
    exit 1
fi

echo "✅ 所有必要檔案都存在"

# 檢查是否提供了倉庫 URL
if [ $# -eq 0 ]; then
    echo ""
    echo "請提供你的 GitHub 倉庫 URL"
    echo "用法: $0 <倉庫URL>"
    echo "例如: $0 https://github.com/username/repo-name.git"
    exit 1
fi

repo_url=$1

# 初始化 git 倉庫（如果還沒有的話）
if [ ! -d ".git" ]; then
    echo "📝 初始化 Git 倉庫..."
    git init
    git add .
    git commit -m "Initial commit: 垃圾分類辨識器"
else
    echo "📝 添加檔案到 Git..."
    git add .
fi

# 檢查是否有未提交的變更
if [ -n "$(git status --porcelain)" ]; then
    echo "💾 提交變更..."
    git commit -m "Update: 垃圾分類辨識器"
fi

# 添加遠端倉庫
echo "🔗 連接遠端倉庫..."
git remote remove origin 2>/dev/null || true
git remote add origin "$repo_url"

# 推送檔案
echo "📤 推送檔案到 GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 部署成功！"
    echo ""
    echo "📋 接下來請在 GitHub 上啟用 Pages："
    echo "1. 進入倉庫的 Settings 頁面"
    echo "2. 找到 Pages 區塊"
    echo "3. 將 Source 設定為 'Deploy from a branch'"
    echo "4. 選擇 main 分支和根目錄 (/)"
    echo "5. 儲存設定"
    echo ""
    echo "⏳ 等待幾分鐘後，你的應用將可以在以下地址訪問："
    echo "   https://$(echo $repo_url | sed 's/.*github.com[:/]\([^/]*\)\/\([^.]*\).*/\1.github.io\/\2/')"
else
    echo "❌ 推送失敗，請檢查錯誤訊息"
    exit 1
fi