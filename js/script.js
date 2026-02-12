/* ============================================================
 * TABLE OF CONTENTS
 * ============================================================
 *  1.  COCKTAIL DATABASE (Classic Recipes)
 *
 *  2.  APP STATE & INITIALIZATION
 *      2.1  State Variables
 *      2.2  DOMContentLoaded Init
 *
 *  3.  NAVIGATION
 *      3.1  navigateTo()          – Switch pages & update nav bar
 *
 *  4.  SHOPPING LIST
 *      4.1  renderShoppingList()  – Render list items to DOM
 *      4.2  toggleItemCheck()     – Check / uncheck a list item
 *      4.3  removeFromShoppingList() – Remove a single item
 *      4.4  clearShoppingList()   – Clear entire list (with confirm)
 *      4.5  addToShoppingList()   – Add missing ingredient to list
 *
 *  5.  FAVORITES
 *      5.1  toggleFavorite()      – Add / remove from favorites
 *
 *  6.  VAULT & SEARCH
 *      6.1  renderVault()         – Render all cocktail cards + search filter
 *      6.2  downloadRecipe()      – Screenshot card and share / download
 *      6.3  updateServings()      – Scale ingredient amounts per servings
 *
 *  7.  RECIPE CREATION
 *      7.1  previewImage()        – Preview uploaded image before saving
 *      7.2  saveNewRecipe()       – Save a user-created recipe to localStorage
 *
 *  8.  FRIDGE & INGREDIENT MATCHING
 *      8.1  toggleCategory()      – Open / close ingredient category accordion
 *      8.2  updateFridge()        – Add / remove ingredient on checkbox change
 *      8.3  syncCheckboxes()      – Restore checkbox state from localStorage
 *      8.4  checkMatches()        – Find cocktails based on available ingredients
 * ============================================================ */


/* ============================================================
 * 1. COCKTAIL DATABASE (Classic Recipes)
 * ============================================================ */
