
// This is for getting products per category from SQL database
export const categoryMap: Record<string, string[]> = {
    Meso: ['Piletina i puretina', 'Svinjetina, junetina, ostalo', 'Crveno meso', 'Svinjetina, junetina i ostalo'],
    Voće: ['Voće', 'Konzervirano voće'],
    Povrće: ['Povrće', 'Konzervirano povrće'],
    Pekarnica: ['Pakirani kruh', 'Dvopek i toast', 'Svježi kruh', 'Tost i dvopek', 'Dvopek i tost', 'Tijesta i kvasci', 'Mlinci i mrvice', 'Kolači i torte', 'Kruh i peciva', 'Kroasani i kolači', 'Mlinci i krušne mrvice', 'Kolači'],
    Suhomesnati: ['Mesni naresci', 'Mesne delikatese', 'Mesna delikatesa', 'Salame', 'Hrenovke, kobasice i salame', 'Kobasice i hrenovke', 'Hrenovke i kobasice'],
    Mliječni_proizvodi: ['Mlijeko', 'Jogurt', 'Vrhnje', 'Maslac', 'Mliječni deserti', 'Jogurt i ostalo', 'Jogurti i ostalo', 'Vrhnja i pripravci', 'Margarin, maslac, mast', 'Alternativna mlijeka', 'Maslac i margarin', 'Napitci', 'Ledena kava'],
    Jaja_sirevi_i_namazi: ['Sirevi i pripravci', 'Jaja', 'Namazi', 'Meki sirevi', 'Polutvrdi sirevi', 'Tvrdi sirevi', 'Rezani, topljivi i svježi', 'Sirni namazi', 'Sirevi', 'Sir'],
    Riba: ['Riba', 'Smrznuta riba i plodovi mora', 'Riba i plodovi mora'],
    Bezalkoholna_pića: ['Voda', 'Gazirana pića', 'Negazirana pića', 'Energetska pića', 'Izvorska voda', 'Gazirana voda', 'Voda s okusom', 'Negazirana voda', 'Negazirani sokovi', 'Gazirani sokovi', 'Praškasti napitci', 'VODA'],
    Alkoholna_pića: ['Pivo', 'Vino', 'Alkoholna pića', 'Žestoka pića', 'Kokteli', 'JAKA ALKOHOLNA PIĆA', 'Bijelo vino', 'PIVO', 'Crno vino', 'Rose', 'Pjenušava vina'],
    Umaci_i_začini: ['Proizvodi od rajčice', 'Kečap, senf, majoneza', 'Umaci', 'Začini i mješavine', 'Ketchup, majoneza, ajvar i senf', 'Začini', 'Ostali umaci', 'Ketchup, majoneza i senf'],
    Tjestenina_riža_i_njoki: ['Tjestenina', 'Riža', 'Njoki i punjena tjestenina', 'Tortilje', 'Riža i tjestenina', 'Njoki i tortellini', 'Njoki'],
    Njega_i_higijena: ['Toaletni papir', 'Ulošci, tamponi, intimna njega', 'Rupčići i vlažne maramice', 'Blazinice, štapići za uši, flasteri', 'Prezervativi i lubrikanti', 'Higijena ruku i zaštita', 'Sapuni', 'Kupke i gelovi za tuširanje', 'Dezodoransi', 'Kreme, mlijeka, losioni', 'Paste', 'Četkice', 'Električne četkice', 'Vodice, konci, ostalo', 'Šamponi', 'Regeneratori i tretmani', 'Boje za kosu', 'Styling', 'Kreme', 'Uklanjanje šminke', 'Njega usana', 'Brijanje i depilacija', 'Sredstva za zaštitu od sunca', 'Poklon setovi', 'Intimna njega', 'Njega lica i ruku', 'Njega kose', 'Njega tijela', 'Oralna higijena', 'Žileti i proizvodi za brijanje', 'Prezervativi', 'Njega lica i ruku', 'Njega tijela', 'Njega kose', 'Dentalna higijena', 'Intimna njega', 'Ostala njega', 'Tekući sapuni', 'Tvrdi sapuni', 'Šamponi', 'Boje za kosu', 'Regeneratori', 'Proizvodi za oblikovanje kose', 'Njega tijela', 'Tuširanje i kupanje', 'Dezodoransi za žene', 'Depilacija', 'Flasteri, štapići, vata', 'Njega lica', 'Njega usana', 'Dnevni ulošci', 'Higijenski ulošci', 'MUŠKA NJEGA', 'NJEGA ZUBI', 'PREZERVATIVI'],
    Kućni_ljubimci: ['Hrana', 'Pribor', 'Poslastice', 'Hrana za pse', 'Hrana za mačke', 'Psi', 'Mačke', 'Pas', 'Mačka', 'Ostali ljubimci', 'Oprema, kozmetika, igračke'],
    Konzervirana_hrana: ['Riblje konzerve', 'Paštete i mesni proizvodi', 'Gotova jela', 'Juhe', 'Kompoti', 'Ajvari i ostalo', 'Konzervirano povrće', 'Konzervirano voće', 'Konzervirana riba', 'Paštete i mesne konzerve', 'Riblje paštete', 'Konzervirana riba', 'Riblje konzerve i paštete', 'Temeljci'],
    Zdravo: ['Kruh, brašna, smjese', 'Pahuljice, namazi', 'Tjestenina, riža', 'Napitci, deserti, umaci', 'Keksi, krekeri, ostalo', 'Bio brašna i šećeri', 'Bio napitci i sokovi', 'Bio žitarice i sjemenke', 'Bio namazi', 'Vitamini', 'Ostali bio proizvodi', 'Deserti, vrhnja, voćne kašice', 'Krekeri', 'Snackovi', 'Sokovi', 'Bio, bez glutena, bez šećera, bez laktoze', 'Muesli, pahuljice, kaše', 'Vitamini i minerali', 'Čajevi i kave', 'Kruh, namazi, delikatesa']
};
