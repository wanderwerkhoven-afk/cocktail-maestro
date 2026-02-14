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
        description: "A perfectly balanced classic with deep almond warmth, fresh lemon bite and a luxuriously silky foam.", 
        ingredients: [
            { amount: 60, unit: "ml", name: "Amaretto" },
            { amount: 30, unit: "ml", name: "Lemon juice" },
            { amount: 1,  unit: "pcs", name: "Egg white" },
            { amount: 2,  unit: "dashes", name: "Angostura bitters" }
        ], 
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker and dry shake (no ice) for 10–15 seconds to emulsify the egg white and build a silky foam.

            Step 2: Add ice and shake hard until the shaker is well chilled.

            Step 3: Double strain into a chilled rocks glass over a large clear ice cube.

            Step 4: Garnish with a cherry or orange slice and finish with a few drops of Angostura bitters on the foam.
        `.trim(),
        image: "./assets/amarettosour.png" 
    },
    { 
        id: 'c2', 
        name: "Aperol Spritz", 
        category: ["Light", "Sparkling", "Bitter"], 
        description: "Bright, bittersweet and effortlessly refreshing, with lively bubbles and a sun-kissed finish.", 
        ingredients: [
            { amount: 60, unit: "ml", name: "Prosecco" },
            { amount: 30, unit: "ml", name: "Aperol" },
            { amount: 15, unit: "ml", name: "Soda water" }
        ], 
        glassware: "Wine glass",
        ice: "Large ice cubes",
        method: "Built", 
        methodDesc: `
            Step 1: Fill a chilled wine glass generously with large ice cubes.

            Step 2: Pour in the Prosecco first to preserve its freshness and bubbles.

            Step 3: Add the Aperol, followed by a splash of soda water.

            Step 4: Gently stir once to combine and garnish with a fresh orange slice.
        `.trim(),
        image: "./assets/aperolspritz.png" 
    },
    { 
        id: 'c3', 
        name: "Aviation", 
        category: ["Floral", "Classic", "Purple"], 
        description: "An elegant classic with delicate floral notes, bright citrus and a subtle cherry sweetness.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Gin" },
            { amount: 15, unit: "ml", name: "Maraschino liqueur" },
            { amount: 10, unit: "ml", name: "Crème de Violette" },
            { amount: 15, unit: "ml", name: "Lemon juice" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled and properly diluted.

            Step 3: Double strain into a chilled coupe glass for a smooth, elegant finish.

            Step 4: Garnish with a cocktail cherry or a light lemon twist.
        `.trim(),
        image: "./assets/aviation.png" 
    },
    { 
        id: 'c4',
        name: "Bee's Knees",
        category: ["Classic", "Honey", "Sweet", "Sour"], 
        description: "A smooth Prohibition-era classic with bright citrus, floral honey sweetness and a clean gin backbone.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Gin" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 15, unit: "ml", name: "Honey syrup" },
            { amount: 10, unit: "ml", name: "Sugar syrup" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard until the drink is well chilled and properly diluted.

            Step 3: Double strain into a chilled coupe glass for a clean, smooth finish.

            Step 4: Garnish with a lemon twist or lemon peel to enhance the citrus aroma.
        `.trim(),
        image: "./assets/beesknees.png" 
    },
    { 
        id: 'c5', 
        name: "Bloody Mary", 
        category: ["Savory", "Vodka"], 
        description: "A bold and savory classic with rich tomato depth, gentle heat and a perfectly seasoned finish.", 
        ingredients: [
            { amount: 45,  unit: "ml", name: "Vodka" },
            { amount: 120, unit: "ml", name: "Tomato juice" },
            { amount: 15,  unit: "ml", name: "Worcestershire sauce" },
            { amount: 5,   unit: "ml", name: "Tabasco sauce" }
        ], 
        glassware: "Highball glass",
        ice: "Cubed ice",
        method: "Rolled", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Gently roll the mixture between two shakers several times to combine without over-diluting.

            Step 3: Pour back into a chilled highball glass filled with fresh cubed ice.

            Step 4: Garnish with a celery stick, lemon wedge or olives for a classic Bloody Mary finish.
        `.trim(),
        image: "./assets/bloodymary.png" 
    },
    { 
        id: 'c6', 
        name: "Blueberry Mule", 
        category: ["Blue", "Ginger", "Spicy"], 
        description: "A vibrant mule with bright berry notes, zesty lime and a spicy ginger kick.", 
        ingredients: [
            { amount: 45,  unit: "ml", name: "Vodka" },
            { amount: 120, unit: "ml", name: "Blue Curaçao" },
            { amount: 30,  unit: "ml", name: "Blueberry liqueur" },
            { amount: 15,  unit: "ml", name: "Lime juice" },
            { amount: 120, unit: "ml", name: "Ginger beer" }
        ], 
        glassware: "Copper mug",
        ice: "Crushed ice",
        method: "Built", 
        methodDesc: `
            Step 1: Fill a chilled copper mug generously with crushed ice.

            Step 2: Add the vodka, Blue Curaçao, blueberry liqueur and fresh lime juice.

            Step 3: Top with chilled ginger beer and gently stir to combine and create an even blue hue.

            Step 4: Garnish with fresh blueberries and a lime wheel for a bold mule finish.
        `.trim(),
        image: "./assets/blueberrymule.png" 
    },
    { 
        id: 'c7', 
        name: "Boulevardier", 
        category: ["Strong", "Bitter", "Whiskey"], 
        description: "A bold and refined classic, blending rich bourbon warmth with bittersweet depth and elegance.", 
        ingredients: [
            { amount: 30, unit: "ml", name: "Bourbon" },
            { amount: 30, unit: "ml", name: "Campari" },
            { amount: 30, unit: "ml", name: "Sweet Vermouth" }
        ], 
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Stirred", 
        methodDesc: `
            Step 1: Add all ingredients to a mixing glass filled with cubed ice.

            Step 2: Stir smoothly for 25–30 seconds until well chilled and properly diluted.

            Step 3: Strain into a chilled rocks glass over a large clear ice cube.

            Step 4: Express an orange twist over the glass, rim the edge and drop it in as garnish.
        `.trim(),
        image: "./assets/boulevardier.png" 
    },
    { 
        id: 'c8', 
        name: "Bramble", 
        category: ["Gin", "Fruity", "Classic"], 
        description: "A vibrant gin classic with bright citrus, gentle sweetness and a dramatic blackberry bleed.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Gin" },
            { amount: 20, unit: "ml", name: "Lemon juice" },
            { amount: 15, unit: "ml", name: "Sugar syrup" },
            { amount: 15, unit: "ml", name: "Crème de Mure" }
        ], 
        glassware: "Rocks glass",
        ice: "Crushed ice",
        method: "Built & Bleed", 
        methodDesc: `
            Step 1: Add the gin, fresh lemon juice and sugar syrup to a shaker filled with cubed ice.

            Step 2: Shake briefly until chilled, then strain into a rocks glass filled with crushed ice.

            Step 3: Slowly drizzle the Crème de Mure over the top to create a deep purple blackberry bleed.

            Step 4: Garnish with fresh blackberries and a lemon slice for a classic Bramble finish.
        `.trim(),
        image: "./assets/bramble.png" 
    },
    { 
        id: 'c9', 
        name: "Caipirinha", 
        category: ["Strong", "Sour", "Fresh"], 
        description: "A bold and refreshing classic with bright lime, rustic sweetness and the raw character of cachaça.", 
        ingredients: [
            { amount: 60, unit: "ml", name: "Cachaça" },
            { amount: 1,  unit: "pcs", name: "Lime (in wedges)" },
            { amount: 2,  unit: "tsp", name: "Brown sugar" }
        ], 
        glassware: "Rocks glass",
        ice: "Crushed ice",
        method: "Muddled", 
        methodDesc: `
            Step 1: Add the lime wedges and brown sugar to a rocks glass.

            Step 2: Gently muddle to release the lime juice and oils without over-crushing the peel.

            Step 3: Fill the glass with crushed ice and pour in the cachaça.

            Step 4: Stir well to combine and garnish with a fresh lime wedge.
        `.trim(),
        image: "./assets/caipirinha.png" 
    },
    { 
        id: 'c10', 
        name: "Clover Club", 
        category: ["Sour", "Elegant", "Raspberry", "Pink"], 
        description: "An elegant, silky-smooth classic with bright citrus, soft raspberry sweetness and a velvety foam.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Gin" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 15, unit: "ml", name: "Raspberry syrup" },
            { amount: 15, unit: "ml", name: "Egg white" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Dry Shake & Shake", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker and dry shake (no ice) for 10–15 seconds to build a smooth, airy foam.

            Step 2: Add cubed ice and shake hard until the shaker is well chilled.

            Step 3: Double strain into a chilled coupe glass for a refined, silky texture.

            Step 4: Garnish with fresh raspberries or a light lemon twist.
        `.trim(),
        image: "./assets/cloverclub.png" 
    },
    { 
        id: 'c11', 
        name: "Corpse Reviver #2", 
        category: ["Classic", "Strong", "Orange", "Lemon"], 
        description: "A sharp and elegant classic with bright citrus, herbal depth and a revitalizing bite.", 
        ingredients: [
            { amount: 30, unit: "ml", name: "Gin" },
            { amount: 15, unit: "ml", name: "Lillet Blanc" },
            { amount: 15, unit: "ml", name: "Cointreau" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 2,  unit: "dashes", name: "Angostura bitters" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Rinse a chilled coupe glass with absinthe and discard the excess.

            Step 2: Add all remaining ingredients to a shaker filled with cubed ice.

            Step 3: Shake hard until well chilled and properly diluted.

            Step 4: Double strain into the prepared glass for a crisp, aromatic finish.
        `.trim(),
        image: "./assets/corpsreviver2.png" 
    },
    { 
        id: 'c12', 
        name: "Cosmopolitan", 
        category: ["Fruit", "Vodka", "Pink"], 
        description: "A modern classic with bright citrus, tart cranberry and sleek elegance.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Vodka Citron" },
            { amount: 15, unit: "ml", name: "Cointreau" },
            { amount: 30, unit: "ml", name: "Cranberry juice" },
            { amount: 15, unit: "ml", name: "Lime juice" }
        ], 
        glassware: "Martini glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled and lightly diluted.

            Step 3: Double strain into a chilled martini glass.

            Step 4: Garnish with an expressed orange peel for a refined finish.
        `.trim(),
        image: "./assets/cosmopolitan.png" 
    },
    { 
        id: 'c13', 
        name: "Daiquiri", 
        category: ["Sour", "Rum"], 
        description: "A pure and timeless classic with bright lime, subtle sweetness and clean rum character.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "White Rum" },
            { amount: 15, unit: "ml", name: "Lime juice" },
            { amount: 15, unit: "ml", name: "Sugar syrup" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled and balanced.

            Step 3: Double strain into a chilled coupe glass with no ice.

            Step 4: Garnish with a thin lime wheel or no garnish for a classic presentation.
        `.trim(),
        image: "./assets/daiquri.png" 
    },
    { 
        id: 'c14', 
        name: "Dark 'n Stormy", 
        category: ["Spicy", "Rum"], 
        description: "A bold and moody highball with spicy ginger and rich, dark rum depth.", 
        ingredients: [
            { amount: 60,  unit: "ml", name: "Dark Rum" },
            { amount: 120, unit: "ml", name: "Ginger beer" },
            { amount: 15,  unit: "ml", name: "Lime juice" }
        ], 
        glassware: "Highball glass",
        ice: "Cubed ice",
        method: "Layered", 
        methodDesc: `
            Step 1: Fill a highball glass with fresh cubed ice.

            Step 2: Add the lime juice and top with chilled ginger beer.

            Step 3: Slowly float the dark rum over the top to create a layered effect.

            Step 4: Garnish with a lime wedge for a dramatic finish.
        `.trim(),
        image: "./assets/darkenstormy.png" 
    },
    { 
        id: 'c15', 
        name: "Dry Martini", 
        category: ["Strong", "Gin"], 
        description: "A timeless icon of precision, purity and ice-cold elegance.", 
        ingredients: [
            { amount: 60, unit: "ml", name: "Gin" },
            { amount: 15, unit: "ml", name: "Dry Vermouth" },
            { amount: 1,  unit: "dash", name: "Angostura bitters" }
        ], 
        glassware: "Martini glass",
        ice: "Cubed ice",
        method: "Stirred", 
        methodDesc: `
            Step 1: Add all ingredients to a mixing glass filled with cubed ice.

            Step 2: Stir smoothly for 25–30 seconds until ice cold and properly diluted.

            Step 3: Strain into a chilled martini glass.

            Step 4: Garnish with a lemon twist or olive, according to preference.
        `.trim(),
        image: "./assets/drymartini.jpg" 
    },
    { 
        id: 'c16', 
        name: "Espresso Martini", 
        category: ["Coffee", "Vodka"], 
        description: "A rich and energizing classic with bold coffee flavors and a silky crema.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Vodka" },
            { amount: 15, unit: "ml", name: "Coffee liqueur" },
            { amount: 30, unit: "ml", name: "Espresso" },
            { amount: 15, unit: "ml", name: "Sugar syrup" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Hard Shake", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard for 15–20 seconds to create a thick, velvety foam.

            Step 3: Double strain into a chilled coupe glass.

            Step 4: Garnish with three coffee beans for a classic finish.
        `.trim(),
        image: "./assets/espressomartini.png" 
    },
    { 
        id: 'c17', 
        name: "Espresso Martini Bueno", 
        category: ["Energy", "Coffee", "Sweet", "Bitter"], 
        description: "A rich and indulgent espresso martini with roasted coffee depth and smooth hazelnut warmth.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Vodka" },
            { amount: 15, unit: "ml", name: "Frangelico" },
            { amount: 30, unit: "ml", name: "Espresso" },
            { amount: 15, unit: "ml", name: "Hazelnut syrup" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard for 15–20 seconds to build a thick, creamy foam.

            Step 3: Double strain into a chilled coupe glass.

            Step 4: Garnish with coffee beans or grated chocolate for a decadent finish.
        `.trim(),
        image: "./assets/bueno.png" 
    },
    { 
        id: 'c18', 
        name: "French Martini", 
        category: ["Sweet", "Fruity", "Vodka"], 
        description: "A silky modern classic with lush raspberry notes and a soft pineapple foam.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Vodka" },
            { amount: 15, unit: "ml", name: "Chambord" },
            { amount: 60, unit: "ml", name: "Pineapple juice" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Hard Shake", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake very hard for 15–20 seconds to create a thick, silky foam.

            Step 3: Double strain into a chilled coupe glass.

            Step 4: Garnish with fresh raspberries or a lemon twist.
        `.trim(),
        image: "./assets/frenchmartini.png" 
    },
    { 
        id: 'c19', 
        name: "French 75", 
        category: ["Champagne", "Gin", "Lemon"], 
        description: "A bright and celebratory classic with crisp citrus and elegant bubbles.", 
        ingredients: [ 
            { amount: 30, unit: "ml", name: "Gin" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 15, unit: "ml", name: "Sugar syrup" },
            { amount: 90, unit: "ml", name: "Prosecco/Champagne" }
        ], 
        glassware: "Flute glass",
        ice: "Cubed ice",
        method: "Shaken & Layered", 
        methodDesc: `
            Step 1: Add the gin, lemon juice and sugar syrup to a shaker filled with cubed ice.

            Step 2: Shake briefly until chilled and strain into a chilled flute glass.

            Step 3: Top gently with Prosecco or Champagne.

            Step 4: Garnish with a lemon twist for a refined finish.
        `.trim(),
        image: "./assets/french75.png" 
    },
    { 
        id: 'c20', 
        name: "Garden Cocktail", 
        category: ["Fresh", "Floral", "Cucumber"], 
        description: "A refreshing garden-inspired cocktail with floral notes and crisp cucumber freshness.", 
        ingredients: [ 
            { amount: 20, unit: "ml",  name: "Elderflower liqueur" },
            { amount: 50, unit: "ml",  name: "Gin" },
            { amount: 20, unit: "ml",  name: "Lime juice" },
            { amount: 6,  unit: "pcs", name: "Cucumber" },
            { amount: 15, unit: "ml",  name: "Sprite" }
        ], 
        glassware: "Highball glass",
        ice: "Cubed ice",
        method: "Muddled & Built", 
        methodDesc: `
            Step 1: Add the cucumber to a shaker and gently muddle to release fresh aromas.

            Step 2: Add gin, elderflower liqueur and lime juice with cubed ice and shake briefly.

            Step 3: Strain into a highball glass filled with fresh ice and top with Sprite.

            Step 4: Garnish with a cucumber ribbon or mint sprig.
        `.trim(),
        image: "./assets/garden.png" 
    },
    { 
        id: 'c21', 
        name: "Giant Sucker", 
        category: ["Herbal", "Unique", "Bubbly"], 
        description: "A bold herbal mix where Jägermeister meets honey sweetness and floral bubbles.", 
        ingredients: [ 
            { amount: 30, unit: "ml",  name: "Honey" },
            { amount: 45, unit: "ml",  name: "Jägermeister" },
            { amount: 10, unit: "pcs", name: "Fresh mint" },
            { amount: 15, unit: "ml",  name: "Elderflower tonic" }
        ], 
        glassware: "Rocks glass",
        ice: "Cubed ice",
        method: "Stirred", 
        methodDesc: `
            Step 1: Add the honey and Jägermeister to a mixing glass and stir until fully dissolved.

            Step 2: Add fresh mint and gently bruise to release aroma.

            Step 3: Strain into a rocks glass filled with cubed ice.

            Step 4: Top with elderflower tonic and garnish with mint.
        `.trim(),
        image: "./assets/giantsucker.png" 
    },
    { 
        id: 'c22', 
        name: "Gin Basil Smash", 
        category: ["Modern", "Fresh", "Herbal"], 
        description: "A vibrant modern classic bursting with fresh basil and bright citrus.", 
        ingredients: [ 
            { amount: 45, unit: "ml",  name: "Gin" },
            { amount: 15, unit: "ml",  name: "Lemon juice" },
            { amount: 15, unit: "ml",  name: "Sugar syrup" },
            { amount: 10, unit: "pcs", name: "Fresh basil" }
        ], 
        glassware: "Rocks glass",
        ice: "Cubed ice",
        method: "Muddled & Shaken", 
        methodDesc: `
            Step 1: Add basil leaves and sugar syrup to a shaker and gently muddle.

            Step 2: Add gin and lemon juice with cubed ice.

            Step 3: Shake hard until well chilled and strain into a rocks glass over fresh ice.

            Step 4: Garnish with a fresh basil leaf.
        `.trim(),
        image: "./assets/ginbasil.png" 
    },
    { 
        id: 'c23', 
        name: "Gin Fizz", 
        category: ["Sparkling", "Refreshing"], 
        description: "A light and refreshing classic with bright citrus and lively effervescence.", 
        ingredients: [ 
            { amount: 45, unit: "ml", name: "Gin" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 15, unit: "ml", name: "Sugar syrup" },
            { amount: 30, unit: "ml", name: "Soda water" }
        ], 
        glassware: "Highball glass",
        ice: "Cubed ice",
        method: "Shaken & Built", 
        methodDesc: `
            Step 1: Add gin, lemon juice and sugar syrup to a shaker filled with cubed ice.

            Step 2: Shake briefly until chilled and strain into a highball glass.

            Step 3: Add fresh ice and top with soda water.

            Step 4: Garnish with a lemon slice or twist.
        `.trim(),
        image: "./assets/ginfizz.png" 
    },
    { 
        id: 'c24', 
        name: "Groen Plansoen", 
        category: ["Fresh", "Floral", "Cucumber"], 
        description: "A delicate botanical cocktail with floral elderflower, cucumber freshness and soft tea notes.", 
        ingredients: [ 
            { amount: 45, unit: "ml", name: "Gin" },
            { amount: 15, unit: "ml", name: "Elderflower liqueur" },
            { amount: 15, unit: "ml", name: "Lime juice" },
            { amount: 15, unit: "ml", name: "Elderflower syrup" },
            { amount: 20, unit: "ml", name: "Cucumber juice" },
            { amount: 30, unit: "ml", name: "Iced tea" }
        ], 
        glassware: "Highball glass",
        ice: "Cubed ice",
        method: "Built", 
        methodDesc: `
            Step 1: Fill a highball glass with fresh cubed ice.

            Step 2: Add all liquid ingredients to the glass.

            Step 3: Stir gently to combine and chill.

            Step 4: Garnish with a cucumber ribbon or edible flower.
        `.trim(),
        image: "./assets/groenplansoen.png" 
    },
    { 
        id: 'c25', 
        name: "Holy Peach", 
        category: ["Sweet", "Fruity", "Peach"], 
        description: "A smooth and juicy peach highball with warm vanilla notes and a bright, refreshing lift.", 
        ingredients: [ 
            { amount: 30, unit: "ml", name: "Peachtree" },
            { amount: 15, unit: "ml", name: "Licor 43" },
            { amount: 15, unit: "ml", name: "Lime juice" },
            { amount: 20, unit: "ml", name: "Sprite" }
        ], 
        glassware: "Highball glass",
        ice: "Cubed ice",
        method: "Built", 
        methodDesc: `
            Step 1: Fill a highball glass with fresh cubed ice.

            Step 2: Add Peachtree, Licor 43 and fresh lime juice.

            Step 3: Top with Sprite (or green iced tea) and stir gently to combine.

            Step 4: Garnish with a lime wheel or a peach slice for a bright finish.
        `.trim(),
        image: "./assets/holypeach.png" 
    },
    { 
        id: 'c26', 
        name: "Hugo Spritz", 
        category: ["Sparkling", "Floral", "Summer"], 
        description: "A light and floral spritz with elderflower charm, crisp bubbles and fresh mint brightness.", 
        ingredients: [
            { amount: 30, unit: "ml", name: "Elderflower liqueur" },
            { amount: 90, unit: "ml", name: "Prosecco" },
            { amount: 30, unit: "ml", name: "Soda water" },
            { amount: 5,  unit: "leaves", name: "Fresh mint" }
        ], 
        glassware: "Wine glass",
        ice: "Large ice cubes",
        method: "Built", 
        methodDesc: `
            Step 1: Fill a chilled wine glass generously with large ice cubes.

            Step 2: Add the elderflower liqueur and gently clap the mint leaves before adding.

            Step 3: Pour in the Prosecco, then top with soda water.

            Step 4: Give one gentle stir and garnish with a lime wheel and fresh mint.
        `.trim(),
        image: "./assets/hugo.png" 
    },
    { 
        id: 'c27', 
        name: "Last Word", 
        category: ["Strong", "Herbal", "Classic"], 
        description: "A perfectly balanced classic with herbal intensity, bright lime snap and a clean, sharp finish.", 
        ingredients: [
            { amount: 25, unit: "ml", name: "Gin" },
            { amount: 25, unit: "ml", name: "Green Chartreuse" },
            { amount: 25, unit: "ml", name: "Maraschino liqueur" },
            { amount: 25, unit: "ml", name: "Lime juice" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled and properly diluted.

            Step 3: Double strain into a chilled coupe glass for a clean, elegant texture.

            Step 4: Garnish with a lime twist or a brandied cherry.
        `.trim(),
        image: "./assets/lastword.png" 
    },
    { 
        id: 'c28', 
        name: "Long Island Ice Tea", 
        category: ["Very-Strong", "Classic"], 
        description: "A legendary powerhouse with crisp citrus bite, subtle sweetness and a cola finish.", 
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
        glassware: "Highball glass",
        ice: "Cubed ice",
        method: "Built", 
        methodDesc: `
            Step 1: Fill a highball glass with fresh cubed ice.

            Step 2: Add all spirits, Cointreau, lemon juice and sugar syrup.

            Step 3: Top with cola and stir gently to combine without losing fizz.

            Step 4: Garnish with a lemon wedge for a classic finish.
        `.trim(),
        image: "./assets/longisland.png" 
    },
    { 
        id: 'c29', 
        name: "Lychacha", 
        category: ["Exotic", "Floral", "Lychee", "Sweet", "Sour"], 
        description: "A silky exotic sour with floral lychee sweetness, bright citrus and a soft Aperol glow.", 
        ingredients: [ 
            { amount: 20, unit: "ml", name: "Elderflower syrup" },
            { amount: 20, unit: "ml", name: "Lychee liqueur" },
            { amount: 20, unit: "ml", name: "Aperol" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 15, unit: "ml", name: "Egg white" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker and dry shake (no ice) for 10–15 seconds to build a thick foam.

            Step 2: Add cubed ice and shake hard until the shaker is well chilled.

            Step 3: Double strain into a chilled coupe glass for a smooth, silky texture.

            Step 4: Garnish with a lychee on a pick or a lemon twist to lift the aroma.
        `.trim(),
        image: "./assets/lychacha.png" 
    },
    {  
        id: 'c30', 
        name: "Mango Mustache", 
        category: ["Fruity", "Sour", "Sweet", "Mango"], 
        description: "A tropical silky sour with bright mango fruit, fresh citrus snap and a smooth gin backbone.", 
        ingredients: [ 
            { amount: 20, unit: "ml", name: "Sugar syrup" },
            { amount: 20, unit: "ml", name: "Mango puree" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 30, unit: "ml", name: "Gin" },
            { amount: 15, unit: "ml", name: "Egg white" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker and dry shake (no ice) for 10–15 seconds to emulsify and build foam.

            Step 2: Add cubed ice and shake hard until well chilled and properly diluted.

            Step 3: Double strain into a chilled coupe glass for a clean, velvety finish.

            Step 4: Garnish with a thin mango slice or a lemon twist.
        `.trim(),
        image: "./assets/mangomustach.png" 
    },
    { 
        id: 'c31', 
        name: "Manhattan", 
        category: ["Strong", "Spirit-Forward"], 
        description: "A rich and moody whiskey classic with silky vermouth depth and a bittersweet finish.", 
        ingredients: [ 
            { amount: 50, unit: "ml",     name: "Rye Whiskey" },
            { amount: 30, unit: "ml",     name: "Sweet Vermouth" },
            { amount: 2,  unit: "dashes", name: "Angostura bitters" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Stirred", 
        methodDesc: `
            Step 1: Add all ingredients to a mixing glass filled with cubed ice.

            Step 2: Stir smoothly for 25–30 seconds until well chilled and properly diluted.

            Step 3: Strain into a chilled coupe glass for a clean, spirit-forward serve.

            Step 4: Garnish with a cocktail cherry and express an orange twist if desired.
        `.trim(),
        image: "./assets/manhattan.png" 
    },
    { 
        id: 'c32', 
        name: "Margarita", 
        category: ["Sour", "Tequila"], 
        description: "A crisp tequila classic with bright lime bite, orange warmth and a clean salty edge.", 
        ingredients: [ 
            { amount: 50, unit: "ml",  name: "Tequila" },
            { amount: 25, unit: "ml",  name: "Cointreau" },
            { amount: 25, unit: "ml",  name: "Lime juice" },
            { amount: 1,  unit: "tsp", name: "Salt" }
        ], 
        glassware: "Rocks glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Rim a chilled rocks glass with salt and fill with fresh cubed ice.

            Step 2: Add tequila, Cointreau and fresh lime juice to a shaker filled with cubed ice.

            Step 3: Shake hard until well chilled and properly diluted.

            Step 4: Strain into the prepared glass and garnish with a lime wheel.
        `.trim(),
        image: "./assets/margerita.png" 
    },
    { 
        id: 'c33', 
        name: "Mezcal Margarita", 
        category: ["Smoky", "Tequila", "Sour"], 
        description: "A smoky twist with mezcal depth, bright lime snap and a bold, spicy edge.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Mezcal" },
            { amount: 15, unit: "ml", name: "Cointreau" },
            { amount: 20, unit: "ml", name: "Lime juice" },
            { amount: 10, unit: "ml", name: "Agave syrup" }
        ], 
        glassware: "Rocks glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Rim a chilled rocks glass with chili-salt and fill with fresh cubed ice.

            Step 2: Add mezcal, Cointreau, lime juice and agave syrup to a shaker filled with cubed ice.

            Step 3: Shake hard until well chilled and properly diluted.

            Step 4: Strain into the prepared glass and garnish with a lime wheel.
        `.trim(),
        image: "./assets/mezcalmargarita.png" 
    },
    { 
        id: 'c34', 
        name: "Mojito", 
        category: ["Refreshing", "Rum"], 
        description: "A bright Cuban classic with fresh mint, zesty lime and a crisp, refreshing finish.", 
        ingredients: [ 
            { amount: 50, unit: "ml", name: "White Rum" },
            { amount: 10, unit: "g",  name: "Fresh mint" },
            { amount: 15, unit: "ml", name: "Sugar syrup" },
            { amount: 25, unit: "ml", name: "Soda water" },
            { amount: 25, unit: "ml", name: "Lime juice" }
        ], 
        glassware: "Highball glass",
        ice: "Crushed ice",
        method: "Muddled", 
        methodDesc: `
            Step 1: Add mint and sugar syrup to a highball glass and gently press to release aroma (do not shred the mint).

            Step 2: Add lime juice and white rum, then fill the glass with crushed ice.

            Step 3: Top with soda water and stir gently to combine and lift the mint.

            Step 4: Garnish with a mint bouquet and a lime wheel.
        `.trim(),
        image: "./assets/mojito.png" 
    },
    { 
        id: 'c35', 
        name: "Moscow Mule", 
        category: ["Spicy", "Vodka"], 
        description: "Crisp and refreshing with bright lime, chilled vodka and a spicy ginger beer kick.", 
        ingredients: [ 
            { amount: 50,  unit: "ml", name: "Vodka" },
            { amount: 25,  unit: "ml", name: "Lime juice" },
            { amount: 125, unit: "ml", name: "Ginger beer" }
        ], 
        glassware: "Copper mug",
        ice: "Crushed ice",
        method: "Built", 
        methodDesc: `
            Step 1: Fill a chilled copper mug generously with crushed ice.

            Step 2: Add the vodka and fresh lime juice.

            Step 3: Top with chilled ginger beer and stir gently to combine.

            Step 4: Garnish with a lime wheel and a mint sprig for a classic mule finish.
        `.trim(),
        image: "./assets/moskoumule.png" 
    },
    { 
        id: 'c36', 
        name: "Muddy Mudslide", 
        category: ["Creamy", "Coffee", "Caramel"], 
        description: "A rich and indulgent coffee cocktail with creamy Baileys, caramel warmth and espresso depth.", 
        ingredients: [ 
            { amount: 30, unit: "ml", name: "Baileys" },
            { amount: 30, unit: "ml", name: "Caramel vodka" },
            { amount: 30, unit: "ml", name: "Coffee liqueur" },
            { amount: 30, unit: "ml", name: "Espresso" }
        ], 
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Stirred", 
        methodDesc: `
            Step 1: Add all ingredients to a mixing glass with a large ice cube.

            Step 2: Stir gently for 10–15 seconds to chill without over-dilution.

            Step 3: Strain into a chilled rocks glass over a fresh large ice cube.

            Step 4: Garnish with grated chocolate or coffee beans.
        `.trim(),
        image: "./assets/mudslide.jpg" 
    },
    { 
        id: 'c37', 
        name: "Negroni", 
        category: ["Bitter", "Gin"], 
        description: "A bold bartender’s classic with bittersweet depth, herbal balance and ruby-red elegance.", 
        ingredients: [ 
            { amount: 30, unit: "ml", name: "Gin" },
            { amount: 30, unit: "ml", name: "Campari" },
            { amount: 30, unit: "ml", name: "Sweet Vermouth" }
        ], 
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Stirred", 
        methodDesc: `
            Step 1: Add all ingredients to a mixing glass filled with cubed ice.

            Step 2: Stir smoothly for 25–30 seconds until chilled and properly diluted.

            Step 3: Strain into a rocks glass over a large clear ice cube.

            Step 4: Express an orange peel over the drink and drop it in.
        `.trim(),
        image: "./assets/negroni.png" 
    },
    { 
        id: 'c38', 
        name: "New York Sour", 
        category: ["Classic", "Wine twist", "Sour"], 
        description: "A refined whiskey sour crowned with a dramatic red wine float.", 
        ingredients: [ 
            { amount: 45, unit: "ml",        name: "Jameson" },
            { amount: 15, unit: "ml",        name: "Lemon juice" },
            { amount: 15, unit: "ml",        name: "Sugar syrup" },
            { amount: 1,  unit: "pcs",       name: "Egg white" },
            { amount: 30, unit: "ml",        name: "Red wine" }
        ], 
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Shake & Float", 
        methodDesc: `
            Step 1: Add whiskey, lemon juice, sugar syrup and egg white to a shaker and dry shake for 10–15 seconds.

            Step 2: Add ice and shake hard until well chilled.

            Step 3: Strain into a rocks glass over a large ice cube.

            Step 4: Gently float red wine over the top using the back of a spoon.
        `.trim(),
        image: "./assets/newyorksour.png" 
    },
    { 
        id: 'c39', 
        name: "Old Fashioned", 
        category: ["Strong", "Classic", "Spirit-Forward"], 
        description: "A timeless whiskey icon with subtle sweetness, bitters and elegant citrus oils.", 
        ingredients: [ 
            { amount: 45, unit: "ml",     name: "Bourbon" },
            { amount: 1,  unit: "cube",   name: "Sugar cube" },
            { amount: 2,  unit: "drops",  name: "Angostura bitters" },
            { amount: 1,  unit: "tsp",    name: "Orange zest" }
        ],
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Stirred", 
        methodDesc: `
            Step 1: Place the sugar cube in a rocks glass and saturate with bitters and a splash of water.

            Step 2: Muddle gently until dissolved.

            Step 3: Add bourbon and a large ice cube, then stir for 25–30 seconds.

            Step 4: Express orange zest over the glass and garnish.
        `.trim(),
        image: "./assets/oldfashion.png" 
    },
    { 
        id: 'c40', 
        name: "Paloma", 
        category: ["Fresh", "Tequila"], 
        description: "A crisp and refreshing tequila highball with bright grapefruit and zesty lime.", 
        ingredients: [ 
            { amount: 45, unit: "ml", name: "Tequila" },
            { amount: 15, unit: "ml", name: "Lime juice" },
            { amount: 90, unit: "ml", name: "Grapefruit soda" }
        ], 
        glassware: "Highball glass",
        ice: "Cubed ice",
        method: "Built", 
        methodDesc: `
            Step 1: Rim a highball glass with salt and fill with fresh cubed ice.

            Step 2: Add tequila and fresh lime juice.

            Step 3: Top with chilled grapefruit soda.

            Step 4: Stir gently and garnish with a grapefruit wedge.
        `.trim(),
        image: "./assets/paloma.png" 
    },
    { 
        id: 'c41', 
        name: "Paper Plane", 
        category: ["Modern", "Bitter", "Bourbon"], 
        description: "A modern equal-parts classic with bittersweet balance and bright citrus lift.", 
        ingredients: [
            { amount: 25, unit: "ml", name: "Bourbon" },
            { amount: 25, unit: "ml", name: "Aperol" },
            { amount: 25, unit: "ml", name: "Amaro Nonino" },
            { amount: 25, unit: "ml", name: "Lemon juice" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled and balanced.

            Step 3: Double strain into a chilled coupe glass.

            Step 4: Garnish with a lemon twist.
        `.trim(),
        image: "./assets/paperplane.png" 
    },
    { 
        id: 'c42', 
        name: "Penicillin", 
        category: ["Whiskey", "Spicy", "Smoky"], 
        description: "A modern masterpiece with honeyed warmth, ginger spice and a smoky Scotch finish.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Blended Scotch" },
            { amount: 20, unit: "ml", name: "Lemon juice" },
            { amount: 20, unit: "ml", name: "Honey-Ginger syrup" },
            { amount: 10, unit: "ml", name: "Islay Single Malt (float)" }
        ], 
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Shake & Float", 
        methodDesc: `
            Step 1: Add blended Scotch, lemon juice and honey-ginger syrup to a shaker filled with cubed ice.

            Step 2: Shake hard and strain into a rocks glass over a large ice cube.

            Step 3: Gently float the Islay single malt on top.

            Step 4: Garnish with candied ginger or lemon peel.
        `.trim(),
        image: "./assets/penicillin.png" 
    },
    { 
        id: 'c43', 
        name: "Pina Colada", 
        category: ["Tropical", "Sweet"], 
        description: "A tropical escape with creamy coconut, ripe pineapple and smooth rum.", 
        ingredients: [ 
            { amount: 45, unit: "ml", name: "White Rum" },
            { amount: 30, unit: "ml", name: "Coconut cream" },
            { amount: 60, unit: "ml", name: "Pineapple juice" }
        ], 
        glassware: "Hurricane glass",
        ice: "Crushed ice",
        method: "Blended", 
        methodDesc: `
            Step 1: Add all ingredients to a blender with crushed ice.

            Step 2: Blend until smooth, thick and creamy.

            Step 3: Pour into a chilled hurricane glass.

            Step 4: Garnish with pineapple leaves and a cherry.
        `.trim(),
        image: "./assets/pinacolada.png" 
    },
    { 
        id: 'c44', 
        name: "Pisco Sour", 
        category: ["Sour", "Strong", "Classic"], 
        description: "A creamy and vibrant classic with floral pisco, bright lime and silky foam.", 
        ingredients: [
            { amount: 60, unit: "ml", name: "Pisco" },
            { amount: 30, unit: "ml", name: "Lime juice" },
            { amount: 20, unit: "ml", name: "Sugar syrup" },
            { amount: 1,  unit: "pcs", name: "Egg white" },
            { amount: 3,  unit: "drops", name: "Angostura bitters" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Dry & Wet Shake", 
        methodDesc: `
            Step 1: Add all ingredients except bitters to a shaker and dry shake for 10–15 seconds.

            Step 2: Add cubed ice and shake hard until well chilled.

            Step 3: Double strain into a chilled coupe glass.

            Step 4: Finish with Angostura bitters on the foam.
        `.trim(),
        image: "./assets/piscosour.png" 
    },
    { 
        id: 'c45', 
        name: "Pornstar Martini", 
        category: ["Modern", "Sweet", "Passionfruit", "Vodka"], 
        description: "An iconic modern classic with exotic passionfruit, vanilla warmth and a bubbly sidekick.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Vanilla Vodka" },
            { amount: 15, unit: "ml", name: "Passoa" },
            { amount: 30, unit: "ml", name: "Passionfruit puree" },
            { amount: 10, unit: "ml", name: "Vanilla syrup" },
            { amount: 30, unit: "ml", name: "Prosecco (side)" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients except Prosecco to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled.

            Step 3: Double strain into a chilled coupe glass.

            Step 4: Serve Prosecco in a separate shot glass alongside.
        `.trim(),
        image: "./assets/pornstar.png" 
    },
    { 
        id: 'c46', 
        name: "Red Flamingo", 
        category: ["Fruity", "Sparkling", "Fresh"], 
        description: "A vibrant pink refresher with bright berries, citrus lift and a sparkling finish.", 
        ingredients:[ 
            { amount: 45, unit: "ml", name: "Bramble gin" },
            { amount: 15, unit: "ml", name: "Cointreau" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 10, unit: "ml", name: "Raspberry syrup" },
            { amount: 30, unit: "ml", name: "Soda water" }
        ], 
        glassware: "Highball glass",
        ice: "Cubed ice",
        method: "Shake & Top", 
        methodDesc: `
            Step 1: Add all ingredients except soda water to a shaker filled with cubed ice.

            Step 2: Shake briefly until chilled and strain into a highball glass over fresh ice.

            Step 3: Top with soda water and stir gently.

            Step 4: Garnish with fresh raspberries or a lemon twist.
        `.trim(),
        image: "./assets/redflamingo.png" 
    },
    { 
        id: 'c47',
        name: 'Rosemary & Peach Sour',
        category: ['Vodka', 'Herbal', 'Velvet'],
        description: 'A refined peach sour with bright citrus, silky texture and a subtle rosemary lift.', 
        ingredients:[ 
            { amount: 45, unit: "ml", name: "Vodka" },
            { amount: 20, unit: "ml", name: "Peachtree" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 10, unit: "ml", name: "Sugar syrup" },
            { amount: 20, unit: "ml", name: "Milk" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: 'Shaken',
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard for 15–20 seconds to chill and create a smooth, velvety texture.

            Step 3: Double strain into a chilled coupe glass for a clean finish.

            Step 4: Garnish with a rosemary sprig (clap first to release aroma) and a thin peach slice.
        `.trim(),
        image: './assets/rosemarypeach.png'
    },
    { 
        id: 'c48',
        name: 'Sidecar',
        category: ['Classic', 'Sour', 'Cognac', "1920's"],
        description: 'A legendary cognac sour with bright citrus, warm orange notes and a crisp sugar rim.', 
        ingredients:[ 
            { amount: 45, unit: "ml", name: "Cognac" },
            { amount: 15, unit: "ml", name: "Cointreau" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 10, unit: "ml", name: "Sugar syrup" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: 'Shaken',
        methodDesc: `
            Step 1: Rim a chilled coupe glass with sugar and set aside.

            Step 2: Add cognac, Cointreau, lemon juice and sugar syrup to a shaker filled with cubed ice.

            Step 3: Shake hard until well chilled and properly diluted.

            Step 4: Double strain into the prepared glass and garnish with an expressed orange twist.
        `.trim(),
        image: './assets/sidecar.png'
    },
    { 
        id: 'c49', 
        name: "Singapore Sling", 
        category: ["Fruity", "Complex", "Longdrink"], 
        description: "A legendary long drink with cherry richness, tropical fruit and a complex herbal backbone.", 
        ingredients: [
            { amount: 30, unit: "ml", name: "Gin" },
            { amount: 15, unit: "ml", name: "Cherry Heering" },
            { amount: 7,  unit: "ml", name: "Cointreau" },
            { amount: 7,  unit: "ml", name: "Benedictine" },
            { amount: 10, unit: "ml", name: "Grenadine" },
            { amount: 15, unit: "ml", name: "Lime juice" },
            { amount: 120, unit: "ml", name: "Pineapple juice" }
        ], 
        glassware: "Highball glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled and properly aerated.

            Step 3: Strain into a highball glass filled with fresh cubed ice.

            Step 4: Garnish with a cherry and a pineapple wedge for a classic finish.
        `.trim(),
        image: "./assets/singaporesling.png" 
    },
    { 
        id: 'c50',
        name: 'South Side',
        category: ['Classic', 'Refreshing', 'Minty', "1920's"],
        description: 'A crisp gin classic with bright citrus, cooling mint and a clean, elegant finish.', 
        ingredients:[ 
            { amount: 45, unit: "ml",     name: "Gin" },
            { amount: 15, unit: "ml",     name: "Lemon juice" },
            { amount: 10, unit: "ml",     name: "Sugar syrup" },
            { amount: 8,  unit: "leaves", name: "Fresh mint" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: 'Shaken',
        methodDesc: `
            Step 1: Add mint and sugar syrup to a shaker and gently bruise to release aroma.

            Step 2: Add gin and lemon juice with cubed ice.

            Step 3: Shake hard until well chilled.

            Step 4: Double strain into a chilled coupe and garnish with a mint leaf.
        `.trim(),
        image: './assets/southside.png'
    },
    { 
        id: 'c51', 
        name: "Tequila Sunrise", 
        category: ["Sweet", "Visual", "Tequila"], 
        description: "A sunny classic with juicy orange, smooth tequila and a stunning crimson sunrise fade.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Tequila" },
            { amount: 90, unit: "ml", name: "Orange juice" },
            { amount: 10, unit: "ml", name: "Grenadine" }
        ], 
        glassware: "Highball glass",
        ice: "Cubed ice",
        method: "Built & Layered", 
        methodDesc: `
            Step 1: Fill a highball glass with fresh cubed ice.

            Step 2: Add tequila and orange juice and stir gently.

            Step 3: Slowly pour grenadine down the inside of the glass so it sinks to the bottom.

            Step 4: Garnish with an orange slice and a cherry without disturbing the layers.
        `.trim(),
        image: "./assets/tequilasunrise.png" 
    },
    { 
        id: 'c52', 
        name: "Tommy's Margarita", 
        category: ["Tequila", "Sour", "Clean"], 
        description: "A clean and modern margarita with pure tequila character, bright lime and smooth agave sweetness.", 
        ingredients: [
            { amount: 50, unit: "ml", name: "Tequila Blanco" },
            { amount: 25, unit: "ml", name: "Lime juice" },
            { amount: 15, unit: "ml", name: "Agave nectar" }
        ], 
        glassware: "Rocks glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Fill a rocks glass with fresh cubed ice (optional: half salt rim).

            Step 2: Add tequila, lime juice and agave nectar to a shaker filled with cubed ice.

            Step 3: Shake hard until well chilled and properly diluted.

            Step 4: Strain into the prepared glass and garnish with a lime wheel.
        `.trim(),
        image: "./assets/tommysmargarita.png" 
    },
    { 
        id: 'c53', 
        name: "Tropical Hurricane", 
        category: ["Tiki", "Fruity"], 
        description: "A juicy tropical riff with bright citrus, ripe stone fruit and an easy island vibe.", 
        ingredients: [
            { amount: 30, unit: "ml", name: "Bacardi Rasp" },
            { amount: 30, unit: "ml", name: "Peachtree" },
            { amount: 20, unit: "ml", name: "Lime juice" },
            { amount: 10, unit: "ml", name: "Orange juice" }
        ],
        glassware: "Hurricane glass",
        ice: "Crushed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled.

            Step 3: Strain into a hurricane glass filled with crushed ice.

            Step 4: Garnish with an orange slice and top with passion fruit juice if desired.
        `.trim(),
        image: "./assets/tropicalhurricane.png"
    },
    { 
        id: 'c54', 
        name: "Wandering Cosmo", 
        category: ["Fruity", "Riff", "Pasionfruit"], 
        description: "A playful cosmo riff with passionfruit sweetness, zesty lime and a bright berry sparkle.", 
        ingredients: [
            { amount: 20, unit: "ml", name: "Passoa" },
            { amount: 15, unit: "ml", name: "Cointreau" },
            { amount: 30, unit: "ml", name: "Vodka" },
            { amount: 15, unit: "ml", name: "Lime juice" },
            { amount: 10, unit: "ml", name: "Fruit soda" }
        ], 
        glassware: "Martini glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add Passoa, Cointreau, vodka and lime juice to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled.

            Step 3: Double strain into a chilled martini glass.

            Step 4: Top with red fruit soda and garnish with a lime twist.
        `.trim(),
        image: "./assets/wanderingcosmo.png" 
    },
    { 
        id: 'c55', 
        name: "Whiskey Sour", 
        category: ["Sour", "Classic"], 
        description: "A perfectly balanced sour with bright citrus, smooth sweetness and a silky egg-white foam.", 
        ingredients: [
            { amount: 45, unit: "ml",        name: "Bourbon" },
            { amount: 15, unit: "ml",        name: "Lemon juice" },
            { amount: 10, unit: "ml",        name: "Sugar syrup" },
            { amount: 1,  unit: "pcs",       name: "Egg white" }
        ], 
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Dry & Wet Shake", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker and dry shake (no ice) for 10–15 seconds to build foam.

            Step 2: Add cubed ice and shake hard until well chilled.

            Step 3: Strain into a rocks glass over a large ice cube.

            Step 4: Garnish with a few drops of bitters or a lemon twist.
        `.trim(),
        image: "./assets/whiskeysour.png" 
    },
    { 
        id: 'c56', 
        name: "White Lady", 
        category: ["Classic", "Sour", "Gin"], 
        description: "A crisp and elegant gin sour with bright citrus, orange warmth and a clean, refined finish.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Gin" },
            { amount: 25, unit: "ml", name: "Cointreau" },
            { amount: 20, unit: "ml", name: "Lemon juice" },
            { amount: 10, unit: "ml", name: "Sugar syrup" }
        ], 
        glassware: "Martini glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled and properly diluted.

            Step 3: Double strain into a chilled martini glass for a clean, silky texture.

            Step 4: Garnish with an expressed lemon twist.
        `.trim(),
        image: "./assets/whitelady.png" 
    },
    { 
        id: 'c57', 
        name: "Zombie", 
        category: ["Strong", "Tiki", "Unique"], 
        description: "A famous tiki powerhouse with layered rums, tropical sweetness and a dangerously bold kick.", 
        ingredients: [
            { amount: 30, unit: "ml",     name: "White Rum" },
            { amount: 30, unit: "ml",     name: "Dark Rum" },
            { amount: 20, unit: "ml",     name: "Orange juice" },
            { amount: 15, unit: "ml",     name: "Grenadine" },
            { amount: 10, unit: "ml",     name: "Cinnamon syrup" },
            { amount: 2,  unit: "dashes", name: "Angostura bitters" }
        ], 
        glassware: "Tiki mug",
        ice: "Crushed ice",
        method: "Shake & Fire", 
        methodDesc: `
            Step 1: Add all ingredients (except any overproof rum) to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled and strain into a tiki mug filled with crushed ice.

            Step 3: If using an overproof rum topper, float it carefully on top.

            Step 4: Garnish with mint and citrus; ignite the overproof rum only if safe and permitted.
        `.trim(),
        image: "./assets/zombie.png" 
    },
    { 
        id: 'c58', 
        name: "Jungle Bird", 
        category: ["Tiki", "Bitter", "Tropical"], 
        description: "A bold tiki classic balancing tropical pineapple sweetness with bittersweet Campari depth.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Dark Rum" },
            { amount: 20, unit: "ml", name: "Campari" },
            { amount: 45, unit: "ml", name: "Pineapple juice" },
            { amount: 15, unit: "ml", name: "Lime juice" },
            { amount: 15, unit: "ml", name: "Sugar syrup" }
        ], 
        glassware: "Rocks glass",
        ice: "Crushed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled.

            Step 3: Strain into a rocks glass (or tiki mug) filled with crushed ice.

            Step 4: Garnish with a pineapple wedge and a lime wheel.
        `.trim(),
        image: "./assets/junglebird.png" 
    },
    { 
        id: 'c59', 
        name: "Gold Rush", 
        category: ["Strong", "Honey", "Whiskey"], 
        description: "A whiskey sour-style classic with honeyed warmth, bright lemon and a smooth finish.", 
        ingredients: [
            { amount: 60, unit: "ml", name: "Bourbon" },
            { amount: 25, unit: "ml", name: "Lemon juice" },
            { amount: 20, unit: "ml", name: "Honey syrup" }
        ], 
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled and properly diluted.

            Step 3: Strain into a rocks glass over a large ice cube.

            Step 4: Garnish with a lemon twist to lift the aroma.
        `.trim(),
        image: "./assets/goldrush.png" 
    },
    { 
        id: 'c60', 
        name: "Gimlet", 
        category: ["Classic", "Sour", "Gin"], 
        description: "A crisp botanical classic with bright lime, clean acidity and a sharp, refreshing finish.", 
        ingredients: [
            { amount: 60, unit: "ml", name: "Gin" },
            { amount: 30, unit: "ml", name: "Lime cordial or Lime juice" },
            { amount: 10, unit: "ml", name: "Sugar syrup (if using fresh lime)" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled and balanced.

            Step 3: Double strain into a chilled coupe glass.

            Step 4: Garnish with a lime wheel or expressed lime peel.
        `.trim(),
        image: "./assets/gimlet.png" 
    },
    { 
        id: 'c61', 
        name: "Enzoni", 
        category: ["Gin", "Bitter", "Fruity", "Modern"], 
        description: "A modern bitter-sour mashup with muddled grapes, bright citrus and Negroni-like depth.", 
        ingredients: [
            { amount: 30, unit: "ml", name: "Gin" },
            { amount: 30, unit: "ml", name: "Campari" },
            { amount: 20, unit: "ml", name: "Lemon juice" },
            { amount: 15, unit: "ml", name: "Sugar syrup" },
            { amount: 5,  unit: "pcs", name: "Red grapes" }
        ], 
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Muddled & Shaken", 
        methodDesc: `
            Step 1: Add the grapes to a shaker and gently muddle to release juice (avoid crushing skins too aggressively).

            Step 2: Add gin, Campari, lemon juice and sugar syrup, then fill with cubed ice.

            Step 3: Shake hard until well chilled.

            Step 4: Double strain into a rocks glass over a large ice cube and garnish with a grape.
        `.trim(),
        image: "./assets/enzoni.png" 
    },
    { 
        id: 'c62', 
        name: "Painkiller", 
        category: ["Tiki", "Tropical", "Creamy"], 
        description: "A rich tropical comfort drink with bold rum, creamy coconut and a signature nutmeg finish.", 
        ingredients: [
            { amount: 60, unit: "ml", name: "Navy Strength Rum" },
            { amount: 120, unit: "ml", name: "Pineapple juice" },
            { amount: 30, unit: "ml", name: "Orange juice" },
            { amount: 30, unit: "ml", name: "Cream of coconut" }
        ], 
        glassware: "Hurricane glass",
        ice: "Crushed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled and slightly frothy.

            Step 3: Strain into a large glass filled with crushed ice.

            Step 4: Garnish with an orange slice and grate fresh nutmeg generously on top.
        `.trim(),
        image: "./assets/painkiller.png" 
    },
    { 
        id: 'c63', 
        name: "El Diablo", 
        category: ["Tequila", "Spicy", "Longdrink"], 
        description: "A crisp tequila highball with ginger spice, bright lime and a dark berry finish.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Tequila Reposado" },
            { amount: 15, unit: "ml", name: "Crème de Framboise" },
            { amount: 15, unit: "ml", name: "Lime juice" },
            { amount: 90, unit: "ml", name: "Ginger beer" }
        ], 
        glassware: "Highball glass",
        ice: "Cubed ice",
        method: "Built", 
        methodDesc: `
            Step 1: Fill a highball glass with fresh cubed ice.

            Step 2: Add tequila reposado and fresh lime juice.

            Step 3: Top with chilled ginger beer and stir gently.

            Step 4: Slowly float the Crème de Framboise over the top for a bleeding effect and garnish with a lime wheel.
        `.trim(),
        image: "./assets/eldiablo.png" 
    },
    { 
        id: 'c64', 
        name: "Aperol Sour", 
        category: ["Sour", "Light", "Bitter"], 
        description: "A bright low-ABV sour with bittersweet Aperol, fresh citrus and a silky foam finish.", 
        ingredients: [
            { amount: 60, unit: "ml", name: "Aperol" },
            { amount: 30, unit: "ml", name: "Lemon juice" },
            { amount: 15, unit: "ml", name: "Sugar syrup" },
            { amount: 1,  unit: "pcs", name: "Egg white" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Dry & Wet Shake", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker and dry shake (no ice) for 10–15 seconds to build foam.

            Step 2: Add cubed ice and shake hard until well chilled.

            Step 3: Double strain into a chilled coupe glass for a smooth, clean texture.

            Step 4: Garnish with an orange twist or a few drops of bitters on the foam.
        `.trim(),
        image: "./assets/aperolsour.png" 
    },
    { 
        id: 'c65', 
        name: "Aperol Betty", 
        category: ["Sparkling", "Fruit", "Low-ABV"], 
        description: "A bright citrus spritz with Aperol, juicy orange-grapefruit and a fresh sparkling lift.", 
        ingredients: [
            { amount: 60, unit: "ml", name: "Aperol" },
            { amount: 30, unit: "ml", name: "Orange juice" },
            { amount: 15, unit: "ml", name: "Grapefruit juice" },
            { amount: 60, unit: "ml", name: "Prosecco" }
        ], 
        glassware: "Wine glass",
        ice: "Large ice cubes",
        method: "Built", 
        methodDesc: `
            Step 1: Fill a chilled wine glass generously with large ice cubes.

            Step 2: Add Aperol, orange juice and grapefruit juice.

            Step 3: Top gently with Prosecco to keep the bubbles lively.

            Step 4: Give one gentle stir and garnish with an orange slice or grapefruit wedge.
        `.trim(),
        image: "./assets/aperolbetty.png" 
    },
    { 
        id: 'c66', 
        name: "Cucumber Gimlet", 
        category: ["Fresh", "Gin", "Botanical"], 
        description: "A crisp gimlet riff with cooling cucumber, bright lime snap and clean botanical gin notes.", 
        ingredients: [
            { amount: 50, unit: "ml", name: "Gin" },
            { amount: 20, unit: "ml", name: "Lime juice" },
            { amount: 15, unit: "ml", name: "Sugar syrup" },
            { amount: 3,  unit: "slices", name: "Fresh cucumber" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Muddled & Shaken", 
        methodDesc: `
            Step 1: Add cucumber slices to a shaker and gently muddle to release fresh cucumber juice.

            Step 2: Add gin, lime juice and sugar syrup, then fill with cubed ice.

            Step 3: Shake hard until well chilled.

            Step 4: Double strain into a chilled coupe and garnish with a thin cucumber ribbon.
        `.trim(),
        image: "./assets/cucumbergimlet.png" 
    },
    { 
        id: 'c67', 
        name: "Bijou", 
        category: ["Strong", "Herbal", "Classic"], 
        description: "A jewel-box classic with herbal intensity, vermouth richness and a crisp, elegant finish.", 
        ingredients: [
            { amount: 30, unit: "ml", name: "Gin" },
            { amount: 30, unit: "ml", name: "Sweet Vermouth" },
            { amount: 30, unit: "ml", name: "Green Chartreuse" },
            { amount: 1,  unit: "dash", name: "Orange bitters" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Stirred", 
        methodDesc: `
            Step 1: Add all ingredients to a mixing glass filled with cubed ice.

            Step 2: Stir smoothly for 25–30 seconds until ice cold and properly diluted.

            Step 3: Strain into a chilled coupe glass.

            Step 4: Garnish with a cherry or an expressed lemon twist.
        `.trim(),
        image: "./assets/bijou.png" 
    },
    { 
        id: 'c68', 
        name: "Hot Toddy", 
        category: ["Hot", "Winter", "Whiskey"], 
        description: "A soothing winter warmer with honeyed comfort, bright lemon and gentle whiskey heat.", 
        ingredients: [
            { amount: 50, unit: "ml", name: "Bourbon or Scotch" },
            { amount: 20, unit: "ml", name: "Honey" },
            { amount: 20, unit: "ml", name: "Lemon juice" },
            { amount: 150, unit: "ml", name: "Hot water" },
            { amount: 1, unit: "pcs", name: "Cinnamon stick" }
        ], 
        glassware: "Mug",
        ice: "No ice",
        method: "Built", 
        methodDesc: `
            Step 1: Warm a mug with hot water, then discard the water.

            Step 2: Add honey and lemon juice and top with hot water, stirring until dissolved.

            Step 3: Add whiskey and stir gently to combine.

            Step 4: Garnish with a cinnamon stick and a lemon wheel.
        `.trim(),
        image: "./assets/hottoddy.png" 
    },
    { 
        id: 'c69', 
        name: "Naked & Famous", 
        category: ["Modern", "Smoky", "Bitter", "Mezcal"], 
        description: "A sharp modern classic with smoky mezcal, bittersweet Aperol and bright lime tension.", 
        ingredients: [
            { amount: 25, unit: "ml", name: "Mezcal" },
            { amount: 25, unit: "ml", name: "Yellow Chartreuse" },
            { amount: 25, unit: "ml", name: "Aperol" },
            { amount: 25, unit: "ml", name: "Lime juice" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled and properly diluted.

            Step 3: Double strain into a chilled coupe glass.

            Step 4: Garnish with a lime twist.
        `.trim(),
        image: "./assets/nakedfamous.png" 
    },
    { 
        id: 'c70', 
        name: "Pisco Punch", 
        category: ["Fruity", "Strong", "Historic"], 
        description: "A historic punch with bright pineapple sweetness, citrus snap and bold pisco character.", 
        ingredients: [
            { amount: 60, unit: "ml", name: "Pisco" },
            { amount: 30, unit: "ml", name: "Pineapple syrup" },
            { amount: 20, unit: "ml", name: "Lemon juice" },
            { amount: 2, unit: "dashes", name: "Orange bitters" }
        ], 
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled and properly diluted.

            Step 3: Strain into a rocks glass over a large ice cube.

            Step 4: Garnish with a fresh pineapple wedge or expressed orange peel.
        `.trim(),
        image: "./assets/piscopunch.png" 
    },
    { 
        id: 'c71', 
        name: "White Russian", 
        category: ["Creamy", "Coffee", "Vodka"], 
        description: "A rich, creamy coffee classic with smooth vodka warmth and a silky dessert-like finish.", 
        ingredients: [
            { amount: 50, unit: "ml", name: "Vodka" },
            { amount: 25, unit: "ml", name: "Coffee liqueur" },
            { amount: 25, unit: "ml", name: "Fresh cream" }
        ], 
        glassware: "Rocks glass",
        ice: "Cubed ice",
        method: "Stirred & Layered", 
        methodDesc: `
            Step 1: Fill a rocks glass with fresh cubed ice.

            Step 2: Add vodka and coffee liqueur and stir gently to chill.

            Step 3: Slowly float fresh cream over the back of a spoon to create a layered top.

            Step 4: Garnish with grated nutmeg or coffee beans if desired.
        `.trim(),
        image: "./assets/whiterussian.png" 
    },
    { 
        id: 'c72', 
        name: "Blue Lagoon", 
        category: ["Blue", "Refreshing", "Vodka"], 
        description: "A vibrant blue refresher with zesty citrus, crisp vodka and an easy summer sparkle.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Vodka" },
            { amount: 20, unit: "ml", name: "Blue Curacao" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 90, unit: "ml", name: "Lemonade or Sprite" }
        ], 
        glassware: "Highball glass",
        ice: "Cubed ice",
        method: "Built", 
        methodDesc: `
            Step 1: Fill a highball glass with fresh cubed ice.

            Step 2: Add vodka, Blue Curaçao and lemon juice.

            Step 3: Top with lemonade or Sprite and stir gently to combine.

            Step 4: Garnish with a lemon wheel and a cherry.
        `.trim(),
        image: "./assets/bluelagoon.png" 
    },
    { 
        id: 'c73', 
        name: "Old Cuban", 
        category: ["Sparkling", "Rum", "Elegant"], 
        description: "An elegant modern classic with aged rum, fresh mint and a Champagne-bright finish.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Aged Rum" },
            { amount: 20, unit: "ml", name: "Lime juice" },
            { amount: 15, unit: "ml", name: "Sugar syrup" },
            { amount: 2,  unit: "dashes", name: "Angostura bitters" },
            { amount: 6,  unit: "leaves", name: "Mint" },
            { amount: 60, unit: "ml", name: "Champagne/Prosecco" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shake & Top", 
        methodDesc: `
            Step 1: Add rum, lime juice, sugar syrup, bitters and mint to a shaker with cubed ice.

            Step 2: Shake briefly to chill and lightly infuse the mint.

            Step 3: Double strain into a chilled coupe glass.

            Step 4: Top gently with Champagne/Prosecco and garnish with a mint leaf.
        `.trim(),
        image: "./assets/oldcuban.png" 
    },
    { 
        id: 'c74', 
        name: "Black Russian", 
        category: ["Strong", "Coffee", "Vodka"], 
        description: "A bold two-ingredient classic with clean vodka strength and deep coffee sweetness.", 
        ingredients: [
            { amount: 50, unit: "ml", name: "Vodka" },
            { amount: 25, unit: "ml", name: "Coffee liqueur" }
        ], 
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Stirred", 
        methodDesc: `
            Step 1: Fill a rocks glass with a large ice cube.

            Step 2: Add vodka and coffee liqueur.

            Step 3: Stir gently for 10–15 seconds to chill and combine.

            Step 4: Garnish with a maraschino cherry if desired.
        `.trim(),
        image: "./assets/blackrussian.png" 
    },
    { 
        id: 'c75', 
        name: "Mary Pickford", 
        category: ["Rum", "Fruity", "Classic"], 
        description: "A charming classic with pineapple brightness, delicate cherry notes and a soft pink finish.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "White Rum" },
            { amount: 45, unit: "ml", name: "Pineapple juice" },
            { amount: 7.5, unit: "ml", name: "Maraschino liqueur" },
            { amount: 5,  unit: "ml", name: "Grenadine" }
        ], 
        glassware: "Martini glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled.

            Step 3: Double strain into a chilled martini glass.

            Step 4: Garnish with a cocktail cherry or expressed lime twist.
        `.trim(),
        image: "./assets/marypickford.png" 
    },
    { 
        id: 'c76', 
        name: "Ramos Gin Fizz", 
        category: ["Creamy", "Gin", "Advanced"], 
        description: "A legendary showstopper with bright citrus, silky cream and a cloud-like foam finish.", 
        ingredients: [
            { amount: 60, unit: "ml", name: "Gin" },
            { amount: 15, unit: "ml", name: "Lemon juice" },
            { amount: 15, unit: "ml", name: "Lime juice" },
            { amount: 30, unit: "ml", name: "Sugar syrup" },
            { amount: 30, unit: "ml", name: "Egg white" },
            { amount: 30, unit: "ml", name: "Heavy cream" },
            { amount: 3,  unit: "drops", name: "Orange flower water" },
            { amount: 30, unit: "ml", name: "Soda water" }
        ], 
        glassware: "Highball glass",
        ice: "No ice",
        method: "Hard Shake", 
        methodDesc: `
            Step 1: Add all ingredients except soda water to a shaker and dry shake (no ice) for 60–90 seconds to build structure.

            Step 2: Add cubed ice and shake hard for another 60–90 seconds until the mixture is icy cold.

            Step 3: Double strain into a chilled highball glass with no ice.

            Step 4: Top slowly with soda water to lift the foam into a tall, creamy head.
        `.trim(),
        image: "./assets/ramosginfizz.png" 
    },
    { 
        id: 'c77', 
        name: "Espresso Martiki", 
        category: ["Fusion", "Coffee", "Rum"], 
        description: "A bold coffee-tiki fusion with spiced rum, tropical pineapple and a silky espresso foam.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Spiced Rum" },
            { amount: 30, unit: "ml", name: "Espresso" },
            { amount: 15, unit: "ml", name: "Coffee liqueur" },
            { amount: 15, unit: "ml", name: "Pineapple juice" },
            { amount: 5,  unit: "ml", name: "Orgeat" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard for 15–20 seconds to create a smooth, lightly tropical foam.

            Step 3: Double strain into a chilled coupe glass.

            Step 4: Garnish with pineapple leaf or a few coffee beans for contrast.
        `.trim(),
        image: "./assets/espressomartiki.png" 
    },
    { 
        id: 'c78', 
        name: "Gordon's Cup", 
        category: ["New Wave", "Fresh", "Gin"], 
        description: "A crisp cucumber-lime muddle with bright gin, gentle sweetness and a subtle saline snap.", 
        ingredients: [
            { amount: 60, unit: "ml", name: "Gin" },
            { amount: 3,  unit: "wedges", name: "Lime" },
            { amount: 3,  unit: "slices", name: "Cucumber" },
            { amount: 15, unit: "ml", name: "Sugar syrup" },
            { amount: 1,  unit: "pinch", name: "Salt" }
        ], 
        glassware: "Rocks glass",
        ice: "Cubed ice",
        method: "Muddled & Shaken", 
        methodDesc: `
            Step 1: Add lime wedges and cucumber slices to a shaker and gently muddle to release juice and aroma.

            Step 2: Add gin, sugar syrup and a pinch of salt, then fill with cubed ice.

            Step 3: Shake hard until well chilled.

            Step 4: Dirty pour (ice and all) into a rocks glass and garnish with a cucumber slice.
        `.trim(),
        image: "./assets/gordonscup.png" 
    },
    { 
        id: 'c79', 
        name: "Garibaldi", 
        category: ["Aperitivo", "Simple", "Orange"], 
        description: "A simple aperitivo made magical with fluffy, aerated orange juice and bittersweet Campari.", 
        ingredients: [
            { amount: 45, unit: "ml", name: "Campari" },
            { amount: 120, unit: "ml", name: "Freshly aerated Orange juice" }
        ], 
        glassware: "Highball glass",
        ice: "Cubed ice",
        method: "Built & Frothed", 
        methodDesc: `
            Step 1: Aerate the fresh orange juice by whipping or blending until light, fluffy and frothy.

            Step 2: Fill a highball glass with fresh cubed ice and add Campari.

            Step 3: Slowly pour the aerated orange juice over the Campari to create a layered, cloudy look.

            Step 4: Give one gentle stir and garnish with an orange slice.
        `.trim(),
        image: "./assets/garibaldi.png" 
    },
    { 
        id: 'c80', 
        name: "Army & Navy", 
        category: ["Classic", "Gin", "Nutty"], 
        description: "A vintage gin sour with bright lemon snap, almond richness and a silky, balanced finish.", 
        ingredients: [
            { amount: 60, unit: "ml", name: "Gin" },
            { amount: 25, unit: "ml", name: "Lemon juice" },
            { amount: 20, unit: "ml", name: "Orgeat (Almond) syrup" },
            { amount: 2,  unit: "dashes", name: "Angostura bitters" }
        ], 
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shaken", 
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled and properly diluted.

            Step 3: Double strain into a chilled coupe glass for a clean, silky texture.

            Step 4: Garnish with an expressed grapefruit twist.
        `.trim(),
        image: "./assets/armynavy.png" 
    },
]

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
                                    return `<li><span><b class="amount">${ing.amount}</b> <b class="unit">${ing.unit}</b> ${ing.name}</span></li>`;
                                }
                                return `<li><span>${ing}</span></li>`;
                            }).join('')}
                        </ul>
                    </div>

                    <div class="hardware-section">
                        <div class="hardware-column">
                            <strong>Glassware:</strong>
                            <p class="hardware-text">${cocktail.glassware}</p>
                        </div>
                        <div class="hardware-column">
                            <strong>Ice:</strong>
                            <p class="hardware-text">${cocktail.ice}</p>
                        </div>
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
    if (e) e.stopPropagation();
    
    // 1. Zoek de labels op de kaart waar geklikt is
    // We zoeken binnen de dichtstbijzijnde cocktail-card om de juiste te pakken
    const card = e.target.closest('.cocktail-card');
    const servingsLabel = card.querySelector(`[id="servings-${cocktailId}"]`);
    const listContainer = card.querySelector(`[id="ingredients-${cocktailId}"]`);
    
    if (!servingsLabel || !listContainer) {
        console.error("Servings elementen niet gevonden voor ID:", cocktailId);
        return;
    }

    // 2. Bereken nieuwe servings
    let currentServings = parseInt(servingsLabel.innerText);
    let newServings = currentServings + delta;
    if (newServings < 1) return;
    
    servingsLabel.innerText = newServings;
    
    // 3. Haal het originele recept op voor de basis-aantallen
    const allCocktails = [...classicCocktails, ...(JSON.parse(localStorage.getItem('myRecipes')) || [])];
    const cocktail = allCocktails.find(c => c.id.toString() === cocktailId.toString());
    
    if (cocktail) {
        const listItems = listContainer.querySelectorAll('li');
        
        cocktail.ingredients.forEach((ing, index) => {
            // Alleen updaten als het een object is met een amount
            if (typeof ing === 'object' && ing.amount !== undefined) {
                const li = listItems[index];
                if (!li) return;

                // Bereken nieuw aantal op basis van basis (amount / 1) * nieuwe servings
                const newAmount = (ing.amount * newServings).toFixed(ing.amount % 1 === 0 ? 0 : 1);
                
                // Zoek de span waar de tekst in staat
                const textSpan = li.querySelector('span');
                if (textSpan) {
                    // Behoud het icoontje (voor de Fridge)
                    const icon = textSpan.querySelector('i');
                    const iconHTML = icon ? icon.outerHTML + " " : "";
                    
                    // Update de inhoud van de span
                    textSpan.innerHTML = `${iconHTML}<b class="amount">${newAmount}</b> <b class="unit">${ing.unit}</b> ${ing.name}`;
                }
            }
        });
    }
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
                const nameToSearch = (typeof ing === 'object' ? ing.name : ing).toLowerCase().trim();
                
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
                    <p>No close matches found.<br><small>Try selecting more spirits!</small></p>
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
                        ${!isPerfect ? `<span class="missing-tag">Missing ${cocktail.missingCount}</span>` : ''}
                        <img src="${cocktail.image}" alt="${cocktail.name}">
                        ${isCustom ? `<span class="custom-badge">MINE</span>` : ''}
                    </div>
                    <div class="card-content">
                        <h4>${cocktail.name} ${isPerfect ? '✨' : ''}</h4>
                        <div class="category-container">
                            ${Array.isArray(cocktail.category) 
                                ? cocktail.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')
                                : `<span class="category-tag">${cocktail.category}</span>`
                            }
                        </div>
                        
                        <p class="description">${cocktail.description || ''}</p>

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
                                        const ingName = (typeof ing === 'object' ? ing.name : ing).toLowerCase().trim();
                                        const isMissing = cocktail.missingItems.some(m => 
                                            (typeof m === 'object' ? m.name : m).toLowerCase().trim() === ingName
                                        );
                                        
                                        const amountPart = typeof ing === 'object' ? `<b class="amount">${ing.amount}</b> <b class="unit">${ing.unit}</b>` : '';
                                        const namePart = typeof ing === 'object' ? ing.name : ing;

                                        return `
                                            <li class="${isMissing ? 'missing-ing' : 'available-ing'}">
                                                <span>
                                                    <i class="fa-solid ${isMissing ? 'fa-circle-xmark' : 'fa-circle-check'}"></i> 
                                                    ${amountPart} ${namePart}
                                                </span>
                                                ${isMissing ? `
                                                <button class="add-to-cart-btn" onclick="addToShoppingList(event, '${ingName}')">
                                                    <i class="fa-solid fa-cart-plus"></i>
                                                </button>` : ''}
                                            </li>`;
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
                resultsContainer.appendChild(card);
            });
        }

        btn.innerHTML           = `<i class="fa-solid fa-glass-citrus"></i> Find Cocktails`;
        btn.style.pointerEvents = "auto";
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 600);
}

/* ============================================================
 * 9. Shake it up!
 * ============================================================ */

function shakeForCocktail() {
    const shakerCard = document.getElementById('main-shaker-card');
    const modal = document.getElementById('shake-modal');
    const resultContainer = document.getElementById('shake-result-card');

    if (!shakerCard || !modal || !resultContainer) return;

    // Start animatie
    if (shakerCard.classList.contains('shaking')) return;
    shakerCard.classList.add('shaking');

    setTimeout(() => {
        shakerCard.classList.remove('shaking');

        // Check of de lijst bestaat onder de juiste naam: classicCocktails
        if (typeof classicCocktails !== 'undefined' && classicCocktails.length > 0) {
            
            // Kies een random cocktail uit de classicCocktails lijst
            const randomCocktail = classicCocktails[Math.floor(Math.random() * classicCocktails.length)];

            // Vul de popup
            resultContainer.innerHTML = `
                <img src="${randomCocktail.image}" alt="${randomCocktail.name}">
                <h2>${randomCocktail.name}</h2>
                <p style="color: #888; margin-bottom: 15px;">${randomCocktail.description}</p>
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 20px; text-align: left;">
                    <h4 style="color: #ffb347; margin-bottom: 8px; font-size: 0.9rem;">Ingredients:</h4>
                    <ul style="list-style: none; padding: 0; margin: 0; color: #ccc; font-size: 0.9rem;">
                        ${randomCocktail.ingredients.map(i => `<li>• ${i.amount}${i.unit} ${i.name}</li>`).join('')}
                    </ul>
                </div>
            `;

            // Toon de popup
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('show'), 50);
        } else {
            alert("Database 'classicCocktails' niet gevonden!");
        }
    }, 1200);
}
function closeShakeModal() {
    const modal = document.getElementById('shake-modal');
    
    // 1. Haal de 'show' class weg (start de CSS fade-out)
    modal.classList.remove('show');
    
    // 2. Wacht tot de animatie klaar is (400ms) en zet dan display op none
    setTimeout(() => {
        modal.style.display = 'none';
    }, 400);
}