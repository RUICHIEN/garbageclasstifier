// 簡單測試模型載入
const tmImage = require('@teachablemachine/image');

async function testModel() {
    try {
        console.log('測試模型載入...');
        const model = await tmImage.load('./model.json', './metadata.json');
        console.log('模型載入成功！');
        console.log('模型標籤:', model.getClassLabels());
    } catch (error) {
        console.error('模型載入失敗:', error);
    }
}

testModel();