const classicCocktails = [
    { 
        id: 'c1', 
        name: "Amaretto Sour", 
        category: ["Sweet", "Sour", "Classic", "Almond"], 
        description: "Nutty, sweet, and perfectly balanced with a silky texture.", 
        ingredients: [
            { amount: 60, unit: "ml", name: "Amaretto" },
            { amount: 30, unit: "ml", name: "Lemon juice" },
            { amount: 1,  unit: "pcs", name: "Egg white" },
            { amount: 2,  unit: "dashes", name: "Angostura bitters" }
        ], 
        method: "Shaken", 
        methodDesc: "Dry shake, then wet shake with ice. Garnish with a cherry.", 
        image: "./assets/amarettosour.png" 
    },
    { 
        id: 'c2', 
        name: "Aperol Spritz", 
        category: ["Light", "Sparkling", "Bitter"], 
        description: "The golden hour in a glass. Light and bubbly.", 
        ingredients: [
            { amount: 60, unit: "ml", name: "Prosecco" },
            { amount: 30, unit: "ml", name: "Aperol" },
            { amount: 15, unit: "ml", name: "Soda water" }
        ], 
        method: "Built", 
        methodDesc: "Fill a wine glass with ice. Add Prosecco, Aperol, and soda water.", 
        image: "./assets/aperolspritz.png" 
    },
    { 
        id: 'c3',
        name: "Bee's Knees",
        category: ["Classic", "Honey", "Sweet", "Sour"], 
        description: "A Prohibition-era classic that's the 'bee's knees'.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Gin" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 15, unit: "ml", name: "Honey syrup" },
            { amount: 10, unit: "ml", name: "Sugar syrup" }
        ], 
        method: "Shaken", 
        methodDesc: "Shake all ingredients with ice and strain into a chilled glass.", 
        image: "./assets/beesknees.png" 
    },
    { 
        id: 'c4', 
        name: "Bloody Mary", 
        category: ["Savory", "Vodka"], 
        description: "A savory classic, perfect for brunch or recovery.", 
        ingredients: [
            { amount: 45,  unit: "ml", name: "Vodka" },
            { amount: 120, unit: "ml", name: "Tomato juice" },
            { amount: 15,  unit: "ml", name: "Worcestershire sauce" },
            { amount: 5,   unit: "ml", name: "Tabasco sauce" }
        ], 
        method: "Rolled", 
        methodDesc: "Roll the ingredients between two shakers to mix.", 
        image: "./assets/bloodymary.png" 
    },
    { 
        id: 'c5', 
        name: "Blueberry Mule", 
        category: ["Blue", "Ginger", "Spicy"], 
        description: "A blue variation of the Moscow Mule.", 
        ingredients: [
            { amount: 45,  unit: "ml", name: "Vodka" },
            { amount: 120, unit: "ml", name: "Blue Curacao" },
            { amount: 30,  unit: "ml", name: "Blueberry liqueur" },
            { amount: 15,  unit: "ml", name: "Lime juice" },
            { amount: 120, unit: "ml", name: "Ginger beer" }
        ], 
        method: "Built", 
        methodDesc: "Build directly in a mug. Stir gently to mix colors.", 
        image: "./assets/blueberrymule.png" 
    },
    { 
        id: 'c6', 
        name: "Clover Club", 
        category: ["Sour", "Elegant", "Raspberry", "Pink"], 
        description: "A silky smooth, pink classic with raspberry notes.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Gin" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 15, unit: "ml", name: "Raspberry syrup" },
            { amount: 15, unit: "ml", name: "Egg white" }
        ], 
        method: "Dry Shake & Shake", 
        methodDesc: "Dry shake first to foam. Add ice, shake again, and strain.", 
        image: "./assets/cloverclub.png" 
    },
    { 
        id: 'c7', 
        name: "Corpse Reviver #2", 
        category: ["Classic", "Strong", "Orange", "Lemon"], 
        description: "Designed to wake you up after a long night.", 
        ingredients: [
            { amount: 30, unit: "ml", name: "Gin" },
            { amount: 15, unit: "ml", name: "Lillet Blanc" },
            { amount: 15, unit: "ml", name: "Cointreau" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 2,  unit: "dashes", name: "Angostura bitters" }
        ], 
        method: "Shaken", 
        methodDesc: "Shake with ice and strain into an absinthe-rinsed glass.", 
        image: "./assets/corpsreviver2.png" 
    },
    { 
        id: 'c8', 
        name: "Cosmopolitan", 
        category: ["Fruit", "Vodka", "Pink"], 
        description: "Elegant, tart, and pink. A modern classic.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Vodka Citron" },
            { amount: 15, unit: "ml", name: "Cointreau" },
            { amount: 30, unit: "ml", name: "Cranberry juice" },
            { amount: 15, unit: "ml", name: "Lime juice" }
        ], 
        method: "Shaken", 
        methodDesc: "Shake with ice and strain into a chilled martini glass.", 
        image: "./assets/cosmopolitan.png" 
    },
    { 
        id: 'c9', 
        name: "Daiquiri", 
        category: ["Sour", "Rum"], 
        description: "The ultimate test of a good rum: simple, sharp, and clean.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "White Rum" },
            { amount: 15, unit: "ml", name: "Lime juice" },
            { amount: 15, unit: "ml", name: "Sugar syrup" }
        ], 
        method: "Shaken", 
        methodDesc: "Shake with ice and strain into a chilled coupe. No ice in the glass!", 
        image: "./assets/daiquri.png" 
    },
    { 
        id: 'c10', 
        name: "Dark 'n Stormy", 
        category: ["Spicy", "Rum"], 
        description: "A moody, delicious storm of dark rum and ginger.", 
        ingredients: [
            { amount: 60,  unit: "ml", name: "Dark Rum" },
            { amount: 120, unit: "ml", name: "Ginger beer" },
            { amount: 15,  unit: "ml", name: "Lime juice" }
        ], 
        method: "Layered", 
        methodDesc: "Pour ginger beer over ice. Float dark rum on top.", 
        image: "./assets/darkenstormy.png" 
    },
    { 
        id: 'c11', 
        name: "Dry Martini", 
        category: ["Strong", "Gin"], 
        description: "The definition of elegance: cold and precise.", 
        ingredients: [
            { amount: 60, unit: "ml", name: "Gin" },
            { amount: 15, unit: "ml", name: "Dry Vermouth" },
            { amount: 1,  unit: "dash", name: "Angostura bitters" }
        ], 
        method: "Stirred", 
        methodDesc: "Stir with ice until ice cold. Strain into a martini glass.", 
        image: "./assets/drymartini.jpg" 
    },
    { 
        id: 'c12', 
        name: "Espresso Martini", 
        category: ["Coffee", "Vodka"], 
        description: "Wake up and smell the vodka: a perfect pick-me-up.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Vodka" },
            { amount: 15, unit: "ml", name: "Coffee liqueur" },
            { amount: 30, unit: "ml", name: "Espresso" },
            { amount: 15, unit: "ml", name: "Sugar syrup" }
        ], 
        method: "Hard Shake", 
        methodDesc: "Shake hard with ice to create a thick foam layer. Strain into a coupe.", 
        image: "./assets/espressomartini.png" 
    },
    { 
        id: 'c13', 
        name: "Espresso Martini Bueno", 
        category: ["Energy", "Coffee", "Sweet", "Bitter"], 
        description: "A delicious variation with a hint of hazelnut.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Vodka" },
            { amount: 15, unit: "ml", name: "Frangelico" },
            { amount: 30, unit: "ml", name: "Espresso" },
            { amount: 15, unit: "ml", name: "Hazelnut syrup" }
        ], 
        method: "Shaken", 
        methodDesc: "Shake vigorously with plenty of ice. Strain into a martini glass.", 
        image: "./assets/bueno.png" 
    },
    { 
        id: 'c14', 
        name: "French 75", 
        category: ["Champagne", "Gin", "Lemon"], 
        description: "Festive and powerful, like a French field gun.", 
        ingredients: [ 
            { amount: 30, unit: "ml", name: "Gin" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 15, unit: "ml", name: "Sugar syrup" },
            { amount: 90, unit: "ml", name: "Prosecco/Champagne" }
        ], 
        method: "Shaken & Layered", 
        methodDesc: "Shake gin, lemon, and sugar. Top with prosecco or champagne in a flute.", 
        image: "./assets/french75.png" 
    },
    {
        id: 'c15', 
        name: "Garden Cocktail", 
        category: ["Fresh", "Floral", "Cucumber"], 
        description: "A refreshing floral mix with cucumber.", 
        ingredients: [ 
            { amount: 20, unit: "ml",  name: "Elderflower liqueur" },
            { amount: 50, unit: "ml",  name: "Gin" },
            { amount: 20, unit: "ml",  name: "Lime juice" },
            { amount: 6,  unit: "pcs", name: "Cucumber" },
            { amount: 15, unit: "ml",  name: "Sprite" }
        ], 
        method: "Muddled & Built", 
        methodDesc: "Muddle cucumber. Add liquids and ice. Top with Sprite.", 
        image: "./assets/garden.png" 
    },
    { 
        id: 'c16', 
        name: "Giant Sucker", 
        category: ["Herbal", "Unique", "Bubbly"], 
        description: "Jägermeister meets elderflower in a surprising way.", 
        ingredients: [ 
            { amount: 30, unit: "ml",  name: "Honey" },
            { amount: 45, unit: "ml",  name: "Jägermeister" },
            { amount: 10, unit: "pcs", name: "Fresh mint" },
            { amount: 15, unit: "ml",  name: "Elderflower tonic" }
        ], 
        method: "Stirred", 
        methodDesc: "Dissolve honey in Jägermeister. Top with elderflower tonic.", 
        image: "./assets/giantsucker.png" 
    },
    { 
        id: 'c17', 
        name: "Gin Basil Smash", 
        category: ["Modern", "Fresh", "Herbal"], 
        description: "Bright green and herbal: a modern classic.", 
        ingredients: [ 
            { amount: 45, unit: "ml",  name: "Gin" },
            { amount: 15, unit: "ml",  name: "Lemon juice" },
            { amount: 15, unit: "ml",  name: "Sugar syrup" },
            { amount: 10, unit: "pcs", name: "Fresh basil" }
        ], 
        method: "Muddled & Shaken", 
        methodDesc: "Muddle basil with sugar. Add gin and lemon, shake hard with ice.", 
        image: "./assets/ginbasil.png" 
    },
    { 
        id: 'c18', 
        name: "Gin Fizz", 
        category: ["Sparkling", "Refreshing"], 
        description: "Light, fizzy, and sophisticated.", 
        ingredients: [ 
            { amount: 45, unit: "ml", name: "Gin" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 15, unit: "ml", name: "Sugar syrup" },
            { amount: 30, unit: "ml", name: "Soda water" }
        ], 
        method: "Shaken & Built", 
        methodDesc: "Shake gin, lemon, and sugar. Top with soda water.", 
        image: "./assets/ginfizz.png" 
    },
    { 
        id: 'c19', 
        name: "Groen Plansoen", 
        category: ["Fresh", "Floral", "Cucumber"], 
        description: "A botanical mix with elderflower and green tea notes.", 
        ingredients: [ 
            { amount: 45, unit: "ml", name: "Gin" },
            { amount: 15, unit: "ml", name: "Elderflower liqueur" },
            { amount: 15, unit: "ml", name: "Lime juice" },
            { amount: 15, unit: "ml", name: "Elderflower syrup" },
            { amount: 20, unit: "ml", name: "Cucumber juice" },
            { amount: 30, unit: "ml", name: "Iced tea" }
        ], 
        method: "Built", 
        methodDesc: "Build in a highball glass. Garnish with a cucumber ribbon.", 
        image: "./assets/groenplansoen.png" 
    },
    { 
        id: 'c20', 
        name: "Holy Peach", 
        category: ["Sweet", "Fruity", "Peach"], 
        description: "A sweet mix of peach and vanilla notes.", 
        ingredients: [ 
            { amount: 30, unit: "ml", name: "Peachtree" },
            { amount: 15, unit: "ml", name: "Licor 43" },
            { amount: 15, unit: "ml", name: "Lime juice" },
            { amount: 20, unit: "ml", name: "Sprite" }
        ], 
        method: "Built", 
        methodDesc: "Build in a longdrink glass. Top with Sprite or green iced tea.", 
        image: "./assets/holypeach.png" 
    },
    { 
        id: 'c21', 
        name: "Long Island Ice Tea", 
        category: ["Very-Strong", "Classic"], 
        description: "A powerful blend of five different spirits.", 
        ingredients: [ 
            { amount: 20, unit: "ml", name: "White Rum" },
            { amount: 20, unit: "ml", name: "Gin" },
            { amount: 20, unit: "ml", name: "Vodka" },
            { amount: 20, unit: "ml", name: "Tequila" },
            { amount: 15, unit: "ml", name: "Cointreau" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 15, unit: "ml", name: "Sugar syrup" },
            { amount: 30, unit: "ml", name: "Cola" }
        ], 
        method: "Built", 
        methodDesc: "Add all spirits and lemon juice. Top with cola and stir gently.", 
        image: "./assets/longisland.png" 
    },
    { 
        id: 'c22', 
        name: "Lychacha", 
        category: ["Exotic", "Floral", "Lychee", "Sweet", "Sour"], 
        description: "A unique mix of lychee and Aperol.", 
        ingredients: [ 
            { amount: 20, unit: "ml", name: "Elderflower syrup" },
            { amount: 20, unit: "ml", name: "Lychee liqueur" },
            { amount: 20, unit: "ml", name: "Aperol" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 15, unit: "ml", name: "Egg white" }
        ], 
        method: "Shaken", 
        methodDesc: "Shake vigorously with egg white for a thick foam.", 
        image: "./assets/lychacha.png" 
    },
    {  
        id: 'c23', 
        name: "Mango Mustache", 
        category: ["Fruity", "Sour", "Sweet", "Mango"], 
        description: "A silky smooth mango cocktail with a gin base.", 
        ingredients: [ 
            { amount: 20, unit: "ml", name: "Sugar syrup" },
            { amount: 20, unit: "ml", name: "Mango puree" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 30, unit: "ml", name: "Gin" },
            { amount: 15, unit: "ml", name: "Egg white" }
        ], 
        method: "Shaken", 
        methodDesc: "Dry shake, then wet shake. Strain into a coupe glass.", 
        image: "./assets/mangomustach.png" 
    },
    { 
        id: 'c24', 
        name: "Manhattan", 
        category: ["Strong", "Spirit-Forward"], 
        description: "Rich and moody: the king of whiskey cocktails.", 
        ingredients: [ 
            { amount: 50, unit: "ml",     name: "Rye Whiskey" },
            { amount: 30, unit: "ml",     name: "Sweet Vermouth" },
            { amount: 2,  unit: "dashes", name: "Angostura bitters" }
        ], 
        method: "Stirred", 
        methodDesc: "Stir with ice. Strain into a chilled coupe. Garnish with a cherry.", 
        image: "./assets/manhattan.png" 
    },
    { 
        id: 'c25', 
        name: "Margarita", 
        category: ["Sour", "Tequila"], 
        description: "Fresh, sharp, and salty: the perfect harmony of lime and tequila.", 
        ingredients: [ 
            { amount: 50, unit: "ml",  name: "Tequila" },
            { amount: 25, unit: "ml",  name: "Cointreau" },
            { amount: 25, unit: "ml",  name: "Lime juice" },
            { amount: 1,  unit: "tsp", name: "Salt" }
        ], 
        method: "Shaken", 
        methodDesc: "Shake all ingredients with ice and strain into a salt-rimmed glass.", 
        image: "./assets/margerita.png" 
    },
    { 
        id: 'c26', 
        name: "Mojito", 
        category: ["Refreshing", "Rum"], 
        description: "A Cuban favorite: minty, sweet, and incredibly refreshing.", 
        ingredients: [ 
            { amount: 50, unit: "ml", name: "White Rum" },
            { amount: 10, unit: "g",  name: "Fresh mint" },
            { amount: 15, unit: "ml", name: "Sugar syrup" },
            { amount: 25, unit: "ml", name: "Soda water" },
            { amount: 25, unit: "ml", name: "Lime juice" }
        ], 
        method: "Muddled", 
        methodDesc: "Muddle mint and sugar. Add rum, lime, and ice. Top with soda water.", 
        image: "./assets/mojito.png" 
    },
    { 
        id: 'c27', 
        name: "Moscow Mule", 
        category: ["Spicy", "Vodka"], 
        description: "Crisp and refreshing with a spicy ginger kick.", 
        ingredients: [ 
            { amount: 50,  unit: "ml", name: "Vodka" },
            { amount: 25,  unit: "ml", name: "Lime juice" },
            { amount: 125, unit: "ml", name: "Ginger beer" }
        ], 
        method: "Built", 
        methodDesc: "Build directly in a copper mug filled with ice. Stir gently.", 
        image: "./assets/moskoumule.png" 
    },
    { 
        id: 'c28', 
        name: "Muddy Mudslide", 
        category: ["Creamy", "Coffee", "Caramel"], 
        description: "A rich coffee cocktail with Baileys and caramel.", 
        ingredients: [ 
            { amount: 30, unit: "ml", name: "Baileys" },
            { amount: 30, unit: "ml", name: "Caramel vodka" },
            { amount: 30, unit: "ml", name: "Coffee liqueur" },
            { amount: 30, unit: "ml", name: "Espresso" }
        ], 
        method: "Stirred", 
        methodDesc: "Stir with a large ice cube for 10 seconds.", 
        image: "./assets/mudslide.jpg" 
    },
    { 
        id: 'c29', 
        name: "Negroni", 
        category: ["Bitter", "Gin"], 
        description: "The bartender's favorite: complex, bitter, and ruby red.", 
        ingredients: [ 
            { amount: 30, unit: "ml", name: "Gin" },
            { amount: 30, unit: "ml", name: "Campari" },
            { amount: 30, unit: "ml", name: "Sweet Vermouth" }
        ], 
        method: "Stirred", 
        methodDesc: "Stir ingredients with ice and strain into a rocks glass over a large ice cube.", 
        image: "./assets/negroni.png" 
    },
    { 
        id: 'c30', 
        name: "New York Sour", 
        category: ["Classic", "Wine twist", "Sour"], 
        description: "A Whiskey Sour topped with a beautiful red wine float.", 
        ingredients: [ 
            { amount: 45, unit: "ml",         name: "Jameson" },
            { amount: 15, unit: "ml",         name: "Lemon juice" },
            { amount: 15, unit: "ml",         name: "Sugar syrup" },
            { amount: 1,  unit: "egg white",  name: "Egg white" },
            { amount: 30, unit: "ml",         name: "Red wine" }
        ], 
        method: "Shake & Float", 
        methodDesc: "Make a sour. Gently float red wine on top using a spoon.", 
        image: "./assets/newyorksour.png" 
    },
    { 
        id: 'c31', 
        name: "Old Fashioned", 
        category: ["Strong", "Classic", "Spirit-Forward"], 
        description: "The ultimate whiskey classic: sophisticated, balanced, and timeless.", 
        ingredients: [ 
            { amount: 45, unit: "ml",     name: "Bourbon" },
            { amount: 1,  unit: "cube",   name: "Sugar cube" },
            { amount: 2,  unit: "drops",  name: "Angostura bitters" },
            { amount: 1,  unit: "tsp",    name: "Orange zest" }
        ],
        method: "Stirred", 
        methodDesc: "Muddle sugar with bitters and water. Add bourbon and ice, stir for 30 seconds.", 
        image: "./assets/oldfashion.png" 
    },
    { 
        id: 'c32', 
        name: "Paloma", 
        category: ["Fresh", "Tequila"], 
        description: "Mexico's true favorite: grapefruit meets tequila.", 
        ingredients: [ 
            { amount: 45, unit: "ml", name: "Tequila" },
            { amount: 15, unit: "ml", name: "Lime juice" },
            { amount: 90, unit: "ml", name: "Grapefruit soda" }
        ], 
        method: "Built", 
        methodDesc: "Build in a glass with a salt rim. Top with grapefruit soda.", 
        image: "./assets/paloma.png" 
    },
    { 
        id: 'c33', 
        name: "Pina Colada", 
        category: ["Tropical", "Sweet"], 
        description: "A vacation in a glass: creamy coconut and sweet pineapple.", 
        ingredients: [ 
            { amount: 45, unit: "ml", name: "White Rum" },
            { amount: 30, unit: "ml", name: "Coconut cream" },
            { amount: 60, unit: "ml", name: "Pineapple juice" }
        ], 
        method: "Blended", 
        methodDesc: "Blend all ingredients with ice until smooth and creamy.", 
        image: "./assets/pinacolada.png" 
    },
    { 
        id: 'c34', 
        name: "Red Flamingo", 
        category: ["Fruity", "Sparkling", "Fresh"], 
        description: "A bright pink thirst-quencher with bramble and raspberry.", 
        ingredients:[ 
            { amount: 45, unit: "ml", name: "Bramble gin" },
            { amount: 15, unit: "ml", name: "Cointreau" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 10, unit: "ml", name: "Raspberry syrup" },
            { amount: 30, unit: "ml", name: "Soda water" }
        ], 
        method: "Shake & Top", 
        methodDesc: "Shake all except soda. Strain and top with sparkling water.", 
        image: "./assets/redflamingo.png" 
    },
    { 
        id: 'c35',
        name: 'Rosemary & Peach Sour',
        category: ['Vodka', 'Herbal', 'Velvet'],
        description: 'A sophisticated peach sour with a hint of rosemary.',
        ingredients:[ 
            { amount: 45, unit: "ml", name: "Vodka" },
            { amount: 20, unit: "ml", name: "Peachtree" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 10, unit: "ml", name: "Sugar syrup" },
            { amount: 20, unit: "ml", name: "Milk" }
        ],
        method: 'Shaken',
        methodDesc: 'Shake for 30 seconds with ice to create a smooth texture.',
        image: './assets/rosemarypeach.png'
    },
    { 
        id: 'c36',
        name: 'Sidecar',
        category: ['Classic', 'Sour', 'Cognac', "1920's"],
        description: 'A legendary cognac cocktail with a sugar rim.',
        ingredients:[ 
            { amount: 45, unit: "ml", name: "Cognac" },
            { amount: 15, unit: "ml", name: "Cointreau" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 10, unit: "ml", name: "Sugar syrup" }
        ],
        method: 'Shaken',
        methodDesc: 'Shake with ice and strain into a sugar-rimmed coupe.',
        image: './assets/sidecar.png'
    },
    { 
        id: 'c37',
        name: 'South Side',
        category: ['Classic', 'Refreshing', 'Minty', "1920's"],
        description: 'The gin-based version of a Mojito, elegant and minty.',
        ingredients:[ 
            { amount: 45, unit: "ml",     name: "Gin" },
            { amount: 15, unit: "ml",     name: "Lemon juice" },
            { amount: 10, unit: "ml",     name: "Sugar syrup" },
            { amount: 8,  unit: "leaves", name: "Fresh mint" }
        ],
        method: 'Shaken',
        methodDesc: 'Shake ingredients with mint and ice. Double strain into a coupe.',
        image: './assets/southside.png'
    },
    { 
        id: 'c38', 
        name: "Tropical Hurricane", 
        category: ["Tiki", "Fruity"], 
        description: "A tropical storm in a glass.", 
        ingredients: [
            { amount: 30, unit: "ml", name: "Bacardi Rasp" },
            { amount: 30, unit: "ml", name: "Peachtree" },
            { amount: 20, unit: "ml", name: "Lime juice" },
            { amount: 10, unit: "ml", name: "Orange juice" }
        ],
        method: "Shaken", 
        methodDesc: "Shake liquids. Top with passion fruit juice.", 
        image: "./assets/tropicalhurricane.png"
    },
    { 
        id: 'c39', 
        name: "Wandering Cosmo", 
        category: ["Fruity", "Riff", "Pasionfruit"], 
        description: "A modern twist on the classic Cosmopolitan.", 
        ingredients: [
            { amount: 20, unit: "ml", name: "Passoa" },
            { amount: 15, unit: "ml", name: "Cointreau" },
            { amount: 30, unit: "ml", name: "Vodka" },
            { amount: 15, unit: "ml", name: "Lime juice" },
            { amount: 10, unit: "ml", name: "Fruit soda" }
        ], 
        method: "Shaken", 
        methodDesc: "Shake alcohol and lime. Top with red fruit soda.", 
        image: "./assets/wanderingcosmo.png" 
    },
    { 
        id: 'c40', 
        name: "Whiskey Sour", 
        category: ["Sour", "Classic"], 
        description: "Silky smooth thanks to the egg white, with a bold bourbon kick.", 
        ingredients: [
            { amount: 45, unit: "ml",         name: "Bourbon" },
            { amount: 15, unit: "ml",         name: "Lemon juice" },
            { amount: 10, unit: "ml",         name: "Sugar syrup" },
            { amount: 1,  unit: "egg white",  name: "Egg white" }
        ], 
        method: "Dry & Wet Shake", 
        methodDesc: "Shake without ice first, then with ice. Strain into a glass with fresh ice.", 
        image: "./assets/whiskeysour.png" 
    },
    { 
        id: 'c41', 
        name: "Zombie", 
        category: ["Strong", "Tiki", "Unique"], 
        description: "Famous, powerful, and mysterious. Limit: 2 per person!", 
        ingredients: [
            { amount: 30, unit: "ml",     name: "White Rum" },
            { amount: 30, unit: "ml",     name: "Dark Rum" },
            { amount: 20, unit: "ml",     name: "Orange juice" },
            { amount: 15, unit: "ml",     name: "Grenadine" },
            { amount: 10, unit: "ml",     name: "Cinnamon syrup" },
            { amount: 2,  unit: "dashes", name: "Angostura bitters" }
        ], 
        method: "Shake & Fire", 
        methodDesc: "Shake with ice. Top with overproof rum and light it.", 
        image: "./assets/zombie.png" 
    }
];


