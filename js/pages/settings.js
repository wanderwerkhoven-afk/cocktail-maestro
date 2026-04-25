import { registerUser, loginUser, logoutUser, initAuthListener, sendPasswordReset } from "../core/auth.js";
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
 * Modal Controls
 */
export function openSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
        initSettings(); // Refresh UI state
    }
}

export function closeSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
        modal.classList.remove('show');
        // Wait for transition before hiding display
        setTimeout(() => {
            if (!modal.classList.contains('show')) {
                modal.style.display = 'none';
            }
        }, 400);
    }
}

/**
 * UI Specific Actions in Settings
 */
export function toggleLanguageList() {
    const dropdown = document.getElementById('language-dropdown');
    const trigger = dropdown.previousElementSibling;
    
    if (dropdown) {
        dropdown.classList.toggle('open');
        trigger.classList.toggle('open');
    }
}

export function closeLanguageList() {
    const dropdown = document.getElementById('language-dropdown');
    const trigger = dropdown?.previousElementSibling;
    if (dropdown) dropdown.classList.remove('open');
    if (trigger) trigger.classList.remove('open');
}

export function toggleUnitList() {
    const dropdown = document.getElementById('unit-dropdown');
    const trigger = dropdown.previousElementSibling;
    
    if (dropdown) {
        dropdown.classList.toggle('open');
        trigger.classList.toggle('open');
    }
}

export function closeUnitList() {
    const dropdown = document.getElementById('unit-dropdown');
    const trigger = dropdown?.previousElementSibling;
    if (dropdown) dropdown.classList.remove('open');
    if (trigger) trigger.classList.remove('open');
}

export function changeUnit(unit) {
    localStorage.setItem('appUnit', unit);
    applyUnitUI();
    closeUnitList();
}

export function toggleThemeList() {
    const dropdown = document.getElementById('theme-dropdown');
    const trigger = dropdown.previousElementSibling;
    
    if (dropdown) {
        dropdown.classList.toggle('open');
        trigger.classList.toggle('open');
    }
}

export function closeThemeList() {
    const dropdown = document.getElementById('theme-dropdown');
    const trigger = dropdown?.previousElementSibling;
    if (dropdown) dropdown.classList.remove('open');
    if (trigger) trigger.classList.remove('open');
}

export function changeTheme(theme) {
    localStorage.setItem('appTheme', theme);
    applyThemeUI();
    closeThemeList();
}

