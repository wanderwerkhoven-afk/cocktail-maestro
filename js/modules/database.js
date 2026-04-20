/* ============================================================
 * 1. COCKTAIL DATABASE (Classic Recipes)
 * ============================================================
 *  1.  COCKTAIL DATABASE (Classic Recipes)
 *      - Amaretto Sour
 *      - Americano
 *      - Aperol Betty
 *      - Aperol Spritz
 *      - Aperol Sour
 *      - Army & Navy
 *      - Aviation
 *      - Bee's Knees
 *      - Bellini
 *      - Bijou
 *      - Black Russian
 *      - Bloody Mary
 *      - Blue Lagoon
 *      - Blueberry Mule
 *      - Boulevardier
 *      - Bramble
 *      - Brown Derby
 *      - Caipirinha
 *      - Chai Moscow Mule
 *      - Chartreuse Swizzle
 *      - Clover Club
 *      - Corpse Reviver #2
 *      - Cosmopolitan
 *      - Cuba Libre
 *      - Cucumber Gimlet
 *      - Daiquiri
 *      - Dark 'n Stormy
 *      - Dry Martini
 *      - El Diablo
 *      - Enzoni
 *      - Espresso Martiki
 *      - Espresso Martini
 *      - Espresso Martini Bueno
 *      - French 75
 *      - French Martini
 *      - Garden Cocktail
 *      - Giribaldi
 *      - Giant Sucker
 *      - Gimlet
 *      - Gin Basil Smash
 *      - Gin Fizz
 *      - Gold Rush
 *      - Gordons Cup
 *      - Groen Plansoen
 *      - Hemingway Daiquiri
 *      - Holy Peach
 *      - Hot Toddy
 *      - Hugo Spritz
 *      - Jungle Bird
 *      - Kir Royale
 *      - Last Word
 *      - Long Island Iced Tea
 *      - Lychacha
 *      - Mai Tai
 *      - Manderin Daiquiri
 *      - Mango Mustache
 *      - Manhattan
 *      - Margarita
 *      - Mary Pickford
 *      - Mezcal Margarita
 *      - Mint Julep
 *      - Mojito
 *      - Monte Carlo
 *      - Moscow Mule
 *      - Muddy Mudslide
 *      - Naked & Famous
 *      - Negroni
 *      - New York Sour
 *      - Old Cuban
 *      - Old Fashioned
 *      - Painkiller
 *      - Paloma
 *      - Paper Plane
 *      - Penicillin
 *      - Pina Colada
 *      - Pisco Punch
 *      - Pisco Sour
 *      - Planter's Punch
 *      - Pornstar Martini
 *      - Ramos Gin Fizz
 *      - Red Flamingo
 *      - Rosemary & Peach Sour
 *      - Sazerac
 *      - Screwdriver
 *      - Sea Breeze
 *      - Sidecar
 *      - Singapore Sling
 *      - South Side
 *      - Spicy Margarita
 *      - Spritz Veneziano
 *      - Tequila Sunrise
 *      - Tommy's Margarita
 *      - Tropical Hurricane
 *      - Vieux Carré
 *      - Vodka Martini
 *      - Wandering Cosmo
 *      - Whiskey Sour
 *      - White Lady
 *      - White Russian
 *      - Yellow Bird
 *      - Zombie
 *  
 *      FRIDGE CATEGORIES
 *      - spirits               "spirit"    
 *      - liqueurs & vermouths  "liqueur"
 *      - bitters & tinctures   "bitters"
 *      - syrups & purees       "syrup"
 *      - juices & mixers       "juice"
 *      - fresh & pantry        "fresh"
 *      
 *    
 */

