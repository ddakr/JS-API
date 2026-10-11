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

const form = document.querySelector("#vyhledavac");
const vstup = document.querySelector("#auto-vyhledavac");
const vysledky = document.querySelector("#vysledky");
const sablona = document.querySelector("#sablona");
const zprava = document.querySelector("#zprava");


async function fetchData(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=" +
    encodeURIComponent(query) +
    "&gsrnamespace=6&prop=imageinfo&iiprop=url&iiurlwidth=300&format=json&origin=*";

  const res = await fetch(url);
  const data = await res.json();

  vysledky.textContent = "";
  zprava.textContent = "";

  if (!data.query) {
    zprava.textContent = "Nic nenalezeno.";
    return;
  }

  const auta = Object.values(data.query.pages).sort((a, b) => a.index - b.index);

  auta.forEach((item) => {

  let nazev = item.title.replace("File:", "");          
  nazev = nazev.slice(0, nazev.lastIndexOf("."));       

  const clone = sablona.content.cloneNode(true);
  const img = clone.querySelector("img");
  img.src = item.imageinfo[0].thumburl;
  img.alt = nazev;
  clone.querySelector(".nazev").textContent = nazev;
  vysledky.append(clone);
});
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  fetchData(vstup.value);
});

