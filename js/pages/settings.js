import { registerUser, loginUser, logoutUser, initAuthListener } from "../core/auth.js";
import { navigateTo } from "../core/navigation.js";

/**
 * Initialize Settings Page logic
 */
export function initSettings() {
    initAuthListener((user) => {
        updateSettingsUI(user);
    });
}

/**
 * Update the Settings page UI based on auth state
 */
export function updateSettingsUI(user) {
    const profileContent = document.getElementById('profile-info-content');
    const avatar = document.querySelector('.profile-avatar-large');
    const logoutSection = document.getElementById('logout-section');

    if (user) {
        profileContent.innerHTML = `
            <h2>${user.displayName || 'Maestro User'}</h2>
            <p>${user.email}</p>
        `;
        if (avatar) avatar.innerHTML = `<i class="fa-solid fa-user-check" style="color: #ffb347;"></i>`;
        if (logoutSection) logoutSection.style.display = 'block';
    } else {
        profileContent.innerHTML = `
            <h2>Guest Account</h2>
            <p>Log in to sync your bar to the cloud</p>
            <button class="settings-auth-btn" onclick="navigateTo('auth')">Log In / Sign Up</button>
        `;
        if (avatar) avatar.innerHTML = `<i class="fa-solid fa-user"></i>`;
        if (logoutSection) logoutSection.style.display = 'none';
    }
}

/**
 * Auth Page Header Controls (Removed Modals)
 */

window.switchAuthTab = (tab) => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const tabs = document.querySelectorAll('.auth-tab');
    const title = document.getElementById('auth-title');
    const subtitle = document.getElementById('auth-subtitle');

    tabs.forEach(t => t.classList.remove('active'));

    if (tab === 'login') {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        tabs[0].classList.add('active');
    } else {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
        tabs[1].classList.add('active');
    }
};

/**
 * Handle Login/Signup Form Submissions
 */
window.handleAuthSubmit = async (event, type) => {
    event.preventDefault();
    const btn = event.target.querySelector('button');
    const originalText = btn.innerText;
    
    // UI Loading state
    btn.disabled = true;
    btn.innerText = "Working...";

    let result;
    if (type === 'login') {
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;
        result = await loginUser(email, pass);
        if (!result.success) document.getElementById('login-error').innerText = result.error;
    } else {
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const pass = document.getElementById('signup-password').value;
        result = await registerUser(email, pass, name);
        if (!result.success) document.getElementById('signup-error').innerText = result.error;
    }

    if (result.success) {
        // Success: Go to home
        navigateTo('home');
        // Small delay to ensure state is readable before potential reload
        setTimeout(() => location.reload(), 100);
    } else {
        btn.disabled = false;
        btn.innerText = originalText;
    }
};

/**
 * Handle Logout
 */
window.handleLogout = async () => {
    if (confirm("Are you sure you want to log out? Local data will persist until cleared.")) {
        await logoutUser();
        location.reload();
    }
};

/**
 * Show Terms (Simple Placeholder)
 */
window.showTerms = () => {
    alert("Gebruikersvoorwaarden:\n\n1. Cocktail Maestro is voor educatieve doeleinden.\n2. Wij zijn niet verantwoordelijk voor de kwaliteit van je drankjes (hoewel we hopen dat ze fantastisch zijn).\n3. Drink verantwoord!");
};
