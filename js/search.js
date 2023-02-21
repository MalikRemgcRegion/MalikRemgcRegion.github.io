//search.js

var _steamid = window.location.hash.substr(1);

$.ajax({
   url: "https://raw.githubusercontent.com/MalikRemgcRegion/RemGC_DB/main/db/db.json",
	type:"get",
	dataType: 'text',  
	error: function(data){
	//debugger;
	  //alert('err');
	},
	success:function(data) {
		var data = JSON.parse( data );
		
		var profile_id, profile_time_stamp, profile_region;
		
		$.each(data, function (i) {				
			if(data[i].id === _steamid ){
				
				profile_id = data[i].id;
				profile_time_stamp = data[i].time_stamp; 
				profile_region = data[i].region;
			
			}
		});
		
		console.log(profile_id + "<br>\n" + profile_time_stamp + "<br>\n" + profile_region);
		//region changes 		
		//$( ".card-title.hopper_0" ).append( '<a href="https://steam-tracker.com/user/' +regionChanges[0].id+'/">'+regionChanges[0].id+'</a>' );
		//$( ".card-text.hopper_0" ).append( JSON.stringify(regionChanges[0].region) );
		//$( ".text-muted.hopper_0" ).append( Date(regionChanges[0].time_stamp) );
	}
});