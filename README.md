# 垃圾分類辨識器

一個使用 TensorFlow.js 和 Teachable Machine 構建的前端圖片辨識應用，用於辨識不同類型的垃圾。

## 🚀 部署到 GitHub Pages

### 自動部署（推薦）：

1. **使用部署腳本**：
   ```bash
   # 給腳本執行權限
   chmod +x deploy.sh
   
   # 運行部署腳本（替換為你的倉庫 URL）
   ./deploy.sh https://github.com/你的用戶名/倉庫名稱.git
   ```

2. **在 GitHub 上啟用 Pages**：
   - 進入倉庫的 Settings 頁面
   - 找到 Pages 區塊
   - 將 Source 設定為 "Deploy from a branch"
   - 選擇 main 分支和根目錄 (/)
   - 儲存設定

### 手動部署：

1. **上傳檔案到 GitHub**：
   - 將 `index.html`、`model.json`、`metadata.json`、`weights.bin` 上傳到你的 GitHub 倉庫
   - 確保所有檔案都在倉庫的根目錄

2. **啟用 GitHub Pages**：
   - 進入倉庫的 Settings 頁面
   - 找到 Pages 區塊
   - 將 Source 設定為 "Deploy from a branch"
   - 選擇 main 分支和根目錄 (/)
   - 儲存設定

3. **訪問應用**：
   - GitHub Pages 會自動部署
   - 訪問 URL：`https://你的用戶名.github.io/倉庫名稱/`

## 功能特點

- 📸 上傳圖片進行辨識
- 📊 顯示所有分類的預測比重
- 📷 開啟鏡頭進行即時辨識
- 🧠 使用機器學習模型進行分類
- 🎨 現代化的用戶界面
- 📱 響應式設計

## 支援的垃圾類型

- 玻璃 (glass)
- 鞋子 (shoes)
- 金屬 (metal)
- 紙張 (paper)
- 塑膠 (plastic)

## 本地開發

如果你想在本地開發：

```bash
# 啟動本地服務器
python3 -m http.server 8000

# 在瀏覽器中訪問
http://localhost:8000
```

## 檔案結構

```
your-repo/
├── index.html          # 主頁面（包含內嵌的 CSS 和 JS）
├── model.json          # 模型配置
├── metadata.json       # 模型元數據
└── weights.bin         # 模型權重
```

## 注意事項

- 所有資源都內嵌在單一的 HTML 文件中，適合 GitHub Pages 部署
- 模型檔案 (model.json, metadata.json, weights.bin) 必須與 index.html 在同一目錄
- 即時辨識功能需要 HTTPS 或 localhost 環境
- 建議使用現代瀏覽器以獲得最佳體驗
- JavaScript (ES6+)
- TensorFlow.js
- Teachable Machine Image Model

## 檔案結構

```
garbageclasstifier/
├── index.html          # 主頁面
├── style.css           # 樣式文件
├── script.js           # JavaScript 邏輯
├── model.json          # 模型配置
├── metadata.json       # 模型元數據
└── weights.bin         # 模型權重
```

## 注意事項

- 確保所有檔案都在同一目錄下
- 模型檔案 (model.json, metadata.json, weights.bin) 是必需的
- 建議使用現代瀏覽器以獲得最佳體驗