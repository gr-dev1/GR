// كود JavaScript مبسط وفعال
document.addEventListener('DOMContentLoaded', function() {
    // العناصر الرئيسية
    const welcomeScreen = document.getElementById('welcomeScreen');
    const loadingScreen = document.getElementById('loadingScreen');
    const startButton = document.getElementById('startButton');
    const progressFill = document.getElementById('progressFill');
    const timeCount = document.getElementById('timeCount');
    const audio = document.getElementById('loadingAudio');
    
    // المتغيرات
    let timeLeft = 12;
    let timerInterval = null;
    
    // أنيميشن بسيطة للصفحة
    gsap.from('.main-logo', {
        duration: 1,
        scale: 0,
        rotation: 360,
        ease: "back.out(1.7)"
    });
    
    gsap.from('.main-title', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        delay: 0.3,
        ease: "power3.out"
    });
    
    gsap.from('.tagline-box', {
        duration: 0.8,
        y: 20,
        opacity: 0,
        delay: 0.5,
        ease: "power3.out"
    });
    
    gsap.from('.start-btn', {
        duration: 0.8,
        y: 20,
        opacity: 0,
        delay: 0.7,
        ease: "power3.out",
        onComplete: function() {
            // جعل الزر واضحاً
            startButton.style.opacity = "1";
            startButton.style.visibility = "visible";
        }
    });
    
    // وظيفة بدء التحميل
    function startLoading() {
        // إخفاء شاشة الترحيب
        gsap.to(welcomeScreen, {
            duration: 0.6,
            opacity: 0,
            scale: 0.95,
            ease: "power2.in",
            onComplete: function() {
                welcomeScreen.style.display = 'none';
                
                // إظهار شاشة التحميل
                loadingScreen.style.display = 'flex';
                
                gsap.from(loadingScreen, {
                    duration: 0.6,
                    opacity: 0,
                    scale: 0.95,
                    ease: "power3.out",
                    onComplete: function() {
                        // بدء المؤقت
                        startTimer();
                        
                        // تشغيل الصوت
                        if (audio) {
                            audio.currentTime = 0;
                            audio.volume = 0.5;
                            audio.play().catch(e => console.log('سيتم تشغيل الصوت بصمت'));
                        }
                    }
                });
            }
        });
    }
    
    // وظيفة بدء المؤقت
    function startTimer() {
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    }
    
    // تحديث المؤقت
    function updateTimer() {
        timeLeft--;
        
        // تحديث العد التنازلي
        timeCount.textContent = timeLeft;
        
        // أنيميشن للرقم
        gsap.to(timeCount, {
            duration: 0.2,
            scale: 1.2,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
        });
        
        // تحديث شريط التقدم
        const progressPercent = ((12 - timeLeft) / 12) * 100;
        gsap.to(progressFill, {
            duration: 0.8,
            width: progressPercent + '%',
            ease: "power1.out"
        });
        
        // إذا انتهى الوقت
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            
            // إيقاف الصوت
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
            
            // الانتقال للصفحة التالية
            setTimeout(function() {
                window.location.href = 'next-page.html';
            }, 500);
        }
    }
    
    // حدث النقر على الزر
    startButton.addEventListener('click', startLoading);
    
    // تأثير hover للزر
    startButton.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.2,
            scale: 1.05,
            ease: "power2.out"
        });
    });
    
    startButton.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.2,
            scale: 1,
            ease: "power2.in"
        });
    });
    
    // دعم الضغط بالمسافة أو Enter
    document.addEventListener('keydown', function(e) {
        if ((e.code === 'Space' || e.code === 'Enter') && welcomeScreen.style.display !== 'none') {
            startButton.click();
        }
    });
    
    // ضبط الأبعاد عند تغيير حجم الشاشة
    function adjustLayout() {
        const width = window.innerWidth;
        
        if (width < 480) {
            document.documentElement.style.fontSize = '14px';
        } else if (width < 768) {
            document.documentElement.style.fontSize = '15px';
        } else {
            document.documentElement.style.fontSize = '16px';
        }
    }
    
    adjustLayout();
    window.addEventListener('resize', adjustLayout);
    
    // تهيئة الصفحة
    console.log('موقع GR يعمل بشكل صحيح!');
});