export function applyThemeUI() {
    const theme = localStorage.getItem('appTheme') || 'dark';

    const items = document.querySelectorAll('.theme-item');
    items.forEach(item => {
        if (item.getAttribute('data-theme-val') === theme) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    const display = document.getElementById('current-theme-display');
    if (display) {
        if (theme === 'dark') display.innerText = window.t ? window.t('theme-dark') : 'Dark';
        else if (theme === 'light') display.innerText = window.t ? window.t('theme-light') : 'Light';

        else if (theme === 'sunset-lounge') display.innerText = window.t ? window.t('theme-sunset') : 'Sunset Lounge';
        else if (theme === 'olive-citrus') display.innerText = window.t ? window.t('theme-olive') : 'Olive Citrus';
        else if (theme === 'midnight-plum') display.innerText = window.t ? window.t('theme-plum') : 'Midnight Plum';
        else if (theme === 'jungle-tiki') display.innerText = window.t ? window.t('theme-tiki') : 'Jungle Tiki';
        else if (theme === 'brown-cafe') display.innerText = window.t ? window.t('theme-brown-cafe') : 'Brown Café';
    }

    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
}

export function applyUnitUI() {
    const unit = localStorage.getItem('appUnit') || 'ml';

    const items = document.querySelectorAll('.unit-item');
    items.forEach(item => {
        if (item.getAttribute('data-unit') === unit) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    const display = document.getElementById('current-unit-display');
    if (display) {
        if (unit === 'ml') display.innerText = 'ml';
        else if (unit === 'oz') display.innerText = 'oz';
        else if (unit === 'parts') display.innerText = 'parts';
    }
}

/**
 * Update the Settings page UI based on auth state
 */
export async function updateSettingsUI(user) {
    applyUnitUI();
    applyThemeUI();

    const profileContent = document.getElementById('profile-info-content');
    const avatar = document.querySelector('.profile-avatar-large');
    const logoutSection = document.getElementById('logout-section');
    const adminSection = document.getElementById('admin-section');

    if (user) {
        profileContent.innerHTML = `
            <h2>${user.displayName || 'Maestro User'}</h2>
            <p>${user.email}</p>
        `;
        if (avatar) avatar.innerHTML = `<i class="fa-solid fa-user-check" style="color: #ffb347;"></i>`;
        if (logoutSection) logoutSection.style.display = 'block';

        // Admin check
        const { checkAdminStatus } = await import("../core/auth.js");
        const isAdmin = await checkAdminStatus(user.uid);
        if (isAdmin && adminSection) {
            adminSection.style.display = 'block';
        } else if (adminSection) {
            adminSection.style.display = 'none';
        }
    } else {
        profileContent.innerHTML = `
            <h2>Guest Account</h2>
            <p>Log in to sync your bar to the cloud</p>
            <button class="settings-auth-btn" onclick="navigateTo('auth')">Log In / Sign Up</button>
        `;
        if (avatar) avatar.innerHTML = `<i class="fa-solid fa-user"></i>`;
        if (logoutSection) logoutSection.style.display = 'none';
        if (adminSection) adminSection.style.display = 'none';
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
        const errorEl = document.getElementById('login-error');
        result = await loginUser(email, pass);
        if (!result.success) {
            errorEl.style.color = "#ff4757"; // Ensure red
            errorEl.innerText = getFriendlyErrorMessage(result.error);
        }
    } else {
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const pass = document.getElementById('signup-password').value;
        const errorEl = document.getElementById('signup-error');
        result = await registerUser(email, pass, name);
        if (!result.success) {
            errorEl.style.color = "#ff4757"; // Ensure red
            errorEl.innerText = getFriendlyErrorMessage(result.error);
        }
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
 * Handle Forgot Password click
 */
window.handleForgotPassword = async () => {
    const email = document.getElementById('login-email').value;
    const errorEl = document.getElementById('login-error');
    
    if (!email) {
        errorEl.style.color = "#ff4757";
        errorEl.innerText = "Vul eerst je e-mailadres in.";
        return;
    }

    const result = await sendPasswordReset(email);
    if (result.success) {
        errorEl.style.color = "#2ed573"; // Success green
        errorEl.innerText = "E-mail voor wachtwoordreset verstuurd!";
    } else {
        errorEl.style.color = "#ff4757";
        errorEl.innerText = getFriendlyErrorMessage(result.error);
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
 * Show Terms (Modal)
 */
export function openTermsModal() {
    const modal = document.getElementById('terms-modal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
    }
}

export function closeTermsModal() {
    const modal = document.getElementById('terms-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            if (!modal.classList.contains('show')) {
                modal.style.display = 'none';
            }
        }, 400);
    }
}
/**
 * Show Privacy Policy (Modal)
 */
export function openPrivacyModal() {
    const modal = document.getElementById('privacy-modal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
    }
}

export function closePrivacyModal() {
    const modal = document.getElementById('privacy-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            if (!modal.classList.contains('show')) {
                modal.style.display = 'none';
            }
        }, 400);
    }
}

/**
 * Toggle Password Visibility
 */
window.togglePasswordVisibility = (inputId, icon) => {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
};

/**
 * Vertaling van technische Firebase foutcodes naar gebruiksvriendelijke berichten
 */
function getFriendlyErrorMessage(errorString) {
    if (!errorString) return "Er is een onbekende fout opgetreden.";
    
    if (errorString.includes('email-already-in-use')) {
        return "Dit e-mailadres is al in gebruik. Heb je al een account?";
    }
    if (errorString.includes('invalid-email')) {
        return "Dit e-mailadres is niet geldig.";
    }
    if (errorString.includes('weak-password')) {
        return "Het wachtwoord is te zwak. Gebruik minimaal 6 tekens.";
    }
    if (errorString.includes('user-not-found')) {
        return "Er is geen account gevonden met dit e-mailadres.";
    }
    if (errorString.includes('wrong-password') || errorString.includes('invalid-credential')) {
        return "Onjuist wachtwoord. Probeer het opnieuw.";
    }
    
    return "Oeps! Er ging iets mis. Probeer het later opnieuw.";
}
