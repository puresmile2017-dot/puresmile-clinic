//  if (true) return; // إيقاف مؤقت للنافذة


document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // الإعدادات
    // ==========================================
    const CLINIC_WHATSAPP = "966550133938"; // رقم واتساب العيادة
    const SHOW_DELAY = 3000; // الظهور بعد 3 ثوانٍ
    const CLOSE_DURATION = 15 * 60 * 1000; // 15 دقيقة بالميلي ثانية

    const STORAGE_CLOSED = "puresmile_popup_closed"; // مفتاح وقت الإغلاق في sessionStorage

    // ==========================================
    // التحقق من نوع التنقل (تحديث أم انتقال)
    // ==========================================
    let isReload = false;
    try {
        const navEntry = performance.getEntriesByType("navigation")[0];
        if (navEntry && navEntry.type === "reload") {
            isReload = true;
        }
    } catch (e) {
        // في حال عدم الدعم نعتبره انتقالاً عادياً
    }

    // ==========================================
    // منطق منع الظهور
    // ==========================================
    if (!isReload) {
        const closedAt = sessionStorage.getItem(STORAGE_CLOSED);
        if (closedAt) {
            const elapsed = Date.now() - parseInt(closedAt, 10);
            if (elapsed < CLOSE_DURATION) {
                return;
            }
        }
    } else {
        sessionStorage.removeItem(STORAGE_CLOSED);
    }

    // ==========================================
    // إنشاء النافذة
    // ==========================================
    const popup = document.createElement("div");
    popup.className = "puresmile-overlay";

    popup.innerHTML = `
        <div class="puresmile-popup">
            <button class="puresmile-close" aria-label="إغلاق">&times;</button>
            <div class="puresmile-popup-content">
                <div class="puresmile-popup-image">
                    <img src="img/popup-promo.jpg" alt="عرض أنقى ابتسامة">
                </div>
                <div class="puresmile-popup-info">
                    <form id="puresmilePopupForm">
                        <input type="tel" id="puresmilePhone" placeholder="أدخل رقم الجوال" inputmode="numeric" required>
                        <button type="submit">احجز للاستشارة</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    // ==========================================
    // إظهار النافذة بعد 3 ثوانٍ
    // ==========================================
    setTimeout(function () {
        popup.classList.add("show");
        document.body.classList.add("puresmile-popup-open");
    }, SHOW_DELAY);

    // ==========================================
    // دالة الإغلاق مع حفظ وقت الإغلاق
    // ==========================================
    function closePopup() {
        popup.classList.remove("show");
        document.body.classList.remove("puresmile-popup-open");
        sessionStorage.setItem(STORAGE_CLOSED, Date.now().toString());
    }

    // ==========================================
    // إغلاق النافذة بزر X
    // ==========================================
    const closeButton = popup.querySelector(".puresmile-close");
    closeButton.addEventListener("click", closePopup);

    // إغلاق عند الضغط خارج النافذة
    popup.addEventListener("click", function (event) {
        if (event.target === popup) {
            closePopup();
        }
    });

    // ==========================================
    // إرسال النموذج → واتساب + إغلاق مؤقت
    // ==========================================
    const form = document.getElementById("puresmilePopupForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const phoneInput = document.getElementById("puresmilePhone");
        const phone = phoneInput.value.trim();

        const phonePattern = /^05\d{8}$/;
        if (!phonePattern.test(phone)) {
            alert("يرجى إدخال رقم جوال صحيح يبدأ بـ 05 ويتكون من 10 أرقام");
            phoneInput.focus();
            return;
        }

        const message = "مرحباً، أنا مهتم بحجز استشارة لديكم . رقم جوالي: " + phone;
        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodedMessage}`;

        window.open(whatsappLink, "_blank");

        closePopup();
    });

});