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
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.backgroundImage = `url(${container.dataset.src})`;
            container.style.backgroundSize = 'cover';
            container.style.backgroundPosition = 'center';
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
    
   // 修改视频控制功能（自定义控件）部分的代码
const initVideoControls = () => {
    const videos = document.querySelectorAll('video');
    const playPauseBtns = document.querySelectorAll('.play-pause-btn');
    
    // 为每个按钮添加点击事件
    playPauseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            const video = document.getElementById(videoId);
            if (video) {
                togglePlayPause(video, this);
            }
        });
    });
    
    // 为视频本身添加点击播放/暂停
    videos.forEach(video => {
        video.addEventListener('click', function() {
            const btn = document.querySelector(`.play-pause-btn[data-video="${this.id}"]`);
            if (btn) {
                togglePlayPause(this, btn);
            }
        });
        
        // 视频结束时更新按钮状态
        video.addEventListener('ended', function() {
            const btn = document.querySelector(`.play-pause-btn[data-video="${this.id}"]`);
            if (btn) {
                btn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        // 保留右键禁用
        video.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
    });
    
    // 播放/暂停切换函数 - 添加了暂停其他视频的功能
    function togglePlayPause(video, btn) {
        // 如果要播放当前视频，先暂停所有其他视频
        if (video.paused) {
            videos.forEach(v => {
                if (v !== video && !v.paused) {
                    v.pause();
                    const otherBtn = document.querySelector(`.play-pause-btn[data-video="${v.id}"]`);
                    if (otherBtn) {
                        otherBtn.innerHTML = '<i class="fas fa-play"></i>';
                    }
                }
            });
            
            video.play();
            btn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            btn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
};
    
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
    
    // 背景音乐控制
const bgMusic = document.getElementById('backgroundMusic');
const songs = [
    './music/蔡健雅 - 红色高跟鞋.mp3',
    './music/蔡健雅 - Letting Go.mp3',
    './music/陈柏宇 - 你瞒我瞒.mp3'
];
let currentSongIndex = 0;

// 初始化播放第一首歌
function initBackgroundMusic() {
    if (bgMusic) {
        bgMusic.src = songs[0];
        // 尝试自动播放（受浏览器自动播放政策限制）
        playMusic();
    }
}

// 播放音乐的通用函数
function playMusic() {
    if (bgMusic) {
        bgMusic.play().catch(e => {
            console.log('播放失败，等待用户交互:', e);
        });
    }
}

// 播放下一首歌曲
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    bgMusic.src = songs[currentSongIndex];
    // 显示当前播放的歌曲名
    showCurrentSong();
    playMusic();
}

// 显示当前播放的歌曲名
function showCurrentSong() {
    const songName = songs[currentSongIndex].split('/').pop().replace('.mp3', '');
    console.log('当前播放:', songName);
    // 这里可以添加更新UI显示当前歌曲的逻辑
}

// 当一首歌曲结束时播放下一首
if (bgMusic) {
    bgMusic.addEventListener('ended', playNextSong);
}

// 视频播放状态监听（控制背景音乐）
const videos = document.querySelectorAll('video');
videos.forEach(video => {
    // 视频播放时暂停背景音乐
    video.addEventListener('play', function() {
        if (bgMusic && !bgMusic.paused) {
            bgMusic.pause();
        }
    });
    
    // 视频暂停时恢复背景音乐
    video.addEventListener('pause', function() {
        if (bgMusic && bgMusic.paused && !this.ended) {
            playMusic();
        }
    });
    
    // 视频播放结束时恢复背景音乐
    video.addEventListener('ended', function() {
        if (bgMusic && bgMusic.paused) {
            playMusic();
        }
    });
});

// 初始化背景音乐
initBackgroundMusic();

// 为了解决自动播放限制，添加页面交互触发音乐播放的机制
document.addEventListener('click', function playOnInteraction() {
    if (bgMusic && bgMusic.paused) {
        playMusic();
    }
    // 只需要一次交互即可，移除事件监听
    document.removeEventListener('click', playOnInteraction);
});

// 初始化视频控件
initVideoControls();
});