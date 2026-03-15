// ROI 计算器

function calculateROI() {
    // 获取输入值
    const machineCount = parseInt(document.getElementById('machine-count').value) || 0;
    const materialUsage = parseInt(document.getElementById('material-usage').value) || 0;
    const yieldRate = parseInt(document.getElementById('yield-rate').value) || 0;
    const materialPrice = parseInt(document.getElementById('material-price').value) || 0;
    
    // 验证输入
    if (machineCount <= 0 || materialUsage <= 0 || yieldRate <= 0 || materialPrice <= 0) {
        alert('请输入有效的数值');
        return;
    }
    
    // 计算逻辑（基于实际客户案例数据）
    // 平均浪费减少比例：27%
    // 平均良品率提升：1-2%
    
    // 估算每月浪费金额（假设原料用量的 15-25% 是浪费）
    const wasteRate = 0.20; // 20% 浪费率假设
    const currentWaste = materialUsage * wasteRate * materialPrice;
    const wasteReduction = currentWaste * 0.27; // 27% 浪费减少
    
    // 良品率提升带来的收益
    const yieldImprovement = Math.max(1, Math.min(3, (100 - yieldRate) * 0.5)); // 1-3% 提升
    const yieldBenefit = materialUsage * (yieldImprovement / 100) * materialPrice;
    
    // 总节省
    const totalSavings = wasteReduction + yieldBenefit;
    
    // 估算投资成本（基于机器数量）
    // 假设每台机器改造成本约 3000-5000 元
    const investmentCost = machineCount * 4000;
    
    // 投资回收期（月）
    const paybackMonths = investmentCost / totalSavings;
    
    // 显示结果
    document.getElementById('waste-reduction').textContent = '¥' + Math.round(wasteReduction).toLocaleString();
    document.getElementById('yield-improvement').textContent = yieldImprovement.toFixed(1) + '%';
    document.getElementById('payback-period').textContent = Math.round(paybackMonths) + '个月';
    
    // 显示结果区域
    document.getElementById('roi-result').style.display = 'block';
    
    // 滚动到结果区域
    document.getElementById('roi-result').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// 页面加载时检查是否有 ROI 计算器
document.addEventListener('DOMContentLoaded', function() {
    const calculator = document.getElementById('roi-calculator');
    if (calculator) {
        console.log('ROI 计算器已加载');
    }
});
