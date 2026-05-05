// 載入模型
let model;

async function loadModel() {
    const loading = document.getElementById('loading');
    loading.style.display = 'flex';
    
    try {
        model = await tmImage.load('./model.json', './metadata.json');
        console.log('模型載入成功');
    } catch (error) {
        console.error('模型載入失敗:', error);
        alert('模型載入失敗，請檢查檔案是否存在');
    } finally {
        loading.style.display = 'none';
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    loadModel();
    
    const imageInput = document.getElementById('imageInput');
    const previewImage = document.getElementById('previewImage');
    const predictBtn = document.getElementById('predictBtn');
    const resultDiv = document.getElementById('result');
    
    // 圖片上傳處理
    imageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                predictBtn.disabled = false;
                resultDiv.textContent = '';
            };
            reader.readAsDataURL(file);
        }
    });
    
    // 預測按鈕
    predictBtn.addEventListener('click', async function() {
        if (!model) {
            alert('模型尚未載入完成');
            return;
        }
        
        if (!previewImage.src) {
            alert('請先選擇圖片');
            return;
        }
        
        predictBtn.disabled = true;
        predictBtn.textContent = '辨識中...';
        
        try {
            // 進行預測
            const predictions = await model.predict(previewImage);
            
            // 顯示所有分類的結果
            displayPredictions(predictions);
            
        } catch (error) {
            console.error('預測失敗:', error);
            resultDiv.innerHTML = '<p style="color: red;">辨識失敗，請重試</p>';
        } finally {
            predictBtn.disabled = false;
            predictBtn.textContent = '辨識';
        }
    });
});

// 顯示預測結果
function displayPredictions(predictions) {
    const resultDiv = document.getElementById('result');
    
    // 按機率排序
    predictions.sort((a, b) => b.probability - a.probability);
    
    let html = '<h3>辨識結果：</h3><div class="predictions">';
    predictions.forEach(prediction => {
        const probability = (prediction.probability * 100).toFixed(2);
        const percentage = prediction.probability * 100;
        html += `
            <div class="prediction-item">
                <span class="class-name">${prediction.className}</span>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <span class="probability">${probability}%</span>
            </div>
        `;
    });
    html += '</div>';
    
    resultDiv.innerHTML = html;
}

// 鏡頭功能變數
let videoStream = null;
let isCameraActive = false;

// 鏡頭按鈕事件
document.getElementById('cameraBtn').addEventListener('click', toggleCamera);

// 切換鏡頭
async function toggleCamera() {
    const cameraBtn = document.getElementById('cameraBtn');
    const videoElement = document.getElementById('cameraVideo');
    const cameraSection = document.querySelector('.camera-section');
    
    if (isCameraActive) {
        // 關閉鏡頭
        stopCamera();
        cameraBtn.textContent = '開啟鏡頭';
        cameraSection.style.display = 'none';
    } else {
        // 開啟鏡頭
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: 640, 
                    height: 480,
                    facingMode: 'environment' // 使用後置鏡頭
                } 
            });
            
            videoElement.srcObject = stream;
            videoStream = stream;
            isCameraActive = true;
            cameraBtn.textContent = '關閉鏡頭';
            cameraSection.style.display = 'block';
            
            // 開始實時辨識
            startRealTimePrediction();
            
        } catch (error) {
            console.error('無法訪問鏡頭:', error);
            alert('無法訪問鏡頭，請確保已授權相機權限');
        }
    }
}

// 停止鏡頭
function stopCamera() {
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
        videoStream = null;
    }
    isCameraActive = false;
    
    // 停止實時辨識
    if (realTimeInterval) {
        clearInterval(realTimeInterval);
        realTimeInterval = null;
    }
}

// 實時辨識
let realTimeInterval = null;

function startRealTimePrediction() {
    if (!model) return;
    
    const videoElement = document.getElementById('cameraVideo');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 224; // 模型期望的輸入大小
    canvas.height = 224;
    
    realTimeInterval = setInterval(async () => {
        if (!isCameraActive || !model) return;
        
        try {
            // 從視頻捕獲圖像
            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            
            // 進行預測
            const predictions = await model.predict(canvas);
            
            // 顯示結果
            displayPredictions(predictions);
            
        } catch (error) {
            console.error('實時辨識失敗:', error);
        }
    }, 1000); // 每秒更新一次
}

// 頁面卸載時清理資源
window.addEventListener('beforeunload', () => {
    stopCamera();
});