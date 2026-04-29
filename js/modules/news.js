import { db } from "../core/firebase.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

let articles = {};
let currentSlide = 0;
let slideInterval;

/**
 * Initialize News Carousel with real-time listener
 */
export function initNewsCarousel() {
    const track = document.getElementById('news-carousel');
    if (!track) return;

    // Real-time listener for news collection
    onSnapshot(collection(db, "news"), (snap) => {
        articles = {};
        snap.forEach(doc => {
            const data = doc.data();
            // Only include active articles
            if (data.active !== false) {
                articles[doc.id] = { ...data, id: doc.id };
            }
        });
        
        // Always reset to first slide when data changes to avoid "empty" views
        currentSlide = 0;
        renderCarousel();
    }, (error) => {
        console.error("News real-time error:", error);
        // Fallback or hide if permission denied
        hideNewsSection();
    });
}

function hideNewsSection() {
    const section = document.querySelector('.news-carousel-section');
    if (section) section.style.display = 'none';
}

function showNewsSection() {
    const section = document.querySelector('.news-carousel-section');
    if (section) section.style.display = 'block';
}

function renderCarousel() {
    const track = document.getElementById('news-carousel');
    const dotsContainer = document.getElementById('carousel-dots');
    if (!track || !dotsContainer) return;

    const articleList = Object.values(articles);
    
    if (articleList.length === 0) {
        hideNewsSection();
        return;
    }

    showNewsSection();

    // Render Slides
    track.innerHTML = articleList.map((article, idx) => `
        <div class="carousel-slide" style="background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url('${article.image || ''}');">
            <div class="slide-content">
                <span class="slide-badge" style="${article.id === 'mini-game' ? 'background: var(--gold); color: black;' : ''}">${article.badge || 'PROMO'}</span>
                <h3>${article.title}</h3>
                <p>${article.tagline || ''}</p>
                <button class="slide-btn" onclick="${article.buttonAction || `openArticle('${article.id}')`}">
                    <span>${article.buttonText || (article.id === 'mini-game' || article.buttonAction ? 'Speel Nu' : 'Lees Artikel')}</span>
                    <i class="fa-solid ${article.id === 'mini-game' || article.buttonAction ? 'fa-gamepad' : 'fa-arrow-right'}"></i>
                </button>
            </div>
        </div>
    `).join('');

    // Render Dots
    dotsContainer.innerHTML = articleList.map((_, idx) => `
        <span class="carousel-dot ${idx === 0 ? 'active' : ''}" onclick="window.goToSlide(${idx})"></span>
    `).join('');

    // Update track position immediately to reset
    track.style.transform = `translateX(0%)`;

    // Setup Logic
    setupCarouselLogic(articleList.length);
}

function setupCarouselLogic(slideCount) {
    const track = document.getElementById('news-carousel');
    
    window.goToSlide = (index) => {
        const dots = document.querySelectorAll('.carousel-dot');
        if (index >= slideCount) index = 0;
        if (index < 0) index = slideCount - 1;
        
        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
        
        // Reset interval on manual navigation
        startAutoPlay();
    };

    function startAutoPlay() {
        clearInterval(slideInterval);
        if (slideCount <= 1) return; // No auto-play for single slide
        
        slideInterval = setInterval(() => {
            window.goToSlide(currentSlide + 1);
        }, 6000);
    }

    startAutoPlay();

    // Swipe / Wheel support
    let startX = 0;
    track.addEventListener('touchstart', (e) => startX = e.touches[0].clientX, { passive: true });
    track.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) window.goToSlide(currentSlide + 1);
        if (endX - startX > 50) window.goToSlide(currentSlide - 1);
    }, { passive: true });

    let wheelCooldown = false;
    track.addEventListener('wheel', (e) => {
        if (!wheelCooldown && Math.abs(e.deltaX) > 30) {
            if (e.deltaX > 0) window.goToSlide(currentSlide + 1);
            else window.goToSlide(currentSlide - 1);
            wheelCooldown = true;
            setTimeout(() => { wheelCooldown = false; }, 1000);
            if (e.cancelable) e.preventDefault();
        }
    }, { passive: false });
}

export function openArticle(id) {
    const article = articles[id];
    if (!article) return;

    const modal = document.getElementById('article-modal');
    const title = document.getElementById('article-title');
    const tagline = document.getElementById('article-tagline');
    const img = document.getElementById('article-img');
    const body = document.getElementById('article-body');

    if (!modal) return;

    title.innerText = article.title;
    tagline.innerText = article.tagline;
    img.src = article.image;
    body.innerHTML = article.content;

    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }, 10);
}

export function closeArticleModal() {
    const modal = document.getElementById('article-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400);
    }
}

// Make globally accessible for inline onclicks
window.openArticle = openArticle;
window.closeArticleModal = closeArticleModal;
