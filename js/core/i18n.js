/**
 * Lightweight i18n System for Cocktail Maestro
 */

const translations = {
    nl: {
        // Navigation
        "nav-home": "Home",
        "nav-fridge": "Koelkast",
        "nav-vault": "The Vault",
        "nav-recipes": "Recepten",
        "nav-kitchen": "Keuken",
        "nav-shopping": "Winkelen",

        // Home Page
        "home-search-placeholder": "Zoek klassiekers...",
        "home-categories-title": "Categorieën",
        "cat-classics": "Klassiekers",
        "cat-sweet": "Zoet",
        "cat-sour": "Fris & Zuur",
        "cat-strong": "Sterk",
        "cat-mocktails": "Mocktails",
        "cat-creamy": "Romig",
        "vault-card-title": "Cocktail Vault",
        "vault-card-sub": "Blader door klassieke cocktailrecepten",
        "kitchen-card-title": "Keuken",
        "kitchen-card-sub": "Maak siropen, infusies & garnitures",

        // Fridge Page
        "fridge-title": "Vul je Koelkast",
        "fridge-intro-text": "Vink aan wat je in huis hebt. Wij laten je zien welke cocktails je direct kunt maken of welke ingrediënten je nog mist.",
        "fridge-calculate-btn": "Bereken Match",

        // Vault Page
        "vault-title": "The Vault",
        "vault-search-placeholder": "Zoek in The Vault...",
        "vault-missing-filter": "Alleen Perfecte Matches",

        // Recipe Book
        "recipes-title": "Mijn Recepten",
        "recipes-intro-text": "Creëer je eigen meesterwerken. Sla ze hier op om ze altijd bij de hand te hebben.",
        "recipes-add-btn": "Nieuw Recept",

        // Kitchen Page
        "kitchen-title": "De Keuken",
        "kitchen-intro-text": "Ontdek technieken, chemie achter mixologie en huisgemaakte ingrediënten.",

        // Shopping List
        "shopping-title": "Boodschappenlijst",
        "shopping-empty": "Je lijst is leeg. Voeg ingrediënten toe!",

        // Settings Modal
        "settings-title": "Instellingen",
        "settings-prefs": "App Voorkeuren",
        "settings-lang": "Taal / Language",
        "settings-units": "Meeteenheid",
        "settings-theme": "Thema",
        "theme-dark": "Donker",
        "theme-light": "Licht",
        "theme-auto": "Auto (Systeem)",
        "settings-legal": "Juridisch & Support",
        "settings-terms": "Gebruikersvoorwaarden",
        "settings-privacy": "Privacybeleid",
        "settings-logout": "Uitloggen",

        // Legal Document
        "terms-title": "Gebruikersvoorwaarden",
        "terms-intro": "Welkom bij Cocktail Maestro. Door onze app te gebruiken, ga je akkoord met de volgende voorwaarden:",
        "terms-h1": "1. Leeftijdsgrens",
        "terms-p1": "Om deze applicatie te gebruiken en de recepten te proberen, dien je de wettelijke minimumleeftijd voor alcoholconsumptie in jouw land te hebben bereikt.",
        "terms-h2": "2. Educatief Doel",
        "terms-p2": "Cocktail Maestro is ontworpen voor educatieve en amusementsdoeleinden. Wij zijn niet verantwoordelijk voor de kwaliteit, smaak of de gevolgen van het consumeren van de drankjes die je maakt.",
        "terms-h3": "3. Gezondheid & Veiligheid",
        "terms-p3": "Alcohol dient altijd met mate geconsumeerd te worden. Drink verantwoord, combineer drinken nooit met autorijden en wees bewust van je eigen grenzen.",
        "terms-h4": "4. Gebruikersgegevens",
        "terms-p4": "Wanneer je inlogt, slaan we je recepten en ingrediënten veilig op in de cloud om ze te synchroniseren. Wij verkopen je gegevens niet door aan derden.",
        "terms-close-btn": "Begrepen",

        // Privacy Policy
        "privacy-title": "Privacybeleid",
        "privacy-intro": "We hechten veel waarde aan jouw privacy. Hier leggen we uit hoe we met jouw gegevens omgaan:",
        "privacy-h1": "1. Gegevensverzameling",
        "privacy-p1": "Om je voorkeuren via de cloud te synchroniseren, verzamelen we alleen essentiële gegevens via Firebase (Google), zoals je inloggegevens (e-mail) en je opgeslagen recepten en bar-voorraad.",
        "privacy-h2": "2. Lokale Opslag",
        "privacy-p2": "We maken sterk gebruik van je smartphone's geheugen (Local Storage) om de applicatie snel te laten werken. Alleen de noodzakelijke data voor cloud-sync verlaat je toestel.",
        "privacy-h3": "3. Geen Commercie",
        "privacy-p3": "Wij verkopen je persoonlijke gegevens of cocktail voorkeuren nooit aan derden voor advertentiedoeleinden.",
        "privacy-close-btn": "Sluiten",

        // Auth
        "auth-login": "Inloggen / Registreren",
        "auth-guest": "Gast Account",
        "auth-sync-text": "Log in om je bar te synchroniseren met de cloud"
    },
    en: {
        // Navigation
        "nav-home": "Home",
        "nav-fridge": "Fridge",
        "nav-vault": "The Vault",
        "nav-recipes": "Recipes",
        "nav-kitchen": "Kitchen",
        "nav-shopping": "Shopping",

        // Home Page
        "home-search-placeholder": "Search classics...",
        "home-categories-title": "Categories",
        "cat-classics": "Classics",
        "cat-sweet": "Sweet",
        "cat-sour": "Fresh & Sour",
        "cat-strong": "Strong",
        "cat-mocktails": "Mocktails",
        "cat-creamy": "Creamy",
        "vault-card-title": "Cocktail Vault",
        "vault-card-sub": "Browse classic cocktail recipes",
        "kitchen-card-title": "Kitchen",
        "kitchen-card-sub": "Make syrups, infusions & garnishes",

        // Fridge Page
        "fridge-title": "Stock your Fridge",
        "fridge-intro-text": "Check what you have in stock. We'll show you which cocktails you can make immediately or what you're missing.",
        "fridge-calculate-btn": "Calculate Match",

        // Vault Page
        "vault-title": "The Vault",
        "vault-search-placeholder": "Search The Vault...",
        "vault-missing-filter": "Perfect Matches Only",

        // Recipe Book
        "recipes-title": "My Recipes",
        "recipes-intro-text": "Create your own masterpieces. Save them here to always have them at hand.",
        "recipes-add-btn": "New Recipe",

        // Kitchen Page
        "kitchen-title": "The Kitchen",
        "kitchen-intro-text": "Discover techniques, chemistry behind mixology, and homemade ingredients.",

        // Shopping List
        "shopping-title": "Shopping List",
        "shopping-empty": "Your list is empty. Start adding ingredients!",

        // Settings Modal
        "settings-title": "Settings",
        "settings-prefs": "App Preferences",
        "settings-lang": "Language",
        "settings-units": "Measuring Units",
        "settings-theme": "Theme",
        "theme-dark": "Dark",
        "theme-light": "Light",
        "theme-auto": "Auto (System)",
        "settings-legal": "Legal & Support",
        "settings-terms": "Terms of Service",
        "settings-privacy": "Privacy Policy",
        "settings-logout": "Logout",

        // Legal Document
        "terms-title": "Terms of Service",
        "terms-intro": "Welcome to Cocktail Maestro. By using our app, you agree to the following terms:",
        "terms-h1": "1. Age Restriction",
        "terms-p1": "To use this application and try its recipes, you must be of legal drinking age in your country of residence.",
        "terms-h2": "2. Educational Purpose",
        "terms-p2": "Cocktail Maestro is designed for educational and entertainment purposes. We are not responsible for the quality, taste, or consequences of consuming the drinks you compile.",
        "terms-h3": "3. Health & Safety",
        "terms-p3": "Alcohol should always be consumed in moderation. Drink responsibly, never drink and drive, and be aware of your personal limits.",
        "terms-h4": "4. User Data",
        "terms-p4": "When you log in, we securely save your recipes and ingredients to the cloud to sync them across devices. We do not sell your personal data to third parties.",
        "terms-close-btn": "I Understand",

        // Privacy Policy
        "privacy-title": "Privacy Policy",
        "privacy-intro": "We value your privacy highly. Here is how we handle your data:",
        "privacy-h1": "1. Data Collection",
        "privacy-p1": "To sync your preferences via the cloud, we only collect essential data through Firebase (Google), such as your login credentials (email) and your saved recipes and bar stock.",
        "privacy-h2": "2. Local Storage",
        "privacy-p2": "We strongly utilize your device's memory (Local Storage) to ensure the application runs quickly. Only necessary data for cloud synchronization leaves your device.",
        "privacy-h3": "3. No Commercial Sale",
        "privacy-p3": "We never sell your personal data or cocktail preferences to third parties for advertising purposes.",
        "privacy-close-btn": "Close",

        // Auth
        "auth-login": "Log In / Sign Up",
        "auth-guest": "Guest Account",
        "auth-sync-text": "Log in to sync your bar to the cloud"
    }
};

let currentLang = localStorage.getItem('appLanguage') || 'nl';

/**
 * Change the app language and update the UI
 */
export function changeLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('appLanguage', lang);
    applyLanguage();
}

/**
 * Apply translations to all elements with data-i18n attribute
 */
export function applyLanguage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = translations[currentLang][key];

        if (translation) {
            // Handle placeholders for inputs
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else {
                el.innerText = translation;
            }
        }
    });

    // Handle active state in the settings list
    const items = document.querySelectorAll('.lang-item');
    items.forEach(item => {
        if (item.getAttribute('data-lang') === currentLang) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Update current language display
    const display = document.getElementById('current-lang-display');
    if (display) {
        display.innerText = currentLang === 'nl' ? '🇳🇱 NL' : '🇬🇧 EN';
    }
}

/**
 * Utility to get a single translation string
 */
export function t(key) {
    return translations[currentLang][key] || key;
}

export function getCurrentLang() {
    return currentLang;
}
