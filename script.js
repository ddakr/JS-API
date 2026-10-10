/*
var form = document.querySelector('form')
form.addEventListener('submit', function(e) {
    e.preventDefault()
    console.log('test')
    var query = form.querySelector('input[name="query"]').value
 
    fetch('https://api.apileague.com/search-gifs?query=' + query + "&api-key=d539bc8594384e5880439c1de16c7451")
    .then(response => response.json())
    .then(data => {
        var result = document.querySelector('.result')
        result.innerHTML =''
        for (let item of data.images){
            let img = document.createElement('img')
            img.src = item.url
            img.width = item.width
            item.height = item.height
            result.append(img)
        }
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
})
*/
/*
async function fetchData(query) {
  const res = await fetch("https://nominatim.openstreetmap.org/search?q=" + query + "&format=json&limit=3");
  const data = await res.json();
  data.forEach(m => console.log(m.display_name, m.lat, m.lon));
}
const form = document.querySelector("form");   // 1. najdi formulář a ulož ho do proměnné

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const query = form.querySelector('input[name="tlacitko"]').value;
  fetchData(query);
});
*/
// 1) najdu si prvky na stránce
const form = document.querySelector("#vyhledavac");
const vstup = document.querySelector("#misto");
const vysledky = document.querySelector("#vysledky");
const sablona = document.querySelector("#sablona");
const zprava = document.querySelector("#zprava");

// 2) funkce, která se zeptá serveru a vykreslí výsledky
async function fetchData(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=" +
    encodeURIComponent(query) +
    "&gsrnamespace=6&prop=imageinfo&iiprop=url&iiurlwidth=300&format=json&origin=*";

  const res = await fetch(url);
  const data = await res.json();

  // vyčistím staré výsledky a hlášku
  vysledky.textContent = "";
  zprava.textContent = "";

  // když nic nenalezeno, data.query neexistuje
  if (!data.query) {
    zprava.textContent = "Nic nenalezeno.";
    return;
  }

  // pages je objekt, tak ho převedu na pole a seřadím podle relevance
  const auta = Object.values(data.query.pages).sort((a, b) => a.index - b.index);

  auta.forEach((item) => {
    const clone = sablona.content.cloneNode(true);   // otisk razítka
    const img = clone.querySelector("img");
    img.src = item.imageinfo[0].thumburl;            // zmenšená verze obrázku
    img.alt = item.title;
    clone.querySelector(".nazev").textContent = item.title;
    vysledky.append(clone);                          // nalepím na stránku
  });
}

// 3) po odeslání formuláře zavolám funkci s tím, co uživatel napsal
form.addEventListener("submit", function (e) {
  e.preventDefault();
  fetchData(vstup.value);
});