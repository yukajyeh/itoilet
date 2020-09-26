//to get Toilet Data
function getToilets() {
  return axios
  .get('/toilets/api')
}

async function initMap() {
  var myLatLng = {lat: 52.3569396, lng: 4.859902};

  var map = new google.maps.Map(document.getElementById('map'), {
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
      }
    })(marker));
  })

}

initMap()




  