/* ============================================================
 * 2. APP STATE & INITIALIZATION
 * ============================================================ */

/* ---------- 2.1  State Variables ---------- */
let currentImageBase64 = "";
let myIngredients = JSON.parse(localStorage.getItem('myIngredients')) || [];
let myFavorites   = JSON.parse(localStorage.getItem('myFavorites'))   || [];
let shoppingList  = JSON.parse(localStorage.getItem('shoppingList'))  || [];

/* ---------- 2.2  DOMContentLoaded Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');
});


/* ============================================================
 * 3. NAVIGATION
 * ============================================================ */

/* ---------- 3.1  navigateTo() ---------- */
function navigateTo(pageId) {
    // Switch active page
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const activePage = document.getElementById(pageId + '-page');
    if (activePage) activePage.classList.add('active');

    // Update bottom nav icons
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    const activeNav = document.getElementById('nav-' + pageId);
    if (activeNav) activeNav.classList.add('active');

    // Page-specific actions on load
    if (pageId === 'vault')    renderVault();
    if (pageId === 'fridge')   syncCheckboxes();
    if (pageId === 'shopping') renderShoppingList();
    if (pageId === 'recipes')  renderMyRecipes();
}


/* ============================================================
 * 4. SHOPPING LIST
 * ============================================================ */

