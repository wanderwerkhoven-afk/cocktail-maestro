import { db } from "../core/firebase.js";
import { collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

let articles = {};
let previewArticles = {}; // For lookup by ID
let adminPreviewList = []; // For rendering the admin carousel

/**
 * Initialize News Carousel with real-time listener
 */
export function initNewsCarousel() {
    // Real-time listener for news collection
    onSnapshot(collection(db, "news"), (snap) => {
        let rawArticles = [];
        snap.forEach(doc => {
            const data = doc.data();
            // Only include active articles
            if (data.active !== false) {
                rawArticles.push({ ...data, id: doc.id });
            }
        });
        
        // Sort locally to handle missing 'order' fields gracefully
        rawArticles.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
        
        // Convert to our articles object
        articles = {};
        rawArticles.forEach(a => articles[a.id] = a);
        
        // Render all instances
        renderCarousel('news-carousel', 'carousel-dots');
        renderCarousel('admin-news-carousel', 'admin-carousel-dots');
    }, (error) => {
        console.error("News real-time error:", error);
        hideNewsSection('news-carousel-section');
    });
}

function hideNewsSection(className) {
    const section = document.querySelector('.' + className);
    if (section) section.style.display = 'none';
}

function showNewsSection(className) {
    const section = document.querySelector('.' + className);
    if (section) section.style.display = 'block';
}

// Store state per instance to prevent "jumping" on updates
const carouselStates = new Map();

function renderCarousel(trackId, dotsId) {
    const track = document.getElementById(trackId);
    const dotsContainer = document.getElementById(dotsId);
    if (!track || !dotsContainer) return;

    const articleList = Object.values(articles);
    
    if (articleList.length === 0) {
        if (trackId === 'news-carousel') hideNewsSection('news-carousel-section');
        track.innerHTML = '';
        dotsContainer.innerHTML = '';
        return;
    }

    if (trackId === 'news-carousel') showNewsSection('news-carousel-section');

    // Save current slide index if it exists
    const prevState = carouselStates.get(trackId);
    let currentSlide = prevState ? prevState.currentSlide : 0;
    
    // If the list got shorter and we are out of bounds, reset to 0
    if (currentSlide >= articleList.length) currentSlide = 0;

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
        <span class="carousel-dot ${idx === currentSlide ? 'active' : ''}" data-index="${idx}"></span>
    `).join('');

    // Set position to what it was (or 0)
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Setup or Refresh Logic for this specific instance
    setupCarouselInstance(trackId, track, dotsContainer, articleList.length, currentSlide);
}

function setupCarouselInstance(trackId, track, dotsContainer, slideCount, initialSlide) {
    // Clear old interval if it exists
    const prevState = carouselStates.get(trackId);
    if (prevState && prevState.interval) clearInterval(prevState.interval);

    let currentSlide = initialSlide;
    let slideInterval;
    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    const goToSlide = (index) => {
        if (index >= slideCount) index = 0;
        if (index < 0) index = slideCount - 1;
        
        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
        
        // Update state
        carouselStates.set(trackId, { currentSlide, interval: slideInterval });
        
        startAutoPlay();
    };

    // Attach to dots
    dots.forEach((dot, i) => {
        dot.onclick = () => goToSlide(i);
    });

    function startAutoPlay() {
        clearInterval(slideInterval);
        if (slideCount <= 1) return;
        slideInterval = setInterval(() => goToSlide(currentSlide + 1), 6000);
        
        // Save interval to state so it can be cleared next time
        carouselStates.set(trackId, { currentSlide, interval: slideInterval });
    }

    startAutoPlay();
    
    // Initial state save
    carouselStates.set(trackId, { currentSlide, interval: slideInterval });

    // Swipe Support (Improved)
    let startX = 0;
    let startY = 0;
    let isScrolling = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isScrolling = false;
        clearInterval(slideInterval);
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        const deltaX = startX - e.touches[0].clientX;
        const deltaY = startY - e.touches[0].clientY;

        // If vertical scroll is dominant, don't trigger horizontal swipe logic
        if (!isScrolling) {
            isScrolling = Math.abs(deltaY) > Math.abs(deltaX);
        }
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        if (isScrolling) {
            startAutoPlay();
            return;
        }
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) goToSlide(currentSlide + 1);
            else goToSlide(currentSlide - 1);
        } else {
            startAutoPlay();
        }
    }, { passive: true });

    // Wheel support
    let wheelCooldown = false;
    track.addEventListener('wheel', (e) => {
        if (!wheelCooldown && Math.abs(e.deltaX) > 30) {
            if (e.deltaX > 0) goToSlide(currentSlide + 1);
            else goToSlide(currentSlide - 1);
            wheelCooldown = true;
            setTimeout(() => { wheelCooldown = false; }, 1000);
            if (e.cancelable) e.preventDefault();
        }
    }, { passive: false });
}

export function openArticle(id) {
    // Check both real articles and preview cache
    const article = articles[id] || previewArticles[id];
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

/**
 * Preview a specific article in the admin carousel (accumulative)
 */
export function previewArticleInAdmin(articleData) {
    const track = document.getElementById('admin-news-carousel');
    const dotsContainer = document.getElementById('admin-carousel-dots');
    if (!track || !dotsContainer) return;

    const id = articleData.id || articleData.firebaseId;
    
    // Add to lookup cache
    previewArticles[id] = { ...articleData, id: id };
    
    // Add to list if not already there
    if (!adminPreviewList.find(a => a.id === id)) {
        adminPreviewList.push(previewArticles[id]);
    }
    
    // Render the admin carousel with the full preview list
    track.innerHTML = adminPreviewList.map((article, idx) => `
        <div class="carousel-slide" style="background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url('${article.image || ''}');">
            <div class="slide-content">
                <span class="slide-badge" style="${article.id === 'mini-game' ? 'background: var(--gold); color: black;' : ''}">${article.badge || 'PREVIEW'}</span>
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
    const newIndex = adminPreviewList.length - 1;
    dotsContainer.innerHTML = adminPreviewList.map((_, idx) => `
        <span class="carousel-dot ${idx === newIndex ? 'active' : ''}" data-index="${idx}"></span>
    `).join('');

    // Update track position to show the newly added one (last in list)
    track.style.transform = `translateX(-${newIndex * 100}%)`;

    // Highlight that this is a preview
    const previewHeader = document.querySelector('#admin-news-preview h4');
    if (previewHeader) {
        previewHeader.innerHTML = `Preview Mode <span style="color: #2ed573;">(${adminPreviewList.length} berichten)</span> <button onclick="window.clearAdminPreview()" style="background: none; border: none; color: #ff4757; font-size: 0.7rem; cursor: pointer; text-decoration: underline; margin-left: 10px;">Reset</button>`;
    }

    // Initialize logic for the preview carousel
    setupCarouselInstance('admin-news-carousel', track, dotsContainer, adminPreviewList.length, newIndex);
}

/**
 * Clear the admin preview list
 */
export function clearAdminPreview() {
    adminPreviewList = [];
    previewArticles = {};
    const track = document.getElementById('admin-news-carousel');
    const dotsContainer = document.getElementById('admin-carousel-dots');
    if (track) track.innerHTML = '';
    if (dotsContainer) dotsContainer.innerHTML = '';
    
    const previewHeader = document.querySelector('#admin-news-preview h4');
    if (previewHeader) {
        previewHeader.innerHTML = 'Live Preview';
    }
}

window.clearAdminPreview = clearAdminPreview;
window.openArticle = openArticle;
window.closeArticleModal = closeArticleModal;
window.previewArticleInAdmin = previewArticleInAdmin;
