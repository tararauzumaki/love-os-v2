document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 🛠️ DEVELOPER MODE
    // ==========================================
    // Set to TRUE to unlock everything for testing.
    // Set to FALSE before sending!
    const DEV_MODE = false; 

    // ==========================================
    // 🔒 TIME UNLOCK SYSTEM (Bangladesh Time)
    // ==========================================
    
    // Schedule: YYYY-MM-DD T HH:MM:SS +Offset (+06:00 for BD Time)
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

    // Initial check on load for visual styling (Greyscale)
    const loadTime = new Date();

    schedule.forEach(item => {
        const card = document.querySelector(`a[href="${item.id}"]`);
        
        if (card) {
            const unlockDate = new Date(item.date);

            // 1. VISUAL LOCK (Runs once on load)
            // If it's not Dev Mode AND the date is in the future, make it look locked.
            if (!DEV_MODE && loadTime < unlockDate) {
                card.classList.add('locked');
            }

            // 2. CLICK INTERCEPTION (Runs every time she clicks)
            card.addEventListener('click', (e) => {
                const clickTime = new Date(); // Check time RIGHT NOW
                
                // If Dev Mode is off AND it is still too early
                if (!DEV_MODE && clickTime < unlockDate) {
                    e.preventDefault(); // Stop the link from opening
                    
                    const diffTime = Math.abs(unlockDate - clickTime);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                    
                    alert(`🔒 Locked!\n${item.name} unlocks on Feb ${item.date.substring(8,10)} at 12:00 AM.\n(Wait ${diffDays} more day${diffDays > 1 ? 's' : ''}!)`);
                } 
                else {
                    // It is unlocked! Remove visual lock immediately if it was there
                    card.classList.remove('locked');
                }
            });
        }
    });

    // ==========================================
    // 🎬 VISUAL ANIMATIONS
    // ==========================================
    
    // Check if GSAP is loaded to prevent errors
    if (typeof gsap !== 'undefined') {

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

        // 3. Reveal Cards
        function revealCards() {
            gsap.from(".card", {
                duration: 0.5,
                scale: 0.8,
                opacity: 0,
                stagger: 0.1, 
                ease: "back.out(1.7)"
            });
        }

        // 4. Footer Fade In
        gsap.from("footer", {
            delay: 2.5,
            opacity: 0,
            duration: 1
        });

    } else {
        console.error("GSAP library not found. Animations disabled.");
        // Fallback: Make sure cards are visible if animation fails
        document.querySelectorAll('.card').forEach(c => c.style.opacity = 1);
    }
});
