// كود إرجاع الصفحة للأعلى عند التحديث
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// التمرير الناعم
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// تغيير شفافية الهيدر عند النزول
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 38, 71, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = '#0a2647';
        header.style.boxShadow = 'none';
    }
});

// نظام التقييمات التفاعلي
const reviews = [
    {name: "أحمد الحازمي", text: "أفضل عيادة في صبيا بلا منازع، الدكتور عصام شغله جبار وما تحس بأي ألم."},
    {name: "سارة العتبي", text: "سويت تقويم عند الدكتورة روان والنتيجة خيالية، تعامل راقي جداً."},
    {name: "يحيى ناشب", text: "نظافة العيادة والتعقيم يفتح النفس، والاستقبال جداً محترمين."},
    {name: "فاطمة دوش", text: "الدكتورة زرعة في علاج العصب فنانة، كنت خايفة بس طمنتني والشغل نظيف."},
    {name: "محمد الشميري", text: "جيت من جيزان مخصوص عشان الدكتور عصام، فعلاً خبرة تستحق العنوة."},
    {name: "نورة خواجي", text: "الأسعار ممتازة مقارنة بالجودة، عيادتي المفضلة دائماً."},
    {name: "عبدالله صميلي", text: "سرعة في المواعيد ودقة في الشغل، شكراً لكل الطاقم."},
    {name: "أمل العبسي", text: "تجربتي مع زراعة الأسنان كانت ناجحة جداً، الحمدلله اخترت المكان الصح."},
    {name: "خالد مريع", text: "أنصح الكل فيها، تعامل الدكتور وتوضيحه لكل خطوة يريح المراجع."},
    {name: "ليلى سادلي", text: "التقويم الشفاف عندهم سعره بطل والنتيجة بدأت تظهر من أول شهور."},
    {name: "إبراهيم عسيري", text: "ما شاء الله تبارك الله، عيادة تبيض الوجه وشغلهم ذمة وضمير."},
    {name: "مريم جرب", text: "الدكتورة اثير تعاملها عسل وشغلها في التنظيف والتبييض ممتاز."},
    {name: "حسن هادي", text: "من أفضل المراكز الطبية اللي زرتها في المنطقة، تنظيم وإبداع."},
    {name: "عائشة حكمي", text: "كنت أعاني من فوبيا الأسنان، بس مع طاقم أنقى ابتسامة اختفى الخوف."},
    {name: "سلطان عطيف", text: "ما قصر الدكتور عصام، خلع جراحي بدون ألم وبسرعة قياسية."},
    {name: "هيا الذروي", text: "عيادة مرتبة، والتمريض عندهم شاطرين ومنتبهين لكل صغيرة وكبيرة."},
    {name: "فهد النعمي", text: "ابتسامة هوليوود سويتها عندهم وكل من شافني سألني عن العيادة."},
    {name: "ريم عريبي", text: "الدكتورة المها مبدعة في الحشوات التجميلية، ما تفرقها عن السن الطبيعي."},
    {name: "منصور نمازي", text: "تعامل راقي من الاستقبال حتى الدكتور، الله يوفقكم."},
    {name: "خلود بصلي", text: "العيادة دايم زحمة وهذا دليل على شطارتهم، بس مواعيدهم دقيقة."},
    {name: "علي طمحي", text: "تم علاج العصب في جلسة واحدة وبدون مضاعفات، شكراً دكتورة زرعة."},
    {name: "جواهر دغريري", text: "مكان يفتح النفس وأسعارهم بمتناول الجميع والنتائج مبهرة."},
    {name: "باسم السبعي", text: "أفضل دكاترة تقويم في المنطقة، روان ورشيكا قمة في الأخلاق."},
    {name: "منى واصلي", text: "شكراً دكتورة امل على سعة صدرك وشغلك المتقن."},
    {name: "تركي مشيخي", text: "أول مرة أروح لعيادة أسنان وأطلع وأنا راضي تماماً عن الخدمة."},
    {name: "صالحة معيدي", text: "خدمة 5 نجوم ونظافة لا تضاهى، الله يبارك لكم."},
    {name: "نايف زائري", text: "الزراعة عند الدكتور عصام ناجحة 100٪، أنصح به وبقوة."},
    {name: "هيفاء حداد", text: "تجربة رائعة وفريق طبي متكامل ومحترف."},
    {name: "سعد غروي", text: "تم تغيير جسر الأسنان القديم والنتيجة طبيعية جداً ومريحة."},
    {name: "ليان قادري", text: "ما شاء الله، العيادة صارت معلم من معالم صبيا في طب الأسنان."}
];

const container = document.getElementById('reviewsContainer');
if (container) {
    reviews.forEach(r => {
        container.innerHTML += `
            <div class="review-card">
                <div class="stars">★★★★★</div>
                <p class="review-text">"${r.text}"</p>
                <span class="reviewer-name">- ${r.name}</span>
            </div>
        `;
    });
}

// تأثير الظهور التدريجي (Fade In)
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.s-card, .dr-card, .hero-content').forEach(el => {
    el.classList.add('reveal-effect');
    observer.observe(el);
});

const style = document.createElement('style');
style.textContent = `
    .reveal-effect {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
// تفعيل تأثيرات اللمس للأجهزة المحمولة
document.querySelectorAll('.s-card, .dr-card').forEach(element => {
    element.addEventListener('touchstart', function() {
        this.classList.add('touched');
    }, {passive: true});

    element.addEventListener('touchend', function() {
        // إضافة تأخير بسيط لإظهار التأثير قبل العودة
        setTimeout(() => {
            this.classList.remove('touched');
        }, 300);
    });
});
// تفعيل تأثير التفاعل باللمس لكروت التقييمات
document.querySelectorAll('.review-card').forEach(card => {
    card.addEventListener('touchstart', function() {
        this.classList.add('touched-review');
    }, {passive: true});

    card.addEventListener('touchend', function() {
        setTimeout(() => {
            this.classList.remove('touched-review');
        }, 300);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".stat-number");
    const duration = 2000; // 2 ثانية

    const startCount = (entry, observer) => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute("data-target");
            let start = 0;
            // حساب الخطوة بناءً على 60 إطار في الثانية
            const step = Math.ceil(target / (duration / 16)); 

            const updateCounter = () => {
                start += step;
                if (start >= target) {
                    counter.innerText = target.toLocaleString() + "+";
                } else {
                    counter.innerText = start.toLocaleString() + "+";
                    setTimeout(updateCounter, 16);
                }
            };
            updateCounter();
            observer.unobserve(entry.target); // إيقاف المراقبة بعد التشغيل
        }
    };

    const observer = new IntersectionObserver(startCount, {
        root: null,
        threshold: 0.3
    });

    // تأكد من أن الكلاس هنا يطابق الكلاس في الـ HTML الخاص بك
    document.querySelectorAll(".stat-number").forEach(stat => {
        observer.observe(stat);
    });
});
document.getElementById('mobile-menu').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
});
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // تحويل شكل الأيقونة (اختياري)
            menuToggle.classList.toggle('is-active');
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            // تبديل ظهور القائمة المنسدلة
            navMenu.classList.toggle('show');
        });

        // إغلاق القائمة عند الضغط على أي رابط لتسهيل التصفح
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });
    }
});
// كود تفعيل القائمة المنسدلة في الجوال
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // اختياري: تحويل شكل الزر لعلامة X عند الفتح
            menuToggle.classList.toggle('is-active');
        });
    }

    // إغلاق القائمة عند الضغط على أي رابط
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});
