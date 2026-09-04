document.addEventListener('DOMContentLoaded', function () {
    // 1. التمرير السلس للروابط الداخلية التي تبدأ بـ #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
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
            // إزالة target="_blank" إن وجدت لعدم فتح تبويب متصفح جديد
            this.removeAttribute('target');
            
            // فتح تطبيق البريد المباشر للنظام
            window.location.href = 'mailto:kilixapp@gmail.com';
        });
    }
});
