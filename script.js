document.addEventListener('DOMContentLoaded', () => {
    const workoutForm = document.getElementById('workout-form');
    const quizSection = document.getElementById('quiz-section');
    const loadingScreen = document.getElementById('loading-screen');
    const resultSection = document.getElementById('result-section');
    const loadingText = document.getElementById('loading-text');
    const workoutContainer = document.getElementById('workout-plan-container');
    const planBadge = document.getElementById('plan-badge');
    const resetBtn = document.getElementById('reset-btn');

    // Hareket Kütüphanesi (Evde Ekipmansız)
    const exercises = {
        push: [
            { name: "Standart Şınav (Push-up)", beginner: "3 Set x 8-10 Tekrar", intermediate: "4 Set x 12-15 Tekrar", advanced: "4 Set x 20+ Tekrar" },
            { name: "Elmas Şınav (Triceps Odaklı)", beginner: "3 Set x 6-8 Tekrar (Diz Üstü)", intermediate: "3 Set x 10-12 Tekrar", advanced: "4 Set x 15 Tekrar" },
            { name: "Pike Push-up (Omuz Odaklı)", beginner: "3 Set x 6-8 Tekrar", intermediate: "3 Set x 10 Tekrar", advanced: "4 Set x 12-15 Tekrar" },
            { name: "Sandalye Dips (Arka Kol)", beginner: "3 Set x 10 Tekrar", intermediate: "4 Set x 12-15 Tekrar", advanced: "4 Set x 15-20 Tekrar" }
        ],
        pull: [
            { name: "Kapı/Masa Altı Çekiş (Inverted Row)", beginner: "3 Set x 8 Tekrar", intermediate: "4 Set x 12 Tekrar", advanced: "4 Set x 15 Tekrar" },
            { name: "Havlu ile Sırt Çekişi (Yüz Üstü)", beginner: "3 Set x 12 Tekrar", intermediate: "4 Set x 15 Tekrar", advanced: "4 Set x 20 Tekrar" },
            { name: "Superman Hold (Bel & Sırt)", beginner: "3 Set x 30 Saniye", intermediate: "3 Set x 45 Saniye", advanced: "4 Set x 60 Saniye" }
        ],
        legs: [
            { name: "Bodyweight Squat (Bacak)", beginner: "3 Set x 12 Tekrar", intermediate: "4 Set x 18 Tekrar", advanced: "4 Set x 25 Tekrar" },
            { name: "Lunge (Adımlama)", beginner: "3 Set x 10 Tekrar (Her bacak)", intermediate: "3 Set x 14 Tekrar", advanced: "4 Set x 20 Tekrar" },
            { name: "Bulgarian Split Squat (Sandalye Destekli)", beginner: "3 Set x 8 Tekrar", intermediate: "3 Set x 12 Tekrar", advanced: "4 Set x 15 Tekrar" },
            { name: "Single Leg Glute Bridge (Kalça)", beginner: "3 Set x 10 Tekrar", intermediate: "3 Set x 15 Tekrar", advanced: "4 Set x 20 Tekrar" }
        ],
        core: [
            { name: "Plank Hold", beginner: "3 Set x 30 Saniye", intermediate: "3 Set x 50 Saniye", advanced: "4 Set x 75 Saniye" },
            { name: "Leg Raise (Alt Karın)", beginner: "3 Set x 10 Tekrar", intermediate: "3 Set x 15 Tekrar", advanced: "4 Set x 20 Tekrar" },
            { name: "Mountain Climbers", beginner: "3 Set x 30 Saniye", intermediate: "4 Set x 45 Saniye", advanced: "4 Set x 60 Saniye" }
        ]
    };

    // Form Gönderildiğinde
    workoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const level = document.querySelector('input[name="level"]:checked').value;
        const goal = document.getElementById('goal').value;
        const days = document.getElementById('days').value;

        // Ekrana geçiş yap
        quizSection.classList.add('hidden');
        loadingScreen.classList.remove('hidden');

        // Yapay zeka simülasyon mesajları
        const loadingMessages = [
            "Yapay zeka koçumuz Zerith AI verilerinizi analiz ediyor...",
            "Ağırlıksız hipertrofi mekanizmaları hesaplanıyor...",
            "Haftalık hacim ve dinlenme süreleri optimize ediliyor...",
            "Kişisel Zerith Gym programınız hazırlanıyor!"
        ];

        let msgIndex = 0;
        const interval = setInterval(() => {
            msgIndex++;
            if (msgIndex < loadingMessages.length) {
                loadingText.textContent = loadingMessages[msgIndex];
            }
        }, 600);

        // 2.5 Saniye sonra planı oluştur
        setTimeout(() => {
            clearInterval(interval);
            loadingScreen.classList.add('hidden');
            resultSection.classList.remove('hidden');

            generatePlan(level, goal, days);
        }, 2500);
    });

    // Plan Üretme Mantığı
    function generatePlan(level, goal, days) {
        workoutContainer.innerHTML = '';

        const goalTexts = {
            hypertrophy: "Maksimum Kas Yapımı",
            fat_loss: "Yağ Yakımı & Sıkılaşma",
            strength: "Güç & Dayanıklılık"
        };

        const levelTexts = {
            beginner: "Başlangıç Seviye",
            intermediate: "Orta Seviye",
            advanced: "İleri Seviye"
        };

        planBadge.textContent = `${levelTexts[level]} | ${goalTexts[goal]} | Haftada ${days} Gün`;

        let planData = [];

        if (days === "3") {
            // 3 Günlük Full Body Programı
            planData = [
                {
                    day: "1. Gün: Tüm Vücut (Full Body A)",
                    list: [exercises.push[0], exercises.pull[0], exercises.legs[0], exercises.core[0]]
                },
                {
                    day: "2. Gün: Dinlenme / Hafif Yürüyüş",
                    list: []
                },
                {
                    day: "3. Gün: Tüm Vücut (Full Body B)",
                    list: [exercises.push[2], exercises.pull[1], exercises.legs[1], exercises.core[1]]
                },
                {
                    day: "4. Gün: Dinlenme",
                    list: []
                },
                {
                    day: "5. Gün: Tüm Vücut (Full Body C)",
                    list: [exercises.push[1], exercises.pull[2], exercises.legs[2], exercises.core[2]]
                }
            ];
        } else if (days === "4") {
            // 4 Günlük Üst / Alt Vücut Programı
            planData = [
                { day: "1. Gün: Üst Vücut (Upper Body)", list: [exercises.push[0], exercises.push[2], exercises.pull[0], exercises.pull[1]] },
                { day: "2. Gün: Alt Vücut & Karın (Lower & Core)", list: [exercises.legs[0], exercises.legs[1], exercises.core[0], exercises.core[1]] },
                { day: "3. Gün: Dinlenme", list: [] },
                { day: "4. Gün: Üst Vücut Güç (Upper Power)", list: [exercises.push[1], exercises.push[3], exercises.pull[0], exercises.core[2]] },
                { day: "5. Gün: Alt Vücut Hipertrofi (Lower Hypertrophy)", list: [exercises.legs[2], exercises.legs[3], exercises.core[0], exercises.core[1]] }
            ];
        } else {
            // 5 Günlük İtiş / Çekiş / Bacak (PPL) Programı
            planData = [
                { day: "1. Gün: İtiş (Göğüs, Omuz, Triceps)", list: [exercises.push[0], exercises.push[1], exercises.push[2], exercises.push[3]] },
                { day: "2. Gün: Çekiş (Sırt, Biceps, Arka Omuz)", list: [exercises.pull[0], exercises.pull[1], exercises.pull[2]] },
                { day: "3. Gün: Bacak & Karın (Legs & Core)", list: [exercises.legs[0], exercises.legs[1], exercises.legs[2], exercises.core[0]] },
                { day: "4. Gün: Dinlenme", list: [] },
                { day: "5. Gün: Tüm Vücut Hipertrofi", list: [exercises.push[0], exercises.pull[0], exercises.legs[2], exercises.core[1]] }
            ];
        }

        // HTML Ekleme
        planData.forEach(item => {
            const dayCard = document.createElement('div');
            dayCard.className = 'day-card';

            let exercisesHTML = '';
            if (item.list.length === 0) {
                exercisesHTML = `<p style="color: #9ca3af; font-style: italic;">Aktif dinlenme, esneme veya bol su tüketimi.</p>`;
            } else {
                exercisesHTML = `<ul class="exercise-list">`;
                item.list.forEach(ex => {
                    exercisesHTML += `
                        <li class="exercise-item">
                            <span class="exercise-name">${ex.name}</span>
                            <span class="exercise-meta">${ex[level]}</span>
                        </li>
                    `;
                });
                exercisesHTML += `</ul>`;
            }

            dayCard.innerHTML = `
                <h3>${item.day}</h3>
                ${exercisesHTML}
            `;
            workoutContainer.appendChild(dayCard);
        });
    }

    // Sıfırla Butonu
    resetBtn.addEventListener('click', () => {
        resultSection.classList.add('hidden');
        quizSection.classList.remove('hidden');
        loadingText.textContent = "Yapay zeka koçumuz sizin için en iyi planı oluşturuyor...";
    });
});
