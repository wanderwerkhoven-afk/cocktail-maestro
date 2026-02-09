/************************************************************
 * 1. COCKTAIL DATABASE (Classic Recipes)
 ************************************************************/
const classicCocktails = [
    {
        id: 'c1',
        name: "Old Fashioned",
        category: ["Strong", "Classic"],
        description: "De ultieme klassieker met bourbon, suiker en bitters.",
        ingredients: ["60ml Bourbon", "1 suikerklontje", "2 scheutjes Angostura bitters", "Sinaasappelschil"],
        method: "Stirred",
        methodDesc: "Los suiker op in bitters en water. Voeg bourbon en ijs toe, roer 30 seconden.",
        image: "https://www.allrecipes.com/thmb/dYoPJDtxDmLRSoAynSqLNJxnTio=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/281761-MakersMarkOldFashioned-gw-ddmfs-beauty-4x3-3338-a0aa968439b44df1b4b26bfdba03fc88.jpg"
    },
    {
        id: 'c2',
        name: "Margarita",
        category: ["Sour", "Tequila"],
        description: "Fris en ziltig: de perfecte balans tussen limoen en tequila.",
        ingredients: ["50ml Tequila", "20ml Cointreau", "15ml Limoensap", "Zoutrandje"],
        method: "Shaken",
        methodDesc: "Shake alle ingrediënten met ijs en zeef in een glas met een zoutrandje.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwmrm7M8eJ7ISAO0R_Fc34BTHq3zV36dxwIA&s"
    },
    {
        id: 'c3',
        name: "Mojito",
        category: ["Refreshing", "Rum"],
        description: "Munt, suiker en rum: een zomerse favoriet.",
        ingredients: ["50ml Witte Rum", "Verse munt", "2 tl suiker", "Bruiswater", "Limoen"],
        method: "Muddled",
        methodDesc: "Muddle munt en suiker. Voeg rum, limoen en ijs toe. Top af met bruiswater.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx7rkUKDhsMqgdHwKDnfJjlwKoyWf84ZnrQg&s"
    },
    {
        id: 'c4',
        name: "Espresso Martini",
        category: ["Coffee", "Vodka"],
        description: "Koffie met een kick: perfect als after-dinner drink.",
        ingredients: ["40ml Vodka", "30ml Koffielikeur", "30ml Verse Espresso", "15ml Suikersiroop"],
        method: "Hard Shake",
        methodDesc: "Shake zeer krachtig met ijs voor een mooie schuimlaag. Zeef in een coupe.",
        image: "https://static-prod.remymartin.com/app/uploads/2025/02/remy-martin-cocktails-remy-espresso-1x1-250220-02.jpg"
    },
    {
        id: 'c5',
        name: "Negroni",
        category: ["Bitter", "Gin"],
        description: "De favoriet van de bartender: kruidig en complex.",
        ingredients: ["30ml Gin", "30ml Campari", "30ml Zoete Vermout"],
        method: "Stirred",
        methodDesc: "Roer alle ingrediënten met ijs en serveer in een glas met één groot ijsblok.",
        image: "https://blog-distiller.imgix.net/wp-content/uploads/2018/08/24143617/whiskeysourADOBE.jpg?"
    },
    {
        id: 'c6',
        name: "Whiskey Sour",
        category: ["Sour", "Classic"],
        description: "Zijdezacht door het eiwit, krachtig door de bourbon.",
        ingredients: ["60ml Bourbon", "30ml Limoensap", "15ml Suikersiroop", "1 Eiwit"],
        method: "Dry & Wet Shake",
        methodDesc: "Shake eerst zonder ijs, daarna met ijs. Zeef in een glas met vers ijs.",
        image: "https://blog-distiller.imgix.net/wp-content/uploads/2018/08/24143617/whiskeysourADOBE.jpg?"
    },
    {
        id: 'c7',
        name: "Pina Colada",
        category: ["Tropical", "Sweet"],
        description: "Vakantie in een glas: kokos en ananas.",
        ingredients: ["50ml Witte Rum", "30ml Kokosroom", "50ml Ananassap"],
        method: "Blended",
        methodDesc: "Mix alle ingrediënten met ijs in een blender tot een gladde massa.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuBtrVo7ioLB4Psl5Qdz6RvitnFMacLqCuIA&s"
    },
    {
        id: 'c8',
        name: "Moscow Mule",
        category: ["Spicy", "Vodka"],
        description: "Fris met een pittige kick van gemberbier.",
        ingredients: ["50ml Vodka", "15ml Limoensap", "120ml Gemberbier"],
        method: "Built",
        methodDesc: "Bouw de cocktail direct in een koperen mok vol met ijs. Roer kort.",
        image: "https://www.foodandwine.com/thmb/DX85ldkm3kh_vUBnXH2mNR78gxA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/moscow-mule-FT-RECIPE0521-6bb69ade441546c1b1210b4e55dbcb23.jpg"
    },
    {
        id: 'c9',
        name: "Dark 'n Stormy",
        category: ["Spicy", "Rum"],
        description: "Donker en mysterieus: de smaak van de Bermuda's.",
        ingredients: ["60ml Dark Rum", "100ml Gemberbier", "15ml Limoensap"],
        method: "Layered",
        methodDesc: "Giet gemberbier in een glas met ijs. 'Float' de donkere rum voorzichtig bovenop.",
        image: "https://www.alcoholvrijshop.nl/media/catalog/product/cache/4a5cf70630b9c3080e492221e54d9a9f/d/a/dark-and-stormy-800x600.png"
    },
    {
        id: 'c10',
        name: "Cosmopolitan",
        category: ["Fruit", "Vodka"],
        description: "Elegant, roze en tijdloos.",
        ingredients: ["40ml Vodka Citron", "15ml Cointreau", "30ml Cranberrysap", "15ml Limoen"],
        method: "Shaken",
        methodDesc: "Shake met ijs en zeef in een gekoeld martini-glas. Garneer met sinaasappel.",
        image: "https://uglyfood.com.sg/wp-content/uploads/2025/05/cosmopolitan-recipe-1747719197.jpg"
    },
    {
        id: 'c11',
        name: "Daiquiri",
        category: ["Sour", "Rum"],
        description: "De ultieme test voor een goede rum.",
        ingredients: ["60ml Witte Rum", "30ml Limoensap", "15ml Suikersiroop"],
        method: "Shaken",
        methodDesc: "Shake met veel ijs en zeef in een coupe-glas. Geen ijs in het glas!",
        image: "https://www.liquor.com/thmb/T7XT7LGJjfm3iP5SYoHWeS-yCGk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/daiquiri-1200x628-email-ba2630027a70498b878ca8180183a779.jpg"
    },
    {
        id: 'c12',
        name: "Aperol Spritz",
        category: ["Light", "Sparkling"],
        description: "Hét terrasdrankje van de zomer.",
        ingredients: ["90ml Prosecco", "60ml Aperol", "30ml Bruiswater"],
        method: "Built",
        methodDesc: "Vul een wijnglas met ijs. Voeg Prosecco, Aperol en bruiswater toe. Roer kort.",
        image: "https://www.resplendentkitchen.com/wp-content/uploads/2024/08/Aperol-Spritz-06056-1.jpg"
    },
    {
        id: 'c13',
        name: "Manhattan",
        category: ["Strong", "Spirit-Forward"],
        description: "Rijk en vol van smaak: de koning van de whiskey-cocktails.",
        ingredients: ["50ml Rye Whiskey", "20ml Zoete Vermout", "2 dashes Angostura"],
        method: "Stirred",
        methodDesc: "Roer in een mengglas met ijs. Zeef in een gekoelde coupe. Garneer met kers.",
        image: "https://www.liquor.com/thmb/DR2UAsRlu-YCVn9r_iLJCmOvzlg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/manhattan-4000x4000-primary-ig-9c3d894510284e9d8fbd9c518d00790b.jpg"
    },
    {
        id: 'c14',
        name: "Gin Fizz",
        category: ["Sparkling", "Refreshing"],
        description: "Licht, bruisend en verfijnd.",
        ingredients: ["50ml Gin", "30ml Citroensap", "10ml Suikersiroop", "Bruiswater"],
        method: "Shaken & Built",
        methodDesc: "Shake gin, citroen en suiker. Giet in glas en top af met bruiswater.",
        image: "https://www.acouplecooks.com/wp-content/uploads/2019/06/Gin-Fizz-112s.jpg"
    },
    {
        id: 'c15',
        name: "Paloma",
        category: ["Fresh", "Tequila"],
        description: "Mexico's favoriet met grapefruit en tequila.",
        ingredients: ["50ml Tequila", "10ml Limoensap", "Grapefruit Soda"],
        method: "Built",
        methodDesc: "Bouw in een glas met een zoutrandje. Top af met grapefruit soda.",
        image: "https://cocktailexpert.nl/wp-content/uploads/2024/06/paloma-recept-cocktail.webp"
    },
    {
        id: 'c16',
        name: "Dry Martini",
        category: ["Strong", "Gin"],
        description: "De definitie van elegantie.",
        ingredients: ["60ml Gin", "10ml Dry Vermout", "Olijf of Citroen"],
        method: "Stirred",
        methodDesc: "Roer zeer koud met ijs. Zeef in een martini-glas. Garneer met een olijf.",
        image: "https://images.ctfassets.net/nhvvc9v3qesf/1xwdCt6vn5alt4LLq4WajV/0bb5b8b59e3ab5937d3912a8a045309c/Ketel_One_Dry___Classic_Martini_in_Nick_and_Nora_Glass_with_hand_adding_lemon_spritz.jpg"
    },
    {
        id: 'c17',
        name: "Bloody Mary",
        category: ["Savory", "Vodka"],
        description: "De hartige klassieker, perfect voor de brunch.",
        ingredients: ["50ml Vodka", "100ml Tomatensap", "Worcestersaus", "Tabasco"],
        method: "Rolled",
        methodDesc: "Giet heen en weer tussen twee glazen om te mixen zonder te veel te verwateren.",
        image: "https://www.liquor.com/thmb/kvzllkWRv-mOjXXMcF0Bcuc4sRQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Bloody-Mary-Classic_Tim_Nusog_4000x4000_primary-68db8a83de544d8ba566accfa13a55e4.jpg"
    },
    {
        id: 'c18',
        name: "French 75",
        category: ["Champagne", "Gin"],
        description: "Feestelijk en krachtig tegelijk.",
        ingredients: ["30ml Gin", "15ml Citroensap", "10ml Suikersiroop", "Champagne"],
        method: "Shaken & Layered",
        methodDesc: "Shake gin, citroen en suiker. Zeef in flûte en top af met champagne.",
        image: "https://images.ctfassets.net/hs93c4k6gio0/Qh3XDKsj9fkaFAPbIcLXR/43bcbac62e7807e55e7a5c91b822e79b/_images_us-cocktails_French75_0412_2.jpg.jpg"
    },
    {
        id: 'c19',
        name: "Amaretto Sour",
        category: ["Sweet & Sour", "Classic"],
        description: "Zacht, nootachtig en perfect gebalanceerd.",
        ingredients: ["50ml Amaretto", "25ml Citroensap", "15ml Eiwit", "Angostura"],
        method: "Shaken",
        methodDesc: "Dry shake zonder ijs, dan wet shake met ijs. Garneer met een kers.",
        image: "https://assets.epicurious.com/photos/643ffefcefb46b50556ffb73/1:1/w_2560%2Cc_limit/Amaretto%2520Sour-RECIPE.jpg"
    },
    {
        id: 'c20',
        name: "Mai Tai",
        category: ["Tiki", "Rum"],
        description: "De koning van de Tiki-cultuur.",
        ingredients: ["40ml Dark Rum", "20ml Witte Rum", "15ml Orgeat", "15ml Cointreau"],
        method: "Shaken",
        methodDesc: "Shake alle ingrediënten met crushed ijs. Garneer uitbundig met munt en limoen.",
        image: "https://candradrinks.com/wp-content/uploads/2024/06/500A8912-500x500.jpg"
    },
    {
        id: 'c21',
        name: "Long Island Ice Tea",
        category: ["Strong", "Classic"],
        description: "Een krachtige mix van vijf verschillende spirits.",
        image: "https://images.unsplash.com/photo-1512782858364-71558268ee3c?auto=format&fit=crop&w=800&q=80",
        ingredients: ["Rum blanco", "Gin", "Vodka", "Tequila", "Cointreau", "Citroensap", "Suikersiroop", "Cola"],
        method: "Build",
        methodDesc: "Vul een longdrinkglas met ijs. Voeg alle spirits en het citroensap toe. Top af met cola en roer voorzichtig."
    },
    {
        id: 'c22',
        name: "Clover Club",
        category: ["Sour", "Elegant"],
        description: "Een zijdezachte, roze klassieker met framboos.",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
        ingredients: ["Gin", "Citroensap", "Raspberry syrup", "Eiwit"],
        method: "Dry Shake & Shake",
        methodDesc: "Shake eerst alle ingrediënten zonder ijs (dry shake) om het eiwit te laten schuimen. Voeg ijs toe, shake opnieuw en strain in een gekoeld glas."
    },
    {
        id: 'c23',
        name: "Espresso Martini Bueno",
        category: ["Coffee", "Sweet"],
        description: "Een heerlijke variant met een hint van hazelnoot.",
        image: "https://images.unsplash.com/photo-1545438102-799c3991ffb2?auto=format&fit=crop&w=800&q=80",
        ingredients: ["Vodka", "Frangelico", "Espresso", "Hazelnut syrup"],
        method: "Shake",
        methodDesc: "Shake alle ingrediënten krachtig met veel ijs en strain in een martini glas. Garneer met koffiebonen."
    },
    {
        id: 'c24',
        name: "Corpse Reviver #2",
        category: ["Classic", "Strong"],
        description: "Ontworpen om je weer tot leven te wekken na een zware nacht.",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
        ingredients: ["Gin", "Lillet Blanc", "Cointreau", "Citroensap", "Angostura bitters"],
        method: "Shake",
        methodDesc: "Shake met ijs en strain in een gekoeld glas. Traditioneel wordt het glas gespoeld met absint."
    },
    {
        id: 'c25',
        name: "Garden Cocktail",
        category: ["Fresh", "Floral"],
        description: "Een verfrissende cocktail met vlierbloesem en komkommer.",
        image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80",
        ingredients: ["Vlierbloesem", "Gin", "Limoensap", "Komkommer", "Sprite"],
        method: "Muddle & Build",
        methodDesc: "Muddle de komkommer onderin het glas. Voeg ijs en de vloeibare ingrediënten toe. Top af met Sprite."
    },
    {
        id: 'c26',
        name: "Gincotec",
        category: ["Fresh", "Iced Tea"],
        description: "Een botanical mix met vlierbloesem en icetea.",
        image: "https://images.unsplash.com/photo-1509446416176-05607070a22b?auto=format&fit=crop&w=800&q=80",
        ingredients: ["Gin", "Vlierbloesem", "Limoensap", "Vlierbloesem siroop", "Komkommer", "Bruiswater"],
        method: "Build",
        methodDesc: "Bouw het drankje op in een groot glas met veel ijs. Garneer met een komkommerlint."
    },
    {
        id: 'c27',
        name: "Holy Peach",
        category: ["Sweet", "Fruity"],
        description: "Een zoete mix van perzik en Licor 43.",
        image: "https://images.unsplash.com/photo-1531234799389-dcb7651eb0a2?auto=format&fit=crop&w=800&q=80",
        ingredients: ["Peachtree", "Licor 43", "Limoensap", "Sprite"],
        method: "Build",
        methodDesc: "Bouw in een longdrinkglas met ijs en top af met Sprite of groene ijsthee."
    },
    {
        id: 'c28',
        name: "Wandering Cosmo",
        category: ["Fruity", "Easy"],
        description: "Een moderne twist op de Cosmopolitan.",
        image: "https://images.unsplash.com/photo-1533502774297-704464cca52b?auto=format&fit=crop&w=800&q=80",
        ingredients: ["Passoa", "Cointreau", "Vodka", "Limoensap", "Bruiswater"],
        method: "Shake",
        methodDesc: "Shake de alcohol en het limoensap met ijs. Strain in een glas en top af met DubbelFrisss."
    },
    {
        id: 'c29',
        name: "Red Flamingo",
        category: ["Fruity", "Sparkling"],
        description: "Een felroze dorstlesser met bramen en framboos.",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
        ingredients: ["Bramble gin", "Cointreau", "Citroensap", "Raspberry syrup", "Bruiswater"],
        method: "Shake & Top",
        methodDesc: "Shake alle ingrediënten behalve de Spa Rood. Strain over ijs en vul aan met bruiswater."
    },
    {
        id: 'c30',
        name: "Blueberry Mule",
        category: ["Blue", "Ginger"],
        description: "Een blauwe variant op de Moscow Mule.",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
        ingredients: ["Blue Curacao", "Vodka", "Blueberry likeur", "Limoensap", "Gemberbier"],
        method: "Build",
        methodDesc: "Bouw direct in een koperen mok of glas. Roer voorzichtig om de lagen te mengen."
    },
    {
        id: 'c31',
        name: "Giant Sucker",
        category: ["Herbal", "Unique"],
        description: "Jägermeister ontmoet vlierbloesem.",
        image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
        ingredients: ["Honing", "Jagermeister", "Verse munt", "Tonic"],
        method: "Stir",
        methodDesc: "Los de honing op in de Jägermeister. Voeg ijs en tonic toe. Garneer met rozemarijn."
    },
    {
        id: 'c32',
        name: "Lychacha",
        category: ["Exotic", "Floral"],
        description: "Een unieke mix van lychee en Aperol.",
        image: "https://images.unsplash.com/photo-1558961363-fa4f2329762c?auto=format&fit=crop&w=800&q=80",
        ingredients: ["Vlierbloesem siroop", "Lychee likeur", "Campari", "Citroensap", "Eiwit"],
        method: "Shake",
        methodDesc: "Shake krachtig met eiwit voor een mooie schuimkraag."
    },
    {
        id: 'c33',
        name: "Mango Mustache",
        category: ["Fruity", "Sour"],
        description: "Een zijdezachte mango cocktail met een gin basis.",
        image: "https://images.unsplash.com/photo-1544145945-f904253d0c7b?auto=format&fit=crop&w=800&q=80",
        ingredients: ["Suikersiroop", "Mango puree", "Citroensap", "Gin", "Eiwit"],
        method: "Shake",
        methodDesc: "Dry shake zonder ijs, dan met ijs. Strain in een coupe glas."
    },
    {
        id: 'c34',
        name: "Tropical Hurricane",
        category: ["Tiki", "Fruity"],
        description: "Vakantie in een glas.",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
        ingredients: ["Bacardi Rasp", "Peachtree", "Limoensap", "Sinaasappelsap"],
        method: "Shake",
        methodDesc: "Shake alle vloeistoffen en schenk over vers ijs. Top af met maracuja sap."
    },
    {
        id: 'c35',
        name: "Muddy Mudslide",
        category: ["Creamy", "Coffee"],
        description: "Een rijke koffie cocktail met Baileys en caramel.",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
        ingredients: ["Baileys", "Caramel vodka", "Koffielikeur", "Espresso"],
        method: "Stir",
        methodDesc: "Stir alle ingrediënten 10 seconden in een tumbler met een groot blok ijs."
    },
    {
        id: 'c36',
        name: "New York Sour",
        category: ["Classic", "Wine twist"],
        description: "Een Whiskey Sour met een prachtige rode wijn float.",
        image: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&w=800&q=80",
        ingredients: ["Jameson", "Citroensap", "Suikersiroop", "Eiwit", "Rode wijn"],
        method: "Shake & Float",
        methodDesc: "Maak een normale whiskey sour. Giet voorzichtig de Malbec over de bolle kant van een barlepel voor de laag."
    },
    {
        id: 'c37',
        name: "Zombie",
        category: ["Strong", "Tiki"],
        description: "Beroemd en berucht. Maximaal 2 per persoon!",
        image: "https://images.unsplash.com/photo-1599021456807-25db0f974333?auto=format&fit=crop&w=800&q=80",
        ingredients: ["Rum blanco", "Dark rum", "Sinaasappelsap", "Grenadine", "Kaneelsiroop", "Angostura bitters"],
        method: "Shake & Fire",
        methodDesc: "Shake alles met ijs. Top af met overproof rum en steek deze voorzichtig aan. Strooi er kaneel over voor vonken."
    }
];

