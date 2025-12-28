// كود JavaScript المعدل
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
    
    // GSAP أنيميشن للشعار
    gsap.from('.gr-logo', {
        duration: 1.5,
        scale: 0,
        rotation: 360,
        ease: "back.out(1.7)",
        delay: 0.5
    });
    
    gsap.from('.welcome-title', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out",
        delay: 1
    });
    
    gsap.from('.welcome-subtitle', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out",
        delay: 1.2
    });
    
    gsap.from('.definition', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out",
        delay: 1.4
    });
    
    gsap.from('.start-btn', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out",
        delay: 1.6,
        onComplete: function() {
            // جعل الزر يلمع عند اكتمال الأنيميشن
            gsap.to('.start-btn', {
                duration: 2,
                boxShadow: "0 0 30px rgba(157, 78, 221, 0.8)",
                repeat: -1,
                yoyo: true
            });
        }
    });
    
    // أنيميشن للعناصر الطافية
    gsap.to('.floating-icon', {
        duration: 10,
        rotation: 360,
        repeat: -1,
        ease: "none"
    });
    
    // وظيفة بدء التحميل
    function startLoading() {
        // أنيميشن إخفاء شاشة البدء
        gsap.to(startScreen, {
            duration: 0.8,
            opacity: 0,
            scale: 0.9,
            ease: "power2.in",
            onComplete: function() {
                startScreen.style.display = 'none';
                
                // إظهار المحمل والمؤقت بأنيميشن
                loaderContainer.style.display = 'block';
                timerElement.style.display = 'block';
                
                gsap.from([loaderContainer, timerElement], {
                    duration: 0.8,
                    y: 30,
                    opacity: 0,
                    stagger: 0.2,
                    ease: "power3.out",
                    onComplete: function() {
                        // بدء المؤقت
                        setTimeout(() => {
                            updateTimer();
                            timerInterval = setInterval(updateTimer, 1000);
                        }, 100);
                        
                        // تشغيل الصوت
                        playAudio();
                    }
                });
            }
        });
    }
    
    // وظيفة تشغيل الصوت
    function playAudio() {
        if (audio) {
            audio.currentTime = 0;
            audio.volume = 0.5;
            
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.log('سيتم تشغيل الصوت بصمت');
                });
            }
        }
    }
    
    // وظيفة تحديث المؤقت
    function updateTimer() {
        timeLeft--;
        
        // تحديث العرض بأنيميشن
        gsap.to(timeDisplay, {
            duration: 0.3,
            scale: 1.2,
            ease: "power2.out",
            onComplete: function() {
                timeDisplay.textContent = timeLeft;
                gsap.to(timeDisplay, {
                    duration: 0.3,
                    scale: 1,
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
        
        // تأثير اهتزاز عند تغيير الأرقام الكبيرة
        if (timeLeft === 10 || timeLeft === 5 || timeLeft === 3) {
            gsap.to(loaderContainer, {
                duration: 0.1,
                x: -5,
                repeat: 5,
                yoyo: true
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
                duration: 1.5,
                opacity: 0,
                filter: "blur(10px)",
                ease: "power2.in",
                onComplete: function() {
                    // الانتقال للصفحة التالية بدون رسالة
                    window.location.href = 'next-page.html';
                }
            });
        }
    }
    
    // إضافة حدث النقر لزر البدء
    startBtn.addEventListener('click', function() {
        // تأثير اهتزاز
        gsap.to(this, {
            duration: 0.1,
            scale: 0.95,
            repeat: 2,
            yoyo: true,
            ease: "power2.out",
            onComplete: function() {
                startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري البدء...';
                startBtn.disabled = true;
                
                // بدء التحميل بعد تأخير بسيط
                setTimeout(() => {
                    startLoading();
                }, 500);
            }
        });
    });
    
    // تأثيرات hover للزر
    startBtn.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(157, 78, 221, 0.6)",
            ease: "power2.out"
        });
    });
    
    startBtn.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1,
            boxShadow: "0 10px 30px rgba(157, 78, 221, 0.4)",
            ease: "power2.in"
        });
    });
    
    // دعم الضغط بالمسافة أو Enter
    document.addEventListener('keydown', function(e) {
        if ((e.code === 'Space' || e.code === 'Enter') && startScreen.style.display !== 'none') {
            startBtn.click();
        }
    });
    
    // تحسين للشاشات المختلفة
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
        
        // تعديل للشاشات الطويلة
        if (height > 800) {
            loaderContainer.style.bottom = '20vh';
            timerElement.style.bottom = '8vh';
        }
    }
    
    adjustLayout();
    window.addEventListener('resize', adjustLayout);
    
    // تهيئة الصفحة
    console.log('موقع GR جاهز للعمل!');
});