/* ---------- 4.1  renderShoppingList() ---------- */
function renderShoppingList() {
    const listContainer = document.getElementById('shopping-list-items');
    const emptyState    = document.getElementById('shopping-list-empty');
    if (!listContainer) return;

    listContainer.innerHTML = "";

    if (shoppingList.length === 0) {
        if (emptyState) emptyState.style.display = "block";
    } else {
        if (emptyState) emptyState.style.display = "none";
        
        shoppingList.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = `shopping-item ${item.checked ? 'checked' : ''}`;
            
            li.innerHTML = `
                <div class="shopping-item-info" onclick="toggleItemCheck(${index})">
                    <i class="${item.checked ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}"></i>
                    <span class="shopping-item-name">${item.name}</span>
                </div>
                <button class="remove-item-btn" onclick="removeFromShoppingList(${index})">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            `;
            listContainer.appendChild(li);
        });
    }
}

/* ---------- 4.2  toggleItemCheck() ---------- */
function toggleItemCheck(index) {
    shoppingList[index].checked = !shoppingList[index].checked;
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    renderShoppingList();
}

/* ---------- 4.3  removeFromShoppingList() ---------- */
function removeFromShoppingList(index) {
    shoppingList.splice(index, 1);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    renderShoppingList();
}

/* ---------- 4.4  clearShoppingList() ---------- */
function clearShoppingList() {
    if (shoppingList.length === 0) return;
    if (confirm("Wil je de hele lijst leegmaken?")) {
        shoppingList = [];
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        renderShoppingList();
    }
}

