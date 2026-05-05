# 垃圾分類辨識器

一個使用 TensorFlow.js 和 Teachable Machine 構建的前端圖片辨識應用，用於辨識不同類型的垃圾。

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

## 如何使用

1. 啟動本地服務器：
   ```bash
   cd /workspaces/garbageclasstifier
   python3 -m http.server 8000
   ```

2. 在瀏覽器中打開 `http://localhost:8000`

3. **圖片辨識**：
   - 點擊「選擇圖片」按鈕上傳圖片
   - 點擊「辨識」按鈕查看所有分類的預測比重

4. **即時辨識**：
   - 點擊「開啟鏡頭」按鈕
   - 允許瀏覽器訪問相機
   - 將鏡頭對準物品即可看到實時辨識結果

## 注意事項

- 即時辨識功能需要相機權限
- 建議使用現代瀏覽器以獲得最佳體驗
- 在手機上使用時，會優先使用後置鏡頭

## 技術棧

- HTML5
- CSS3
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