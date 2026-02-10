document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 🛠️ DEVELOPER MODE
    // ==========================================
    const DEV_MODE = false; 

    // ==========================================
    // 🔒 TIME UNLOCK SYSTEM (Bangladesh Time)
    // ==========================================
    const today = new Date(); 
    
    if (DEV_MODE) {
        console.log("⚠️ DEVELOPER MODE ACTIVE: Time locks disabled.");
    }

    const schedule = [
        { id: 'day1_rose.html',      date: '2026-02-07T00:00:00+06:00', name: "Rose Day" },
        { id: 'day2_propose.html',   date: '2026-02-08T00:00:00+06:00', name: "Propose Day" },
        { id: 'day3_chocolate.html', date: '2026-02-09T00:00:00+06:00', name: "Chocolate Day" },
        { id: 'day4_teddy.html',     date: '2026-02-10T00:00:00+06:00', name: "Teddy Day" },
        { id: 'day5_promise.html',   date: '2026-02-11T00:00:00+06:00', name: "Promise Day" },
        { id: 'day6_hug.html',       date: '2026-02-12T00:00:00+06:00', name: "Hug Day" },
        { id: 'day7_kiss.html',      date: '2026-02-13T00:00:00+06:00', name: "Kiss Day" },
        { id: 'day8_valentine.html', date: '2026-02-14T00:00:00+06:00', name: "The Finale" }
    ];

    schedule.forEach(item => {
        const card = document.querySelector(`a[href="${item.id}"]`);
        
        if (card) {
            const unlockDate = new Date(item.date);

            // LOGIC: If current time is BEFORE the unlock date AND Dev Mode is OFF
            if (!DEV_MODE && today < unlockDate) {
                // 1. Add Visual Lock
                card.classList.add('locked');
                
                // 2. Intercept Click
                card.addEventListener('click', (e) => {
                    e.preventDefault(); 
                    
                    const diffTime = unlockDate - today;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                    
                    alert(`🔒 Locked!\n${item.name} unlocks on Feb ${item.date.substring(8,10)} at 12:00 AM.\n(Wait ${diffDays} more day${diffDays > 1 ? 's' : ''}!)`);
                });
            } else {
                // If the date has passed or is today, ensure it is NOT locked
                card.classList.remove('locked');
            }
        }
    });

    // ==========================================
    // 🎬 VISUAL ANIMATIONS
    // ==========================================
    
    // 1. Boot Sequence
    gsap.from(".title", {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "bounce.out"
    });

    // 2. Typewriter Effect
    const textElement = document.getElementById("typing-text");
    const textToType = "Initializing Heartbeat...";
    
    if (textElement) {
        textElement.textContent = ""; 
        let i = 0;
        function typeWriter() {
            if (i < textToType.length) {
                textElement.textContent += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 50); 
            } else {
                revealCards();
            }
        }
        setTimeout(typeWriter, 500);
    } else {
        revealCards();
    }

    function revealCards() {
        gsap.from(".card", {
            duration: 0.5,
            scale: 0.8,
            opacity: 0,
            stagger: 0.1, 
            ease: "back.out(1.7)"
        });
    }

    gsap.from("footer", {
        delay: 2.5,
        opacity: 0,
        duration: 1
    });
});