export const classicCocktails = [
    {
        id: 'amaretto-sour',
        name: "Amaretto Sour",
        category: ["Sweet", "Sour", "Classic", "Almond"],
        description: "A perfectly balanced classic with deep almond warmth, fresh lemon bite and a luxuriously silky foam.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Amaretto", fridgeCategory: "liqueur" },
            { amount: 30, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 1, unit: "pcs", name: "Egg white", fridgeCategory: "fresh" },
            { amount: 2, unit: "dashes", name: "Angostura bitters", fridgeCategory: "bitters" }
        ],
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Shaken",
        methodDesc: `
            Step 1: Add all ingredients to a shaker and dry shake (no ice) for 10-15 seconds to emulsify the egg white and build a silky foam.

            Step 2: Add ice and shake hard until the shaker is well chilled.

            Step 3: Double strain into a chilled rocks glass over a large clear ice cube.

            Step 4: Garnish with a cherry or orange slice and finish with a few drops of Angostura bitters on the foam.
        `.trim(),
        image: "./assets/Cocktails/amarettosour.webp"
    },
    {
        id: 'americano',
        name: "Americano",
        category: ["Low Alcohol", "Bitter", "Classic"],
        description: "A light and refreshing aperitivo with bittersweet depth and gentle effervescence.",
        ingredients: [
            { amount: 30, unit: "ml", name: "Campari", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Sweet vermouth", fridgeCategory: "liqueur" },
            { amount: 60, unit: "ml", name: "Soda water", fridgeCategory: "juice" }
        ],
        glassware: "Highball",
        ice: "Ice cubes",
        method: "Built",
        methodDesc: `
            Step 1: Fill a highball glass with ice.

            Step 2: Add Campari and sweet vermouth.

            Step 3: Top with soda water and gently stir.

            Step 4: Garnish with an orange slice.
        `.trim(),
        image: "./assets/Cocktails/americano.webp"
    },
    {
        id: 'aperol-betty',
        name: "Aperol Betty",
        category: ["Sparkling", "Fruit", "Low-ABV"],
        description: "A bright citrus spritz with Aperol, juicy orange-grapefruit and a fresh sparkling lift.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Aperol", fridgeCategory: "liqueur" },
            { amount: 30, unit: "ml", name: "Orange juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Grapefruit juice", fridgeCategory: "juice" },
            { amount: 60, unit: "ml", name: "Prosecco/Champagne", fridgeCategory: "liqueur" }
        ],
        glassware: "Wine glass",
        ice: "Large ice cubes",
        method: "Built",
        methodDesc: `
            Step 1: Fill a chilled wine glass generously with large ice cubes.

            Step 2: Add Aperol, orange juice and grapefruit juice.

            Step 3: Top gently with Prosecco or Champagne to keep the bubbles lively.

            Step 4: Give one gentle stir and garnish with an orange slice or grapefruit wedge.
        `.trim(),
        image: "./assets/Cocktails/aperolbetty.webp"
    },
    {
        id: 'aperol-spritz',
        name: "Aperol Spritz",
        category: ["Light", "Sparkling", "Bitter"],
        description: "Bright, bittersweet and effortlessly refreshing, with lively bubbles and a sun-kissed finish.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Prosecco/Champagne", fridgeCategory: "liqueur" },
            { amount: 30, unit: "ml", name: "Aperol", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Soda water", fridgeCategory: "juice" }
        ],
        glassware: "Wine glass",
        ice: "Large ice cubes",
        method: "Built",
        methodDesc: `
            Step 1: Fill a chilled wine glass generously with large ice cubes.

            Step 2: Pour in the Prosecco or Champagne first to preserve its freshness and bubbles.

            Step 3: Add the Aperol, followed by a splash of soda water.

            Step 4: Gently stir once to combine and garnish with a fresh orange slice.
        `.trim(),
        image: "./assets/Cocktails/aperolspritz.webp"
    },
    {
        id: 'aperol-sour',
        name: "Aperol Sour",
        category: ["Sour", "Light", "Bitter"],
        description: "A bright low-ABV sour with bittersweet Aperol, fresh citrus and a silky foam finish.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Aperol", fridgeCategory: "liqueur" },
            { amount: 30, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" },
            { amount: 1, unit: "pcs", name: "Egg white", fridgeCategory: "fresh" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Dry & Wet Shake",
        methodDesc: `
            Step 1: Add all ingredients to a shaker and dry shake (no ice) for 10-15 seconds to build foam.

            Step 2: Add cubed ice and shake hard until well chilled.

            Step 3: Double strain into a chilled coupe glass for a smooth, clean texture.

            Step 4: Garnish with an orange twist or a few drops of bitters on the foam.
        `.trim(),
        image: "./assets/Cocktails/aperolsour.webp"
    },
    {
        id: 'army&navy',
        name: "Army & Navy",
        category: ["Classic", "Gin", "Nutty"],
        description: "A vintage gin sour with bright lemon snap, almond richness and a silky, balanced finish.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 25, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 20, unit: "ml", name: "Orgeat syrup", fridgeCategory: "syrup" },
            { amount: 2, unit: "dashes", name: "Angostura bitters", fridgeCategory: "bitters" }
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
        image: "./assets/Cocktails/armynavy.webp"
    },
    {
        id: 'aviation',
        name: "Aviation",
        category: ["Floral", "Classic", "Purple"],
        description: "An elegant classic with delicate floral notes, bright citrus and a subtle cherry sweetness.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Maraschino liqueur", fridgeCategory: "liqueur" },
            { amount: 10, unit: "ml", name: "Crème de Violette", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/aviation.webp"
    },
    {
        id: 'bees-knees',
        name: "Bee's Knees",
        category: ["Classic", "Honey", "Sweet", "Sour"],
        description: "A smooth Prohibition-era classic with bright citrus, floral honey sweetness and a clean gin backbone.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Honey syrup", fridgeCategory: "syrup" },
            { amount: 10, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" }
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
        image: "./assets/Cocktails/beesknees.webp"
    },
    {
        id: 'bellini',
        name: "Bellini",
        category: ["Sparkling", "Fruity", "Classic"],
        description: "Elegant and delicate with fresh peach sweetness and lively bubbles.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Peach purée", fridgeCategory: "juice" },
            { amount: 90, unit: "ml", name: "Prosecco/Champagne", fridgeCategory: "liqueur" }
        ],
        glassware: "Flute",
        ice: "No ice",
        method: "Built",
        methodDesc: `
            Step 1: Add peach purée to a chilled flute.

            Step 2: Slowly top with Prosecco or Champagne.

            Step 3: Gently stir once to combine.
        `.trim(),
        image: "./assets/Cocktails/bellini.webp"
    },
    {
        id: 'bijou',
        name: "Bijou",
        category: ["Strong", "Herbal", "Classic"],
        description: "A jewel-box classic with herbal intensity, vermouth richness and a crisp, elegant finish.",
        ingredients: [
            { amount: 30, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Sweet vermouth", fridgeCategory: "liqueur" },
            { amount: 30, unit: "ml", name: "Green Chartreuse", fridgeCategory: "liqueur" },
            { amount: 1, unit: "dash", name: "Orange bitters", fridgeCategory: "bitters" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Stirred",
        methodDesc: `
            Step 1: Add all ingredients to a mixing glass filled with cubed ice.

            Step 2: Stir smoothly for 25-30 seconds until ice cold and properly diluted.

            Step 3: Strain into a chilled coupe glass.

            Step 4: Garnish with a cherry or an expressed lemon twist.
        `.trim(),
        image: "./assets/Cocktails/bijou.webp"
    },
    {
        id: 'black-russian',
        name: "Black Russian",
        category: ["Strong", "Coffee", "Vodka"],
        description: "A bold two-ingredient classic with clean vodka strength and deep coffee sweetness.",
        ingredients: [
            { amount: 50, unit: "ml", name: "Vodka", fridgeCategory: "spirit" },
            { amount: 25, unit: "ml", name: "Coffee liqueur", fridgeCategory: "liqueur" }
        ],
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Stirred",
        methodDesc: `
            Step 1: Fill a rocks glass with a large ice cube.

            Step 2: Add vodka and coffee liqueur.

            Step 3: Stir gently for 10-15 seconds to chill and combine.

            Step 4: Garnish with a maraschino cherry if desired.
        `.trim(),
        image: "./assets/Cocktails/blackrussian.webp"
    },
    {
        id: 'bloody-mary',
        name: "Bloody Mary",
        category: ["Savory", "Vodka"],
        description: "A bold and savory classic with rich tomato depth, gentle heat and a perfectly seasoned finish.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Vodka", fridgeCategory: "spirit" },
            { amount: 120, unit: "ml", name: "Tomato juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Worcestershire sauce", fridgeCategory: "bitters" },
            { amount: 5, unit: "ml", name: "Tabasco sauce", fridgeCategory: "bitters" }
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
        image: "./assets/Cocktails/bloodymary.webp"
    },
    {
        id: 'blue-lagoon',
        name: "Blue Lagoon",
        category: ["Blue", "Refreshing", "Vodka"],
        description: "A vibrant blue refresher with zesty citrus, crisp vodka and an easy summer sparkle.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Vodka", fridgeCategory: "spirit" },
            { amount: 20, unit: "ml", name: "Blue Curaçao", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 90, unit: "ml", name: "Sprite", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/bluelagoon.webp"
    },
    {
        id: 'blueberry-mule',
        name: "Blueberry Mule",
        category: ["Blue", "Ginger", "Spicy"],
        description: "A vibrant mule with bright berry notes, zesty lime and a spicy ginger kick.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Vodka", fridgeCategory: "spirit" },
            { amount: 120, unit: "ml", name: "Blue Curaçao", fridgeCategory: "liqueur" },
            { amount: 30, unit: "ml", name: "Blueberry liqueur", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 120, unit: "ml", name: "Ginger beer", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/blueberrymule.webp"
    },
    {
        id: 'boulevardier',
        name: "Boulevardier",
        category: ["Strong", "Bitter", "Whiskey"],
        description: "A bold and refined classic, blending rich bourbon warmth with bittersweet depth and elegance.",
        ingredients: [
            { amount: 30, unit: "ml", name: "Bourbon", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Campari", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Sweet vermouth", fridgeCategory: "liqueur" }
        ],
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Stirred",
        methodDesc: `
            Step 1: Add all ingredients to a mixing glass filled with cubed ice.

            Step 2: Stir smoothly for 25-30 seconds until well chilled and properly diluted.

            Step 3: Strain into a chilled rocks glass over a large clear ice cube.

            Step 4: Express an orange twist over the glass, rim the edge and drop it in as garnish.
        `.trim(),
        image: "./assets/Cocktails/boulevardier.webp"
    },
    {
        id: 'bramble',
        name: "Bramble",
        category: ["Gin", "Fruity", "Classic"],
        description: "A vibrant gin classic with bright citrus, gentle sweetness and a dramatic blackberry bleed.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 20, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" },
            { amount: 15, unit: "ml", name: "Crème de Mure", fridgeCategory: "liqueur" }
        ],
        glassware: "Rocks glass",
        ice: "Crushed ice",
        method: "Built & Bleed",
        methodDesc: `
            Step 1: Add the gin, fresh lemon juice and simple syrup to a shaker filled with cubed ice.

            Step 2: Shake briefly until chilled, then strain into a rocks glass filled with crushed ice.

            Step 3: Slowly drizzle the Crème de Mure over the top to create a deep purple blackberry bleed.

            Step 4: Garnish with fresh blackberries and a lemon slice for a classic Bramble finish.
        `.trim(),
        image: "./assets/Cocktails/bramble.webp"
    },
    {
        id: 'brown-derby',
        name: "Brown Derby",
        category: ["Whiskey", "Citrus", "Classic"],
        description: "Smooth bourbon balanced by bright grapefruit and honeyed sweetness.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Bourbon", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Grapefruit juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Honey syrup", fridgeCategory: "syrup" }
        ],
        glassware: "Coupe",
        ice: "No ice",
        method: "Shaken",
        methodDesc: `
            Step 1: Add all ingredients to a shaker with ice.

            Step 2: Shake until well chilled.

            Step 3: Fine strain into a chilled coupe.
        `.trim(),
        image: "./assets/Cocktails/brownderby.webp"
    },
    {
        id: 'caipirinha',
        name: "Caipirinha",
        category: ["Strong", "Sour", "Fresh"],
        description: "A bold and refreshing classic with bright lime, rustic sweetness and the raw character of cachaça.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Cachaça", fridgeCategory: "spirit" },
            { amount: 1, unit: "pcs", name: "Fresh lime", fridgeCategory: "fresh" },
            { amount: 2, unit: "tsp", name: "Brown sugar", fridgeCategory: "fresh" }
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
        image: "./assets/Cocktails/caipirinha.webp"
    },
    {
        id: 'chai-moscow-mule',
        name: "Chai Moscow Mule",
        category: ["Spiced", "Fresh", "Modern"],
        description: "A warm and aromatic twist on the classic Mule, combining chai spices with zesty lime and spicy ginger beer.",
        ingredients: [
            { amount: 50, unit: "ml", name: "Vodka", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Chai syrup", fridgeCategory: "syrup" },
            { amount: 15, unit: "ml", name: "Fresh lime juice", fridgeCategory: "juice" },
            { amount: 100, unit: "ml", name: "Ginger beer", fridgeCategory: "soda" }
        ],
        glassware: "Copper mug",
        ice: "Ice cubes",
        method: "Built",
        methodDesc: `
            Step 1: Fill a copper mug with ice cubes.

            Step 2: Add vodka, chai syrup, and fresh lime juice.

            Step 3: Stir briefly to combine and dissolve the syrup.

            Step 4: Top with ginger beer.

            Step 5: Give a gentle stir to integrate while keeping carbonation.

            Step 6: Garnish with a star anise and place a round butter cookie on the rim.
        `.trim(),
        image: "./assets/Cocktails/chaimoscowmule.webp"
    },
    {
        id: 'chartreuse-swizzle',
        name: "Chartreuse Swizzle",
        category: ["Herbal", "Tiki", "Complex"],
        description: "Intensely herbal, citrusy and exotic with a cooling crushed-ice texture.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Green Chartreuse", fridgeCategory: "liqueur" },
            { amount: 20, unit: "ml", name: "Pineapple juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 10, unit: "ml", name: "Falernum", fridgeCategory: "syrup" }
        ],
        glassware: "Highball",
        ice: "Crushed ice",
        method: "Swizzled",
        methodDesc: `
            Step 1: Add all ingredients to a glass filled with crushed ice.

            Step 2: Swizzle until the glass frosts.

            Step 3: Top with more crushed ice and garnish with mint.
        `.trim(),
        image: "./assets/Cocktails/chartreuseswizzle.webp"
    },
    {
        id: 'clover-club',
        name: "Clover Club",
        category: ["Sour", "Elegant", "Raspberry", "Pink"],
        description: "An elegant, silky-smooth classic with bright citrus, soft raspberry sweetness and a velvety foam.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Raspberry syrup", fridgeCategory: "syrup" },
            { amount: 15, unit: "ml", name: "Egg white", fridgeCategory: "fresh" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Dry Shake & Shake",
        methodDesc: `
            Step 1: Add all ingredients to a shaker and dry shake (no ice) for 10-15 seconds to build a smooth, airy foam.

            Step 2: Add cubed ice and shake hard until the shaker is well chilled.

            Step 3: Double strain into a chilled coupe glass for a refined, silky texture.

            Step 4: Garnish with fresh raspberries or a light lemon twist.
        `.trim(),
        image: "./assets/Cocktails/cloverclub.webp"
    },
    {
        id: 'corpse-reviver-2',
        name: "Corpse Reviver #2",
        category: ["Classic", "Strong", "Orange", "Lemon"],
        description: "A sharp and elegant classic with bright citrus, herbal depth and a revitalizing bite.",
        ingredients: [
            { amount: 30, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Lillet Blanc", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Cointreau", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 2, unit: "dashes", name: "Angostura bitters", fridgeCategory: "bitters" }
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
        image: "./assets/Cocktails/corpsreviver2.webp"
    },
    {
        id: 'cosmopolitan',
        name: "Cosmopolitan",
        category: ["Fruit", "Vodka", "Pink"],
        description: "A modern classic with bright citrus, tart cranberry and sleek elegance.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Vodka Citron", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Cointreau", fridgeCategory: "liqueur" },
            { amount: 30, unit: "ml", name: "Cranberry juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Lime juice", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/cosmopolitan.webp"
    },
    {
        id: 'cuba-libre',
        name: "Cuba Libre",
        category: ["Highball", "Rum", "Classic"],
        description: "Effortlessly refreshing with cola sweetness, lime brightness and rum warmth.",
        ingredients: [
            { amount: 50, unit: "ml", name: "White rum", fridgeCategory: "spirit" },
            { amount: 120, unit: "ml", name: "Cola", fridgeCategory: "juice" },
            { amount: 10, unit: "ml", name: "Lime juice", fridgeCategory: "juice" }
        ],
        glassware: "Highball",
        ice: "Ice cubes",
        method: "Built",
        methodDesc: `
            Step 1: Fill a glass with ice.

            Step 2: Add rum and lime juice.

            Step 3: Top with cola and gently stir.
        `.trim(),
        image: "./assets/Cocktails/cubalibre.webp"
    },
    {
        id: 'cucumber-gimlet',
        name: "Cucumber Gimlet",
        category: ["Fresh", "Gin", "Botanical"],
        description: "A crisp gimlet riff with cooling cucumber, bright lime snap and clean botanical gin notes.",
        ingredients: [
            { amount: 50, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 20, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" },
            { amount: 3, unit: "slices", name: "Fresh cucumber", fridgeCategory: "fresh" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Muddled & Shaken",
        methodDesc: `
            Step 1: Add cucumber slices to a shaker and gently muddle to release fresh cucumber juice.

            Step 2: Add gin, lime juice and simple syrup, then fill with cubed ice.

            Step 3: Shake hard until well chilled.

            Step 4: Double strain into a chilled coupe and garnish with a thin cucumber ribbon.
        `.trim(),
        image: "./assets/Cocktails/cucumbergimlet.webp"
    },
    {
        id: 'daiquiri',
        name: "Daiquiri",
        category: ["Sour", "Rum"],
        description: "A pure and timeless classic with bright lime, subtle sweetness and clean rum character.",
        ingredients: [
            { amount: 45, unit: "ml", name: "White Rum", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" }
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
        image: "./assets/Cocktails/daiquri.webp"
    },
    {
        id: 'dark-n-stormy',
        name: "Dark 'n Stormy",
        category: ["Spicy", "Rum"],
        description: "A bold and moody highball with spicy ginger and rich, dark rum depth.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Dark Rum", fridgeCategory: "spirit" },
            { amount: 120, unit: "ml", name: "Ginger beer", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Lime juice", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/darkenstormy.webp"
    },
    {
        id: 'dry-martini',
        name: "Dry Martini",
        category: ["Strong", "Gin"],
        description: "A timeless icon of precision, purity and ice-cold elegance.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Dry Vermouth", fridgeCategory: "liqueur" },
            { amount: 1, unit: "dash", name: "Angostura bitters", fridgeCategory: "bitters" }
        ],
        glassware: "Martini glass",
        ice: "Cubed ice",
        method: "Stirred",
        methodDesc: `
            Step 1: Add all ingredients to a mixing glass filled with cubed ice.

            Step 2: Stir smoothly for 25-30 seconds until ice cold and properly diluted.

            Step 3: Strain into a chilled martini glass.

            Step 4: Garnish with a lemon twist or olive, according to preference.
        `.trim(),
        image: "./assets/Cocktails/drymartini.webp"
    },
    {
        id: 'el-diablo',
        name: "El Diablo",
        category: ["Tequila", "Spicy", "Longdrink"],
        description: "A crisp tequila highball with ginger spice, bright lime and a dark berry finish.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Tequila Reposado", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Crème de Framboise", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 90, unit: "ml", name: "Ginger beer", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/eldiablo.webp"
    },
    {
        id: 'enzoni',
        name: "Enzoni",
        category: ["Gin", "Bitter", "Fruity", "Modern"],
        description: "A modern bitter-sour mashup with muddled grapes, bright citrus and Negroni-like depth.",
        ingredients: [
            { amount: 30, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Campari", fridgeCategory: "liqueur" },
            { amount: 20, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" },
            { amount: 5, unit: "pcs", name: "Red grapes", fridgeCategory: "fresh" }
        ],
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Muddled & Shaken",
        methodDesc: `
            Step 1: Add the grapes to a shaker and gently muddle to release juice (avoid crushing skins too aggressively).

            Step 2: Add gin, Campari, lemon juice and simple syrup, then fill with cubed ice.

            Step 3: Shake hard until well chilled.

            Step 4: Double strain into a rocks glass over a large ice cube and garnish with a grape.
        `.trim(),
        image: "./assets/Cocktails/enzoni.webp"
    },
    {
        id: 'espresso-martiki',
        name: "Espresso Martiki",
        category: ["Fusion", "Coffee", "Rum"],
        description: "A bold coffee-tiki fusion with spiced rum, tropical pineapple and a silky espresso foam.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Spiced Rum", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Espresso", fridgeCategory: "fresh" },
            { amount: 15, unit: "ml", name: "Coffee liqueur", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Pineapple juice", fridgeCategory: "juice" },
            { amount: 5, unit: "ml", name: "Orgeat syrup", fridgeCategory: "syrup" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shaken",
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard for 15-20 seconds to create a smooth, lightly tropical foam.

            Step 3: Double strain into a chilled coupe glass.

            Step 4: Garnish with pineapple leaf or a few coffee beans for contrast.
        `.trim(),
        image: "./assets/Cocktails/espressomartiki.webp"
    },
    {
        id: 'espresso-martini',
        name: "Espresso Martini",
        category: ["Coffee", "Vodka"],
        description: "A rich and energizing classic with bold coffee flavors and a silky crema.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Vodka", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Coffee liqueur", fridgeCategory: "liqueur" },
            { amount: 30, unit: "ml", name: "Espresso", fridgeCategory: "fresh" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Hard Shake",
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard for 15-20 seconds to create a thick, velvety foam.

            Step 3: Double strain into a chilled coupe glass.

            Step 4: Garnish with three coffee beans for a classic finish.
        `.trim(),
        image: "./assets/Cocktails/espressomartini.webp"
    },
    {
        id: 'espresso-martini-bueno',
        name: "Espresso Martini Bueno",
        category: ["Energy", "Coffee", "Sweet", "Bitter"],
        description: "A rich and indulgent espresso martini with roasted coffee depth and smooth hazelnut warmth.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Vodka", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Frangelico", fridgeCategory: "liqueur" },
            { amount: 30, unit: "ml", name: "Espresso", fridgeCategory: "fresh" },
            { amount: 15, unit: "ml", name: "Hazelnut syrup", fridgeCategory: "syrup" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shaken",
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard for 15-20 seconds to build a thick, creamy foam.

            Step 3: Double strain into a chilled coupe glass.

            Step 4: Garnish with coffee beans or grated chocolate for a decadent finish.
        `.trim(),
        image: "./assets/Cocktails/bueno.webp"
    },
    {
        id: 'french-75',
        name: "French 75",
        category: ["Champagne", "Gin", "Lemon"],
        description: "A bright and celebratory classic with crisp citrus and elegant bubbles.",
        ingredients: [
            { amount: 30, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" },
            { amount: 90, unit: "ml", name: "Prosecco/Champagne", fridgeCategory: "liqueur" }
        ],
        glassware: "Flute glass",
        ice: "Cubed ice",
        method: "Shaken & Layered",
        methodDesc: `
            Step 1: Add the gin, lemon juice and simple syrup to a shaker filled with cubed ice.

            Step 2: Shake briefly until chilled and strain into a chilled flute glass.

            Step 3: Top gently with Prosecco or Champagne.

            Step 4: Garnish with a lemon twist for a refined finish.
        `.trim(),
        image: "./assets/Cocktails/french75.webp"
    },
    {
        id: 'french-martini',
        name: "French Martini",
        category: ["Sweet", "Fruity", "Vodka"],
        description: "A silky modern classic with lush raspberry notes and a soft pineapple foam.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Vodka", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Chambord", fridgeCategory: "liqueur" },
            { amount: 60, unit: "ml", name: "Pineapple juice", fridgeCategory: "juice" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Hard Shake",
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake very hard for 15-20 seconds to create a thick, silky foam.

            Step 3: Double strain into a chilled coupe glass.

            Step 4: Garnish with fresh raspberries or a lemon twist.
        `.trim(),
        image: "./assets/Cocktails/frenchmartini.webp"
    },
    {
        id: 'garden-cocktail',
        name: "Garden Cocktail",
        category: ["Fresh", "Floral", "Cucumber"],
        description: "A refreshing garden-inspired cocktail with floral notes and crisp cucumber freshness.",
        ingredients: [
            { amount: 20, unit: "ml", name: "Elderflower liqueur", fridgeCategory: "liqueur" },
            { amount: 50, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 20, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 6, unit: "pcs", name: "Fresh Cucumber", fridgeCategory: "fresh" },
            { amount: 15, unit: "ml", name: "Sprite", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/garden.webp"
    },
    {
        id: 'garibaldi',
        name: "Garibaldi",
        category: ["Aperitivo", "Simple", "Orange"],
        description: "A simple aperitivo made magical with fluffy, aerated orange juice and bittersweet Campari.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Campari", fridgeCategory: "spirit" },
            { amount: 120, unit: "ml", name: "Freshly aerated Orange juice", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/garibaldi.webp"
    },
    {
        id: 'giant-sucker',
        name: "Giant Sucker",
        category: ["Herbal", "Unique", "Bubbly"],
        description: "A bold herbal mix where Jägermeister meets honey sweetness and floral bubbles.",
        ingredients: [
            { amount: 30, unit: "ml", name: "Honey", fridgeCategory: "syrup" },
            { amount: 45, unit: "ml", name: "Jägermeister", fridgeCategory: "liqueur" },
            { amount: 10, unit: "pcs", name: "Fresh mint", fridgeCategory: "fresh" },
            { amount: 15, unit: "ml", name: "Elderflower tonic", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/giantsucker.webp"
    },
    {
        id: 'gimlet',
        name: "Gimlet",
        category: ["Classic", "Sour", "Gin"],
        description: "A crisp botanical classic with bright lime, clean acidity and a sharp, refreshing finish.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Lime juice", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/gimlet.webp"
    },
    {
        id: 'gin-basil-smash',
        name: "Gin Basil Smash",
        category: ["Modern", "Fresh", "Herbal"],
        description: "A vibrant modern classic bursting with fresh basil and bright citrus.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "syrups:simple" },
            { amount: 10, unit: "pcs", name: "Fresh basil", fridgeCategory: "fresh" }
        ],
        glassware: "Rocks glass",
        ice: "Cubed ice",
        method: "Muddled & Shaken",
        methodDesc: `
            Step 1: Add basil leaves and simple syrup to a shaker and gently muddle.

            Step 2: Add gin and lemon juice with cubed ice.

            Step 3: Shake hard until well chilled and strain into a rocks glass over fresh ice.

            Step 4: Garnish with a fresh basil leaf.
        `.trim(),
        image: "./assets/Cocktails/ginbasil.webp"
    },
    {
        id: 'gin-fizz',
        name: "Gin Fizz",
        category: ["Sparkling", "Refreshing"],
        description: "A light and refreshing classic with bright citrus and lively effervescence.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "syrups:simple" },
            { amount: 30, unit: "ml", name: "Soda water", fridgeCategory: "juice" }
        ],
        glassware: "Highball glass",
        ice: "Cubed ice",
        method: "Shaken & Built",
        methodDesc: `
            Step 1: Add gin, lemon juice and simple syrup to a shaker filled with cubed ice.

            Step 2: Shake briefly until chilled and strain into a highball glass.

            Step 3: Add fresh ice and top with soda water.

            Step 4: Garnish with a lemon slice or twist.
        `.trim(),
        image: "./assets/Cocktails/ginfizz.webp"
    },
    {
        id: 'gold-rush',
        name: "Gold Rush",
        category: ["Strong", "Honey", "Whiskey"],
        description: "A whiskey sour-style classic with honeyed warmth, bright lemon and a smooth finish.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Bourbon", fridgeCategory: "spirit" },
            { amount: 25, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 20, unit: "ml", name: "Honey syrup", fridgeCategory: "syrup" }
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
        image: "./assets/Cocktails/goldrush.webp"
    },
    {
        id: 'gordons-cup',
        name: "Gordon's Cup",
        category: ["New Wave", "Fresh", "Gin"],
        description: "A crisp cucumber-lime muddle with bright gin, gentle sweetness and a subtle saline snap.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 3, unit: "wedges", name: "Fresh lime", fridgeCategory: "fresh" },
            { amount: 3, unit: "slices", name: "Fresh Cucumber", fridgeCategory: "fresh" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "syrups:simple" },
            { amount: 1, unit: "pinch", name: "Salt", fridgeCategory: "fresh" }
        ],
        glassware: "Rocks glass",
        ice: "Cubed ice",
        method: "Muddled & Shaken",
        methodDesc: `
            Step 1: Add lime wedges and cucumber slices to a shaker and gently muddle to release juice and aroma.

            Step 2: Add gin, simple syrup and a pinch of salt, then fill with cubed ice.

            Step 3: Shake hard until well chilled.

            Step 4: Dirty pour (ice and all) into a rocks glass and garnish with a cucumber slice.
        `.trim(),
        image: "./assets/Cocktails/gordonscup.webp"
    },
    {
        id: 'groen-plansoen',
        name: "Groen Plansoen",
        category: ["Fresh", "Floral", "Cucumber"],
        description: "A delicate botanical cocktail with floral elderflower, cucumber freshness and soft tea notes.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Elderflower liqueur", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Elderflower syrup", fridgeCategory: "syrup" },
            { amount: 20, unit: "ml", name: "Cucumber juice", fridgeCategory: "juice" },
            { amount: 30, unit: "ml", name: "Iced tea", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/groenplansoen.webp"
    },
    {
        id: 'hemingway-daiquiri',
        name: "Hemingway Daiquiri",
        category: ["Sour", "Rum", "Classic"],
        description: "Dry, sharp and elegant with grapefruit bitterness and clean rum character.",
        ingredients: [
            { amount: 60, unit: "ml", name: "White rum", fridgeCategory: "spirit" },
            { amount: 20, unit: "ml", name: "Grapefruit juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 10, unit: "ml", name: "Maraschino liqueur", fridgeCategory: "liqueur" }
        ],
        glassware: "Coupe",
        ice: "No ice",
        method: "Shaken",
        methodDesc: `
            Step 1: Shake all ingredients with ice.

            Step 2: Double strain into a chilled coupe.
        `.trim(),
        image: "./assets/Cocktails/hemingwaydaiquiri.webp"
    },
    {
        id: 'holypeach',
        name: "Holy Peach",
        category: ["Sweet", "Fruity", "Peach"],
        description: "A smooth and juicy peach highball with warm vanilla notes and a bright, refreshing lift.",
        ingredients: [
            { amount: 30, unit: "ml", name: "Peachtree", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Licor 43", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 20, unit: "ml", name: "Sprite", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/holypeach.webp"
    },
    {
        id: 'hot-toddy',
        name: "Hot Toddy",
        category: ["Hot", "Winter", "Whiskey"],
        description: "A soothing winter warmer with honeyed comfort, bright lemon and gentle whiskey heat.",
        ingredients: [
            { amount: 50, unit: "ml", name: "Bourbon or Scotch", fridgeCategory: "spirit" },
            { amount: 20, unit: "ml", name: "Honey", fridgeCategory: "syrup" },
            { amount: 20, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 150, unit: "ml", name: "Hot water", fridgeCategory: "fresh" },
            { amount: 1, unit: "pcs", name: "Cinnamon stick", fridgeCategory: "fresh" }
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
        image: "./assets/Cocktails/hottoddy.webp"
    },
    {
        id: 'hugo-spritz',
        name: "Hugo Spritz",
        category: ["Sparkling", "Floral", "Summer"],
        description: "A light and floral spritz with elderflower charm, crisp bubbles and fresh mint brightness.",
        ingredients: [
            { amount: 30, unit: "ml", name: "Elderflower liqueur", fridgeCategory: "liqueur" },
            { amount: 90, unit: "ml", name: "Prosecco/Champagne", fridgeCategory: "liqueur" },
            { amount: 30, unit: "ml", name: "Soda water", fridgeCategory: "juice" },
            { amount: 5, unit: "leaves", name: "Fresh mint", fridgeCategory: "fresh" }
        ],
        glassware: "Wine glass",
        ice: "Large ice cubes",
        method: "Built",
        methodDesc: `
            Step 1: Fill a chilled wine glass generously with large ice cubes.

            Step 2: Add the elderflower liqueur and gently clap the mint leaves before adding.

            Step 3: Pour in the Prosecco or Champagne, then top with soda water.

            Step 4: Give one gentle stir and garnish with a lime wheel and fresh mint.
        `.trim(),
        image: "./assets/Cocktails/hugo.webp"
    },
    {
        id: 'jungle-bird',
        name: "Jungle Bird",
        category: ["Tiki", "Bitter", "Tropical"],
        description: "A bold tiki classic balancing tropical pineapple sweetness with bittersweet Campari depth.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Dark Rum", fridgeCategory: "spirit" },
            { amount: 20, unit: "ml", name: "Campari", fridgeCategory: "spirit" },
            { amount: 45, unit: "ml", name: "Pineapple juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "syrups:simple" }
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
        image: "./assets/Cocktails/junglebird.webp"
    },
    {
        id: 'kir-royale',
        name: "Kir Royale",
        category: ["Sparkling", "Elegant", "Classic"],
        description: "A luxurious aperitif with dark berry sweetness and crisp champagne.",
        ingredients: [
            { amount: 15, unit: "ml", name: "Crème de cassis", fridgeCategory: "liqueur" },
            { amount: 120, unit: "ml", name: "Prosecco/Champagne", fridgeCategory: "liqueur" }
        ],
        glassware: "Flute",
        ice: "No ice",
        method: "Built",
        methodDesc: `
            Step 1: Add crème de cassis to a chilled flute.

            Step 2: Top gently with Prosecco or Champagne.
        `.trim(),
        image: "./assets/Cocktails/kirroyale.webp"
    },
    {
        id: 'lady-marmalade',
        name: "Lady Marmalade",
        category: ["Breakfast", "Vodka", "Vermout"],
        description: "A delicious twist on a breakfast martini, A wonderfull complexity to the finsh.",
        ingredients: [
            { amount: 25, unit: "ml", name: "Marmalade Vodka", fridgeCategory: "spirit" },
            { amount: 25, unit: "ml", name: "Sweet vermouth", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "L&G", fridgeCategory: "juice", kitchenId: 'oleo-saccharums:lg' },
            { amount: 30, unit: "ml", name: "bergamot Dilution", fridgeCategory: "fresh", kitchenId: "syrups:bergamot-dilution" }
        ],
        glassware: "Rocks glass",
        ice: "Cubed ice",
        method: "Shaken",
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled and properly diluted.

            Step 3: Double strain into a chilled rocks glass for a clean, elegant texture.

            Step 4: Garnish with a lime twist or a brandied cherry.
        `.trim(),
        image: ""
    },
    {
        id: 'last-word',
        name: "Last Word",
        category: ["Strong", "Herbal", "Classic"],
        description: "A perfectly balanced classic with herbal intensity, bright lime snap and a clean, sharp finish.",
        ingredients: [
            { amount: 25, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 25, unit: "ml", name: "Green Chartreuse", fridgeCategory: "liqueur" },
            { amount: 25, unit: "ml", name: "Maraschino liqueur", fridgeCategory: "liqueur" },
            { amount: 25, unit: "ml", name: "Lime juice", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/lastword.webp"
    },
    {
        id: 'long-island-ice-tea',
        name: "Long Island Ice Tea",
        category: ["Very-Strong", "Classic"],
        description: "A legendary powerhouse with crisp citrus bite, subtle sweetness and a cola finish.",
        ingredients: [
            { amount: 20, unit: "ml", name: "White Rum", fridgeCategory: "spirit" },
            { amount: 20, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 20, unit: "ml", name: "Vodka", fridgeCategory: "spirit" },
            { amount: 20, unit: "ml", name: "Tequila", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Cointreau", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "syrups:simple" },
            { amount: 30, unit: "ml", name: "Cola", fridgeCategory: "juice" }
        ],
        glassware: "Highball glass",
        ice: "Cubed ice",
        method: "Built",
        methodDesc: `
            Step 1: Fill a highball glass with fresh cubed ice.

            Step 2: Add all spirits, Cointreau, lemon juice and simple syrup.

            Step 3: Top with cola and stir gently to combine without losing fizz.

            Step 4: Garnish with a lemon wedge for a classic finish.
        `.trim(),
        image: "./assets/Cocktails/longisland.webp"
    },
    {
        id: 'lychacha',
        name: "Lychacha",
        category: ["Exotic", "Floral", "Lychee", "Sweet", "Sour"],
        description: "A silky exotic sour with floral lychee sweetness, bright citrus and a soft Aperol glow.",
        ingredients: [
            { amount: 20, unit: "ml", name: "Elderflower syrup", fridgeCategory: "syrup" },
            { amount: 20, unit: "ml", name: "Lychee liqueur", fridgeCategory: "liqueur" },
            { amount: 20, unit: "ml", name: "Aperol", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Egg white", fridgeCategory: "fresh" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shaken",
        methodDesc: `
            Step 1: Add all ingredients to a shaker and dry shake (no ice) for 10-15 seconds to build a thick foam.

            Step 2: Add cubed ice and shake hard until the shaker is well chilled.

            Step 3: Double strain into a chilled coupe glass for a smooth, silky texture.

            Step 4: Garnish with a lychee on a pick or a lemon twist to lift the aroma.
        `.trim(),
        image: "./assets/Cocktails/lychacha.webp"
    },
    {
        id: 'mai-tai',
        name: "Mai Tai",
        category: ["Tiki", "Rum", "Classic"],
        description: "Bold tropical richness with layered rums, citrus and almond depth.",
        ingredients: [
            { amount: 40, unit: "ml", name: "Aged rum", fridgeCategory: "spirit" },
            { amount: 20, unit: "ml", name: "White rum", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Orange curaçao", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Orgeat syrup", fridgeCategory: "syrup" },
            { amount: 20, unit: "ml", name: "Lime juice", fridgeCategory: "juice" }
        ],
        glassware: "Rocks glass",
        ice: "Crushed ice",
        method: "Shaken",
        methodDesc: `
            Step 1: Shake all ingredients with ice.

            Step 2: Strain over crushed ice.

            Step 3: Garnish with mint and lime.
        `.trim(),
        image: "./assets/Cocktails/maitai.webp"
    },
    {
        id: 'mango-mustache',
        name: "Mango Mustache",
        category: ["Fruity", "Sour", "Sweet", "Mango"],
        description: "A tropical silky sour with bright mango fruit, fresh citrus snap and a smooth gin backbone.",
        ingredients: [
            { amount: 20, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "syrups:simple" },
            { amount: 20, unit: "ml", name: "Mango puree", fridgeCategory: "syrup" },
            { amount: 15, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 30, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Egg white", fridgeCategory: "fresh" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shaken",
        methodDesc: `
            Step 1: Add all ingredients to a shaker and dry shake (no ice) for 10-15 seconds to emulsify and build foam.

            Step 2: Add cubed ice and shake hard until well chilled and properly diluted.

            Step 3: Double strain into a chilled coupe glass for a clean, velvety finish.

            Step 4: Garnish with a thin mango slice or a lemon twist.
        `.trim(),
        image: "./assets/Cocktails/mangomustach.webp"
    },
    {
        id: 'manhattan',
        name: "Manhattan",
        category: ["Strong", "Spirit-Forward"],
        description: "A rich and moody whiskey classic with silky vermouth depth and a bittersweet finish.",
        ingredients: [
            { amount: 50, unit: "ml", name: "Rye Whiskey", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Sweet vermouth", fridgeCategory: "liqueur" },
            { amount: 2, unit: "dashes", name: "Angostura bitters", fridgeCategory: "bitters" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Stirred",
        methodDesc: `
            Step 1: Add all ingredients to a mixing glass filled with cubed ice.

            Step 2: Stir smoothly for 25-30 seconds until well chilled and properly diluted.

            Step 3: Strain into a chilled coupe glass for a clean, spirit-forward serve.

            Step 4: Garnish with a cocktail cherry and express an orange twist if desired.
        `.trim(),
        image: "./assets/Cocktails/manhattan.webp"
    },
    {
        id: 'margarita',
        name: "Margarita",
        category: ["Sour", "Tequila"],
        description: "A crisp tequila classic with bright lime bite, orange warmth and a clean salty edge.",
        ingredients: [
            { amount: 50, unit: "ml", name: "Tequila", fridgeCategory: "spirit" },
            { amount: 25, unit: "ml", name: "Cointreau", fridgeCategory: "liqueur" },
            { amount: 25, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 1, unit: "tsp", name: "Salt", fridgeCategory: "fresh" }
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
        image: "./assets/Cocktails/margerita.webp"
    },
    {
        id: 'mary-pickford',
        name: "Mary Pickford",
        category: ["Rum", "Fruity", "Classic"],
        description: "A charming classic with pineapple brightness, delicate cherry notes and a soft pink finish.",
        ingredients: [
            { amount: 45, unit: "ml", name: "White Rum", fridgeCategory: "spirit" },
            { amount: 45, unit: "ml", name: "Pineapple juice", fridgeCategory: "juice" },
            { amount: 7.5, unit: "ml", name: "Maraschino liqueur", fridgeCategory: "liqueur" },
            { amount: 5, unit: "ml", name: "Grenadine", fridgeCategory: "syrup" }
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
        image: "./assets/Cocktails/marypickford.webp"
    },
    {
        id: 'mezcal-margarita',
        name: "Mezcal Margarita",
        category: ["Smoky", "Tequila", "Sour"],
        description: "A smoky twist with mezcal depth, bright lime snap and a bold, spicy edge.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Mezcal", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Cointreau", fridgeCategory: "liqueur" },
            { amount: 20, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 10, unit: "ml", name: "Agave syrup", fridgeCategory: "syrup" }
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
        image: "./assets/Cocktails/mezcalmargarita.webp"
    },
    {
        id: 'mint-julep',
        name: "Mint Julep",
        category: ["Whiskey", "Herbal", "Classic"],
        description: "Cooling mint and subtle sweetness wrapped around bold bourbon.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Bourbon", fridgeCategory: "spirit" },
            { amount: 10, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "syrups:simple" },
            { amount: 10, unit: "leaves", name: "Fresh mint", fridgeCategory: "fresh" }
        ],
        glassware: "Julep cup",
        ice: "Crushed ice",
        method: "Built",
        methodDesc: `
            Step 1: Lightly muddle mint with syrup.

            Step 2: Fill with crushed ice and add bourbon.

            Step 3: Stir until the cup frosts and garnish with mint.
        `.trim(),
        image: "./assets/Cocktails/mintjulep.webp"
    },
    {
        id: 'mojito',
        name: "Mojito",
        category: ["Refreshing", "Rum"],
        description: "A bright Cuban classic with fresh mint, zesty lime and a crisp, refreshing finish.",
        ingredients: [
            { amount: 50, unit: "ml", name: "White Rum", fridgeCategory: "spirit" },
            { amount: 10, unit: "g", name: "Fresh mint", fridgeCategory: "fresh" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "syrups:simple" },
            { amount: 25, unit: "ml", name: "Soda water", fridgeCategory: "juice" },
            { amount: 25, unit: "ml", name: "Lime juice", fridgeCategory: "juice" }
        ],
        glassware: "Highball glass",
        ice: "Crushed ice",
        method: "Muddled",
        methodDesc: `
            Step 1: Add mint and simple syrup to a highball glass and gently press to release aroma (do not shred the mint).

            Step 2: Add lime juice and white rum, then fill the glass with crushed ice.

            Step 3: Top with soda water and stir gently to combine and lift the mint.

            Step 4: Garnish with a mint bouquet and a lime wheel.
        `.trim(),
        image: "./assets/Cocktails/mojito.webp"
    },
    {
        id: 'monte-carlo',
        name: "Monte Carlo",
        category: ["Whiskey", "Strong", "Classic"],
        description: "A richer, spiced twist on the Old Fashioned with herbal depth from Benedictine.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Rye whiskey", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Benedictine", fridgeCategory: "liqueur" },
            { amount: 2, unit: "dashes", name: "Angostura bitters", fridgeCategory: "bitters" }
        ],
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Stirred",
        methodDesc: `
            Step 1: Add all ingredients to a mixing glass with ice.

            Step 2: Stir until well chilled and diluted.

            Step 3: Strain over a large ice cube.

            Step 4: Garnish with an orange twist.
        `.trim(),
        image: "./assets/Cocktails/montecarlo.webp"
    },
    {
        id: 'moscow-mule',
        name: "Moscow Mule",
        dutchName: "Moskou Mule",
        category: ["Spicy", "Vodka"],
        description: "Crisp and refreshing with bright lime, chilled vodka and a spicy ginger beer kick.",
        ingredients: [
            { amount: 50, unit: "ml", name: "Vodka", fridgeCategory: "spirit" },
            { amount: 25, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 125, unit: "ml", name: "Ginger beer", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/moskoumule.webp"
    },
    {
        id: 'muddy-mudslide',
        name: "Muddy Mudslide",
        category: ["Creamy", "Coffee", "Caramel"],
        description: "A rich and indulgent coffee cocktail with creamy Baileys, caramel warmth and espresso depth.",
        ingredients: [
            { amount: 30, unit: "ml", name: "Baileys", fridgeCategory: "liqueur" },
            { amount: 30, unit: "ml", name: "Caramel vodka", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Coffee liqueur", fridgeCategory: "liqueur" },
            { amount: 30, unit: "ml", name: "Espresso", fridgeCategory: "fresh" }
        ],
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Stirred",
        methodDesc: `
            Step 1: Add all ingredients to a mixing glass with a large ice cube.

            Step 2: Stir gently for 10-15 seconds to chill without over-dilution.

            Step 3: Strain into a chilled rocks glass over a fresh large ice cube.

            Step 4: Garnish with grated chocolate or coffee beans.
        `.trim(),
        image: "./assets/Cocktails/mudslide.webp"
    },
    {
        id: 'naked-and-famous',
        name: "Naked & Famous",
        category: ["Modern", "Smoky", "Bitter", "Mezcal"],
        description: "A sharp modern classic with smoky mezcal, bittersweet Aperol and bright lime tension.",
        ingredients: [
            { amount: 25, unit: "ml", name: "Mezcal", fridgeCategory: "spirit" },
            { amount: 25, unit: "ml", name: "Yellow Chartreuse", fridgeCategory: "liqueur" },
            { amount: 25, unit: "ml", name: "Aperol", fridgeCategory: "liqueur" },
            { amount: 25, unit: "ml", name: "Lime juice", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/nakedfamous.webp"
    },
    {
        id: 'negroni',
        name: "Negroni",
        category: ["Bitter", "Gin"],
        description: "A bold bartender's classic with bittersweet depth, herbal balance and ruby-red elegance.",
        ingredients: [
            { amount: 30, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Campari", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Sweet vermouth", fridgeCategory: "liqueur" }
        ],
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Stirred",
        methodDesc: `
            Step 1: Add all ingredients to a mixing glass filled with cubed ice.

            Step 2: Stir smoothly for 25-30 seconds until chilled and properly diluted.

            Step 3: Strain into a rocks glass over a large clear ice cube.

            Step 4: Express an orange peel over the drink and drop it in.
        `.trim(),
        image: "./assets/Cocktails/negroni.webp"
    },
    {
        id: 'new-york-sour',
        name: "New York Sour",
        category: ["Classic", "Wine twist", "Sour"],
        description: "A refined whiskey sour crowned with a dramatic red wine float.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Jameson", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" },
            { amount: 1, unit: "pcs", name: "Egg white", fridgeCategory: "fresh" },
            { amount: 30, unit: "ml", name: "Red wine", fridgeCategory: "liqueur" }
        ],
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Shake & Float",
        methodDesc: `
            Step 1: Add whiskey, lemon juice, simple syrup and egg white to a shaker and dry shake for 10-15 seconds.

            Step 2: Add ice and shake hard until well chilled.

            Step 3: Strain into a rocks glass over a large ice cube.

            Step 4: Gently float red wine over the top using the back of a spoon.
        `.trim(),
        image: "./assets/Cocktails/newyorksour.webp"
    },
    {
        id: 'old-cuban',
        name: "Old Cuban",
        category: ["Sparkling", "Rum", "Elegant"],
        description: "An elegant modern classic with aged rum, fresh mint and a Champagne-bright finish.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Aged Rum", fridgeCategory: "spirit" },
            { amount: 20, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" },
            { amount: 2, unit: "dashes", name: "Angostura bitters", fridgeCategory: "bitters" },
            { amount: 6, unit: "leaves", name: "Fresh mint", fridgeCategory: "fresh" },
            { amount: 60, unit: "ml", name: "Prosecco/Champagne", fridgeCategory: "liqueur" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shake & Top",
        methodDesc: `
            Step 1: Add rum, lime juice, simple syrup, bitters and mint to a shaker with cubed ice.

            Step 2: Shake briefly to chill and lightly infuse the mint.

            Step 3: Double strain into a chilled coupe glass.

            Step 4: Top gently with Prosecco or Champagne and garnish with a mint leaf.
        `.trim(),
        image: "./assets/Cocktails/oldcuban.webp"
    },
    {
        id: 'old-fashioned',
        name: "Old Fashioned",
        category: ["Strong", "Classic", "Spirit-Forward"],
        description: "A timeless whiskey icon with subtle sweetness, bitters and elegant citrus oils.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Bourbon", fridgeCategory: "spirit" },
            { amount: 1, unit: "cube", name: "Sugar cube", fridgeCategory: "fresh" },
            { amount: 2, unit: "drops", name: "Angostura bitters", fridgeCategory: "bitters" },
            { amount: 1, unit: "tsp", name: "Orange zest", fridgeCategory: "fresh" }
        ],
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Stirred",
        methodDesc: `
            Step 1: Place the sugar cube in a rocks glass and saturate with bitters and a splash of water.

            Step 2: Muddle gently until dissolved.

            Step 3: Add bourbon and a large ice cube, then stir for 25-30 seconds.

            Step 4: Express orange zest over the glass and garnish.
        `.trim(),
        image: "./assets/Cocktails/oldfashion.webp"
    },
    {
        id: 'painkiller',
        name: "Painkiller",
        category: ["Tiki", "Tropical", "Creamy"],
        description: "A rich tropical comfort drink with bold rum, creamy coconut and a signature nutmeg finish.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Navy Strength Rum", fridgeCategory: "spirit" },
            { amount: 120, unit: "ml", name: "Pineapple juice", fridgeCategory: "juice" },
            { amount: 30, unit: "ml", name: "Orange juice", fridgeCategory: "juice" },
            { amount: 30, unit: "ml", name: "Cream of coconut", fridgeCategory: "syrup" }
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
        image: "./assets/Cocktails/painkiller.webp"
    },
    {
        id: 'paloma',
        name: "Paloma",
        category: ["Fresh", "Tequila"],
        description: "A crisp and refreshing tequila highball with bright grapefruit and zesty lime.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Tequila", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 90, unit: "ml", name: "Grapefruit soda", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/paloma.webp"
    },
    {
        id: 'paper-plane',
        name: "Paper Plane",
        category: ["Modern", "Bitter", "Bourbon"],
        description: "A modern equal-parts classic with bittersweet balance and bright citrus lift.",
        ingredients: [
            { amount: 25, unit: "ml", name: "Bourbon", fridgeCategory: "spirit" },
            { amount: 25, unit: "ml", name: "Aperol", fridgeCategory: "liqueur" },
            { amount: 25, unit: "ml", name: "Amaro Nonino", fridgeCategory: "liqueur" },
            { amount: 25, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/paperplane.webp"
    },
    {
        id: 'penicillin',
        name: "Penicillin",
        category: ["Whiskey", "Spicy", "Smoky"],
        description: "A modern masterpiece with honeyed warmth, ginger spice and a smoky Scotch finish.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Blended Scotch", fridgeCategory: "spirit" },
            { amount: 20, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 20, unit: "ml", name: "Honey-Ginger syrup", fridgeCategory: "syrup", kitchenId: "honey-ginger-syrup" },
            { amount: 10, unit: "ml", name: "Islay Single Malt", fridgeCategory: "spirit" }
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
        image: "./assets/Cocktails/penicillin.webp"
    },
    {
        id: 'pina-colada',
        name: "Pina Colada",
        category: ["Tropical", "Sweet"],
        description: "A tropical escape with creamy coconut, ripe pineapple and smooth rum.",
        ingredients: [
            { amount: 45, unit: "ml", name: "White Rum", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Coconut cream", fridgeCategory: "syrup" },
            { amount: 60, unit: "ml", name: "Pineapple juice", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/pinacolada.webp"
    },
    {
        id: 'pisco-punch',
        name: "Pisco Punch",
        category: ["Fruity", "Strong", "Historic"],
        description: "A historic punch with bright pineapple sweetness, citrus snap and bold pisco character.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Pisco", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Pineapple syrup", fridgeCategory: "syrup" },
            { amount: 20, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 2, unit: "dashes", name: "Orange bitters", fridgeCategory: "bitters" }
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
        image: "./assets/Cocktails/piscopunch.webp"
    },
    {
        id: 'pisco-sour',
        name: "Pisco Sour",
        category: ["Sour", "Strong", "Classic"],
        description: "A creamy and vibrant classic with floral pisco, bright lime and silky foam.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Pisco", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 20, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" },
            { amount: 1, unit: "pcs", name: "Egg white", fridgeCategory: "fresh" },
            { amount: 3, unit: "drops", name: "Angostura bitters", fridgeCategory: "bitters" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Dry & Wet Shake",
        methodDesc: `
            Step 1: Add all ingredients except bitters to a shaker and dry shake for 10-15 seconds.

            Step 2: Add cubed ice and shake hard until well chilled.

            Step 3: Double strain into a chilled coupe glass.

            Step 4: Finish with Angostura bitters on the foam.
        `.trim(),
        image: "./assets/Cocktails/piscosour.webp"
    },
    {
        id: 'planters-punch',
        name: "Planter's Punch",
        category: ["Tiki", "Rum", "Fruity"],
        description: "A bold Caribbean classic bursting with rum, citrus and tropical sweetness.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Dark rum", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Pineapple juice", fridgeCategory: "juice" },
            { amount: 20, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" },
            { amount: 2, unit: "dashes", name: "Angostura bitters", fridgeCategory: "bitters" }
        ],
        glassware: "Highball",
        ice: "Crushed ice",
        method: "Shaken",
        methodDesc: `
            Step 1: Shake all ingredients with ice.

            Step 2: Strain into a glass filled with crushed ice.

            Step 3: Garnish with mint and seasonal fruit.
        `.trim(),
        image: "./assets/Cocktails/planterspunch.webp"
    },
    {
        id: 'pornstar-martini',
        name: "Pornstar Martini",
        category: ["Modern", "Sweet", "Passionfruit", "Vodka"],
        description: "An iconic modern classic with exotic passionfruit, vanilla warmth and a bubbly sidekick.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Vanilla Vodka", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Passoa", fridgeCategory: "liqueur" },
            { amount: 30, unit: "ml", name: "Passionfruit puree", fridgeCategory: "juice" },
            { amount: 10, unit: "ml", name: "Vanilla syrup", fridgeCategory: "syrup" },
            { amount: 30, unit: "ml", name: "Prosecco/Champagne", fridgeCategory: "liqueur" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: "Shaken",
        methodDesc: `
            Step 1: Add all ingredients except Prosecco/Champagne to a shaker filled with cubed ice.

            Step 2: Shake hard until well chilled.

            Step 3: Double strain into a chilled coupe glass.

            Step 4: Serve the Prosecco or Champagne in a separate shot glass alongside.
        `.trim(),
        image: "./assets/Cocktails/pornstar.webp"
    },
    {
        id: 'ramos-gin-fizz',
        name: "Ramos Gin Fizz",
        category: ["Creamy", "Gin", "Advanced"],
        description: "A legendary showstopper with bright citrus, silky cream and a cloud-like foam finish.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 30, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" },
            { amount: 30, unit: "ml", name: "Egg white", fridgeCategory: "fresh" },
            { amount: 30, unit: "ml", name: "Heavy cream", fridgeCategory: "fresh" },
            { amount: 3, unit: "drops", name: "Orange flower water", fridgeCategory: "fresh" },
            { amount: 30, unit: "ml", name: "Soda water", fridgeCategory: "juice" }
        ],
        glassware: "Highball glass",
        ice: "No ice",
        method: "Hard Shake",
        methodDesc: `
            Step 1: Add all ingredients except soda water to a shaker and dry shake (no ice) for 60-90 seconds to build structure.

            Step 2: Add cubed ice and shake hard for another 60-90 seconds until the mixture is icy cold.

            Step 3: Double strain into a chilled highball glass with no ice.

            Step 4: Top slowly with soda water to lift the foam into a tall, creamy head.
        `.trim(),
        image: "./assets/Cocktails/ramosginfizz.webp"
    },
    {
        id: 'red-flamingo',
        name: "Red Flamingo",
        category: ["Fruity", "Sparkling", "Fresh"],
        description: "A vibrant pink refresher with bright berries, citrus lift and a sparkling finish.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Bramble gin", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Cointreau", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 10, unit: "ml", name: "Raspberry syrup", fridgeCategory: "syrup" },
            { amount: 30, unit: "ml", name: "Soda water", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/redflamingo.webp"
    },
    {
        id: 'rosemary-peach-sour',
        name: 'Rosemary & Peach Sour',
        category: ['Vodka', 'Herbal', 'Velvet'],
        description: 'A refined peach sour with bright citrus, silky texture and a subtle rosemary lift.',
        ingredients: [
            { amount: 45, unit: "ml", name: "Vodka", fridgeCategory: "spirit" },
            { amount: 20, unit: "ml", name: "Peachtree", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 10, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" },
            { amount: 20, unit: "ml", name: "Milk", fridgeCategory: "fresh" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: 'Shaken',
        methodDesc: `
            Step 1: Add all ingredients to a shaker filled with cubed ice.

            Step 2: Shake hard for 15-20 seconds to chill and create a smooth, velvety texture.

            Step 3: Double strain into a chilled coupe glass for a clean finish.

            Step 4: Garnish with a rosemary sprig (clap first to release aroma) and a thin peach slice.
        `.trim(),
        image: './assets/Cocktails/rosemarypeach.webp'
    },
    {
        id: 'sazerac',
        name: "Sazerac",
        category: ["Strong", "Whiskey", "Classic"],
        description: "Powerful and aromatic with rye spice, subtle sweetness and an anise finish.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Rye whiskey", fridgeCategory: "spirit" },
            { amount: 10, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" },
            { amount: 2, unit: "dashes", name: "Peychaud's bitters", fridgeCategory: "bitters" },
            { amount: 1, unit: "rinse", name: "Absinthe", fridgeCategory: "spirit" }
        ],
        glassware: "Rocks glass",
        ice: "No ice",
        method: "Stirred",
        methodDesc: `
            Step 1: Rinse a chilled glass with absinthe and discard excess.

            Step 2: Stir remaining ingredients with ice.

            Step 3: Strain into the prepared glass.

            Step 4: Garnish with a lemon peel.
        `.trim(),
        image: "./assets/Cocktails/sazerac.webp"
    },
    {
        id: 'screwdriver',
        name: "Screwdriver",
        category: ["Highball", "Simple", "Classic"],
        description: "Clean and refreshing with smooth vodka and bright orange juice.",
        ingredients: [
            { amount: 50, unit: "ml", name: "Vodka", fridgeCategory: "spirit" },
            { amount: 120, unit: "ml", name: "Orange juice", fridgeCategory: "juice" }
        ],
        glassware: "Highball",
        ice: "Ice cubes",
        method: "Built",
        methodDesc: `
            Step 1: Fill a highball glass with ice.

            Step 2: Add vodka and top with orange juice.

            Step 3: Stir gently.
        `.trim(),
        image: "./assets/Cocktails/screwdriver.webp"
    },
    {
        id: 'sea-breeze',
        name: "Sea Breeze",
        category: ["Fruity", "Refreshing", "Classic"],
        description: "Light and tart with cranberry sharpness and fresh grapefruit notes.",
        ingredients: [
            { amount: 40, unit: "ml", name: "Vodka", fridgeCategory: "spirit" },
            { amount: 60, unit: "ml", name: "Cranberry juice", fridgeCategory: "juice" },
            { amount: 30, unit: "ml", name: "Grapefruit juice", fridgeCategory: "juice" }
        ],
        glassware: "Highball",
        ice: "Ice cubes",
        method: "Built",
        methodDesc: `
            Step 1: Fill a glass with ice.

            Step 2: Add vodka and juices.

            Step 3: Stir gently and garnish with lime.
        `.trim(),
        image: "./assets/Cocktails/seabreeze.webp"
    },
    {
        id: 'sidecar',
        name: 'Sidecar',
        category: ['Classic', 'Sour', 'Cognac', "1920's"],
        description: 'A legendary cognac sour with bright citrus, warm orange notes and a crisp sugar rim.',
        ingredients: [
            { amount: 45, unit: "ml", name: "Cognac", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Cointreau", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 10, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: 'Shaken',
        methodDesc: `
            Step 1: Rim a chilled coupe glass with sugar and set aside.

            Step 2: Add cognac, Cointreau, lemon juice and simple syrup to a shaker filled with cubed ice.

            Step 3: Shake hard until well chilled and properly diluted.

            Step 4: Double strain into the prepared glass and garnish with an expressed orange twist.
        `.trim(),
        image: './assets/Cocktails/sidecar.webp'
    },
    {
        id: 'singapore-sling',
        name: "Singapore Sling",
        category: ["Fruity", "Complex", "Longdrink"],
        description: "A legendary long drink with cherry richness, tropical fruit and a complex herbal backbone.",
        ingredients: [
            { amount: 30, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Cherry Heering", fridgeCategory: "liqueur" },
            { amount: 7, unit: "ml", name: "Cointreau", fridgeCategory: "liqueur" },
            { amount: 7, unit: "ml", name: "Benedictine", fridgeCategory: "liqueur" },
            { amount: 10, unit: "ml", name: "Grenadine", fridgeCategory: "syrup" },
            { amount: 15, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 120, unit: "ml", name: "Pineapple juice", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/singaporesling.webp"
    },
    {
        id: 'south-side',
        name: 'South Side',
        category: ['Classic', 'Refreshing', 'Minty', "1920's"],
        description: 'A crisp gin classic with bright citrus, cooling mint and a clean, elegant finish.',
        ingredients: [
            { amount: 45, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 10, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" },
            { amount: 8, unit: "leaves", name: "Fresh mint", fridgeCategory: "fresh" }
        ],
        glassware: "Coupe glass",
        ice: "Cubed ice",
        method: 'Shaken',
        methodDesc: `
            Step 1: Add mint and simple syrup to a shaker and gently bruise to release aroma.

            Step 2: Add gin and lemon juice with cubed ice.

            Step 3: Shake hard until well chilled.

            Step 4: Double strain into a chilled coupe and garnish with a mint leaf.
        `.trim(),
        image: './assets/Cocktails/southside.webp'
    },
    {
        id: 'spicy-margarita',
        name: "Spicy Margarita",
        category: ["Spicy", "Tequila", "Modern"],
        description: "A fiery twist on the classic with chili heat and fresh citrus brightness.",
        ingredients: [
            { amount: 50, unit: "ml", name: "Tequila blanco", fridgeCategory: "spirit" },
            { amount: 25, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 20, unit: "ml", name: "Triple sec", fridgeCategory: "liqueur" },
            { amount: 10, unit: "ml", name: "Agave syrup", fridgeCategory: "syrup" },
            { amount: 2, unit: "slices", name: "Fresh chili", fridgeCategory: "fresh" }
        ],
        glassware: "Rocks glass",
        ice: "Ice cubes",
        method: "Shaken",
        methodDesc: `
            Step 1: Muddle chili lightly in a shaker.

            Step 2: Add remaining ingredients and ice.

            Step 3: Shake and strain over ice into a salt-rimmed glass.
        `.trim(),
        image: "./assets/Cocktails/spicymargarita.webp"
    },
    {
        id: 'spritz-veneziano',
        name: "Spritz Veneziano",
        category: ["Spritz", "Aperitivo", "Classic"],
        description: "Bright, bittersweet and bubbly with vibrant orange aromatics.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Aperol", fridgeCategory: "liqueur" },
            { amount: 90, unit: "ml", name: "Prosecco/Champagne", fridgeCategory: "liqueur" },
            { amount: 30, unit: "ml", name: "Soda water", fridgeCategory: "juice" }
        ],
        glassware: "Wine glass",
        ice: "Ice cubes",
        method: "Built",
        methodDesc: `
            Step 1: Fill a wine glass with ice.

            Step 2: Add Prosecco or Champagne, Aperol and soda.

            Step 3: Gently stir and garnish with orange.
        `.trim(),
        image: "./assets/Cocktails/spritzveneziano.webp"
    },
    {
        id: 'tequila-sunrise',
        name: "Tequila Sunrise",
        category: ["Sweet", "Visual", "Tequila"],
        description: "A sunny classic with juicy orange, smooth tequila and a stunning crimson sunrise fade.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Tequila", fridgeCategory: "spirit" },
            { amount: 90, unit: "ml", name: "Orange juice", fridgeCategory: "juice" },
            { amount: 10, unit: "ml", name: "Grenadine", fridgeCategory: "syrup" }
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
        image: "./assets/Cocktails/tequilasunrise.webp"
    },
    {
        id: 'tommys-margarita',
        name: "Tommy's Margarita",
        category: ["Tequila", "Sour", "Clean"],
        description: "A clean and modern margarita with pure tequila character, bright lime and smooth agave sweetness.",
        ingredients: [
            { amount: 50, unit: "ml", name: "Tequila Blanco", fridgeCategory: "spirit" },
            { amount: 25, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Agave syrup", fridgeCategory: "syrup" }
        ],
        glassware: "Rocks glass",
        ice: "Cubed ice",
        method: "Shaken",
        methodDesc: `
            Step 1: Fill a rocks glass with fresh cubed ice (optional: half salt rim).

            Step 2: Add tequila, lime juice and agave syrup to a shaker filled with cubed ice.

            Step 3: Shake hard until well chilled and properly diluted.

            Step 4: Strain into the prepared glass and garnish with a lime wheel.
        `.trim(),
        image: "./assets/Cocktails/tommysmargarita.webp"
    },
    {
        id: 'tropical-hurricane',
        name: "Tropical Hurricane",
        category: ["Tiki", "Fruity"],
        description: "A juicy tropical riff with bright citrus, ripe stone fruit and an easy island vibe.",
        ingredients: [
            { amount: 30, unit: "ml", name: "Bacardi Rasp", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Peachtree", fridgeCategory: "liqueur" },
            { amount: 20, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 10, unit: "ml", name: "Orange juice", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/tropicalhurricane.webp"
    },
    {
        id: 'vieux-carre',
        name: "Vieux Carré",
        category: ["Strong", "Complex", "Classic"],
        description: "Deep and layered with whiskey, cognac and herbal sweetness.",
        ingredients: [
            { amount: 30, unit: "ml", name: "Rye whiskey", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Cognac", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Sweet vermouth", fridgeCategory: "liqueur" },
            { amount: 10, unit: "ml", name: "Benedictine", fridgeCategory: "liqueur" },
            { amount: 2, unit: "dashes", name: "Peychaud's bitters", fridgeCategory: "bitters" }
        ],
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Stirred",
        methodDesc: `
            Step 1: Stir all ingredients with ice.

            Step 2: Strain over a large ice cube.

            Step 3: Garnish with lemon peel.
        `.trim(),
        image: "./assets/Cocktails/vieuxcarre.webp"
    },
    {
        id: 'vodka-martini',
        name: "Vodka Martini",
        category: ["Strong", "Minimal", "Classic"],
        description: "Clean, crisp and unapologetically sharp with pure vodka elegance.",
        ingredients: [
            { amount: 60, unit: "ml", name: "Vodka", fridgeCategory: "spirit" },
            { amount: 10, unit: "ml", name: "Dry vermouth", fridgeCategory: "liqueur" }
        ],
        glassware: "Martini glass",
        ice: "No ice",
        method: "Stirred",
        methodDesc: `
            Step 1: Stir vodka and vermouth with ice.

            Step 2: Strain into a chilled martini glass.

            Step 3: Garnish with an olive or lemon twist.
        `.trim(),
        image: "./assets/Cocktails/vodkamartini.webp"
    },
    {
        id: 'wandering-cosmo',
        name: "Wandering Cosmo",
        category: ["Fruity", "Riff", "Pasionfruit"],
        description: "A playful cosmo riff with passionfruit sweetness, zesty lime and a bright berry sparkle.",
        ingredients: [
            { amount: 20, unit: "ml", name: "Passoa", fridgeCategory: "liqueur" },
            { amount: 15, unit: "ml", name: "Cointreau", fridgeCategory: "liqueur" },
            { amount: 30, unit: "ml", name: "Vodka", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 10, unit: "ml", name: "Fruit soda", fridgeCategory: "juice" }
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
        image: "./assets/Cocktails/wanderingcosmo.webp"
    },
    {
        id: 'whiskey-sour',
        name: "Whiskey Sour",
        category: ["Sour", "Classic"],
        description: "A perfectly balanced sour with bright citrus, smooth sweetness and a silky egg-white foam.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Bourbon", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 10, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" },
            { amount: 1, unit: "pcs", name: "Egg white", fridgeCategory: "fresh" }
        ],
        glassware: "Rocks glass",
        ice: "Large ice cube",
        method: "Dry & Wet Shake",
        methodDesc: `
            Step 1: Add all ingredients to a shaker and dry shake (no ice) for 10-15 seconds to build foam.

            Step 2: Add cubed ice and shake hard until well chilled.

            Step 3: Strain into a rocks glass over a large ice cube.

            Step 4: Garnish with a few drops of bitters or a lemon twist.
        `.trim(),
        image: "./assets/Cocktails/whiskeysour.webp"
    },
    {
        id: 'white-Cosmo',
        name: "White Lady",
        category: ["Classic", "Sour", "Gin"],
        description: "A crisp and elegant gin sour with bright citrus, orange warmth and a clean, refined finish.",
        ingredients: [
            { amount: 4, unit: "pieces", name: "Grapes", fridgeCategory: "fresh" },
            { amount: 15, unit: "ml", name: "Elderflower liqueur", fridgeCategory: "liqueur" },
            { amount: 25, unit: "ml", name: "Vodka", fridgeCategory: "spirit" },
            { amount: 15, unit: "ml", name: "Cointreau", fridgeCategory: "liqueur" },
            { amount: 5, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" },
            { amount: 15, unit: "ml", name: "Water", fridgeCategory: "fresh" },
            { amount: 7.5, unit: "ml", name: "Lime juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "lemon juice", fridgeCategory: "juice" },
            { amount: 2, unit: "dashes", name: "lemon bitters", fridgeCategory: "bitters" }
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
        image: "./assets/Cocktails/whitelady.webp"
    },
    {
        id: 'white-lady',
        name: "White Lady",
        category: ["Classic", "Sour", "Gin"],
        description: "A crisp and elegant gin sour with bright citrus, orange warmth and a clean, refined finish.",
        ingredients: [
            { amount: 45, unit: "ml", name: "Gin", fridgeCategory: "spirit" },
            { amount: 25, unit: "ml", name: "Cointreau", fridgeCategory: "liqueur" },
            { amount: 20, unit: "ml", name: "Lemon juice", fridgeCategory: "juice" },
            { amount: 10, unit: "ml", name: "Simple syrup", fridgeCategory: "syrup", kitchenId: "simple-syrup" }
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
        image: "./assets/Cocktails/whitelady.webp"
    },
    {
        id: 'white-russian',
        name: "White Russian",
        category: ["Creamy", "Coffee", "Vodka"],
        description: "A rich, creamy coffee classic with smooth vodka warmth and a silky dessert-like finish.",
        ingredients: [
            { amount: 50, unit: "ml", name: "Vodka", fridgeCategory: "spirit" },
            { amount: 25, unit: "ml", name: "Coffee liqueur", fridgeCategory: "liqueur" },
            { amount: 25, unit: "ml", name: "Fresh cream", fridgeCategory: "fresh" }
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
        image: "./assets/Cocktails/whiterussian.webp"
    },
    {
        id: 'yellow-bird',
        name: "Yellow Bird",
        category: ["Tiki", "Rum", "Fruity"],
        description: "Bright and tropical with citrus, rum and a soft herbal finish.",
        ingredients: [
            { amount: 40, unit: "ml", name: "White rum", fridgeCategory: "spirit" },
            { amount: 20, unit: "ml", name: "Galliano", fridgeCategory: "liqueur" },
            { amount: 20, unit: "ml", name: "Triple sec", fridgeCategory: "liqueur" },
            { amount: 20, unit: "ml", name: "Lime juice", fridgeCategory: "juice" }
        ],
        glassware: "Coupe",
        ice: "No ice",
        method: "Shaken",
        methodDesc: `
            Step 1: Shake all ingredients with ice.

            Step 2: Strain into a chilled coupe.

            Step 3: Garnish with a lime twist.
        `.trim(),
        image: "./assets/Cocktails/yellowbird.webp"
    },
    {
        id: 'zombie',
        name: "Zombie",
        category: ["Strong", "Tiki", "Unique"],
        description: "A famous tiki powerhouse with layered rums, tropical sweetness and a dangerously bold kick.",
        ingredients: [
            { amount: 30, unit: "ml", name: "White Rum", fridgeCategory: "spirit" },
            { amount: 30, unit: "ml", name: "Dark Rum", fridgeCategory: "spirit" },
            { amount: 20, unit: "ml", name: "Orange juice", fridgeCategory: "juice" },
            { amount: 15, unit: "ml", name: "Grenadine", fridgeCategory: "syrup" },
            { amount: 10, unit: "ml", name: "Cinnamon syrup", fridgeCategory: "syrup" },
            { amount: 2, unit: "dashes", name: "Angostura bitters", fridgeCategory: "bitters" }
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
        image: "./assets/Cocktails/zombie.webp"
    },

];
