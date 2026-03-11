/* ============================================================
 * MOCKTAIL DATABASE
 * ============================================================
 *  - Arnold Palmer
 *  - Cinderella
 *  - Clay Pot Punch
 *  - Cucumber Cooler
 *  - Ginger Lemonade
 *  - Mango Lassi Mocktail
 *  - Mint Lemonade
 *  - Raspberry Sparkler
 *  - Shirley Temple
 *  - Shrub a Dub Dub
 *  - Tangerine Twist
 *  - Tropical Punch
 *  - Virgin Mary
 *  - Virgin Mojito
 *  - PiNo Colada
 *  - Watermelon Cooler
 * ============================================================ */

export const mocktailRecipes = [
    {
        id: 'arnold-palmer',
        name: 'Arnold Palmer',
        category: ['Classic', 'Refreshing', 'Tea'],
        description: 'The legendary half-and-half: smooth iced tea meets bright lemonade for the ultimate thirst quencher.',
        ingredients: [
            { amount: 120, unit: 'ml', name: 'Iced tea', fridgeCategory: 'juice' },
            { amount: 120, unit: 'ml', name: 'Lemonade', fridgeCategory: 'juice' },
            { amount: 15, unit: 'ml', name: 'Lemon juice', fridgeCategory: 'juice' }
        ],
        glassware: 'Highball glass',
        ice: 'Cubed ice',
        method: 'Built',
        methodDesc: `
            Step 1: Fill a highball glass with cubed ice.

            Step 2: Pour in the iced tea, then add the lemonade.

            Step 3: Add a squeeze of fresh lemon juice and stir gently.

            Step 4: Garnish with a lemon wheel and a sprig of mint.
        `.trim(),
        image: './assets/Mocktails/arnold-palmer.webp'
    },
    {
        id: 'cinderella',
        name: 'Cinderella',
        category: ['Tropical', 'Fruity', 'Sparkling'],
        description: 'A magical tropical blend of pineapple, orange and lemon with a sparkling soda finish.',
        ingredients: [
            { amount: 60, unit: 'ml', name: 'Pineapple juice', fridgeCategory: 'juice' },
            { amount: 60, unit: 'ml', name: 'Orange juice', fridgeCategory: 'juice' },
            { amount: 30, unit: 'ml', name: 'Lemon juice', fridgeCategory: 'juice' },
            { amount: 60, unit: 'ml', name: 'Soda water', fridgeCategory: 'juice' }
        ],
        glassware: 'Highball glass',
        ice: 'Cubed ice',
        method: 'Shaken & Built',
        methodDesc: `
            Step 1: Shake the pineapple juice, orange juice and lemon juice with ice.

            Step 2: Strain into a highball glass filled with fresh ice.

            Step 3: Top with soda water and stir gently.

            Step 4: Garnish with a pineapple wedge and a cherry.
        `.trim(),
        image: './assets/Mocktails/cinderella.webp'
    },
    {
        id: 'clay-pot-punch',
        name: 'Clay Pot Punch',
        category: ['Citrus', 'Tea', 'Sparkling'],
        description: 'A refreshing citrus punch built on brewed peach tea, bright grapefruit and tangerine, balanced with lemon oleo-saccharum and topped with lively soda.',
        ingredients: [
            { amount: 120, unit: 'ml', name: 'Brewed peach tea', fridgeCategory: 'tea', kitchenId: 'brewed-teas:peach' },
            { amount: 120, unit: 'ml', name: 'Fresh grapefruit juice', fridgeCategory: 'juice' },
            { amount: 120, unit: 'ml', name: 'Fresh tangerine juice', fridgeCategory: 'juice' },
            { amount: 60, unit: 'ml', name: 'Fresh lemon juice', fridgeCategory: 'juice' },
            { amount: 60, unit: 'ml', name: 'Lemon oleo-saccharum', fridgeCategory: 'syrup', kitchenId: 'oleo-saccharums:lemon' },
            { amount: 240, unit: 'ml', name: 'Lemon-lime soda', fridgeCategory: 'juice' }
        ],
        glassware: 'Collins glass',
        ice: 'Cubed ice',
        method: 'Built (Punch)',
        methodDesc: `
        Step 1: In a large pitcher, combine the peach tea, grapefruit juice, tangerine juice, lemon juice and lemon oleo-saccharum.

        Step 2: Stir gently to combine the punch base.

        Step 3: Fill a Collins glass with cubed ice and pour about 150 ml of the punch into the glass.

        Step 4: Top with lemon-lime soda and garnish with a grapefruit slice and a lemon slice.
    `.trim(),
        image: './assets/Mocktails/clay-pot-punch.webp'
    },
    {
        id: 'cucumber-cooler',
        name: 'Cucumber Cooler',
        category: ['Fresh', 'Botanical', 'Light'],
        description: 'Cool cucumber meets zesty lime and mint for a clean, spa-inspired refresher.',
        ingredients: [
            { amount: 4, unit: 'slices', name: 'Fresh cucumber', fridgeCategory: 'fresh' },
            { amount: 20, unit: 'ml', name: 'Lime juice', fridgeCategory: 'juice' },
            { amount: 15, unit: 'ml', name: 'Simple syrup', fridgeCategory: 'syrup', kitchenId: 'syrups:simple' },
            { amount: 8, unit: 'leaves', name: 'Fresh mint', fridgeCategory: 'fresh' },
            { amount: 90, unit: 'ml', name: 'Soda water', fridgeCategory: 'juice' }
        ],
        glassware: 'Collins glass',
        ice: 'Cubed ice',
        method: 'Muddled & Built',
        methodDesc: `
            Step 1: Muddle the cucumber slices and mint in the bottom of a shaker.

            Step 2: Add lime juice and simple syrup, then fill with ice and shake.

            Step 3: Double strain into a Collins glass filled with ice.

            Step 4: Top with soda water and garnish with a cucumber ribbon and mint sprig.
        `.trim(),
        image: './assets/Mocktails/cucumber-cooler.webp'
    },
    {
        id: 'ginger-lemonade',
        name: 'Ginger Lemonade',
        category: ['Spicy', 'Citrus', 'Refreshing'],
        description: 'A fiery kick of fresh ginger balances bright lemon for an invigorating, warming refresher.',
        ingredients: [
            { amount: 30, unit: 'ml', name: 'Lemon juice', fridgeCategory: 'juice' },
            { amount: 20, unit: 'ml', name: 'Ginger syrup', fridgeCategory: 'syrup' },
            { amount: 15, unit: 'ml', name: 'Simple syrup', fridgeCategory: 'syrup', kitchenId: 'syrups:simple' },
            { amount: 120, unit: 'ml', name: 'Ginger beer', fridgeCategory: 'juice' }
        ],
        glassware: 'Highball glass',
        ice: 'Cubed ice',
        method: 'Built',
        methodDesc: `
            Step 1: Fill a highball glass with cubed ice.

            Step 2: Add fresh lemon juice, ginger syrup and simple syrup.

            Step 3: Top with chilled ginger beer and stir gently.

            Step 4: Garnish with a lemon wheel and a slice of fresh ginger.
        `.trim(),
        image: './assets/Mocktails/ginger-lemonade.webp'
    },
    {
        id: 'mango-lassi-mocktail',
        name: 'Mango Lassi',
        category: ['Creamy', 'Tropical', 'Sweet'],
        description: 'Rich, velvety mango blended with yoghurt and a hint of cardamom — a luscious Indian classic.',
        ingredients: [
            { amount: 120, unit: 'ml', name: 'Mango purée', fridgeCategory: 'juice' },
            { amount: 100, unit: 'ml', name: 'Yoghurt', fridgeCategory: 'fresh' },
            { amount: 60, unit: 'ml', name: 'Milk', fridgeCategory: 'fresh' },
            { amount: 10, unit: 'ml', name: 'Honey syrup', fridgeCategory: 'syrup', kitchenId: 'syrups:honey' }
        ],
        glassware: 'Highball glass',
        ice: 'Crushed ice',
        method: 'Blended',
        methodDesc: `
            Step 1: Combine mango purée, yoghurt, milk and honey syrup in a blender.

            Step 2: Blend until smooth and creamy.

            Step 3: Pour over crushed ice in a highball glass.

            Step 4: Garnish with a pinch of cardamom and a mango slice.
        `.trim(),
        image: './assets/Mocktails/mango-lassi.webp'
    },
    {
        id: 'mint-lemonade',
        name: 'Mint Lemonade',
        category: ['Fresh', 'Citrus', 'Classic'],
        description: 'Bright lemon and cool fresh mint — the ultimate summer classic, endlessly refreshing.',
        ingredients: [
            { amount: 30, unit: 'ml', name: 'Lemon juice', fridgeCategory: 'juice' },
            { amount: 20, unit: 'ml', name: 'Simple syrup', fridgeCategory: 'syrup', kitchenId: 'syrups:simple' },
            { amount: 10, unit: 'leaves', name: 'Fresh mint', fridgeCategory: 'fresh' },
            { amount: 120, unit: 'ml', name: 'Soda water', fridgeCategory: 'juice' }
        ],
        glassware: 'Highball glass',
        ice: 'Cubed ice',
        method: 'Muddled & Built',
        methodDesc: `
            Step 1: Gently muddle mint leaves in the bottom of a glass with simple syrup.

            Step 2: Add lemon juice and fill the glass with cubed ice.

            Step 3: Top with soda water and stir briefly.

            Step 4: Garnish with a mint sprig and a lemon wheel.
        `.trim(),
        image: './assets/Mocktails/mint-lemonade.webp'
    },
    {
        id: 'raspberry-sparkler',
        name: 'Raspberry Sparkler',
        category: ['Fruity', 'Sparkling', 'Pink'],
        description: 'Vibrant fresh raspberry sweetness with a bright lemon lift and lively bubbles.',
        ingredients: [
            { amount: 30, unit: 'ml', name: 'Raspberry syrup', fridgeCategory: 'syrup', kitchenId: 'syrups:raspberry' },
            { amount: 15, unit: 'ml', name: 'Lemon juice', fridgeCategory: 'juice' },
            { amount: 120, unit: 'ml', name: 'Sparkling water', fridgeCategory: 'juice' },
            { amount: 6, unit: 'pcs', name: 'Fresh raspberries', fridgeCategory: 'fresh' }
        ],
        glassware: 'Wine glass',
        ice: 'Large ice cubes',
        method: 'Built',
        methodDesc: `
            Step 1: Add raspberry syrup and lemon juice to a wine glass.

            Step 2: Fill generously with large ice cubes.

            Step 3: Top with sparkling water and stir gently once.

            Step 4: Drop in fresh raspberries for garnish and colour.
        `.trim(),
        image: './assets/Mocktails/raspberry-sparkler.webp'
    },
    {
        id: 'shirley-temple',
        name: 'Shirley Temple',
        category: ['Sweet', 'Classic', 'Pink'],
        description: 'The timeless rosy classic — bright ginger ale with grenadine and a pop of orange juice.',
        ingredients: [
            { amount: 15, unit: 'ml', name: 'Grenadine syrup', fridgeCategory: 'syrup', kitchenId: 'syrups:grenadine' },
            { amount: 30, unit: 'ml', name: 'Orange juice', fridgeCategory: 'juice' },
            { amount: 120, unit: 'ml', name: 'Ginger ale', fridgeCategory: 'juice' }
        ],
        glassware: 'Highball glass',
        ice: 'Cubed ice',
        method: 'Built',
        methodDesc: `
            Step 1: Fill a highball glass with cubed ice.

            Step 2: Add grenadine and orange juice.

            Step 3: Top with ginger ale and stir gently once showing the gradient.

            Step 4: Garnish with a maraschino cherry and an orange slice.
        `.trim(),
        image: './assets/Mocktails/shirley-temple.webp'
    },
    {
        id: 'shrub-a-dub-dub',
        name: 'Shrub a Dub Dub',
        category: ['Berry', 'Tea', 'Fresh'],
        description: 'A delicate berry mocktail combining fragrant chamomile tea with bright strawberry shrub and fresh berries, balanced by gentle sweetness.',
        ingredients: [
            { amount: 45, unit: 'ml', name: 'Chamomile tea', fridgeCategory: 'tea', kitchenId: 'brewed-teas:chamomile' },
            { amount: 30, unit: 'ml', name: 'Strawberry shrub', fridgeCategory: 'syrup', kitchenId: 'shrubs' },
            { amount: 15, unit: 'ml', name: 'Simple syrup', fridgeCategory: 'syrup', kitchenId: 'syrups:simple' },
            { amount: 2, unit: 'pcs', name: 'Fresh strawberries', fridgeCategory: 'fresh' }
        ],
        glassware: 'Rocks glass',
        ice: 'Cracked ice',
        method: 'Muddled & Shaken',
        methodDesc: `
        Step 1: Add the strawberries to a shaker and gently muddle them.

        Step 2: Add the chamomile tea, strawberry shrub and simple syrup.

        Step 3: Fill the shaker with ice and shake vigorously for about 7 seconds.

        Step 4: Fine strain into a rocks glass filled with cracked ice and garnish with a strawberry slice and a mint sprig.
    `.trim(),
        image: './assets/Mocktails/shrub-a-dub-dub.webp'
    },
    {
        id: 'tangerine-twist',
        name: 'Tangerine Twist',
        category: ['Citrus', 'Tea', 'Spiced'],
        description: 'A bright citrus mocktail where bold licorice tea meets fresh tangerine and lemon, balanced by silky orgeat and finished with warm nutmeg.',
        ingredients: [
            { amount: 60, unit: 'ml', name: 'Licorice tea', fridgeCategory: 'tea', kitchenId: 'brewed-teas:licorice' },
            { amount: 30, unit: 'ml', name: 'Fresh tangerine juice', fridgeCategory: 'juice' },
            { amount: 15, unit: 'ml', name: 'Fresh lemon juice', fridgeCategory: 'juice' },
            { amount: 15, unit: 'ml', name: 'Orgeat syrup', fridgeCategory: 'syrup', kitchenId: 'syrups:orgeat' }
        ],
        glassware: 'Collins glass',
        ice: 'Pebble ice',
        method: 'Shaken & Strained',
        methodDesc: `
        Step 1: Add the licorice tea, tangerine juice, lemon juice and orgeat to a shaker.

        Step 2: Fill with cubed ice and shake vigorously for about 7 seconds.

        Step 3: Fine strain into a Collins glass filled with pebble ice.

        Step 4: Garnish with a tangerine slice and freshly grated nutmeg.
    `.trim(),
        image: './assets/Mocktails/tangerine-twist.webp'
    },
    {
        id: 'tropical-punch',
        name: 'Tropical Punch',
        category: ['Tropical', 'Fruity', 'Party'],
        description: 'A bold tropical blend of pineapple, mango and passion fruit — served big and bright.',
        ingredients: [
            { amount: 60, unit: 'ml', name: 'Pineapple juice', fridgeCategory: 'juice' },
            { amount: 60, unit: 'ml', name: 'Mango juice', fridgeCategory: 'juice' },
            { amount: 30, unit: 'ml', name: 'Passion fruit juice', fridgeCategory: 'juice' },
            { amount: 15, unit: 'ml', name: 'Grenadine syrup', fridgeCategory: 'syrup', kitchenId: 'syrups:grenadine' },
            { amount: 60, unit: 'ml', name: 'Sparkling water', fridgeCategory: 'juice' }
        ],
        glassware: 'Highball glass',
        ice: 'Crushed ice',
        method: 'Built',
        methodDesc: `
            Step 1: Fill a highball glass generously with crushed ice.

            Step 2: Add pineapple juice, mango juice and passion fruit juice.

            Step 3: Drizzle grenadine over the top for a beautiful layered effect.

            Step 4: Top with sparkling water and garnish with a pineapple wedge and cherry.
        `.trim(),
        image: './assets/Mocktails/tropical-punch.webp'
    },
    {
        id: 'virgin-mary',
        name: 'Virgin Mary',
        category: ['Savory', 'Spicy', 'Classic'],
        description: 'All the bold savory punch of a Bloody Mary — rich tomato, gentle heat and zero regret.',
        ingredients: [
            { amount: 120, unit: 'ml', name: 'Tomato juice', fridgeCategory: 'juice' },
            { amount: 15, unit: 'ml', name: 'Lemon juice', fridgeCategory: 'juice' },
            { amount: 10, unit: 'ml', name: 'Worcestershire sauce', fridgeCategory: 'bitters' },
            { amount: 3, unit: 'dashes', name: 'Tabasco sauce', fridgeCategory: 'bitters' }
        ],
        glassware: 'Highball glass',
        ice: 'Cubed ice',
        method: 'Rolled',
        methodDesc: `
            Step 1: Combine all ingredients in a shaker with ice.

            Step 2: Gently roll between two shakers several times to combine.

            Step 3: Pour into a highball glass filled with fresh ice.

            Step 4: Garnish with a celery stick, lemon wedge and a pinch of celery salt.
        `.trim(),
        image: './assets/Mocktails/virgin-mary.webp'
    },
    {
        id: 'virgin-mojito',
        name: 'Virgin Mojito',
        category: ['Fresh', 'Classic', 'Mint'],
        description: 'All the cooling mint magic and bright lime of a Mojito — fresh, sparkling and totally irresistible.',
        ingredients: [
            { amount: 10, unit: 'leaves', name: 'Fresh mint', fridgeCategory: 'fresh' },
            { amount: 30, unit: 'ml', name: 'Lime juice', fridgeCategory: 'juice' },
            { amount: 20, unit: 'ml', name: 'Simple syrup', fridgeCategory: 'syrup', kitchenId: 'syrups:simple' },
            { amount: 120, unit: 'ml', name: 'Soda water', fridgeCategory: 'juice' }
        ],
        glassware: 'Highball glass',
        ice: 'Crushed ice',
        method: 'Muddled & Built',
        methodDesc: `
            Step 1: Gently muddle mint leaves with simple syrup and lime juice in the bottom of a glass.

            Step 2: Fill the glass generously with crushed ice.

            Step 3: Top with soda water and stir gently to combine.

            Step 4: Garnish with a fresh mint sprig and a lime wheel.
        `.trim(),
        image: './assets/Mocktails/virgin-mojito.webp'
    },
    {
        id: 'pino-colada',
        name: 'PiNo Colada',
        category: ['Tropical', 'Creamy', 'Sweet'],
        description: 'All the creamy tropical bliss of a Piña Colada — coconut richness, pineapple sunshine, zero alcohol.',
        ingredients: [
            { amount: 120, unit: 'ml', name: 'Pineapple juice', fridgeCategory: 'juice' },
            { amount: 60, unit: 'ml', name: 'Coconut cream', fridgeCategory: 'juice' },
            { amount: 30, unit: 'ml', name: 'Cream of coconut', fridgeCategory: 'syrup' }
        ],
        glassware: 'Hurricane glass',
        ice: 'Crushed ice',
        method: 'Blended',
        methodDesc: `
            Step 1: Add pineapple juice, coconut cream and cream of coconut to a blender with crushed ice.

            Step 2: Blend until smooth and velvety.

            Step 3: Pour into a chilled hurricane glass.

            Step 4: Garnish with a pineapple wedge and a maraschino cherry.
        `.trim(),
        image: './assets/Mocktails/virgin-pina-colada.webp'
    },
    {
        id: 'watermelon-cooler',
        name: 'Watermelon Cooler',
        category: ['Fruity', 'Summer', 'Fresh'],
        description: 'Fresh-pressed watermelon juice lifted by bright lime and cooling mint for the perfect summer sip.',
        ingredients: [
            { amount: 150, unit: 'ml', name: 'Watermelon juice', fridgeCategory: 'juice' },
            { amount: 15, unit: 'ml', name: 'Lime juice', fridgeCategory: 'juice' },
            { amount: 10, unit: 'ml', name: 'Simple syrup', fridgeCategory: 'syrup', kitchenId: 'syrups:simple' },
            { amount: 60, unit: 'ml', name: 'Soda water', fridgeCategory: 'juice' }
        ],
        glassware: 'Highball glass',
        ice: 'Cubed ice',
        method: 'Shaken & Built',
        methodDesc: `
            Step 1: Shake watermelon juice, lime juice and simple syrup with ice until cold.

            Step 2: Strain into a highball glass filled with fresh ice.

            Step 3: Top with soda water and stir once.

            Step 4: Garnish with a wedge of watermelon and a few mint leaves.
        `.trim(),
        image: './assets/Mocktails/watermelon-cooler.webp'
    }
];
