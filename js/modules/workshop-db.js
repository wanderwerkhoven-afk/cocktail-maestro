/* ============================================================
 * WORKSHOP SPECIFIC RECIPES
 * ============================================================ */

export const workshopCocktails = [
    {
        id: 'side-car',
        name: "Side Car",
        category: ["Prohibition", "Sour", "Strong", "Classic"],
        description: "An elegant prohibition-era classic with crisp citrus and rich cognac warmth.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Cognac", fridgeCategory: "spirit" },
            { amount: 20, unit: "ml", name: "Cointreau", fridgeCategory: "liqueur" },
            { amount: 20, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 10, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup" }
        ],
        glassware: "Coupe",
        ice: "No ice",
        method: "Shaken",
        methodDesc: "Shake all ingredients with ice and strain into a chilled sugar-rimmed coupe glass.",
        image: "./assets/Cocktails/sidecar.webp"
    },
    {
        id: 'bees-knees-w',
        name: "Bees Knees",
        category: ["Prohibition", "Honey", "Sour", "Classic"],
        description: "A bright and floral gin classic sweetened with rich honey syrup.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 60, unit: "ml", name: "honey syrup", fridgeCategory: "syrup" }
        ],
        glassware: "Coupe",
        ice: "No ice",
        method: "Shaken",
        methodDesc: "Shake with ice and double strain into a chilled coupe.",
        image: "./assets/Cocktails/beesknees.webp"
    },
    {
        id: 'south-side',
        name: "South Side",
        category: ["Prohibition", "Minty", "Fresh", "Classic"],
        description: "The crisp, refreshing minty cousin of the Gimlet, famously linked to Al Capone.",
        ingredients: [
            { amount: 50, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 20, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 10, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup" },
            { amount: 8, unit: "pcs", name: "Mint leaves", fridgeCategory: "fresh" }
        ],
        glassware: "Coupe",
        ice: "No ice",
        method: "Shaken",
        methodDesc: "Clap mint to release oils, add to shaker with other ingredients and ice. Shake hard and double strain.",
        image: "./assets/Cocktails/southside.webp"
    },
    {
        id: 'lychacha',
        name: "Lychacha",
        category: ["New Wave", "Fruity", "Tropical"],
        description: "A modern exotic delight blending lychee sweetness with a crisp base.",
        ingredients: [
            { amount: 40, unit: "ml", name: "Lychee liqueur", fridgeCategory: "liqueur" },
            { amount: 30, unit: "ml", name: "Aperol", fridgeCategory: "liqueur" },
            { amount: 30, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 20, unit: "ml", name: "Elderflower syrup", fridgeCategory: "syrup" },
            { amount: 2, unit: "pcs", name: "Zure matten", fridgeCategory: "fresh" }
        ],
        glassware: "Coupe",
        ice: "No ice",
        method: "Shaken",
        methodDesc: "Shake with ice and strain into a chilled coupe. Garnish with a whole lychee.",
        image: "./assets/Cocktails/lychacha.webp"
    },
    {
        id: 'pornstar-martini',
        name: "Pornstar Martini",
        category: ["New Wave", "Modern", "Sweet", "Fruity"],
        description: "A world-famous indulgent blend of passion fruit, vanilla, and lime, served with a prosecco sidecar.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Vanilla vodka", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Passoa", fridgeCategory: "liqueur" },
            { amount: 30, unit: "ml", name: "Passion fruit purée", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 10, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup" }
        ],
        glassware: "Coupe",
        ice: "No ice",
        method: "Shaken",
        methodDesc: "Shake all ingredients with ice and double strain. Serve with a shot of Prosecco on the side.",
        image: "./assets/Cocktails/pornstarmartini.webp"
    },
    {
        id: 'espresso-martini-bueno',
        name: "Espresso Martini Bueno",
        category: ["New Wave", "Indulgent", "Coffee"],
        description: "A luxurious twist on the Espresso Martini with rich hazelnut notes reminiscent of Kinder Bueno.",
        ingredients: [
            { amount: 40, unit: "ml", name: "Vodka", fridgeCategory: "spirit" },
            { amount: 40, unit: "ml", name: "Fresh espresso", fridgeCategory: "fresh" },
            { amount: 20, unit: "ml", name: "Frangelico", fridgeCategory: "liqueur" },
            { amount: 30, unit: "ml", name: "Coffee Liqueur", fridgeCategory: "liqueur" },
            { amount: 10, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup" },
        ],
        glassware: "Coupe",
        ice: "No ice",
        method: "Shaken",
        methodDesc: "Shake very hard with ice to create a thick foam. Double strain into a chilled coupe.",
        image: "./assets/Cocktails/espressomartinibueno.webp"
    },
    {
        id: 'yuzu-sour',
        name: "Yuzu Sour",
        category: ["New Wave", "Sour", "Floral"],
        description: "A complex and aromatic citrus sour with the unique floral profile of Japanese Yuzu.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Yuzu purée", fridgeCategory: "juice" },
            { amount: 20, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup" },
            { amount: 1, unit: "pcs", name: "Egg white", fridgeCategory: "fresh" }
        ],
        glassware: "Coupe",
        ice: "No ice",
        method: "Dry & Wet Shake",
        methodDesc: "Dry shake without ice, then wet shake with ice and double strain into a coupe.",
        image: "./assets/Cocktails/yuzusour.webp"
    },
    {
        id: 'mango-mustache',
        name: "Mango Mustache",
        category: ["New Wave", "Fruity", "Creamy"],
        description: "A silky, tropical mango cocktail with a signature creamy foam head.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Mango purée", fridgeCategory: "juice" },
            { amount: 30, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup" },
            { amount: 1, unit: "pcs", name: "Egg white", fridgeCategory: "fresh" }
        ],
        glassware: "Coupe",
        ice: "No ice",
        method: "Dry & Wet Shake",
        methodDesc: "Shake without ice to build foam, then shake with ice and strain.",
        image: "./assets/Cocktails/mangomustache.webp"
    },
    {
        id: 'zombie-tiki',
        name: "Zombie",
        category: ["Tiki", "Strong", "Tropical"],
        description: "A powerful blend of multiple rums and exotic spices. Warning: Limit two per customer!",
        ingredients: [
            { amount: 45, unit: "ml", name: "Light rum", fridgeCategory: "spirit" },
            { amount: 45, unit: "ml", name: "Dark rum", fridgeCategory: "spirit" },
            { amount: 10, unit: "ml", name: "Stroh 80", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Grapefruit juice", fridgeCategory: "juice" },
            { amount: 20, unit: "ml", name: "Cinnamon syrup", fridgeCategory: "syrup" },
            { amount: 10, unit: "ml", name: "Grenadine", fridgeCategory: "syrup" },
            { amount: 4, unit: "dash", name: "Angostura bitters", fridgeCategory: "syrup" },
            { amount: 1, unit: "sprig", name: "Mint", fridgeCategory: "fresh" },
            { amount: 2, unit: "pcs", name: "Dried orange wedge", fridgeCategory: "fresh" }
        ],
        glassware: "Tiki mug",
        ice: "Crushed ice",
        method: "Shaken",
        methodDesc: "Shake with ice and pour into a Tiki mug filled with fresh crushed ice.",
        image: "./assets/Cocktails/zombie.webp"
    },
    {
        id: 'mai-tai-tiki',
        name: "Mai Tai",
        category: ["Tiki", "Classic", "Tropical"],
        description: "The ultimate Tiki classic, perfectly balancing aged rum with almond and citrus.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Aged rum", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Orange Curaçao", fridgeCategory: "liqueur" },
            { amount: 20, unit: "ml", name: "Orgeat syrup", fridgeCategory: "syrup" },
            { amount: 20, unit: "ml", name: "Lime juice", fridgeCategory: "juice" }
        ],
        glassware: "Rocks glass",
        ice: "Crushed ice",
        method: "Shaken",
        methodDesc: "Shake all ingredients with crushed ice and pour unstrained into a rocks glass.",
        image: "./assets/Cocktails/maitai.webp"
    },
    {
        id: 'rum-punch-tiki',
        name: "Rum Punch",
        category: ["Tiki", "Tropical", "Easy-Drinking"],
        description: "A classic Caribbean party drink, sweet, fruity and dangerously easy to drink.",
        ingredients: [
            { amount: 30, unit: "ml", name: "Light rum", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Dark rum", fridgeCategory: "spirit" },
            { amount: 60, unit: "ml", name: "Pineapple juice", fridgeCategory: "juice" },
            { amount: 60, unit: "ml", name: "Orange juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 10, unit: "ml", name: "Grenadine", fridgeCategory: "syrup" }
        ],
        glassware: "Highball",
        ice: "Cubed ice",
        method: "Built",
        methodDesc: "Build all ingredients over ice and stir gently.",
        image: "./assets/Cocktails/rumpunch.webp"
    },
    {
        id: 'shot-b52',
        name: "B52",
        category: ["Shot", "Layered"],
        description: "A visually impressive layered shot of coffee, cream and orange.",
        ingredients: [
            { amount: 15, unit: "ml", name: "Coffee liqueur", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Irish cream", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Orange liqueur", fridgeCategory: "liqueur" },
            { amount: 5, unit: "ml", name: "Stroh 80", fridgeCategory: "spirit" }
        ],
        glassware: "Shot glass",
        ice: "No ice",
        method: "Layered",
        methodDesc: "Layer the ingredients in the order listed over the back of a spoon.",
        image: "./assets/Shots/b52.webp"
    },
    {
        id: 'shot-fuzzy-navel',
        name: "Fuzzy Navel",
        category: ["Shot", "Fruity"],
        description: "Simple, sweet and fruity.",
        ingredients: [
            { amount: 25, unit: "ml", name: "Peach schnapps", fridgeCategory: "liqueur" },
            { amount: 25, unit: "ml", name: "grenadine", fridgeCategory: "liqueur" }
        ],
        glassware: "Shot glass",
        ice: "No ice",
        method: "Shaken",
        methodDesc: "Shake with ice and strain into a shot glass.",
        image: "./assets/Shots/fuzzynavel.webp"
    },
    {
        id: 'shot-peaches-cream',
        name: "Peaches & Cream",
        category: ["Shot", "Creamy"],
        description: "A smooth, indulgent peach treat.",
        ingredients: [
            { amount: 25, unit: "ml", name: "Peach schnapps", fridgeCategory: "liqueur" },
            { amount: 25, unit: "ml", name: "Irish cream", fridgeCategory: "liqueur" }
        ],
        glassware: "Shot glass",
        ice: "No ice",
        method: "Shaken",
        methodDesc: "Shake with ice and strain into a shot glass.",
        image: "./assets/Shots/peachescream.webp"
    },
    {
        id: 'shot-jelly-fish',
        name: "Jelly Fish",
        category: ["Shot", "Visual"],
        description: "A stunning shot with tentacles of cream hanging in blue sea.",
        ingredients: [
            { amount: 20, unit: "ml", name: "White Sambuca", fridgeCategory: "spirit" },
            { amount: 20, unit: "ml", name: "Blue Curaçao", fridgeCategory: "liqueur" },
            { amount: 5, unit: "ml", name: "Irish cream", fridgeCategory: "liqueur" },
            { amount: 5, unit: "ml", name: "Grenadine", fridgeCategory: "syrup" }
        ],
        glassware: "Shot glass",
        ice: "No ice",
        method: "Built",
        methodDesc: "Pour Sambuca and Blue Curacao. Add a few drops of Irish cream for the jellyfish effect, then a drop of grenadine.",
        image: "./assets/Shots/jellyfish.webp"
    },
    {
        id: 'bees-knees-00',
        name: "0.0 Bees Knees",
        category: ["0.0%", "Alcohol-free", "Honey", "Sour"],
        description: "De alcoholvrije versie van de Bees Knees, gemaakt met 0.0 Gin.",
        ingredients: [
            { amount: 60, unit: "ml", name: "0.0 Gin", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 60, unit: "ml", name: "honey syrup", fridgeCategory: "syrup" }
        ],
        glassware: "Coupe",
        ice: "No ice",
        method: "Shaken",
        methodDesc: "Shake met ijs en double strain in een gekoelde coupe.",
        image: "./assets/Cocktails/beesknees.webp"
    },
    {
        id: 'yuzu-sour-00',
        name: "0.0 Yuzu Sour",
        category: ["0.0%", "Alcohol-free", "Sour", "Floral"],
        description: "Een complexe alcoholvrije citrus sour met de unieke bloemige tonen van Japanse Yuzu.",
        ingredients: [
            { amount: 60, unit: "ml", name: "0.0 Gin", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Yuzu purée", fridgeCategory: "juice" },
            { amount: 20, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup" },
            { amount: 1, unit: "pcs", name: "Egg white", fridgeCategory: "fresh" }
        ],
        glassware: "Coupe",
        ice: "No ice",
        method: "Dry & Wet Shake",
        methodDesc: "Dry shake zonder ijs, dan wet shake met ijs en double strain in een coupe.",
        image: "./assets/Cocktails/yuzusour.webp"
    },
    {
        id: 'mango-mustache-00',
        name: "0.0 Mango Mustache",
        category: ["0.0%", "Alcohol-free", "Fruity", "Creamy"],
        description: "Een zijdezachte, tropische mango cocktail zonder alcohol, met een kenmerkende schuimlaag.",
        ingredients: [
            { amount: 60, unit: "ml", name: "0.0 Gin", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Mango purée", fridgeCategory: "juice" },
            { amount: 30, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup" },
            { amount: 1, unit: "pcs", name: "Egg white", fridgeCategory: "fresh" }
        ],
        glassware: "Coupe",
        ice: "No ice",
        method: "Dry & Wet Shake",
        methodDesc: "Shake zonder ijs voor schuim, dan met ijs shaken en strainen.",
        image: "./assets/Cocktails/mangomustache.webp"
    },
    {
        id: 'zombie-00',
        name: "0.0 Zombie",
        category: ["0.0%", "Alcohol-free", "Tiki", "Tropical"],
        description: "Een krachtige tropische mocktail met kaneel en exotische vruchten.",
        ingredients: [
            { amount: 20, unit: "ml", name: "Cinnamon syrup", fridgeCategory: "syrup" },
            { amount: 20, unit: "ml", name: "Grenadine", fridgeCategory: "syrup" },
            { amount: 15, unit: "ml", name: "Orgeat syrup", fridgeCategory: "syrup" },
            { amount: 100, unit: "ml", name: "Orange juice", fridgeCategory: "juice" },
            { amount: 40, unit: "ml", name: "Grapefruit juice", fridgeCategory: "juice" },
            { amount: 1, unit: "sprig", name: "Mint", fridgeCategory: "fresh" }
        ],
        glassware: "Tiki mug",
        ice: "Crushed ice",
        method: "Shaken",
        methodDesc: "Shake met ijs en schenk in een Tiki mug gevuld met vers crushed ice. Vul aan met extra sinaasappelsap.",
        image: "./assets/Cocktails/zombie.webp"
    }
];
