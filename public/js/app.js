console.log("hey there we are loading App.js loaded");

var lastRequestedAddress = '';
var restaurant_latitude;
var restuarant_longitude;
$(document).ready(function() {
    console.log("ready!");


    
    //this spins the pizza
   // $('.logo').on('mouseenter', event => {
       

    var decline_responses = ["Next!", "Another One Please."];
    // these will execute when the page is loaded
    // to randomize the decline button message
    $('#new-restaurant').html(decline_responses[Math.floor(Math.random() * decline_responses.length)]);
    // to hide the result of the restuarant, 
    // for it to be displayed after the button is clicked
   $('.restaurant-results').show();
    // the map direction is hidden
    $('#new-direction').show();
    // the map is hidden
    $('#map').show();
    // hide the menu url
    $('#additional-content').show();
    
    
    //jQuery code to create change page 
    // on click for the decline button, reload the page and 
    // re-execute the script
    $('#new-restaurant').on('click', function() {
        location.reload();
    });

    // if the user clicks on getting the direction
    // show the map, and animate by scrolling down for the user
    // and show the map
    $('#get-direction').on('click', function() {
        console.log('The last requested address was ' + lastRequestedAddress);
        $('#map').show();
        
        /* scroll down to the map */
        $('html,body').animate({scrollTop: $('#map').offset().top});
        
        var map = new google.maps.Map(document.getElementById('map'), { zoom: 15 });
        
        var geocoder = new google.maps.Geocoder();
        
        geocodeAddress(lastRequestedAddress, geocoder, map);
    });

  /*  $('#pizza').on('click', function() {
        $('#restaurant-info').show();
        $('#additional-content').show();
        $('#new-direction').show();
        // $('#map').show(); // happens through lines 24-26
    });*/
    
    //this makes the pizza enlarge when mouse hovers over it 
    $('#pizza').mouseenter(function() {
       $(this).css("cursor","pointer");
       $(this).animate({width: "25%", height: "25%"}, 'slow');
    });

    $('#pizza').mouseleave(function() {   
    $(this).animate({width: "28%"}, 'slow');
    });
     
    // query items list
    var query_list = ["pizza", "chinese", "italian", "ramen", "bbq", "mediterranean", "mexican"];
    // get a random item from the list
    var random_item = query_list[Math.floor(Math.random() * query_list.length)];

    console.log("q= Parameter for URL: " + random_item);
    // for query_list subscript selection only
    // create a better randomizer
    // generate a random variable up the amount inside the parameter
    var url_count_variable = Math.floor(Math.random() * 20);
    console.log("Count Paramater for URL: " + url_count_variable);
    // then randomize the pages
    // generate the start parameter for the url -- 
    // to be up to or lower than the count variable, randomly
    var url_start_variable = Math.floor(Math.random() * url_count_variable);
    console.log("Start Parameter for URL: " + url_start_variable);
    // place our inputs into the url for the paramaters, for the ajax request
    var url = "https://developers.zomato.com/api/v2.1/search?entity_id=277&entity_type=city&q=" + random_item + "&start=" + url_start_variable.toString() + "&count=" + url_count_variable.toString();

    console.log(url);
    // ajax request
    $.ajax({
        url: url,
        success: function(data) {
            console.log("Yay we made a request");
            console.log("data for restuarants");
            console.log(data);

            // changed the restaurant variable name - to src - Efrain

            var src = data.restaurants[url_start_variable].restaurant;
            // using this in order to avoid using $.each()
            console.log("Restaurant Data: " + src);
            console.log("ID through object..... " + src.id);
            var name = src.name;
            
            var address = src.location.address;
            console.log(src.location);
            var cuisine_type = src.cuisines;
            var web_address = src.url;
            restaurant_latitude = src.location.latitude;
            restaurant_longitude = src.location.longitude;
            
            var local_area = src.location.locality;
            var menu_link = src.menu_url;
            menu_link = menu_link.toString();
            var more_images = src.photos_url;
            more_images = more_images.toString();
            console.log("THIS is the url for the restaurant's url: " + menu_link);
            
            
            
            // new script
            // having issues with assigning this data and logging it
            // returns an int
            // range is 1-5
            var price = src.price_range;
            console.log("The price range for the restaurant is: " + price.toString() + "/5"); // this should display the price range
            var featured_thumb_url = src.thumb; // a featured image url
            featured_thumb_url = featured_thumb_url.toString();
            console.log(featured_thumb_url); // this should display the img url
            console.log(name + " Latitude is " + restaurant_latitude + " and Longitude is " + restaurant_longitude);
            console.log(name);
            console.log(address);
            
            
            lastRequestedAddress = address;



            console.log("OBJECT INFORMATION");
            console.log("iterating through restaurants");
            //var price_response_list = ["Pretty cheap! You're spotting me this time, right?", "Reasonably priced, man!", "So let's live it up a bit!", "Might need to break open the piggy bank! lol", ""];
            
            //var response = price_response_list[Math.floor(Math.random() * price_response_list.length)];
            

            // https://www.google.com/maps.google.com/?ll=latitude,longitude

            //adds only the html needed for the restaurant selected by the..
            // url_start_variable..
            $('#restaurant-info').html("<div class='restaurant-item col-1'><h3 class='restaurant-name'>" + name + "</h3><div class='meta'><span class='restaurant-address'>" + address + "</span><br/><span class='restaurant-locality'><h5>It's in the " + local_area + " area.</h5></span><br/><span class='cuisines-type'></br><h5>They Serve: " + cuisine_type + "</h5></span><br/><span class='url'></br><a href='" + web_address + "'>Listing</a></span><br/></div></div>");
            
            $('#additional-content').html("<div class='menu-url'><h3>Check out the menu!</h3><div class='meta'><span class='url'><br/><a href=" + "'" + menu_link + "'" +">Go to see the menu!</a></span><br/></div></div><br/>");
            
            $('#additional-content').append("<div class='thumbnail'><h3>Featured Image</h3><div class='meta'><span class='thumb-img'><img class='thumbnail-image' src=" + "'" +  featured_thumb_url + "'"  + "></span><br/></div></div>");
            
            $('#additional-content').append("<div class='gallery-link'><h3>More Imagese</h3><div class='meta'><span class='url'><br/><a href=" + "'" + more_images + "'" +">Want to see more photos?</a></span><br/></div></div><br/>");
            
            $('#additional-content').append("<div class='price-info'><h3>How much $ are we talkin?</h3><div class='meta'><span class='price-range'><h4>On a scale of 1 to 5 - their prices are a " + price + ".</h4></span></div></div><br/>");
            // assigns the thumb url to the id of image-content in restaurant-mapper.html
            // $('#restaurant-info').append("<img src=" + featured_thumb_url + "/>");
            // ex:
            // $("#theDiv").append("<img id='theImg' src='theImg.png'/>");
            




        },
        error: function() {
            console.log("We had an error. Oh noes!");
        },
        complete: function() {
            console.log("Yay we completed a request");
        },
        beforeSend: function(xhr) {
            console.log("Before making a request, I will send something into the server.");
            xhr.setRequestHeader('user-key', 'cafbd7285067be4e47e20efd695202fb');

        }
    });



      
var map, contentString, user_pos;

      function initMap() {
        var restaurant_position = new google.maps.LatLng({lat: restaurant_latitude, lng: restuarant_longitude});
        
        console.log(restaurant_position);
        map = new google.maps.Map(document.getElementById('map'), {
          center: restaurant_position,
          zoom: 6
        });
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            console.log("Yes we have geolocation");
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            // convert to instances of latlng
            //ex: myLatLng = new google.maps.LatLng({lat: -34, lng: 151});
            user_pos = new google.maps.LatLng(pos);
        
            /* Assign the contentString to the infowindow declared above */
            
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          console.log("no we don't have geolocation");
          handleLocationError(false, infoWindow, map.getCenter());
        }
        // find a way to place the latlng parameters inside of the 
        // google maps url
         
            
        }

    });
    
// function to place marker -- instantiate a marker
/*
function placeMarker(latlong) {
    new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });
}*/


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        console.log("There was an error with Geolocation -- handleLocationError was executed.");
        infoWindow.open(map);
}      
      
// gt a geocoded address
function geocodeAddress(address, geocoder, resultsMap) {
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
            marker.addListener('click', function() {
            infowindow.open(map, marker);
            });

        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
    });
}


