document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 🛠️ DEVELOPER MODE
    // ==========================================
    // TRUE = Unlock all (For testing)
    // FALSE = Lock based on Date (For her)
    const DEV_MODE = false; 

    // ==========================================
    // 🔒 TIME UNLOCK SYSTEM (Bangladesh Time)
    // ==========================================
    const today = new Date(); 
    
    if (DEV_MODE) console.log("⚠️ DEV MODE: Unlocked.");

    // Schedule: 2026 Feb (UTC+06:00 for Bangladesh)
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
            // Lock if NOT Dev Mode AND Date is in future
            if (!DEV_MODE && today < unlockDate) {
                card.classList.add('locked');
                card.addEventListener('click', (e) => {
                    e.preventDefault(); 
                    const diffTime = Math.abs(unlockDate - today);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                    alert(`🔒 Locked!\n${item.name} unlocks on Feb ${item.date.substring(8,10)} at 12:00 AM.\n(Wait ${diffDays} day${diffDays > 1 ? 's' : ''})`);
                });
            }
        }
    });

    // ==========================================
    // 🎬 ANIMATIONS
    // ==========================================
    gsap.from(".title", { duration: 1, y: -50, opacity: 0, ease: "bounce.out" });

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
    } else { revealCards(); }

    function revealCards() {
        gsap.from(".card", { duration: 0.5, scale: 0.8, opacity: 0, stagger: 0.1, ease: "back.out(1.7)" });
    }

    gsap.from("footer", { delay: 2.5, opacity: 0, duration: 1 });
});
