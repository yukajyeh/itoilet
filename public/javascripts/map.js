//to get Toilet Data
function getToilets() {
  return axios
  .get('/toilets')
}

async function initMap() {
  const myLatLng = {lat: 52.3569396, lng: 4.859902};

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: myLatLng
  });

  const response = await getToilets()
  const toilets = response.data
  var infowindow = new google.maps.InfoWindow();


  toilets.forEach(toilet => {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(toilet.location.coordinates[1], toilet.location.coordinates[0]),
      map: map,
    });
    google.maps.event.addListener(marker, 'click', (function(marker) {
      return function() {
        infowindow.setContent(toilet.location_name);
        infowindow.open(map, marker);
        const infoError = toilet.openings_time ? toilet.openings_time : 'x'
        const friendly = toilet.child_friendly == true ? "Yes" : "No"
        let commentsStr = ''
        
        if(toilet.comments && toilet.comments.length > 0){
        toilet.comments.forEach(comment => {
          commentsStr+= `
          <p>"${comment}"</p>
          `
        })
        }

        let imageStr=''
        if(toilet.imageUrl){
          imageStr+= `
          <img id='toilet-photo' src='${toilet.imageUrl}' alt='toilet-photo'>
          `
        }

        let str = ''
        str+= `
          <div class='toilet-box'>
              <div class="name"> 🚽 Location Name: ${toilet.location_name}</div>
              <div id="toilet-info">${imageStr}</div>
              <div class='toilet-photo'>
              <div class='price'> 🚽 Cost per Visit: ${toilet.price_per_use}</div>
              <div class='child-friendly'> 🚽 Is it Child Friendly? ${friendly}</div>
              <div class='time'> 🚽 Opening Time: ${infoError} </div>
              <button id='comment-button'><a href='/toilets/${toilet._id}'>Make a Comment</a></button>
              <button id='save-button'>Save as My Favorite</button>
              <div class='comments'>
              <h4>Reviews</h4>
              ${commentsStr}
               </div>
        </div>
        `
        document.getElementById('info-container').innerHTML= str
      }
    })(marker));
  })
}

function initialize() {
  var input = document.getElementById('location');
  new google.maps.places.Autocomplete(input);
}

initMap()
google.maps.event.addDomListener(window, 'load', initialize);




