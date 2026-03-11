export const kitchenItems = [
    {
        id: "brewed-teas",
        category: "ingredients",
        title: "Brewed Teas",
        difficulty: "easy",
        heroClass: "hero-syrup",
        image: "assets/Kitchen/tea.webp",
        description: [
            "Teas add complex flavor and tannins to drinks, especially zero-proof sips. Black teas are highest in tannins, while green, white, and herbal teas are lower.",
            "An oversteeped tea doesn't always equal more flavor. Oversteeping tends to make tea bitter and too tannic."
        ],
        dropdown: {
            label: "Select Tea Type",
            options: [
                {
                    value: "chamomile",
                    name: "Chamomile Tea",
                    ingredients: ["2 tablespoons (4g) chamomile tea", "8 fluid ounces (240ml/g) filtered water"],
                    instructions: [
                        "Water temperature: 160°F (71°C).",
                        "Steep in the hot water for 10 minutes.",
                        "Strain carefully and let cool before use."
                    ]
                },
                {
                    value: "peach",
                    name: "Peach Tea",
                    ingredients: ["2 tablespoons (4g) herbal peach tea", "8 fluid ounces (240ml/g) filtered water"],
                    instructions: [
                        "Water temperature: 200°F (93°C).",
                        "Steep in the hot water for 5 minutes.",
                        "Strain carefully and let cool before use."
                    ]
                },
                {
                    value: "licorice",
                    name: "Licorice Tea",
                    ingredients: ["2 tablespoons (4g) licorice root tea", "8 fluid ounces (240ml/g) filtered water"],
                    instructions: [
                        "Water temperature: 200°F (93°C).",
                        "Steep in the hot water for 10 minutes.",
                        "Strain carefully and let cool before use."
                    ]
                },
                {
                    value: "lavender",
                    name: "Lavender Tea",
                    ingredients: ["2 tablespoons (4g) herbal lavender tea", "8 fluid ounces (240ml/g) filtered water"],
                    instructions: [
                        "Water temperature: 205°F (96°C).",
                        "Steep in the hot water for 10 minutes.",
                        "Strain carefully and let cool before use."
                    ]
                },
                {
                    value: "jasmine",
                    name: "Jasmine Tea",
                    ingredients: ["2 tablespoons (4g) jasmine tea", "8 fluid ounces (240ml/g) filtered water"],
                    instructions: [
                        "Water temperature: 185°F (85°C).",
                        "Steep in the hot water for 3 minutes.",
                        "Strain carefully and let cool before use."
                    ]
                },
                {
                    value: "lapsang",
                    name: "Lapsang Souchong Tea",
                    ingredients: ["2 tablespoons (4g) lapsang souchong tea", "8 fluid ounces (240ml/g) filtered water"],
                    instructions: [
                        "Water temperature: 203°F (95°C).",
                        "Steep in the hot water for 3 minutes.",
                        "Strain carefully and let cool before use."
                    ]
                },
                {
                    value: "earlgrey",
                    name: "Earl Grey Tea",
                    ingredients: ["2 tablespoons (4g) Earl Grey tea", "8 fluid ounces (240ml/g) filtered water"],
                    instructions: [
                        "Water temperature: 208°F (98°C).",
                        "Steep in the hot water for 5 minutes.",
                        "Strain carefully and let cool before use."
                    ]
                },
                {
                    value: "black",
                    name: "Black Tea",
                    ingredients: ["2 tablespoons (4g) black tea", "8 fluid ounces (240ml/g) filtered water"],
                    instructions: [
                        "Water temperature: 212°F (100°C).",
                        "Steep in the hot water for 5 minutes.",
                        "Strain carefully and let cool before use."
                    ]
                },
                {
                    value: "assam",
                    name: "Assam Tea",
                    ingredients: ["2 tablespoons (4g) Assam tea", "8 fluid ounces (240ml/g) filtered water"],
                    instructions: [
                        "Water temperature: 100°F (38°C).",
                        "Steep in the warm water for 3 minutes.",
                        "Strain carefully and let cool before use."
                    ]
                }
            ]
        }
    },
    {
        id: "infused-spirits",
        category: "ingredients",
        title: "Infused Spirits",
        difficulty: "medium",
        heroClass: "hero-syrup",
        image: "assets/Kitchen/infusions.webp",
        description: [
            "An easy way to add even more flavor to your favorite cocktail is to infuse the spirits that you use. This doesn't require any fancy equipment, just a bit of time and patience.",
            "Alcohol is a solvent and a master at extracting flavors. Use a French coffee press or a glass jar for easy execution and cleanup."
        ],
        dropdown: {
            label: "Select Infusion Type",
            options: [
                {
                    value: "blackberry-tequila",
                    name: "Blackberry Tequila",
                    ingredients: ["17 fluid ounces (500ml) Blanco Tequila", "1 cup (145g) frozen Blackberries"],
                    instructions: [
                        "In a French press or glass jar, combine the tequila and blackberries.",
                        "Muddle or press down firmly and let sit at room temperature for 24 hours.",
                        "Strain through a fine-mesh sieve or cheesecloth into a clean bottle and store in a cool dark place (up to 6 months).",
                        "Add 10ml of vodka to the strained liquid to preserve it for longer."
                    ]
                },
                {
                    value: "blueberry-orange",
                    name: "Blueberry Orange Liqueur",
                    ingredients: ["17 fluid ounces (500ml) Orange Liqueur", "1 cup (145g) frozen Blueberries"],
                    instructions: [
                        "In a French press or glass jar, combine the liqueur and blueberries.",
                        "Muddle or press down firmly and let sit at room temperature for 24 hours.",
                        "Strain through a fine-mesh sieve or cheesecloth into a clean bottle and store in a cool dark place (up to 6 months).",
                        "Add 10ml of vodka to the strained liquid to preserve it for longer."
                    ]
                },
                {
                    value: "earl-grey-gin",
                    name: "Earl Grey Gin",
                    ingredients: ["17 fluid ounces (500ml) London Dry Gin", "1 tablespoon (4g) Earl Grey tea leaves"],
                    instructions: [
                        "In a French press, combine the gin and Earl Grey tea leaves.",
                        "Muddle or press down firmly and let sit at room temperature for 2 hours.",
                        "Strain through a fine-mesh sieve or cheesecloth into a clean bottle and store in a cool dark place (up to 6 months).",
                        "Add 10ml of vodka to the strained liquid to preserve it for longer."
                    ]
                },
                {
                    value: "raspberry-cognac",
                    name: "Raspberry Cognac",
                    ingredients: ["17 fluid ounces (500ml) Cognac", "1 cup (145g) frozen Raspberries"],
                    instructions: [
                        "In a French press or glass jar, combine the Cognac and raspberries.",
                        "Muddle or press down firmly and let sit at room temperature for 24 hours.",
                        "Strain through a fine-mesh sieve or cheesecloth into a clean bottle and store in a cool dark place (up to 6 months).",
                        "Add 10ml of vodka to the strained liquid to preserve it for longer."
                    ]
                },
                {
                    value: "strawberry-cognac",
                    name: "Strawberry Cognac",
                    ingredients: ["17 fluid ounces (500ml) Cognac", "1 cup (145g) frozen Strawberries, chopped"],
                    instructions: [
                        "In a French press or glass jar, combine the Cognac and strawberries.",
                        "Muddle or press down firmly and let sit at room temperature for 24 hours.",
                        "Strain through a fine-mesh sieve or cheesecloth into a clean bottle and store in a cool dark place (up to 6 months).",
                        "Add 10ml of vodka to the strained liquid to preserve it for longer."
                    ]
                }
            ]
        }
    },
    {
        id: "oleo-saccharums",
        category: "ingredients",
        title: "Oleo Saccharums",
        difficulty: "easy",
        heroClass: "hero-syrup",
        image: "assets/Kitchen/oleo.webp",
        description: [
            "Oleo saccharum translates to 'oil sugar'. It is a traditional method of using sugar to extract the flavorful essential oils from fruit peels or fruit pieces.",
            "The result is a highly concentrated, aromatic syrup that adds incredible depth to cocktails and mocktails without adding much extra liquid volume."
        ],
        dropdown: {
            label: "Select Type",
            options: [
                {
                    value: "lemon",
                    name: "Lemon Oleo",
                    ingredients: ["Peels of 4-6 Lemons", "1/2 cup (100g) White Sugar"],
                    instructions: [
                        "Peel the lemons, trying to avoid as much white pith as possible.",
                        "In a bowl or bag, toss the peels with the sugar.",
                        "Muddle gently or massage the bag to start the extraction.",
                        "Let sit at room temperature for 4 to 12 hours.",
                        "Remove peels and collect the thick, citrusy syrup."
                    ]
                },
                {
                    value: "orange",
                    name: "Orange Oleo",
                    ingredients: ["Peels of 3-4 Oranges", "1/2 cup (100g) White Sugar"],
                    instructions: [
                        "Peel the oranges, being careful to avoid the bitter white pith.",
                        "Combine peels and sugar in a sealed container or bag.",
                        "Muzzle or shake to coat the peels thoroughly.",
                        "Let sit for 6 to 24 hours until sugar is completely dissolved into oil.",
                        "Strain out the peels and bottle the syrup."
                    ]
                },
                {
                    value: "banana",
                    name: "Banana Peel Oleo",
                    ingredients: ["Peels of 2-3 ripe Bananas (chopped)", "1/2 cup (100g) White Sugar"],
                    instructions: [
                        "Wash the banana peels and chop them into small pieces.",
                        "Combine with sugar in a vacuum bag or sealed jar.",
                        "Let sit for 24 hours at room temperature.",
                        "The sugar will pull the moisture and oils from the peels.",
                        "Strain through a fine-mesh sieve."
                    ]
                },
                {
                    value: "grapefruit",
                    name: "Grapefruit Oleo",
                    ingredients: ["Peels of 2 large Grapefruits", "1/2 cup (100g) White Sugar"],
                    instructions: [
                        "Peel the grapefruits (avoiding pith) and combine with sugar.",
                        "Muzzle or massage to ensure all peels are coated.",
                        "Let sit for 12 to 24 hours.",
                        "Strain and store in the fridge for up to 2 months."
                    ]
                },
                {
                    value: "pineapple",
                    name: "Pineapple Oleo",
                    ingredients: ["1 cup Pineapple base & bark", "1/2 cup (100g) White Sugar"],
                    instructions: [
                        "Chop your fruit scraps (cores or tops) into small pieces.",
                        "Combine with sugar in a jar and shake well.",
                        "Let sit for 24 hours. The sugar will macerate the fruit.",
                        "Strain through a fine-mesh sieve.",
                        "A great way to use up kitchen waste!"
                    ]
                },
                {
                    value: "strawberry",
                    name: "Strawberry Oleo",
                    ingredients: ["1 cup Strawberry tops & scrapes", "1/2 cup (100g) White Sugar"],
                    instructions: [
                        "Chop your fruit scraps (cores or tops) into small pieces.",
                        "Combine with sugar in a jar and shake well.",
                        "Let sit for 24 hours. The sugar will macerate the fruit.",
                        "Strain through a fine-mesh sieve.",
                        "A great way to use up kitchen waste!"
                    ]
                },
                {
                    value: "lg",
                    name: "L&G",
                    ingredients: [
                        "20g finely grated Lemon zest or peel",
                        "500ml freshly squeezed Lemon juice (~15 lemons)",
                        "200g Caster sugar",
                        "5ml (1 tsp) Lemon bitters"
                    ],
                    instructions: [
                        "Place the lemon zest or peel in a large jug.",
                        "Pour the lemon juice over the zest and leave to infuse for at least 30 minutes.",
                        "Add the caster sugar (and lemon bitters optional) and stir to dissolve.",
                        "Once sugar is dissolved, strain through a fine strainer to remove zest.",
                        "Bottle and store in the fridge (keeps for 4 days)."
                    ]
                }
            ]
        }
    },
    {
        id: "syrups",
        category: "ingredients",
        title: "Syrups",
        difficulty: "easy",
        heroClass: "hero-syrup",
        image: "assets/Kitchen/simple_syrup.webp",
        description: [
            "Syrups are the backbone of cocktail sweetness and texture. From the essential simple syrup to complex infusions, they balance the strong and sour elements of a drink.",
            "Most syrups follow a basic ratio of sugar to water, but can be elevated with heat, time, and additional aromatics like ginger or tea.",
            "While making your own is rewarding, don't be afraid to use store-bought versions — sometimes it's just as easy and effective!"
        ],
        dropdown: {
            label: "Select Syrup Type",
            options: [
                {
                    value: "simple",
                    name: "Simple Syrup",
                    ingredients: ["1 cup White Sugar", "1 cup Water"],
                    instructions: [
                        "Combine equal parts sugar and water in a saucepan.",
                        "Heat gently over medium heat, stirring occasionally until the sugar is completely dissolved. Do not let it boil.",
                        "Remove from heat and let it cool.",
                        "Store in an airtight bottle in the refrigerator. It will keep for about a month."
                    ]
                },
                {
                    value: "rich",
                    name: "Rich Sugar Syrup",
                    ingredients: ["2 cups White Sugar", "1 cup Water"],
                    instructions: [
                        "Combine 2 parts sugar and 1 part water in a saucepan.",
                        "Heat gently while stirring continuously until dissolved.",
                        "Let it cool completely and store in the fridge. Will last up to 6 months."
                    ]
                },
                {
                    value: "honey",
                    name: "Honey Syrup",
                    ingredients: ["1 cup Honey", "1/2 cup Warm Water"],
                    instructions: [
                        "Combine honey and warm water in a jar.",
                        "Stir or shake until the honey is fully incorporated into the water.",
                        "Let it cool and store in the fridge. Lasts for 1 month."
                    ]
                },
                {
                    value: "honey-ginger",
                    name: "Honey-Ginger Syrup",
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
                    value: "grenadine",
                    name: "Grenadine",
                    ingredients: ["2 cups Pomegranate juice", "2 cups White Sugar", "1/2 tsp Orange blossom water", "10ml Vodka (optional)"],
                    instructions: [
                        "Combine juice and sugar in a saucepan over low heat.",
                        "Stir until sugar is dissolved. Do not boil.",
                        "Remove from heat, add orange blossom water and vodka.",
                        "Bottle and refrigerate. Lasts for 2-3 months."
                    ]
                },
                {
                    value: "orgeat",
                    name: "Orgeat (Almond Syrup)",
                    ingredients: ["2 cups unsweetened Almond milk", "2 cups White Sugar", "1 tsp Almond extract", "1 tsp Orange blossom water"],
                    instructions: [
                        "Combine almond milk and sugar in a saucepan over medium heat.",
                        "Stir until sugar is dissolved. Do not let it boil.",
                        "Remove from heat, let it cool.",
                        "Add almond extract and orange blossom water.",
                        "Store in the fridge. Lasts for 1 month."
                    ]
                },
                {
                    value: "raspberry",
                    name: "Raspberry Syrup",
                    ingredients: ["1 cup Fresh raspberries", "1 cup White Sugar", "1/2 cup Water"],
                    instructions: [
                        "Muddle raspberries with sugar and water in a saucepan.",
                        "Heat gently until sugar dissolves and juice is released.",
                        "Strain through a fine-mesh sieve, pressing to get all the liquid.",
                        "Bottle and refrigerate. Lasts for 2 weeks."
                    ]
                },
                {
                    value: "bergamot-dilution",
                    name: "Bergamot Dilution",
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
                }
            ]
        }
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
        description: "Use a whipped cream charger to infuse flavors into spirits in seconds",
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
        image: "assets/Kitchen/thermal_illusion.webp",
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
