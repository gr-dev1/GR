document.addEventListener('DOMContentLoaded', function() {
    // متغيرات التوقيت
    const totalTime = 12; // 12 ثانية
    let timeLeft = totalTime;
    const soundDuration = 12; // مدة الصوت
    
    // عناصر DOM
    const audio = document.getElementById('loading-sound');
    const timeDisplay = document.querySelector('.time-left');
    const progressFill = document.querySelector('.progress-fill');
    const body = document.body;
    
    // 1. بدء الصوت فور تحميل الصفحة
    audio.volume = 0.7;
    audio.play().catch(e => console.log('خطأ في تشغيل الصوت:', e));
    
    // 2. بدء المؤقت
    const timerInterval = setInterval(updateTimer, 1000);
    
    function updateTimer() {
        timeLeft--;
        
        // تحديث العرض
        timeDisplay.textContent = timeLeft;
        
        // تحديث شريط التقدم
        const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;
        progressFill.style.width = progressPercent + '%';
        
        // إذا انتهى الوقت
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            
            // إيقاف الصوت
            audio.pause();
            audio.currentTime = 0;
            
            // تأثير إخفاء تدريجي
            body.classList.add('fade-out');
            
            // الانتقال للصفحة التالية بعد 3 ثواني (أثناء الإخفاء)
            setTimeout(() => {
                window.location.href = 'next-page.html';
            }, 3000);
        }
    }
    
    // 3. التحكم في الصوت حسب الوقت
    const soundCheckInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(soundCheckInterval);
        }
    }, 1000);
    
    // 4. التحكم في الصوت عند تغيير التبويب
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            audio.pause();
        } else {
            audio.play().catch(e => console.log('خطأ في استئناف الصوت:', e));
        }
    });
    
    // 5. منع إعادة التحميل بالخطأ
    window.onbeforeunload = null;
    
    // 6. تشغيل المؤقت فوراً
    updateTimer();
});