/* ---------- 4.5  addToShoppingList() ---------- */
function addToShoppingList(e, ingredient) {
    e.stopPropagation();
    
    const exists = shoppingList.some(item => item.name === ingredient);
    
    if (!exists) {
        shoppingList.push({ name: ingredient, checked: false });
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
        alert(`${ingredient} added!`);
    } else {
        alert(`${ingredient} is already on the list.`);
    }
}


/* ============================================================
 * 5. FAVORITES
 * ============================================================ */

/* ---------- 5.1  toggleFavorite() ---------- */
function toggleFavorite(e, cocktailId) {
    e.stopPropagation();
    
    const index = myFavorites.indexOf(cocktailId);
    if (index > -1) {
        myFavorites.splice(index, 1);
    } else {
        myFavorites.push(cocktailId);
    }
    
    localStorage.setItem('myFavorites', JSON.stringify(myFavorites));
    
    // Re-render the active page to reflect the change
    if (document.getElementById('vault-page').classList.contains('active')) {
        renderVault(document.getElementById('vault-search')?.value || "");
    } else if (document.getElementById('fridge-page').classList.contains('active')) {
        checkMatches();
    }
}


/* ============================================================
 * 6. VAULT & SEARCH
 * ============================================================ */

/* ---------- 6.1  renderVault() ---------- */
function renderVault(filter = "") {
    const vaultGrid = document.getElementById('vault-grid');
    if (!vaultGrid) return;

    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    
    // Combine lists and sort: favorites first, then alphabetically
    const allCocktails = [...classicCocktails, ...myRecipes].sort((a, b) => {
        const aFav = myFavorites.includes(a.id);
        const bFav = myFavorites.includes(b.id);
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
        return a.name.localeCompare(b.name);
    });

    vaultGrid.innerHTML = "";
    const searchTerm = filter.toLowerCase();

    // Filter the list by name, ingredient, or category
    const filtered = allCocktails.filter(c => {
        const nameMatch = c.name.toLowerCase().includes(searchTerm);
        const ingredientMatch = c.ingredients.some(i => {
            const ingName = typeof i === 'object' ? i.name : i;
            return ingName.toLowerCase().includes(searchTerm);
        });
        const categoryMatch = Array.isArray(c.category) 
            ? c.category.some(cat => cat.toLowerCase().includes(searchTerm))
            : c.category.toLowerCase().includes(searchTerm);

        return nameMatch || ingredientMatch || categoryMatch;
    });

    // Render cocktail cards
    filtered.forEach(cocktail => {
        const isFav = myFavorites.includes(cocktail.id);
        const card  = document.createElement('div');
        card.className = `cocktail-card ${isFav ? 'is-favorite' : ''}`;
        
        card.onclick = function(e) { 
            if (!e.target.closest('.download-btn') && 
                !e.target.closest('.fav-btn') && 
                !e.target.closest('.counter-btn')) {
                this.classList.toggle('open'); 
            }
        };

        card.innerHTML = `
            <div class="card-thumb-large">
                <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(event, '${cocktail.id}')">
                    <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-star"></i>
                </button>
                <img src="${cocktail.image}" alt="${cocktail.name}">
                <button class="download-btn" onclick="downloadRecipe('${cocktail.id}')">
                    <i class="fa-solid fa-download"></i>
                </button>
            </div>
            <div class="card-content">
                <h4>${cocktail.name} ${isFav ? '⭐' : ''}</h4>
                <div class="category-container">
                    ${Array.isArray(cocktail.category) 
                        ? cocktail.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')
                        : `<span class="category-tag">${cocktail.category}</span>`
                    }
                </div>
                <p class="description">${cocktail.description || "A custom masterpiece."}</p>
                
                <div class="collapsible-content">
                    <div class="servings-control">
                        <span>Servings:</span>
                        <div class="counter-box">
                            <button class="counter-btn" onclick="updateServings(event, '${cocktail.id}', -1)">-</button>
                            <span id="servings-${cocktail.id}">1</span>
                            <button class="counter-btn" onclick="updateServings(event, '${cocktail.id}', 1)">+</button>
                        </div>
                    </div>
                    <div class="ingredients-section">
                        <strong>Ingredients:</strong> 
                        <ul class="ingredients-list" id="ingredients-${cocktail.id}">
                            ${cocktail.ingredients.map(ing => {
                                if (typeof ing === 'object' && ing.amount) {
                                    return `<li><span class="amount">${ing.amount}</span> <span class="unit">${ing.unit}</span> ${ing.name}</li>`;
                                }
                                return `<li>${ing}</li>`;
                            }).join('')}
                        </ul>
                    </div>
                    <div class="method-section">
                        <strong>Method: ${cocktail.method}</strong>
                        <p class="method-text">${cocktail.methodDesc}</p>
                    </div>
                </div>
            </div>
        `;
        vaultGrid.appendChild(card);
    });
}

