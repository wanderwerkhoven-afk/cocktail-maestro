/**
 * Local database of news articles for initial migration
 */
export const newsArticles = [
    {
        id: 'koningsdag',
        title: 'Koningsdag 2026: Oranje Boven!',
        tagline: 'De koninklijke gids voor oranje cocktails.',
        badge: 'PROMO',
        image: 'assets/promos/koningsdag.webp',
        active: true,
        content: `
            <p>Koningsdag is dé dag om oranje te vieren. En hoe doe je dat beter dan met een oranje cocktail in je hand? In dit artikel duiken we in de beste oranje drankjes om in huis te hebben.</p>
            <h3>De Klassieker: Aperol Spritz</h3>
            <p>Geen enkele kleur is zo iconisch als het oranje van een Aperol Spritz. Fris, bitterzoet en perfect voor een zonnige Koningsdag op een terras of in de tuin.</p>
            <h3>Onze Favoriet: De Orange King Martini</h3>
            <p>Een mix van premium vodka, verse sinaasappelsap en een vleugje passievrucht siroop. Shaken met ijs en geserveerd in een gekoelde coupe.</p>
            <h3>Mocktail Tip: Royal Orange Fizz</h3>
            <p>Voor degenen die liever alcoholvrij vieren: een mix van sinaasappelsap, vlierbloesemsiroop en bruiswater. Garneer met een takje munt en een sinaasappelschijfje.</p>
            <p>Zorg dat je je <strong>Koelkast</strong> op tijd vult met de nodige ingrediënten. Bekijk onze Vault voor de volledige recepten!</p>
        `
    },
    {
        id: 'summer',
        title: 'Zomer in je Glas',
        tagline: 'Frisse recepten voor warme dagen.',
        badge: 'NIEUW',
        image: 'assets/promos/summer.webp',
        active: true,
        content: `
            <p>De zomer komt er weer aan en dat betekent tijd voor verfrissing! We hebben onze Vault uitgebreid met een reeks nieuwe zomerse klassiekers.</p>
            <p>Van de tropische <strong>Piña Colada</strong> tot de vlijmscherpe <strong>Tommy's Margarita</strong>. Ontdek hoe je de perfecte balans vindt tussen zuur, zoet en ijskoud.</p>
            <p>Bekijk ook onze nieuwe gidsen in de <strong>Keuken</strong> voor het maken van je eigen watermeloen siroop en gehydrateerde limoenen!</p>
        `
    },
    {
        id: 'mini-game',
        title: 'Mix & Match Game',
        tagline: 'Test je mixology skills in onze interactieve minigame!',
        badge: 'PLAY',
        image: 'assets/promos/mini game.png',
        active: true,
        buttonText: 'Speel Nu',
        buttonAction: "window.location.href='Mini game/index.html'",
        content: '<p>Help Miguel de perfecte cocktail te shaken in onze nieuwe interactieve minigame!</p>'
    }
];