/************************************************************
 * 2. APP STATE & INITIALIZATION
 ************************************************************/
let currentImageBase64 = "";
let myIngredients = JSON.parse(localStorage.getItem('myIngredients')) || [];

document.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');
});

/************************************************************
 * 3. NAVIGATION LOGIC
 ************************************************************/
function navigateTo(pageId) {
    // Schakel pagina's
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const activePage = document.getElementById(pageId + '-page');
    if (activePage) activePage.classList.add('active');

    // Update nav icons
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    const activeNav = document.getElementById('nav-' + pageId);
    if (activeNav) activeNav.classList.add('active');

    // Pagina specifieke acties
    if (pageId === 'vault') renderVault();
    if (pageId === 'fridge') syncCheckboxes();
}

/************************************************************
 * 4. VAULT & SEARCH LOGIC
 ************************************************************/
function renderVault(filter = "") {
    const vaultGrid = document.getElementById('vault-grid');
    if (!vaultGrid) return;

    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    const allCocktails = [...classicCocktails, ...myRecipes];

    vaultGrid.innerHTML = "";
    const searchTerm = filter.toLowerCase();

    const filtered = allCocktails.filter(c => {
        const nameMatch = c.name.toLowerCase().includes(searchTerm);
        const ingredientMatch = c.ingredients.some(i => i.toLowerCase().includes(searchTerm));
        const categoryMatch = Array.isArray(c.category) 
            ? c.category.some(cat => cat.toLowerCase().includes(searchTerm))
            : c.category.toLowerCase().includes(searchTerm);

        return nameMatch || ingredientMatch || categoryMatch;
    });

    filtered.forEach(cocktail => {
        const card = document.createElement('div');
        card.className = 'cocktail-card';
        card.onclick = function() { this.classList.toggle('open'); };

        card.innerHTML = `
            <div class="card-thumb-large">
                <img src="${cocktail.image}" alt="${cocktail.name}">
            </div>
            <div class="card-content">
                <h4>${cocktail.name}</h4>
                <div class="category-container">
                    ${Array.isArray(cocktail.category) 
                        ? cocktail.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')
                        : `<span class="category-tag">${cocktail.category}</span>`
                    }
                </div>
                <p class="description">${cocktail.description || "A custom masterpiece."}</p>
                <div class="collapsible-content">
                    <div class="ingredients-section">
                        <strong>Ingredients:</strong> 
                        <ul class="ingredients-list">
                            ${cocktail.ingredients.map(ing => `<li>${ing}</li>`).join('')}
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

function searchCocktails() {
    const searchInput = document.getElementById('vaultSearch');
    if (searchInput) renderVault(searchInput.value);
}

/************************************************************
 * 5. RECIPE CREATION & IMAGE HANDLING
 ************************************************************/
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

function saveNewRecipe() {
    const getValue = (id) => {
        const el = document.getElementById(id);
        return el ? el.value : "";
    };

    const name = getValue('recipe-name');
    const description = getValue('recipe-description');
    const categoryInput = getValue('recipe-category');
    const ingredientsInput = getValue('recipe-ingredients');
    const method = getValue('recipe-method');
    const methodDesc = getValue('recipe-desc');

    if (!name || !ingredientsInput) {
        alert("Vul tenminste een naam en ingrediënten in!");
        return;
    }

    const newRecipe = {
        id: 'user-' + Date.now(),
        name: name,
        description: description || "A custom masterpiece.",
        category: categoryInput.split(',').map(c => c.trim()).filter(c => c !== ""),
        ingredients: ingredientsInput.split('\n').filter(i => i.trim() !== ""),
        method: method || "Not specified",
        methodDesc: methodDesc || "No description provided.",
        image: currentImageBase64 || "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&h=400&auto=format&fit=crop"
    };

    const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    myRecipes.push(newRecipe);
    localStorage.setItem('myRecipes', JSON.stringify(myRecipes));

    alert("Recept opgeslagen!");
    navigateTo('vault');
}

/************************************************************
 * 6. FRIDGE & INGREDIENT MATCHING LOGIC
 ************************************************************/

/**
 * Opent en sluit de categorieën met de nieuwe smooth CSS transitie
 */
function toggleCategory(id) {
    const content = document.getElementById(id);
    if (!content) return;

    // Toggle de 'active' class voor de CSS animatie
    content.classList.toggle('active');
    
    // Icoontje omdraaien
    const button = content.previousElementSibling;
    const icon = button ? button.querySelector('i') : null;
    
    if (icon) {
        if (content.classList.contains('active')) {
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    }
}

/**
 * Update de voorraadlijst bij elke checkbox klik
 */
function updateFridge(checkbox) {
    const value = checkbox.value.toLowerCase();
    
    if (checkbox.checked) {
        if (!myIngredients.includes(value)) {
            myIngredients.push(value);
        }
    } else {
        myIngredients = myIngredients.filter(ing => ing !== value);
    }
    
    localStorage.setItem('myIngredients', JSON.stringify(myIngredients));
}

/**
 * Synchroniseert de checkboxes bij het laden van de pagina
 */
function syncCheckboxes() {
    const checkboxes = document.querySelectorAll('.category-content input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = myIngredients.includes(cb.value.toLowerCase());
    });
}

/**
 * Zoekt cocktails op basis van voorraad en toont ze in de Vault-stijl
 */
function checkMatches() {
    const btn = document.querySelector('.match-btn-large');
    const resultsContainer = document.getElementById('matching-results');
    if (!resultsContainer || !btn) return;

    // Visuele feedback op de knop
    const originalContent = btn.innerHTML;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Searching...`;
    btn.style.pointerEvents = "none";

    // Korte vertraging voor het "zoek" effect
    setTimeout(() => {
        const myRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
        const allCocktails = [...classicCocktails, ...myRecipes];

        // Filter: Alle ingrediënten van de cocktail moeten in 'myIngredients' zitten
        const matches = allCocktails.filter(cocktail => {
            return cocktail.ingredients.every(ing => {
                const ingredientName = ing.toLowerCase();
                return myIngredients.some(mine => ingredientName.includes(mine));
            });
        });

        resultsContainer.innerHTML = ""; 

        if (matches.length === 0) {
            resultsContainer.innerHTML = `
                <div style="text-align:center; padding: 40px 20px; color: #888; grid-column: 1/-1;">
                    <i class="fa-solid fa-magnifying-glass" style="font-size: 2rem; margin-bottom: 10px;"></i>
                    <p>No full matches found. Try adding basics like sugar, lime juice, or bitters!</p>
                </div>`;
        } else {
            matches.forEach(cocktail => {
                const card = document.createElement('div');
                card.className = 'cocktail-card';
                card.onclick = function() { this.classList.toggle('open'); };

                card.innerHTML = `
                    <div class="card-thumb-large">
                        <img src="${cocktail.image}" alt="${cocktail.name}">
                    </div>
                    <div class="card-content">
                        <h4>${cocktail.name}</h4>
                        <div class="category-container">
                            ${Array.isArray(cocktail.category) 
                                ? cocktail.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')
                                : `<span class="category-tag">${cocktail.category}</span>`
                            }
                        </div>
                        <p class="description">${cocktail.description || "A custom masterpiece."}</p>
                        <div class="collapsible-content">
                            <div class="ingredients-section">
                                <strong>Ingredients:</strong> 
                                <ul class="ingredients-list">
                                    ${cocktail.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="method-section" style="margin-top: 10px; border-top: 1px solid #333; padding-top: 10px;">
                                <strong>Method: ${cocktail.method}</strong>
                                <p class="method-text" style="font-size: 0.85rem; color: #bbb; margin-top: 5px;">${cocktail.methodDesc || ""}</p>
                            </div>
                        </div>
                    </div>
                `;
                resultsContainer.appendChild(card);
            });
        }

        // Zet knop terug en scroll naar resultaten
        btn.innerHTML = originalContent;
        btn.style.pointerEvents = "auto";
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    }, 600);
}