/* ---------- 6.2  downloadRecipe() ---------- */
async function downloadRecipe(cocktailId) {
    const cardElement = document.querySelector('.cocktail-card.open');
    if (!cardElement) return;

    try {
        const btn = cardElement.querySelector('.download-btn');
        
        // Temporarily hide button so it doesn't appear in the screenshot
        if (btn) btn.style.opacity = '0'; 

        const canvas = await html2canvas(cardElement, {
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#1E1E1E",
            scale: 2,
            logging: false
        });

        // Restore button visibility by removing the inline style
        if (btn) btn.style.removeProperty('opacity'); 

        const dataUrl = canvas.toDataURL("image/png");
        
        if (navigator.canShare && navigator.share) {
            const res  = await fetch(dataUrl);
            const blob = await res.blob();
            const file = new File([blob], `Cocktail_${cocktailId}.png`, { type: "image/png" });
            
            await navigator.share({
                files: [file],
                title: "Mijn Cocktail Recept",
                text: "Kijk wat ik heb gemaakt!"
            });
        } else {
            const link  = document.createElement('a');
            link.href   = dataUrl;
            link.download = `Cocktail_${cocktailId}.png`;
            link.click();
        }
    } catch (err) {
        console.error("Fout:", err);
        alert("Failed to generate image.");
    }
}

/* ---------- 6.3  updateServings() ---------- */
function updateServings(e, cocktailId, delta) {
    e.stopPropagation();
    
    const servingsLabel  = document.getElementById(`servings-${cocktailId}`);
    let currentServings  = parseInt(servingsLabel.innerText);
    let newServings      = currentServings + delta;
    
    if (newServings < 1) return; // Minimum 1 serving
    
    servingsLabel.innerText = newServings;
    
    // Find the recipe in all available lists
    const allCocktails  = [...classicCocktails, ...(JSON.parse(localStorage.getItem('myRecipes')) || [])];
    const cocktail      = allCocktails.find(c => c.id === cocktailId);
    const listContainer = document.getElementById(`ingredients-${cocktailId}`);
    
    // Update ingredient amounts scaled to servings
    listContainer.innerHTML = cocktail.ingredients.map(ing => {
        const newAmount = (ing.amount * newServings).toFixed(ing.amount % 1 === 0 ? 0 : 1);
        return `<li><span class="amount">${newAmount}</span> <span class="unit">${ing.unit}</span> ${ing.name}</li>`;
    }).join('');
}


/* ============================================================
 * 7. RECIPE CREATION & MY RECIPES
 * ============================================================ */

/* ---------- 7.1 Formulier Beheer (Overlay) ---------- */
function openRecipeForm() {
    updateIngredientSuggestions();
    document.getElementById('recipe-form-overlay').style.display = 'flex';
}

function closeRecipeForm() {
    document.getElementById('recipe-form-overlay').style.display = 'none';
}

