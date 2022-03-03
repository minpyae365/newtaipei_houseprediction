function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }

  function getLRValue() {
    var uiLR = document.getElementsByName("uiLR");
    for(var i in uiLR) {
      if(uiLR[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var LR = getLRValue();
    var location = document.getElementById("uiLocations");
    var properties = document.getElementById("uiPropertyType");
    var materials = document.getElementById("uiMaterials");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
     var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
    //var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  
    $.post(url, {
        district: location.value,
        properties: properties.value,
        material: materials.value,
        Barea: parseFloat(sqft.value),
        livingR: LR,
        rooms: bhk,
        bath: bathrooms,
        
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " 臺幣</h2>";
        console.log(status);
    });
  }


function onPageLoad() {
    console.log( "document loaded" );
     var url = "http://127.0.0.1:5000/get_district_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    //var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var districts = data.Districts;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in districts) {
                var opt = new Option(districts[i]);
                $('#uiLocations').append(opt);
            }

            var Ptype = data.PropertyType;
            var uiPropertyType = document.getElementById("uiPropertyType");
            $('#uiPropertyType').empty();
            for(var i in Ptype) {
                var opt = new Option(Ptype[i]);
                $('#uiPropertyType').append(opt);
            }  
                
            var materials = data.Materials;
            var uiMaterials = document.getElementById("uiMaterials");
            $('#uiMaterials').empty();
            for(var i in materials) {
                var opt = new Option(materials[i]);
                $('#uiMaterials').append(opt);
            }
        }
    });
  }


window.onload = onPageLoad;