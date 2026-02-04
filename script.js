let currentScene = 1;
const totalScenes = 5;
let isMusicPlaying = false;

const scenes = document.querySelectorAll('.scene');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const indicators = document.querySelectorAll('.indicator');
const restartBtn = document.getElementById('restart-btn');
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
const coupletBtn = document.getElementById('couplet-btn');
const foodItems = document.querySelectorAll('.food-item');

function showScene(sceneNumber) {
    scenes.forEach(scene => {
        scene.classList.remove('active');
        scene.style.opacity = '0';
    });
    
    const currentSceneElement = document.getElementById(`scene${sceneNumber}`);
    if (currentSceneElement) {
        currentSceneElement.classList.add('active');
        setTimeout(() => {
            currentSceneElement.style.opacity = '1';
        }, 10);
    }
    
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
        if (parseInt(indicator.dataset.scene) === sceneNumber) {
            indicator.classList.add('active');
        }
    });
    
    prevBtn.disabled = sceneNumber === 1;
    nextBtn.disabled = sceneNumber === totalScenes;
    
    currentScene = sceneNumber;
    
    if (sceneNumber === totalScenes) {
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }, 500);
    }
}

prevBtn.addEventListener('click', () => {
    if (currentScene > 1) {
        showScene(currentScene - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentScene < totalScenes) {
        showScene(currentScene + 1);
    }
});

indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
        const sceneNum = parseInt(indicator.dataset.scene);
        showScene(sceneNum);
    });
});

document.querySelectorAll('.story-image').forEach(img => {
    img.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        this.style.boxShadow = '0 0 30px gold';
        setTimeout(() => {
            this.style.transform = '';
            this.style.boxShadow = '';
        }, 300);
        
        const message = getSceneMessage(currentScene);
        if (message) {
            alert(message);
        }
    });
});

function getSceneMessage(sceneNum) {
    const messages = {
        1: "🐎 小马说：海南的冬天真温暖！",
        2: "🏮 春联内容：海纳百川迎福至，椰风送暖庆春来",
        3: "🍲 海南年夜饭讲究'年年有余'和'团团圆圆'",
        4: "🧧 红包里装的是：学业进步，马到成功！"
    };
    return messages[sceneNum] || "";
}

if (coupletBtn) {
    coupletBtn.addEventListener('click', function() {
        this.textContent = "上联：海阔天空迎福至\n下联：椰风海韵送春来";
        this.style.height = 'auto';
        this.style.whiteSpace = 'pre-line';
        this.style.backgroundColor = '#ffd54f';
        this.style.color = '#c62828';
        this.style.fontWeight = 'bold';
        
        playFirecrackerSound();
    });
}

function playFirecrackerSound() {
    console.log("噼里啪啦！鞭炮声~");
    
    const btn = coupletBtn;
    btn.style.animation = 'shake 0.5s';
    setTimeout(() => {
        btn.style.animation = '';
    }, 500);
}

foodItems.forEach(item => {
    item.addEventListener('click', function() {
        const foodName = this.dataset.food;
        const foodInfo = {
            "文昌鸡": "海南四大名菜之首，肉质滑嫩，皮薄骨酥",
            "海鲜火锅": "海南人过年必备，寓意'红红火火'",
            "椰子饭": "用椰子肉和糯米制成，香甜软糯"
        };
        
        this.title = foodInfo[foodName] || "美味年菜";
        
        this.style.transform = 'scale(1.5)';
        this.style.backgroundColor = 'rgba(255, 193, 7, 0.5)';
        
        setTimeout(() => {
            this.style.transform = '';
            this.style.backgroundColor = '';
        }, 500);
    });
});

if (musicBtn && bgMusic) {
    musicBtn.addEventListener('click', function() {
        if (isMusicPlaying) {
            bgMusic.pause();
            this.textContent = "🎵 播放音乐";
            this.style.backgroundColor = "#2196f3";
        } else {
            bgMusic.play().catch(e => {
                console.log("自动播放被阻止，请手动点击播放");
                this.textContent = "▶️ 点击播放";
                this.style.backgroundColor = "#4caf50";
            });
            this.textContent = "⏸️ 暂停音乐";
            this.style.backgroundColor = "#f44336";
        }
        isMusicPlaying = !isMusicPlaying;
    });
}

if (restartBtn) {
    restartBtn.addEventListener('click', () => {
        showScene(1);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        if (coupletBtn) {
            coupletBtn.textContent = "点击揭开春联";
            coupletBtn.style = "";
        }
    });
}

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowLeft':
            if (currentScene > 1) showScene(currentScene - 1);
            break;
        case 'ArrowRight':
        case ' ':
            if (currentScene < totalScenes) showScene(currentScene + 1);
            break;
        case 'Home':
            showScene(1);
            break;
        case 'End':
            showScene(totalScenes);
            break;
    }
});

window.addEventListener('DOMContentLoaded', () => {
    showScene(1);
    
    document.querySelector('.title').style.animation = 'glow 2s infinite alternate';
});

const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);