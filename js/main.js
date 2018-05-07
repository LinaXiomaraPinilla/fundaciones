
    var places = [
     {"place":"Engativa", "lat": 6.2464544, "long": -75.5544695}
    ]


    var MapStyles = [
		{
			featureType: "all",
			stylers: [
				{ saturation: -90 }
			]
		}
	];
	
	var MapTypeColor = new google.maps.StyledMapType(MapStyles ,{name: "ANDIw"});
	var map;
	var MyLat = new google.maps.LatLng(4.598056, -74.075833);

		function initialize() {
		var myOptions = {
			zoom: 12,
			center: MyLat,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,//interfaz por defecto sin nada
			//Controles
			scrollwheel: false,
			panControl: true,
			zoomControl: true,
			mapTypeControl: false,
			scaleControl: true,
			streetViewControl: false,
			overviewMapControl: false,

			//Fin de controles
			scaleControlOptions: {
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL
				//position: google.maps.ControlPosition.TOP_CENTER
			},
			mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
				//style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				//style: google.maps.MapTypeControlStyle.DEFAULT
				//mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'color_maps']// listado de mapas de google
				position: google.maps.ControlPosition.BOTTOM_CENTER,
				mapTypeIds: ['color_maps']// listado de mapas de google
			}
			
			
			
			
		};
		// CREA EL OBJETO MAPA
		map = new google.maps.Map(document.getElementById("map"), myOptions);
		
		// ASOCIA EL TIPO DE COLOR DE MAPA A NOMBRE DEL MAPA ASIGNADO EN EL MAPATYPE ID
		map.mapTypes.set('color_maps', MapTypeColor);
		map.setMapTypeId('color_maps');
		
		//AGREGAR PUNTOS
		loadMarkers(myJSONObject, 'success', 0);
	}

	var geocoder;
	var markerNew = 1;
	var marker;
	var markersArray = [];
	var infowindow;
	
	function clearMarkers() {
		if (markersArray) {
			for (i in markersArray) {
				markersArray[i].setMap(null);
			}
			markersArray = [];
		}
	}
	
	function loadMarkers(data, textStatus, jqXHR){
		//alert(textStatus);
		if (textStatus == "success") {
			clearMarkers();
			for (i in data) {
				var marker = new google.maps.Marker({
					map: map,
					position: new google.maps.LatLng(data[i].lat, data[i].lon),
					icon: 'images/supermarket.png',
				    draggable:true,
				    animation: google.maps.Animation.DROP,

				});
				marker.setTitle('Punto ['+i.toString()+']');//mouse
				addInfo(marker, i, data[i]);//mensaje
			}
		} else {
			alert("Ha ocurrido un error al intentar obtener los marcadores para el programa. Por favor vuelva a intentarlo.");
		}
	}

	function addInfo(marker, number, info){
		desc = info.desc.split('<br>');
		lat = info.lat;
		lon =info.lon;

		contenido ='<div class="c-coffe bold">'+desc[0]+'</div><div class="c-green">'+desc[1]+'</div>';
		listado = '<div class="c-coffe bold">'+desc[0]+'</div><div class="c-green">'+desc[1]+'</div><a href="#!" onclick="getPoint('+lat+','+lon+')">Ver mapa</a><br> ';
		//contenido += '<div class="c-coffe bold margin-top-20">Ubicaci&oacute;n del punto:</div><div class="c-green"></div>';
		//contenido += '<div class="margin-top-20" style="text-align:center;"><a href="#!"><img src="<?=$template;?>images/verfotos.png" alt="Ver Fotos"></a></div>';
		var infowindow = new google.maps.InfoWindow({ 
			content: contenido,
			size: new google.maps.Size(200,100)
			});
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});

		$('.point-list').append(listado);

	}
	
	function getPlace(lat,lng){        
		var latLong = new google.maps.LatLng(lat, lng);
		map.setCenter(latLong);
		map.setZoom(12);
		$('.places-list').toggle();
	}

	function getPoint(lat,lng){        
		var latLong = new google.maps.LatLng(lat, lng);
		map.setCenter(latLong);
		map.setZoom(12);
		$('.point-list').toggle();
	}

	

$(window).load(function(){	
	$(places).each(function(){
		site = this;
		link = '<a href="#!" onclick="getPlace('+site.lat+','+site.long+')">'+site.place+'</a>';
		$('.places-list').append(link);
	});
});
