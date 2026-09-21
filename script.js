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