function addIngredientRow() {
    const container = document.getElementById('ingredient-inputs-container');
    const row = document.createElement('div');
    row.className = 'ingredient-row';
    row.innerHTML = `
        <input type="number" class="ing-amount" placeholder="50">
        <input type="text" class="ing-unit" placeholder="ml">
        <input type="text" class="ing-name" placeholder="Vodka" list="ingredients-suggestions">
        <button type="button" class="remove-ingredient-btn" onclick="this.parentElement.remove()">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;
    container.appendChild(row);
}

function updateIngredientSuggestions() {
    const datalist = document.getElementById('ingredients-suggestions');
    if (!datalist) return;

    const checkboxes = document.querySelectorAll('.category-content input[type="checkbox"]');
    let ingredients = Array.from(checkboxes).map(cb => cb.value);
    ingredients = [...new Set(ingredients)].sort();
    datalist.innerHTML = ingredients.map(ing => `<option value="${ing}">`).join('');
}

/* ---------- 7.2 Foto Preview ---------- */
function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function() {
        const display = document.getElementById('image-preview-display');
        const placeholder = document.getElementById('image-preview-placeholder');
        
        if (display && placeholder) {
            display.src = reader.result;
            display.style.display = 'block';
            placeholder.style.display = 'none';
        }
        currentImageBase64 = reader.result;
    }
    reader.readAsDataURL(file);
}

/* ---------- 7.3 Opslaan van Recept ---------- */
function saveNewRecipe() {
    const name = document.getElementById('recipe-name').value;
    const description = document.getElementById('recipe-description').value;
    const categoryInput = document.getElementById('recipe-category') ? document.getElementById('recipe-category').value : "";
    const method = document.getElementById('recipe-method').value;
    const methodDesc = document.getElementById('recipe-desc').value;

    const rows = document.querySelectorAll('.ingredient-row');
    const ingredients = [];

    rows.forEach(row => {
        const amount = row.querySelector('.ing-amount').value;
        const unit = row.querySelector('.ing-unit').value;
        const ingName = row.querySelector('.ing-name').value;

        if (ingName.trim() !== "" || amount !== "") {
            ingredients.push({
                amount: parseFloat(amount) || 0,
                unit: unit || "",
                name: ingName || "Unnamed Ingredient"
            });
        }
    });

    if (!name || ingredients.length === 0) {
        alert("Please enter at least a name and one ingredient!");
        return;
    }

    const newRecipe = {
        id: 'user-' + Date.now(),
        name: name,
        description: description || "A custom masterpiece.",
        category: categoryInput ? categoryInput.split(',').map(c => c.trim()).filter(c => c !== "") : ["Custom"],
        ingredients: ingredients,
        method: method || "Not specified",
        methodDesc: methodDesc || "No description provided.",
        image: currentImageBase64 || "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&h=400&auto=format&fit=crop"
    };

    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    myRecipes.push(newRecipe);
    localStorage.setItem('myRecipes', JSON.stringify(myRecipes));

    alert("Recipe added to your book!");
    
    closeRecipeForm();
    renderMyRecipes(); 
    
    // Reset velden
    document.getElementById('recipe-name').value = "";
    document.getElementById('recipe-description').value = "";
    document.getElementById('recipe-method').value = "";
    document.getElementById('recipe-desc').value = "";
    if(document.getElementById('recipe-category')) document.getElementById('recipe-category').value = "";
    
    // Reset naar 1 lege rij met de nieuwe oninput logica
    document.getElementById('ingredient-inputs-container').innerHTML = `
        <div class="ingredient-row">
            <input type="number" class="ing-amount" placeholder="50" oninput="checkRowTyping(this)">
            <input type="text" class="ing-unit" placeholder="ml" oninput="checkRowTyping(this)">
            <input type="text" class="ing-name" placeholder="Vodka" list="ingredients-suggestions" oninput="checkRowTyping(this)">
            <button type="button" class="remove-ingredient-btn" onclick="this.parentElement.remove()">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    `;
    
    document.getElementById('image-preview-display').style.display = 'none';
    document.getElementById('image-preview-display').src = "";
    document.getElementById('image-preview-placeholder').style.display = 'flex';
    currentImageBase64 = ""; 
}

/* ---------- 7.4 Tekenen van de "Mini-Vault" ---------- */
function renderMyRecipes() {
    const grid = document.getElementById('my-recipes-grid');
    if (!grid) return;

    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    grid.innerHTML = "";

    if (myRecipes.length === 0) {
        grid.innerHTML = `
            <div class="placeholder-text" style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; margin-top: 50px; text-align: center; color: #666;">
                <i class="fa-solid fa-book-open" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.3;"></i>
                <p>Your recipe book is empty.<br>Start adding your first creation!</p>
            </div>`;
        return;
    }

    myRecipes.forEach(cocktail => {
        const card = document.createElement('div');
        card.className = 'cocktail-card';
        
        card.onclick = function(e) {
            if (!e.target.closest('.counter-btn') && !e.target.closest('.delete-recipe-btn')) {
                this.classList.toggle('open');
            }
        };

        card.innerHTML = `
            <div class="card-thumb-large">
                <img src="${cocktail.image}" alt="${cocktail.name}">
                <button class="delete-recipe-btn" onclick="deleteRecipe('${cocktail.id}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="card-content">
                <h4>${cocktail.name}</h4>
                <div class="category-container">
                    ${cocktail.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                </div>
                <p class="description">${cocktail.description}</p>
                <div class="collapsible-content">
                    <div class="servings-control" style="margin-top: 15px;">
                        <span>Servings:</span>
                        <div class="counter-box">
                            <button class="counter-btn" onclick="updateServings(event, '${cocktail.id}', -1)">-</button>
                            <span id="servings-${cocktail.id}">1</span>
                            <button class="counter-btn" onclick="updateServings(event, '${cocktail.id}', 1)">+</button>
                        </div>
                    </div>
                    <ul class="ingredients-list" id="ingredients-${cocktail.id}">
                        ${cocktail.ingredients.map(ing => `
                            <li><span class="amount">${ing.amount}</span> <span class="unit">${ing.unit}</span> ${ing.name}</li>
                        `).join('')}
                    </ul>
                    <div class="method-section" style="border-top: 1px solid #333; padding-top: 10px; margin-top: 10px;">
                        <strong style="color: #ffb347;">Method: ${cocktail.method}</strong>
                        <p class="method-text" style="font-style: italic; font-size: 0.9rem; margin-top: 5px;">${cocktail.methodDesc}</p>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

/* ---------- 7.5 Recept verwijderen ---------- */
function deleteRecipe(id) {
    if (confirm("Are you sure you want to delete this recipe?")) {
        let myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
        myRecipes = myRecipes.filter(r => r.id !== id);
        localStorage.setItem('myRecipes', JSON.stringify(myRecipes));
        renderMyRecipes(); 
    }
}

/* ---------- 7.6 Verbeterde Typing Check voor de hele rij ---------- */
function checkRowTyping(inputElement) {
    const row = inputElement.closest('.ingredient-row');
    const inputs = row.querySelectorAll('input');
    
    // Controleer of er MINSTENS één veld is dat niet leeg is
    const isAnyFilled = Array.from(inputs).some(input => input.value.trim().length > 0);
    
    if (isAnyFilled) {
        row.classList.add('is-typing');
    } else {
        row.classList.remove('is-typing');
    }
}

/* ============================================================
 * 8. FRIDGE & INGREDIENT MATCHING
 * ============================================================ */

/* ---------- 8.1 toggleCategory() ---------- */
function toggleCategory(id) {
    const content = document.getElementById(id);
    if (!content) return;

    content.classList.toggle('active');
    
    const button = content.previousElementSibling;
    const icon   = button ? button.querySelector('i') : null;
    
    if (icon) {
        if (content.classList.contains('active')) {
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    }
}

/* ---------- 8.2 Live Search binnen Categorieën ---------- */
function filterCategoryList(input) {
    const filter = input.value.toLowerCase().trim();
    const container = input.closest('.category-content');
    const items = container.querySelectorAll('.fridge-item');

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(filter) ? "flex" : "none";
    });
}

/* ---------- 8.3 updateFridge() ---------- */
function updateFridge(checkbox) {
    const value = checkbox.value.toLowerCase().trim();
    
    if (checkbox.checked) {
        if (!myIngredients.includes(value)) {
            myIngredients.push(value);
        }
    } else {
        myIngredients = myIngredients.filter(ing => ing !== value);
    }
    
    localStorage.setItem('myIngredients', JSON.stringify(myIngredients));
    
    // Optioneel: Update ook de suggesties voor het receptenboek direct
    if (typeof updateIngredientSuggestions === 'function') {
        updateIngredientSuggestions();
    }
}

/* ---------- 8.4 syncCheckboxes() ---------- */
function syncCheckboxes() {
    const checkboxes = document.querySelectorAll('.category-content input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = myIngredients.includes(cb.value.toLowerCase().trim());
    });
}

