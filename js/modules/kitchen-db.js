export const kitchenItems = [
    {
        id: "simple-syrup",
        category: "ingredients",
        title: "Simple Syrup",
        difficulty: "easy",
        heroClass: "hero-syrup",
        image: "assets/Kitchen/simple_syrup.webp",
        description: "The most essential sweetener for cocktails. A simple 1:1 ratio of sugar and water.",
        ingredients: [
            "1 cup White Sugar",
            "1 cup Water"
        ],
        instructions: [
            "Combine equal parts sugar and water in a saucepan.",
            "Heat gently over medium heat, stirring occasionally until the sugar is completely dissolved. Do not let it boil.",
            "Remove from heat and let it cool.",
            "Store in an airtight bottle in the refrigerator. It will keep for about a month."
        ]
    },
    {
        id: "rich-syrup",
        category: "ingredients",
        title: "Rich Sugar Syrup",
        difficulty: "easy",
        heroClass: "hero-syrup-rich",
        image: "assets/Kitchen/rich_simple_syrup.webp",
        description: "A thicker, sweeter syrup (2:1 ratio) that adds better texture to drinks and lasts longer in the fridge.",
        ingredients: [
            "2 cups White Sugar",
            "1 cup Water"
        ],
        instructions: [
            "Combine 2 parts sugar and 1 part water in a saucepan.",
            "Heat gently while stirring continuously until dissolved.",
            "Let it cool completely and store in the fridge. Will last up to 6 months."
        ]
    },
    {
        id: "honey-ginger-syrup",
        category: "ingredients",
        title: "Honey-Ginger Syrup",
        difficulty: "medium",
        heroClass: "hero-syrup",
        image: "assets/Kitchen/ginger_honey_syrup.webp",
        description: "A spicy, floral sweetener essential for the Penicillin cocktail.",
        ingredients: [
            "1 cup Honey",
            "1 cup Water",
            "1 large Ginger root (peeled and sliced)"
        ],
        instructions: [
            "Combine honey, water, and sliced ginger in a small saucepan.",
            "Bring to a gentle boil over medium heat.",
            "Reduce heat to low and simmer for 5 minutes.",
            "Remove from heat and let it steep for at least 30 minutes.",
            "Strain through a fine-mesh sieve and refrigerate."
        ]
    },
    {
        id: "lime-ginger-dilution",
        category: "ingredients",
        title: "Lime & Granulated Sugar (L&G) Dilution",
        difficulty: "easy",
        heroClass: "hero-syrup",
        image: "assets/Kitchen/l&g_syrup.webp",
        description: "A specialized dilution used to balance sharp vodka and vermouth notes.",
        ingredients: [
            "50ml Fresh Lime Juice",
            "50ml Ginger juice or strong Ginger tea",
            "25ml Water"
        ],
        instructions: [
            "Mix all ingredients together in a small bottle.",
            "Shake well to combine.",
            "Keep chilled and use within 24 hours for maximum freshness."
        ]
    },
    {
        id: "bergamot-dilution",
        category: "ingredients",
        title: "Bergamot Dilution",
        difficulty: "medium",
        heroClass: "hero-syrup",
        image: "assets/Kitchen/bergamot_dilution.webp",
        description: "A fragrant, citrusy dilution that adds an Earl Grey-like complexity.",
        ingredients: [
            "100ml Water",
            "2 Earl Grey tea bags (or 10g loose leaf)",
            "10ml Bergamot oil or fresh Bergamot juice"
        ],
        instructions: [
            "Steep the Earl Grey tea in hot water for 5 minutes.",
            "Remove tea and let the liquid cool completely.",
            "Add bergamot oil/juice and stir well.",
            "Bottle and keep refrigerated."
        ]
    },
    {
        id: "double-strain",
        category: "techniques",
        title: "Double Strain",
        difficulty: "medium",
        heroClass: "hero-strain",
        image: "assets/Kitchen/dubble_strain.webp",
        description: "Also known as fine straining. Pouring a cocktail through both a primary strainer (like a Hawthorne) and a secondary fine-mesh strainer.",
        instructionsTitle: "Why do it?",
        instructions: [
            "Removes tiny ice shards from shaking.",
            "Catches small fruit pulp or mint leaves.",
            "Results in a smoother, silkier texture."
        ]
    },
    {
        id: "fat-washing",
        category: "tricks",
        title: "Fat Washing",
        difficulty: "hard",
        heroClass: "hero-fatwash",
        image: "assets/Kitchen/fat_wash.webp",
        description: "A culinary technique that adds savory flavor and silky texture to a spirit without leaving it greasy.",
        instructionsTitle: "How it works",
        instructions: [
            "Mix a liquid fat (like melted butter or bacon fat) into a spirit.",
            "Let it infuse at room temperature for a few hours.",
            "Freeze the mixture overnight so the fat solidifies.",
            "Strain out the solid fat, leaving the flavor and texture behind in the spirit."
        ]
    },
    {
        id: "milk-clarification",
        category: "tricks",
        title: "Milk Clarification",
        difficulty: "hard",
        heroClass: "hero-milk-clarification",
        image: "assets/Kitchen/milk_clarification.webp",
        description: "A technique that uses the proteins in milk to strip tannins and solids from a cocktail, leaving it crystal clear and silky smooth.",
        instructionsTitle: "How it works",
        instructions: [
            "Add a high-acid cocktail to cold whole milk (never the other way around).",
            "The milk will curdle instantly. Let it sit for at least an hour.",
            "Strain the mixture through a coffee filter. The curds will act as a secondary filter.",
            "The result is a clear, shelf-stable drink with a luxurious mouthfeel."
        ]
    },
    {
        id: "smoked-cocktails",
        category: "tricks",
        title: "Smoked Cocktails",
        difficulty: "medium",
        heroClass: "hero-smog",
        image: "assets/Kitchen/smoking.webp",
        description: "Infuse your drinks with campfire-like aromas using wood chips, herbs, or spices.",
        instructionsTitle: "Technique",
        instructions: [
            "Use a smoking gun to fill a decanter with smoke, then pour the drink in and swirl.",
            "Or, torch a cinnamon stick or rosemary sprig and trap the smoke under a glass before pouring.",
            "Smoking adds a deep, savory layer that transforms classic spirits."
        ]
    },
    {
        id: "saline-solution",
        category: "tricks",
        title: "Saline Solution",
        difficulty: "easy",
        heroClass: "hero-vial",
        image: "assets/Kitchen/saline_solution.webp",
        description: "The 'secret' ingredient that makes flavors pop. Salt suppresses bitterness and enhances sweetness and citrus.",
        instructionsTitle: "How to use",
        instructions: [
            "Mix 20g of salt with 80ml of water to create a 20% solution.",
            "Add 2-4 drops to almost any cocktail (especially Margaritas or sours).",
            "It won't make the drink salty, but it will make it taste more vivid."
        ]
    },
    {
        id: "nitrous-infusion",
        category: "tricks",
        title: "Rapid Nitrous Infusion",
        difficulty: "hard",
        heroClass: "hero-bolt",
        image: "assets/Kitchen/nitrous_infusion.webp",
        description: "Use a whipped cream charger to infuse flavors into spirits in seconds instead of weeks.",
        instructionsTitle: "Process",
        instructions: [
            "Add spirit and aromatics (like cacao nibs or peppers) to an iSi siphon.",
            "Charge with N2O; the pressure forces the spirit into the pores of the ingredient.",
            "Release the pressure rapidly to pull the flavor back into the liquid.",
            "Strain and serve immediately."
        ]
    },
    {
        id: "spherification",
        category: "tricks",
        title: "Spherification",
        difficulty: "hard",
        heroClass: "hero-ellipsis",
        image: "assets/Kitchen/spherification.webp",
        description: "The art of turning liquids into delicate spheres that burst with flavor, often called 'Cocktail Caviar'.",
        instructionsTitle: "Basic Method",
        instructions: [
            "Mix sodium alginate into your flavored liquid.",
            "Drip the mixture into a calcium chloride bath using a syringe.",
            "The spheres will form a thin gel membrane instantly.",
            "Rinse in clean water and add to your cocktail for a burst of flavor."
        ]
    },
    {
        id: "ph-color-change",
        category: "tricks",
        title: "pH Color Change",
        difficulty: "medium",
        heroClass: "hero-palette",
        image: "assets/Kitchen/ph_change.webp",
        description: "Create a magical visual experience by making a cocktail change color right before the guest's eyes.",
        instructionsTitle: "The Science",
        instructions: [
            "Infuse your spirit with Butterfly Pea Blossoms to get a deep blue hue.",
            "When acidic citrus (like lemon or lime) is added, the pH level drops.",
            "This causes a chemical reaction that shifts the color from blue to vibrant purple or pink.",
            "Serve the citrus on the side for an interactive experience."
        ]
    },
    {
        id: "thermal-illusion",
        category: "tricks",
        title: "Thermal Taste Illusion",
        difficulty: "hard",
        heroClass: "hero-thermometer",
        image: null,
        description: "A trick that plays with temperature layers to fool the palate and create a multi-course flavor experience in one glass.",
        instructionsTitle: "Preparation",
        instructions: [
            "Prepare a base liquid and heat a portion of it with a thickening agent.",
            "Layer the hot, dense liquid carefully over a chilled, higher-alcohol base.",
            "The density and temperature difference creates two distinct layers.",
            "The guest experiences a warm, rich start followed by a crisp, cold finish."
        ]
    },
    // BARTOOLS
    {
        id: "boston-shaker",
        category: "bartools",
        title: "Boston Shaker",
        difficulty: "easy",
        heroClass: "hero-shaker",
        image: "assets/Kitchen/boston_shaker.webp",
        description: "The professional's choice. Consists of two tins (or one tin and one glass) that nest together.",
        instructionsTitle: "Why use it?",
        instructions: [
            "Larger volume allows for better aeration.",
            "Easier to clean during a busy shift.",
            "Doesn't freeze shut as easily as cobbler shakers."
        ]
    },
    {
        id: "hawthorne-strainer",
        category: "bartools",
        title: "Hawthorne Strainer",
        difficulty: "easy",
        heroClass: "hero-strain",
        image: "assets/Kitchen/hawthornstrainer.webp",
        description: "The most versatile strainer, featuring a spring that fits snugly inside a mixing tin or glass.",
        instructionsTitle: "Pro Tip",
        instructions: [
            "The spring filters out large ice chunks and fruit pulp.",
            "Adjust the 'gate' by pushing the strainer forward to control the flow.",
            "Essential for any shaken drink."
        ]
    },
    {
        id: "julep-strainer",
        category: "bartools",
        title: "Julep Strainer",
        difficulty: "easy",
        heroClass: "hero-strain",
        image: "assets/Kitchen/julip_strainer.webp",
        description: "A classic, perforated bowl-shaped strainer designed to fit perfectly into a mixing glass.",
        instructionsTitle: "Pro Tip",
        instructions: [
            "Best used for stirred drinks like a Martini or Manhattan.",
            "Place it bowl-side down at an angle for the smoothest pour.",
            "Originally designed to keep ice away from the teeth while drinking a Mint Julep."
        ]
    },
    {
        id: "jigger",
        category: "bartools",
        title: "Jigger",
        difficulty: "easy",
        heroClass: "hero-jigger",
        image: "assets/Kitchen/jigger.webp",
        description: "An essential measuring tool to ensure consistency and balance in every cocktail.",
        instructionsTitle: "Pro Tip",
        instructions: [
            "Always measure to the very rim for accuracy.",
            "Use a Japanese-style jigger for a more controlled pour.",
            "Consistency is the difference between a good drink and a great one."
        ]
    },
    {
        id: "bar-spoon",
        category: "bartools",
        title: "Bar Spoon",
        difficulty: "medium",
        heroClass: "hero-spoon",
        image: "assets/Kitchen/barspoon.webp",
        description: "Long-handled spoon used for stirring drinks, measuring small amounts, and layering ingredients.",
        instructionsTitle: "The Technique",
        instructions: [
            "Keep the back of the spoon against the glass.",
            "Use your fingers to rotate the spoon smoothly around the edge.",
            "Stir until the outside of the glass feels ice-cold."
        ]
    },
    // GLASSWARE
    {
        id: "coupe-glass",
        category: "glassware",
        title: "Coupe Glass",
        difficulty: "easy",
        heroClass: "hero-coupe",
        image: "assets/Kitchen/coupe.webp",
        description: "The elegant choice for drinks served 'up' (chilled but without ice).",
        instructionsTitle: "Best for",
        instructions: [
            "Cosmopolitans, Sidecars, and Daiquiris.",
            "The wide bowl showcases the color and aroma.",
            "The stem prevents your hands from warming the drink."
        ]
    },
    {
        id: "martini-glass",
        category: "glassware",
        title: "Martini Glass",
        difficulty: "easy",
        heroClass: "hero-coupe",
        image: "assets/Kitchen/martini.webp",
        description: "The iconic V-shaped glass, synonymous with sophisticated cocktail culture.",
        instructionsTitle: "Best for",
        instructions: [
            "Classic Martinis, Manhattans, and Gimbels.",
            "The long stem keeps the drink cold by preventing hand contact.",
            "The wide brim allows the aromas of the spirit to breathe."
        ]
    },
    {
        id: "rocks-glass",
        category: "glassware",
        title: "Rocks Glass",
        difficulty: "easy",
        heroClass: "hero-rocks",
        image: "assets/Kitchen/tumbler.webp",
        description: "Also known as an Old Fashioned glass. Short, sturdy, and used for drinks with large ice cubes.",
        instructionsTitle: "Best for",
        instructions: [
            "Old Fashioneds, Negronis, and neat spirits.",
            "Perfect for 'building' drinks directly in the glass.",
            "Heavy base provides stability while muddling."
        ]
    },
    {
        id: "highball-glass",
        category: "glassware",
        title: "Highball Glass",
        difficulty: "easy",
        heroClass: "hero-highball",
        image: "assets/Kitchen/longdrink.webp",
        description: "Tall and narrow glass used for 'long' drinks served with plenty of ice and carbonated mixers.",
        instructionsTitle: "Best for",
        instructions: [
            "Gin & Tonics, Mojitos, and Palomas.",
            "The height helps preserve carbonation.",
            "Ideal for drinks that are light and refreshing."
        ]
    }
];
