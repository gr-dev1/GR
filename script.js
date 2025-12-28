// كود JavaScript المحسّن
document.addEventListener('DOMContentLoaded', function() {
    // متغيرات التطبيق
    const totalTime = 12;
    let timeLeft = totalTime;
    let timerInterval = null;
    
    // عناصر DOM
    const startScreen = document.getElementById('startScreen');
    const startBtn = document.getElementById('startBtn');
    const loaderContainer = document.getElementById('loaderContainer');
    const timerElement = document.getElementById('timer');
    const audio = document.getElementById('loading-sound');
    const timeDisplay = document.querySelector('.time-left');
    const progressFill = document.querySelector('.progress-fill');
    const body = document.body;
    
    // التحقق من دعم المتصفح
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    // إضافة جسيمات للخلفية
    createParticles();
    
    // وظيفة إنشاء جسيمات متحركة
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // أبعاد عشوائية
            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // موقع عشوائي
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // لون عشوائي من الألوان الرئيسية
            const colors = ['#ffbf48', '#be4a1d', '#ffbf4780', '#bf4a1d80'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            // حركة عشوائية
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            particle.style.animation = `float ${duration}s infinite ${delay}s linear`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // وظيفة بدء التحميل
    function startLoading() {
        // إخفاء شاشة البدء
        startScreen.style.opacity = '0';
        setTimeout(() => {
            startScreen.style.display = 'none';
        }, 500);
        
        // إظهار المحمل والمؤقت
        loaderContainer.style.display = 'block';
        timerElement.style.display = 'block';
        
        // بدء المؤقت
        setTimeout(() => {
            updateTimer();
            timerInterval = setInterval(updateTimer, 1000);
        }, 100);
        
        // تشغيل الصوت مع معالجة الأخطاء
        playAudio();
        
        // إرسال حدث للمراقبة
        console.log('بدء التحميل...');
    }
    
    // وظيفة تشغيل الصوت
    function playAudio() {
        if (audio) {
            audio.currentTime = 0;
            audio.volume = 0.7;
            
            // حل خاص لمتصفحات iOS/Safari
            if (isIOS || isSafari) {
                // على iOS، يجب أن يكون الصوت مطلقًا بواسطة المستخدم
                audio.play().catch(e => {
                    console.log('خطأ في تشغيل الصوت على iOS/Safari:', e);
                    showAudioError();
                });
            } else {
                // على المتصفحات الأخرى
                const playPromise = audio.play();
                
                if (playPromise !== undefined) {
                    playPromise.catch(e => {
                        console.log('خطأ في تشغيل الصوت:', e);
                        showAudioError();
                    });
                }
            }
        } else {
            console.log('عنصر الصوت غير موجود');
        }
    }
    
    // عرض رسالة خطأ الصوت
    function showAudioError() {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 0, 0, 0.9);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-size: 14px;
            text-align: center;
            max-width: 90%;
        `;
        errorDiv.textContent = '⚠️ لم يتمكن من تشغيل الصوت. يرجى التحقق من إعدادات الصوت.';
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    // وظيفة تحديث المؤقت
    function updateTimer() {
        timeLeft--;
        
        // تحديث العرض
        if (timeDisplay) {
            timeDisplay.textContent = timeLeft;
        }
        
        // تحديث شريط التقدم
        if (progressFill) {
            const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;
            progressFill.style.width = progressPercent + '%';
        }
        
        // إذا انتهى الوقت
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            
            // إيقاف الصوت
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
            
            // تأثير إخفاء تدريجي
            body.classList.add('fade-out');
            
            // إضافة رسالة الانتقال
            const transitionMsg = document.createElement('div');
            transitionMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.8);
                color: #ffbf48;
                padding: 20px 40px;
                border-radius: 10px;
                font-size: 1.5rem;
                z-index: 10001;
                text-align: center;
                animation: fadeIn 0.5s;
            `;
            transitionMsg.textContent = '🚀 جاري الانتقال...';
            document.body.appendChild(transitionMsg);
            
            // الانتقال للصفحة التالية
            setTimeout(() => {
                window.location.href = 'next-page.html';
            }, 2000);
        }
    }
    
    // وظيفة إعادة الضبط
    function resetLoader() {
        clearInterval(timerInterval);
        timeLeft = totalTime;
        
        if (timeDisplay) timeDisplay.textContent = timeLeft;
        if (progressFill) progressFill.style.width = '0%';
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }
    
    // إضافة حدث النقر لزر البدء
    startBtn.addEventListener('click', function() {
        // اهتزاز خفيف للزر (إذا كان الجهاز يدعم)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // تغيير نص الزر مؤقتاً
        const originalText = startBtn.innerHTML;
        startBtn.innerHTML = '🎵 جاري البدء...';
        startBtn.disabled = true;
        
        // بدء التحميل بعد تأخير بسيط
        setTimeout(() => {
            startLoading();
        }, 300);
    });
    
    // إضافة تأثير hover للزر
    startBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    startBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // إضافة تأثير الضغط للزر
    startBtn.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(-1px) scale(0.98)';
    });
    
    startBtn.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    // التحكم في الصوت عند تغيير التبويب
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            if (audio && !audio.paused) {
                audio.pause();
            }
        } else {
            if (audio && audio.paused && timeLeft > 0 && timeLeft < totalTime) {
                audio.play().catch(e => console.log('خطأ في استئناف الصوت:', e));
            }
        }
    });
    
    // منع إعادة التحميل بالخطأ
    window.onbeforeunload = function() {
        if (timeLeft > 0 && timeLeft < totalTime) {
            return 'هل أنت متأكد من المغادرة؟ سيتوقف التحميل.';
        }
    };
    
    // إضافة استجابة للمفاتيح
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' || e.code === 'Enter') {
            if (startScreen.style.display !== 'none') {
                startBtn.click();
            }
        }
        
        if (e.code === 'Escape') {
            resetLoader();
        }
    });
    
    // التحقق من دعم الويب الجل
    if ('audioContext' in window || 'webkitAudioContext' in window) {
        console.log('المتصفح يدعم Web Audio API');
    }
    
    // تهيئة حجم الخط للاستجابة
    function adjustFontSize() {
        const width = window.innerWidth;
        const baseSize = 16;
        
        if (width < 480) {
            document.documentElement.style.fontSize = '14px';
        } else if (width < 768) {
            document.documentElement.style.fontSize = '15px';
        } else {
            document.documentElement.style.fontSize = '16px';
        }
    }
    
    // استدعاء ضبط حجم الخط
    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);
    
    // تهيئة الصفحة
    console.log('صفحة التحميل جاهزة!');
});