/* ---------- 8.5 checkMatches() ---------- */
function checkMatches() {
    const btn               = document.querySelector('.match-btn-large');
    const resultsContainer = document.getElementById('matching-results');
    if (!resultsContainer || !btn) return;

    // UI Feedback
    btn.innerHTML           = `<i class="fa-solid fa-spinner fa-spin"></i> Searching...`;
    btn.style.pointerEvents = "none";

    setTimeout(() => {
        const myRecipes    = JSON.parse(localStorage.getItem('myRecipes')) || [];
        const allCocktails = [...classicCocktails, ...myRecipes];

        const matches = allCocktails.map(cocktail => {
            const missing = cocktail.ingredients.filter(ing => {
                const nameToSearch   = (typeof ing === 'object' ? ing.name : ing).toLowerCase().trim();
                
                // SLIMMERE MATCHING:
                // We checken of de naam van het ingrediënt voorkomt in onze Fridge-lijst, of andersom.
                const isFound = myIngredients.some(mine => {
                    const cleanMine = mine.toLowerCase().trim();
                    return nameToSearch.includes(cleanMine) || cleanMine.includes(nameToSearch);
                });
                
                return !isFound;
            });
            return { ...cocktail, missingCount: missing.length, missingItems: missing };
        })
        .filter(c => c.missingCount <= 1) 
        .sort((a, b) => {
            if (a.missingCount !== b.missingCount) return a.missingCount - b.missingCount;
            const aFav = myFavorites.includes(a.id);
            const bFav = myFavorites.includes(b.id);
            return bFav - aFav;
        });

        resultsContainer.innerHTML = "";

        if (matches.length === 0) {
            resultsContainer.innerHTML = `
                <div class="placeholder-text" style="text-align:center; padding: 40px 20px;">
                    <i class="fa-solid fa-ice-cream" style="font-size: 3rem; opacity: 0.2; margin-bottom: 10px;"></i>
                    <p>No close matches found.<br><small>Try selecting more basic spirits or mixers!</small></p>
                </div>`;
        } else {
            matches.forEach(cocktail => {
                const isPerfect = cocktail.missingCount === 0;
                const isFav     = myFavorites.includes(cocktail.id);
                const isCustom  = cocktail.id.toString().startsWith('user-');
                
                const card      = document.createElement('div');
                card.className  = `cocktail-card ${isPerfect ? '' : 'near-match'} ${isFav ? 'is-favorite' : ''}`;
                
                card.onclick = function(e) { 
                    if (!e.target.closest('button')) {
                        this.classList.toggle('open'); 
                    }
                };

                card.innerHTML = `
                    <div class="card-thumb-large">
                        <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(event, '${cocktail.id}')">
                            <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-star"></i>
                        </button>
                        ${!isPerfect ? `<div class="missing-tag">Missing ${cocktail.missingCount}</div>` : ''}
                        <img src="${cocktail.image}" alt="${cocktail.name}">
                        ${isCustom ? `<span class="category-tag custom-badge" style="position:absolute; bottom:10px; left:10px; background:#ffb347; color:#000; font-weight:bold;">MINE</span>` : ''}
                    </div>
                    <div class="card-content">
                        <h4>${cocktail.name} ${isPerfect ? '✨' : ''}</h4>
                        <div class="category-container">
                            ${Array.isArray(cocktail.category) 
                                ? cocktail.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')
                                : `<span class="category-tag">${cocktail.category}</span>`
                            }
                        </div>
                        <div class="collapsible-content">
                            <div class="servings-control" style="margin: 15px 0;">
                                <span>Servings:</span>
                                <div class="counter-box">
                                    <button class="counter-btn" onclick="updateServings(event, '${cocktail.id}', -1)">-</button>
                                    <span id="servings-${cocktail.id}">1</span>
                                    <button class="counter-btn" onclick="updateServings(event, '${cocktail.id}', 1)">+</button>
                                </div>
                            </div>
                            <div class="ingredients-section">
                                <strong>Ingredients:</strong> 
                                <ul class="ingredients-list" id="ingredients-${cocktail.id}">
                                    ${cocktail.ingredients.map(ing => {
                                        const ingName = (typeof ing === 'object' ? ing.name : ing).toLowerCase().trim();
                                        
                                        // Check voor visuele feedback of het ingrediënt aanwezig is
                                        const isMissing = cocktail.missingItems.some(m => 
                                            (typeof m === 'object' ? m.name : m).toLowerCase().trim() === ingName
                                        );
                                        
                                        const displayInfo = typeof ing === 'object' ? `${ing.amount} ${ing.unit} ${ing.name}` : ing;
                                        
                                        return isMissing ? `
                                            <li class="missing-ing">
                                                <span><i class="fa-solid fa-circle-xmark"></i> ${displayInfo}</span>
                                                <button class="add-to-cart-btn" onclick="addToShoppingList(event, '${ingName}')">
                                                    <i class="fa-solid fa-cart-plus"></i>
                                                </button>
                                            </li>` : `
                                            <li class="available-ing">
                                                <span><i class="fa-solid fa-circle-check"></i> ${displayInfo}</span>
                                            </li>`;
                                    }).join('')}
                                </ul>
                            </div>
                            <div class="method-section">
                                <strong style="color:#ffb347;">Method: ${cocktail.method}</strong>
                                <p class="method-text">${cocktail.methodDesc}</p>
                            </div>
                        </div>
                    </div>
                `;
                resultsContainer.appendChild(card);
            });
        }

        btn.innerHTML           = `<i class="fa-solid fa-glass-citrus"></i> Find Cocktails`;
        btn.style.pointerEvents = "auto";
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 600);
}