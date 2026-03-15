// 主 JavaScript 文件

// 视频滚动播放控制（Intersection Observer）
function initVideoScrollPlay() {
    // 选择所有带 data-lazy-play 的视频（包括产品视频和案例视频）
    const videos = document.querySelectorAll('video[data-lazy-play]');
    
    if (videos.length === 0) return;
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            
            if (entry.isIntersecting) {
                // 视频进入视口 - 播放
                video.play().catch(e => {
                    console.log('视频自动播放被阻止，需要用户交互:', e);
                    // 显示播放按钮提示用户点击
                    video.controls = true;
                });
            } else {
                // 视频离开视口 - 暂停
                video.pause();
                // 可选：重置到开头
                // video.currentTime = 0;
            }
        });
    }, {
        threshold: 0.5, // 视频 50% 可见时触发
        rootMargin: '0px'
    });
    
    videos.forEach(video => {
        videoObserver.observe(video);
        
        // 点击视频时切换播放/暂停
        video.addEventListener('click', function() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
        
        // 鼠标悬停时显示控制条
        video.addEventListener('mouseenter', () => {
            video.controls = true;
        });
        video.addEventListener('mouseleave', () => {
            video.controls = false;
        });
    });
}

// 联系表单处理
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // 这里可以添加实际的提交逻辑
            // 目前只是模拟成功
            console.log('表单提交:', data);
            
            // 隐藏表单，显示成功消息
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
        });
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // 初始化视频滚动播放
    initVideoScrollPlay();
});
