/**
 * Lightweight i18n System for Cocktail Maestro
 */

const translations = {
    nl: {
        // Navigation
        "nav-home": "Home",
        "nav-fridge": "Koelkast",
        "nav-vault": "De Kluis",
        "nav-recipes": "Mijn Recepten",
        "nav-kitchen": "De Keuken",
        "nav-shopping": "Winkelen",

        // Auth Page
        "auth-tagline": "Verhoog je mixologie reis",
        "auth-tab-login": "Inloggen",
        "auth-tab-signup": "Registreren",
        "auth-email-placeholder": "E-mailadres",
        "auth-password-placeholder": "Wachtwoord",
        "auth-name-placeholder": "Volledige Naam",
        "auth-password-min": "Wachtwoord (min. 6 tekens)",
        "auth-forgot-password": "Wachtwoord vergeten?",
        "auth-submit-login": "Inloggen",
        "auth-submit-signup": "Account aanmaken",
        "auth-or": "OF",
        "auth-guest-btn": "Doorgaan als gast",

        // Home Page
        "home-search-placeholder": "Zoek klassiekers...",
        "home-subtitle": "Creëer momenten, glas voor glas.",

        "home-info-text": "Beheers de kunst van mixologie met <strong>Cocktail Maestro</strong>. Ontdek onze uitgebreide collectie klassieke en moderne recepten in de <strong>Kluis</strong>, beheer je thuisvoorraad in de <strong>Koelkast</strong> om precies te ontdekken wat je nu kunt maken, en verbeter je vaardigheden in de <strong>Keuken</strong> met professionele gidsen voor siropen, infusies en garnituren. Of je nu een nieuwsgierige beginner bent of een doorgewinterde pro, je perfecte drankje begint hier.",
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
        "home-shake-title": "Shake it up!",
        "home-shake-sub": "Kun je niet kiezen? Laat het lot je volgende meesterwerk inschenken.",
        "home-shake-btn": "SHAKE",
        "home-bar-status-title": "JE BAR STATUS",
        "home-bar-status-sub": "Je huidige cocktail potentieel",
        "home-bar-stats-label": "BAR STATS:",
        "home-stats-ingredients": "Ingrediënten op voorraad",
        "home-stats-cocktails": "Cocktails die je kunt maken",
        "home-manage-fridge": "Beheer Koelkast",
        "home-update-status": "UPDATE STATUS",

        // Fridge Page
        "fridge-title": "Vul je Koelkast",
        "fridge-intro-title": "Je Virtuele Bar",
        "fridge-intro-text": "Welkom bij je persoonlijke inventaris. Vertel ons welke flessen, sappen en extra's je in huis hebt, en de Maestro zal precies uitrekenen welke cocktails je kunt maken!",
        "fridge-intro-tip": "Tip: Wees zo specifiek mogelijk om de beste resultaten te krijgen. Je ingrediënten worden automatisch opgeslagen.",
        "fridge-available-title": "Wat hebben we beschikbaar?",
        "fridge-search-placeholder": "Zoek alle ingrediënten...",
        "fridge-calculate-btn": "Vind Mijn Cocktails",
        "fridge-searching": "Zoeken...",
        "fridge-no-matches": "Geen directe matches gevonden.",
        "fridge-try-more": "Probeer meer ingrediënten te selecteren!",
        "group-perfect": "Perfecte Matches",
        "group-missing-1": "Mis 1 ingrediënt",
        "group-missing-2": "Mis 2 ingrediënten",

        // Vault Page
        "vault-title": "The Vault",
        "vault-intro-title": "The Cocktail Vault",
        "vault-intro-text": "Ontdek onze samengestelde collectie van klassieke en moderne cocktails. Van tijdloze sours tot complexe tiki-drankjes, elk recept is een meesterwerk dat wacht om ontdekt te worden.",
        "vault-intro-tip": "Gebruik de zoekbalk om cocktails te vinden op naam, drank of smaakprofiel. Tik op een kaart om het volledige recept te zien.",
        "vault-search-placeholder": "Zoek in The Vault...",
        "vault-missing-filter": "Alleen Perfecte Matches",

        // Recipe Book
        "recipes-title": "Mijn Recepten",
        "recipes-intro-title": "Mijn Receptenboek",
        "recipes-intro-text": "Je persoonlijke collectie van eigen creaties en variaties. Sla hier je eigen unieke recepten op, compleet met foto's en gedetailleerde instructies.",
        "recipes-intro-tip": "Tik op de plusknop hieronder om een nieuw recept te maken. Al je recepten worden veilig opgeslagen.",
        "recipes-add-btn": "Nieuw Recept",
        "recipe-save": "Recept Opslaan",
        "recipe-update": "Recept Bijwerken",
        "recipe-delete-confirm": "Dit recept verwijderen?",
        "recipe-alert-empty": "Voer een naam en ten minste één ingrediënt in!",
        "recipe-alert-req": "Naam en ingrediënten zijn verplicht!",
        "recipe-alert-added": "Recept toegevoegd!",
        "recipe-alert-updated": "Recept bijgewerkt!",
        "recipe-empty-state": "Je receptenboek is leeg.<br>Begin met het toevoegen van je eerste creatie!",
        "recipe-name-ph": "bijv. Espresso Martini",
        "recipe-desc-ph": "bijv. Een frisse klassieker met een twist.",
        "recipe-amount-ph": "50",
        "recipe-unit-ph": "ml",
        "recipe-ing-ph": "Vodka",
        "recipe-glass-ph": "bijv. Coupe",
        "recipe-ice-ph": "bijv. Groot ijsblok",
        "recipe-ice-label": "IJs",
        "recipe-type-label": "Type Drank",
        "recipe-cocktail": "Cocktail",
        "recipe-mocktail": "Mocktail",
        "recipe-cat-label": "Categorieën (komma gescheiden)",
        "recipe-method-label": "Bereidingswijze",
        "recipe-method-ph": "bijv. Shaken",
        "recipe-instr-label": "Instructies / Stappen",
        "recipe-add-step": "Stap Toevoegen",
        "recipe-upload-photo": "Upload Cocktail Foto",
        "recipe-name-label": "Cocktail Naam",
        "recipe-desc-label": "Korte Beschrijving",
        "recipe-ing-label": "Ingrediënten (Aantal | Eenheid | Naam)",
        "recipe-add-ing": "Ingrediënt Toevoegen",
        "recipe-glass-label": "Glaswerk",

        // Kitchen Page
        "kitchen-title": "De Keuken",
        "kitchen-intro-text": "Ontdek technieken, chemie achter mixologie en huisgemaakte ingrediënten.",

        // Shopping List
        "shopping-title": "Boodschappenlijst",
        "shopping-empty": "Je lijst is leeg. Voeg ingrediënten toe!",
        "shopping-smart-title": "Slimme Kooptips",
        "shopping-unlocks": "Ontgrendelt {0} nieuwe cocktails!",
        "shopping-used-in": "Gebruikt in {0} recepten",
        "shopping-add-btn": "Toevoegen",
        "shopping-unlocks-label": "Ontgrendelt:",
        "shopping-popular-label": "Populair in:",

        // Cocktail Card & UI
        "card-missing": "Mis {0}",
        "card-mine": "EIGEN",
        "card-premium-work": "Een premium meesterwerk.",
        "card-servings": "Porties:",
        "card-ingredients": "Ingrediënten:",
        "card-glassware": "Glaswerk:",
        "card-standard": "Standaard",
        "card-ice": "IJs:",
        "card-none": "Geen",
        "card-method": "Methode: {0}",
        "card-step": "Stap {0}:",
        "card-no-desc": "Geen beschrijving gegeven.",

        // Categories
        "cat-gin": "Gin",
        "cat-vodka": "Vodka",
        "cat-rum": "Rum",
        "cat-tequila": "Tequila & Mezcal",
        "cat-whiskey": "Whiskey & Cask",
        "cat-aperitif": "Aperitief & Spritz",
        "cat-favorites": "Favorieten",
        "cat-others": "Variatie & Klassiekers",
        "cat-my-recipes": "Mijn Meesterwerken",

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

        // Auth Page
        "auth-tagline": "Elevate your mixology journey",
        "auth-tab-login": "Login",
        "auth-tab-signup": "Sign Up",
        "auth-email-placeholder": "Email Address",
        "auth-password-placeholder": "Password",
        "auth-name-placeholder": "Full Name",
        "auth-password-min": "Password (min. 6 chars)",
        "auth-forgot-password": "Forgot password?",
        "auth-submit-login": "Login",
        "auth-submit-signup": "Create Account",
        "auth-or": "OR",
        "auth-guest-btn": "Continue as Guest",

        // Home Page
        "home-search-placeholder": "Search classics...",
        "home-subtitle": "Crafting moments, one glass at a time.",

        "home-info-text": "Master the art of mixology with <strong>Cocktail Maestro</strong>. Explore our extensive collection of classic and modern recipes in the <strong>Vault</strong>, manage your home inventory in the <strong>Fridge</strong> to discover exactly what you can create right now, and elevate your skills in the <strong>Kitchen</strong> with professional guides for syrups, infusions, and garnishes. Whether you're a curious beginner or a seasoned pro, your perfect pour starts here.",
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
        "home-shake-title": "Shake it up!",
        "home-shake-sub": "Can't decide? Let fate pour your next masterwork.",
        "home-shake-btn": "SHAKE",
        "home-bar-status-title": "YOUR BAR STATUS",
        "home-bar-status-sub": "Your current cocktail potential",
        "home-bar-stats-label": "BAR STATS:",
        "home-stats-ingredients": "Ingredients in stock",
        "home-stats-cocktails": "Cocktails possible to make",
        "home-manage-fridge": "Manage Fridge",
        "home-update-status": "UPDATE STATUS",

        // Fridge Page
        "fridge-title": "Stock your Fridge",
        "fridge-intro-title": "Your Virtual Bar",
        "fridge-intro-text": "Welcome to your personal inventory. Tell us what bottles, juices, and extras you have at home, and the Maestro will figure out exactly which cocktails you can make!",
        "fridge-intro-tip": "Tip: Be as specific as possible to get the best matches. Your ingredients are saved automatically.",
        "fridge-available-title": "What do we have available?",
        "fridge-search-placeholder": "Search all ingredients...",
        "fridge-calculate-btn": "Calculate Match",
        "fridge-searching": "Searching...",
        "fridge-no-matches": "No close matches found.",
        "fridge-try-more": "Try selecting more ingredients!",
        "group-perfect": "Perfect Matches",
        "group-missing-1": "Missing 1 Ingredient",
        "group-missing-2": "Missing 2 Ingredients",

        // Vault Page
        "vault-title": "The Vault",
        "vault-intro-title": "The Cocktail Vault",
        "vault-intro-text": "Explore our curated collection of classic and modern cocktails. From timeless sours to complex tiki drinks, every recipe is a masterpiece waiting to be discovered.",
        "vault-intro-tip": "Use the search bar to find cocktails by name, spirit, or flavor profile. Tap a card to see the full recipe.",
        "vault-search-placeholder": "Search The Vault...",
        "vault-missing-filter": "Perfect Matches Only",

        // Recipe Book
        "recipes-title": "My Recipes",
        "recipes-intro-title": "Your Recipe Book",
        "recipes-intro-text": "Your personal collection of custom creations and variations. Save your own unique recipes here, complete with photos and detailed instructions.",
        "recipes-intro-tip": "Tap the plus button below to create a new recipe. All your recipes are saved securely.",
        "recipes-add-btn": "New Recipe",
        "recipe-save": "Save Recipe",
        "recipe-update": "Update Recipe",
        "recipe-delete-confirm": "Delete this recipe?",
        "recipe-alert-empty": "Please enter a name and at least one ingredient!",
        "recipe-alert-req": "Name and ingredients are required!",
        "recipe-alert-added": "Recipe added!",
        "recipe-alert-updated": "Recipe updated!",
        "recipe-empty-state": "Your recipe book is empty.<br>Start adding your first creation!",
        "recipe-name-ph": "e.g. Espresso Martini",
        "recipe-desc-ph": "e.g. A fresh classic with a twist.",
        "recipe-amount-ph": "50",
        "recipe-unit-ph": "ml",
        "recipe-ing-ph": "Vodka",
        "recipe-glass-ph": "e.g. Coupe",
        "recipe-ice-ph": "e.g. Large ice cube",
        "recipe-ice-label": "Ice",
        "recipe-type-label": "Drink Type",
        "recipe-cocktail": "Cocktail",
        "recipe-mocktail": "Mocktail",
        "recipe-cat-label": "Categories (comma separated)",
        "recipe-method-label": "Method",
        "recipe-method-ph": "e.g. Shaken",
        "recipe-instr-label": "Instructions / Steps",
        "recipe-add-step": "Add Step",
        "recipe-upload-photo": "Upload Cocktail Photo",
        "recipe-name-label": "Cocktail Name",
        "recipe-desc-label": "Short Description",
        "recipe-ing-label": "Ingredients (Amount | Unit | Name)",
        "recipe-add-ing": "Add Ingredient",
        "recipe-glass-label": "Glassware",

        // Kitchen Page
        "kitchen-title": "The Kitchen",
        "kitchen-intro-text": "Discover techniques, chemistry behind mixology, and homemade ingredients.",

        // Shopping List
        "shopping-title": "Shopping List",
        "shopping-empty": "Your list is empty. Start adding ingredients!",
        "shopping-smart-title": "Smart Buy Recommendations",
        "shopping-unlocks": "Unlocks {0} new cocktails!",
        "shopping-used-in": "Used in {0} recipes",
        "shopping-add-btn": "Add",
        "shopping-unlocks-label": "Unlocks:",
        "shopping-popular-label": "Popular in:",

        // Cocktail Card & UI
        "card-missing": "Missing {0}",
        "card-mine": "MINE",
        "card-premium-work": "A premium masterwork.",
        "card-servings": "Servings:",
        "card-ingredients": "Ingredients:",
        "card-glassware": "Glassware:",
        "card-standard": "Standard",
        "card-ice": "Ice:",
        "card-none": "None",
        "card-method": "Method: {0}",
        "card-step": "Step {0}:",
        "card-no-desc": "No description provided.",

        // Categories
        "cat-gin": "Gin",
        "cat-vodka": "Vodka",
        "cat-rum": "Rum",
        "cat-tequila": "Tequila & Mezcal",
        "cat-whiskey": "Whiskey & Cask",
        "cat-aperitif": "Aperitifs & Spritz",
        "cat-favorites": "Favorites",
        "cat-others": "Variety & Classics",
        "cat-my-recipes": "My Masterpieces",

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
                el.innerHTML = translation;
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
 * Utility to get a single translation string with optional parameter replacement
 * @param {string} key - The translation key
 * @param {Array} params - Optional array of values to replace {0}, {1}, etc.
 */
export function t(key, params = []) {
    let text = translations[currentLang][key] || key;
    if (params && params.length > 0) {
        params.forEach((p, i) => {
            text = text.replace(`{${i}}`, p);
        });
    }
    return text;
}

export function getCurrentLang() {
    return currentLang;
}
