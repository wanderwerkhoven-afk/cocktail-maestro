const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'js/modules/database.js');
const dbContent = fs.readFileSync(dbPath, 'utf8');

const mapping = {
    "vodka": "vodka",
    "vodka citron": "vodka citron",
    "caramel vodka": "caramel vodka",
    "gin": "gin",
    "bramble gin": "bramble gin",
    "white rum": "white rum",
    "dark rum": "dark rum",
    "bacardi rasp": "bacardi rasp",
    "tequila": "tequila",
    "bourbon": "bourbon",
    "rye whiskey": "rye whiskey",
    "jameson": "jameson",
    "cognac": "cognac",
    "jagermeister": "jagermeister",
    "cointreau": "cointreau",
    "triple sec": "cointreau",
    "campari": "campari",
    "aperol": "aperol",
    "sweet vermouth": "sweet vermouth",
    "dry vermouth": "dry vermouth",
    "amaretto": "amaretto",
    "coffee liqueur": "coffee liqueur",
    "kahlua": "coffee liqueur",
    "peachtree": "peachtree",
    "licor 43": "licor 43",
    "frangelico": "frangelico",
    "lillet blanc": "lillet blanc",
    "lychee liqueur": "lychee liqueur",
    "baileys": "baileys",
    "blue curacao": "blue curacao",
    "passoa": "passoa",
    "elderflower liqueur": "elderflower liqueur",
    "st germain": "elderflower liqueur",
    "blueberry liqueur": "blueberry liqueur",
    "sugar syrup": "sugar syrup",
    "orgeat": "orgeat",
    "grenadine": "grenadine",
    "mango puree": "mango puree",
    "coconut cream": "coconut cream",
    "cream of coconut": "coconut cream",
    "raspberry syrup": "raspberry syrup",
    "hazelnut syrup": "hazelnut syrup",
    "cinnamon syrup": "cinnamon syrup",
    "honey": "honey",
    "elderflower syrup": "elderflower syrup",
    "lime juice": "lime juice",
    "lemon juice": "lemon juice",
    "orange juice": "orange juice",
    "pineapple juice": "pineapple juice",
    "cranberry juice": "cranberry juice",
    "tomato juice": "tomato juice",
    "grapefruit soda": "grapefruit soda",
    "soda water": "soda water",
    "club soda": "soda water",
    "ginger beer": "ginger beer",
    "tonic water": "tonic water",
    "elderflower tonic": "elderflower tonic",
    "prosecco": "prosecco/champagne",
    "champagne": "prosecco/champagne",
    "cola": "cola",
    "iced tea": "iced tea",
    "sprite": "sprite",
    "7-up": "sprite",
    "fruit soda": "fruit soda",
    "fresh mint": "fresh mint",
    "mint leaves": "fresh mint",
    "fresh basil": "fresh basil",
    "basil leaves": "fresh basil",
    "egg white": "egg white",
    "angostura bitters": "angostura bitters",
    "sugar cube": "sugar cube",
    "espresso": "espresso",
    "olives": "olives",
    "cucumber": "Fresh cucumber",
    "Fresh cucumber": "Fresh cucumber",
    "red wine": "red wine",
    "milk": "milk"
};

// Simple regex to find ingredient objects and update them
// Match: { amount: X, unit: "Y", name: "Z" }
const updatedContent = dbContent.replace(/\{\s*amount:.*?,?.*?name:\s*"([^"]+)"\s*\}/gs, (match, name) => {
    const lowName = name.toLowerCase().trim();
    let category = null;

    for (const [key, value] of Object.entries(mapping)) {
        if (lowName.includes(key)) {
            category = value;
            break;
        }
    }

    if (category) {
        // If already has fridgeCategory, don't double add
        if (match.includes('fridgeCategory:')) return match;

        // Inject fridgeCategory before the closing brace
        return match.replace(/\s*\}\s*$/, `, fridgeCategory: "${category}" }`);
    }
    return match;
});

fs.writeFileSync(dbPath, updatedContent, 'utf8');
console.log('Database migration complete.');
