document.addEventListener('DOMContentLoaded', function () {
    
    // 1. التمرير السلس للروابط الداخلية التي تبدأ بـ #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. إجبار زر البريد الإلكتروني على فتح تطبيق الهاتف المباشر
    const emailLink = document.getElementById('email-link');
    if (emailLink) {
        emailLink.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'mailto:kilixapp@gmail.com';
        });
    }

    // 3. التوجيه المباشر لتطبيق فيسبوك إن وجد على الهاتف
    const fbLink = document.getElementById('fb-link');
    if (fbLink) {
        fbLink.addEventListener('click', function (e) {
            const fbAppUrl = 'fb://facewebmodal/f?href=https://www.facebook.com/share/17crxYosFU/';
            const webUrl = 'https://www.facebook.com/share/17crxYosFU/';
            
            // محاولة الفتح عبر تطبيق الهاتف للشاشات الصغيرة
            if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                e.preventDefault();
                window.location.href = fbAppUrl;
                // رابط احتياطي في حال عدم فتح التطبيق خلال ثانية
                setTimeout(function () {
                    window.open(webUrl, '_blank');
                }, 1000);
            }
        });
    }

    // 4. التوجيه المباشر لتطبيق إنستغرام إن وجد على الهاتف
    const instaLink = document.getElementById('insta-link');
    if (instaLink) {
        instaLink.addEventListener('click', function (e) {
            const instaAppUrl = 'instagram://user?username=kilixapp';
            const webUrl = 'https://www.instagram.com/kilixapp';

            if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                e.preventDefault();
                window.location.href = instaAppUrl;
                setTimeout(function () {
                    window.open(webUrl, '_blank');
                }, 1000);
            }
        });
    }

});
                                   
