document.addEventListener("DOMContentLoaded", function(event) {
    var findButton = document.getElementById('find__button');
    findButton.addEventListener("click", collectEventParams);
});

function loadEvents(city, start_date) {
    var request = new XMLHttpRequest();
   
    var url = 'https://www.eventbriteapi.com/v3/events/search/?start_date.range_start='+ start_date  +'&location.address='+ city + '&location.within=100km&expand=venue';
    request.open('GET', url);
    request.setRequestHeader('Authorization', 'Bearer BGFP7TFTU6LO445UNUUA');
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            var answer = JSON.parse(this.responseText)
            displayEvents(answer);
        }
    };
    request.send();
}

function displayEvents(content) {
    var eventsContent = document.getElementById('events__content');
    while (eventsContent.firstChild) {
        eventsContent.removeChild(eventsContent.firstChild);
    }
    console.log(content);
    content.events.forEach(function (event) {
        var cardBlock = document.createElement("div");
        cardBlock.className = "card-block px-6";
        
        // Title
        var title = document.createElement("h4");
        title.className = "card-title";
        title.innerHTML = event.name.text;
        
        // address
        var address = document.createElement("p");
        address.className = "card-text";
        if (event.venue != null) {
            address.innerHTML = event.venue.address.address_1;
        } else {
            address.innerHTML = "No Address";
        }
        
        var start_time = document.createElement("p");
        start_time.innerHTML = event.start.local;
        
        var end_time = document.createElement("p");
        end_time.innerHTML = event.end.local;


        // link button 
        var url = document.createElement("a");
        url.className = "mt-auto btn btn-primary ";
        url.innerHTML = "Find on Event Brite";
        url.href = event.url;



        // main card Block 
        cardBlock.appendChild(title);
        cardBlock.appendChild(address);
        cardBlock.appendChild(start_time);
        cardBlock.appendChild(end_time);
        cardBlock.appendChild(url);
        

        var contentBlock = document.createElement("div");
        contentBlock.className = "col-md-8 px-3";
        contentBlock.appendChild(cardBlock);

        // logo image Block 
        var logoImg = document.createElement("img");
        logoImg.className = "d-block";
        logoImg.src = event.logo.url;  // TODO if logo url is null 

        var imgBlock = document.createElement("div");
        imgBlock.className = "col-md-4";
        imgBlock.appendChild(logoImg)

        // description 
        var description  = document.createElement("p");
        description.className = "card-text";
        description.innerHTML = event.description.html;

        // description card-block 
        var descriptionCardBlock = document.createElement("div");
        descriptionCardBlock.className = "card-block px-6";
        descriptionCardBlock.appendChild(description);

        // description block 
        var descriptionBlock = document.createElement("div");
        descriptionBlock.className = "col-md-12";
        descriptionBlock.appendChild(descriptionCardBlock);

        // row 
        var row = document.createElement("div");
        row.className = "row";
        row.appendChild(contentBlock);
        row.appendChild(imgBlock);
        row.appendChild(descriptionBlock);

        // card 
        var card = document.createElement("div");
        card.className = "card";
        card.appendChild(row);

        

        eventsContent.appendChild(card);
    });
}

function collectEventParams(){
    var city = document.getElementById('city__select');
    console.log(city.value);
    var start_date = document.getElementById('start__date').value;
    start_date = new Date(start_date);
    start_date.setSeconds(0,0);
    start_date.setMilliseconds(0);
    start_date = start_date.toISOString();
    start_date = start_date.substring(0, start_date.length - 5);
    start_date += 'Z';
    console.log(start_date);
    loadEvents(city.value, start_date);
}
