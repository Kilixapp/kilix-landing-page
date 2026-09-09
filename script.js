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

    // 2. إشعار احترافي عند الضغط على زر App Store
    document.querySelectorAll('.btn-apple').forEach(function (appleButton) {
        appleButton.addEventListener('click', function (e) {
            e.preventDefault();

            const existingModal = document.getElementById('ios-coming-soon-modal');
            if (existingModal) existingModal.remove();

            const modal = document.createElement('div');
            modal.id = 'ios-coming-soon-modal';
            modal.innerHTML = `
                <div class="ios-modal-overlay">
                    <div class="ios-modal-card" role="dialog" aria-modal="true" aria-labelledby="ios-modal-title">
                        <div class="ios-modal-icon"><i class="fab fa-apple"></i></div>
                        <h3 id="ios-modal-title">تطبيق iPhone قريبًا</h3>
                        <p>نعمل حاليًا على تجهيز تطبيق Kilix لأجهزة iPhone.</p>
                        <p>سيكون التطبيق متوفرًا قريبًا على متجر App Store. 🚀</p>
                        <button type="button" class="ios-modal-close">حسنًا</button>
                    </div>
                </div>
            `;

            const style = document.createElement('style');
            style.id = 'ios-coming-soon-style';
            style.textContent = `
                .ios-modal-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 99999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    background: rgba(15, 23, 42, 0.62);
                    backdrop-filter: blur(5px);
                    animation: iosModalFadeIn .2s ease;
                }
                .ios-modal-card {
                    width: min(420px, 100%);
                    padding: 30px 24px 24px;
                    text-align: center;
                    direction: rtl;
                    background: #fff;
                    border-radius: 22px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, .22);
                    animation: iosModalScaleIn .25s ease;
                    font-family: Cairo, sans-serif;
                }
                .ios-modal-icon {
                    width: 68px;
                    height: 68px;
                    margin: 0 auto 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: #f1f5f9;
                    color: #111827;
                    font-size: 32px;
                }
                .ios-modal-card h3 {
                    margin: 0 0 12px;
                    font-size: 23px;
                    color: #111827;
                }
                .ios-modal-card p {
                    margin: 7px 0;
                    color: #64748b;
                    line-height: 1.8;
                    font-size: 15px;
                }
                .ios-modal-close {
                    width: 100%;
                    margin-top: 20px;
                    padding: 12px 18px;
                    border: 0;
                    border-radius: 12px;
                    background: #111827;
                    color: #fff;
                    font-family: inherit;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: transform .15s ease, opacity .15s ease;
                }
                .ios-modal-close:hover { opacity: .9; }
                .ios-modal-close:active { transform: scale(.98); }
                @keyframes iosModalFadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes iosModalScaleIn { from { transform: scale(.94); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            `;

            document.head.appendChild(style);
            document.body.appendChild(modal);

            const closeModal = function () {
                modal.remove();
                const modalStyle = document.getElementById('ios-coming-soon-style');
                if (modalStyle) modalStyle.remove();
            };

            modal.querySelector('.ios-modal-close').addEventListener('click', closeModal);
            modal.querySelector('.ios-modal-overlay').addEventListener('click', function (event) {
                if (event.target === this) closeModal();
            });
        });
    });

    // 3. إجبار زر البريد الإلكتروني على فتح تطبيق الهاتف المباشر
    const emailLink = document.getElementById('email-link');
    if (emailLink) {
        emailLink.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'mailto:kilixapp@gmail.com';
        });
    }

    // 4. التوجيه المباشر لتطبيق فيسبوك إن وجد على الهاتف
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

    // 5. التوجيه المباشر لتطبيق إنستغرام إن وجد على الهاتف
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
