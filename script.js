// كود JavaScript النهائي
document.addEventListener('DOMContentLoaded', function() {
    // متغيرات التطبيق
    const totalTime = 12;
    let timeLeft = totalTime;
    let timerInterval = null;
    
    // عناصر DOM
    const welcomeScreen = document.getElementById('welcomeScreen');
    const startButton = document.getElementById('startButton');
    const loadingScreen = document.getElementById('loadingScreen');
    const audio = document.getElementById('loadingAudio');
    const timeCount = document.getElementById('timeCount');
    const progressFill = document.getElementById('progressFill');
    const body = document.body;
    
    // تهيئة النجوم
    createStars();
    
    // وظيفة إنشاء النجوم
    function createStars() {
        const starField = document.querySelector('.star-field');
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // حجم عشوائي
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // موقع عشوائي
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            // توهج عشوائي
            star.style.background = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`;
            star.style.borderRadius = '50%';
            star.style.position = 'absolute';
            
            // أنيميشن عشوائية
            const duration = Math.random() * 5 + 3;
            const delay = Math.random() * 5;
            star.style.animation = `starsTwinkle ${duration}s ${delay}s infinite alternate`;
            
            starField.appendChild(star);
        }
    }
    
    // أنيميشن GSAP للشاشة الترحيبية
    gsap.from('.main-logo', {
        duration: 1.5,
        scale: 0,
        rotation: 360,
        ease: "elastic.out(1, 0.5)",
        delay: 0.5
    });
    
    gsap.from('.main-title', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out",
        delay: 1
    });
    
    gsap.from('.description-section', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out",
        delay: 1.3
    });
    
    gsap.from('.start-button', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out",
        delay: 1.6,
        onComplete: function() {
            // جعل الزر يلمس
            gsap.to('.button-glow', {
                duration: 2,
                opacity: 0.7,
                repeat: -1,
                yoyo: true
            });
        }
    });
    
    gsap.from('.decor-circle, .decor-line', {
        duration: 1.5,
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.8
    });
    
    // أنيميشن للزوايا
    gsap.from('.corner-element', {
        duration: 1,
        rotation: 90,
        opacity: 0,
        stagger: 0.3,
        ease: "power2.out",
        delay: 1.2
    });
    
    // وظيفة بدء التحميل
    function startLoading() {
        // تأثير اهتزاز للزر
        gsap.to(startButton, {
            duration: 0.1,
            scale: 0.95,
            repeat: 3,
            yoyo: true,
            ease: "power2.out",
            onComplete: function() {
                startButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>جاري البدء...</span>';
                startButton.disabled = true;
                
                // أنيميشن إخفاء شاشة الترحيب
                gsap.to(welcomeScreen, {
                    duration: 0.8,
                    opacity: 0,
                    scale: 0.9,
                    ease: "power2.in",
                    onComplete: function() {
                        welcomeScreen.style.display = 'none';
                        
                        // إظهار شاشة التحميل
                        loadingScreen.style.display = 'flex';
                        
                        // أنيميشن ظهور شاشة التحميل
                        gsap.from(loadingScreen, {
                            duration: 0.8,
                            opacity: 0,
                            scale: 0.95,
                            ease: "power3.out",
                            onComplete: function() {
                                // بدء المؤقت بعد ظهور الشاشة
                                setTimeout(() => {
                                    startTimer();
                                }, 300);
                                
                                // تشغيل الصوت
                                playAudio();
                            }
                        });
                    }
                });
            }
        });
    }
    
    // وظيفة تشغيل الصوت
    function playAudio() {
        if (audio) {
            audio.currentTime = 0;
            audio.volume = 0.4;
            
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.log('سيتم تشغيل الصوت بصمت');
                });
            }
        }
    }
    
    // وظيفة بدء المؤقت
    function startTimer() {
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    }
    
    // وظيفة تحديث المؤقت
    function updateTimer() {
        timeLeft--;
        
        // تحديث العد التنازلي مع أنيميشن
        gsap.to(timeCount, {
            duration: 0.3,
            scale: 1.3,
            color: '#ff6bff',
            ease: "power2.out",
            onComplete: function() {
                timeCount.textContent = timeLeft;
                gsap.to(timeCount, {
                    duration: 0.3,
                    scale: 1,
                    color: '#c77dff',
                    ease: "power2.in"
                });
            }
        });
        
        // تحديث شريط التقدم
        const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;
        gsap.to(progressFill, {
            duration: 0.8,
            width: progressPercent + '%',
            ease: "power1.out"
        });
        
        // تأثيرات خاصة عند نقاط زمنية محددة
        if (timeLeft === 8 || timeLeft === 4) {
            gsap.to('.loader-circle', {
                duration: 0.2,
                scale: 1.1,
                repeat: 3,
                yoyo: true,
                ease: "power2.out"
            });
        }
        
        // إذا انتهى الوقت
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            
            // إيقاف الصوت
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
            
            // تأثير إخفاء الصفحة
            gsap.to(body, {
                duration: 1,
                opacity: 0,
                scale: 1.05,
                filter: "blur(15px)",
                ease: "power2.in",
                onComplete: function() {
                    // الانتقال للصفحة التالية بدون أي رسائل
                    window.location.href = 'next-page.html';
                }
            });
        }
    }
    
    // إضافة حدث النقر لزر البدء
    startButton.addEventListener('click', startLoading);
    
    // تأثيرات hover للزر
    startButton.addEventListener('mouseenter', function() {
        gsap.to('.button-content', {
            duration: 0.3,
            scale: 1.05,
            boxShadow: "0 25px 60px rgba(157, 78, 221, 0.4)",
            ease: "power2.out"
        });
    });
    
    startButton.addEventListener('mouseleave', function() {
        gsap.to('.button-content', {
            duration: 0.3,
            scale: 1,
            boxShadow: "none",
            ease: "power2.in"
        });
    });
    
    // دعم الضغط بالمسافة أو Enter
    document.addEventListener('keydown', function(e) {
        if ((e.code === 'Space' || e.code === 'Enter') && welcomeScreen.style.display !== 'none') {
            startButton.click();
        }
    });
    
    // التحكم في الصوت عند تغيير التبويب
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            if (audio && !audio.paused) {
                audio.pause();
            }
        } else {
            if (audio && audio.paused && timeLeft > 0 && timeLeft < totalTime) {
                audio.play().catch(e => console.log('إعادة تشغيل الصوت'));
            }
        }
    });
    
    // ضبط التصميم للشاشات المختلفة
    function adjustLayout() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        if (width < 480) {
            document.documentElement.style.fontSize = '14px';
        } else if (width < 768) {
            document.documentElement.style.fontSize = '15px';
        } else {
            document.documentElement.style.fontSize = '16px';
        }
        
        // تعديل للحواف
        if (height > 800) {
            document.querySelector('.welcome-content').style.padding = '4rem 3rem';
        }
    }
    
    adjustLayout();
    window.addEventListener('resize', adjustLayout);
    
    // تهيئة الصفحة
    console.log('موقع GR جاهز للعمل! 🎮');
});
