// script.js
document.addEventListener('DOMContentLoaded', function() {
    // 禁止右键菜单
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // 监听可能的截图按键（如PrintScreen）
    document.addEventListener('keydown', function(e) {
        // 禁止PrintScreen键
        if (e.key === 'PrintScreen') {
            e.preventDefault();
            alert('截图功能已被禁用');
            return false;
        }
        
        // 禁止Ctrl+S (保存)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            return false;
        }
        
        // 禁止Ctrl+U (查看源代码)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            return false;
        }
        
        // 禁止F12 (开发者工具)
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }

        // 禁止Ctrl+Shift+I (开发者工具)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }
    });

    // 对图片添加额外保护 - 通过背景图方式显示
    const imgContainers = document.querySelectorAll('.img-container');
    imgContainers.forEach(container => {
        const src = container.dataset.src;
        if (src) {
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.backgroundImage = `url(${src})`;
            container.style.backgroundSize = 'cover';
            container.style.backgroundPosition = 'center';
        }
    });

    // 处理轮播图中的图片
    const carouselItems = document.querySelectorAll('.carousel-item');
    carouselItems.forEach(item => {
        const container = item.querySelector('.img-container');
        if (container && container.dataset.src) {
            console.log('设置轮播图背景:', container.dataset.src); // 添加调试日志
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.backgroundImage = `url(${container.dataset.src})`;
            container.style.backgroundSize = 'cover';
            container.style.backgroundPosition = 'center';
        } else {
            console.log('未找到图片容器或图片路径'); // 添加调试日志
        }
    });

    // 处理家乡背景图
    const locationBg = document.querySelector('.location-bg');
    if (locationBg && locationBg.dataset.src) {
        locationBg.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${locationBg.dataset.src}')`;
        locationBg.style.backgroundSize = 'cover';
        locationBg.style.backgroundPosition = 'center';
    }

    // 轮播图功能
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    let currentIndex = 0;
    const totalItems = items.length;
    
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // 更新指示点
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // 下一个轮播项
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }
    
    // 上一个轮播项
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }
    
    // 点击指示点跳转
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // 添加按钮事件
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // 自动轮播
    setInterval(nextSlide, 5000);
    
    // 照片悬停效果
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // 视频控制功能
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // 只处理视频播放/暂停，不阻止默认控件操作
        video.addEventListener('click', function(e) {
            // 移除 e.preventDefault()，避免阻止控件点击
            if (this.paused) {
                this.play();
            } else {
                this.pause();
            }
        });
    
        // 保留右键禁用
        video.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
    });
    
    // 导航菜单激活状态
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
});