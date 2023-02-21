//getUser.js
$.ajax({
   url: "https://raw.githubusercontent.com/MalikRemgcRegion/RemGC_DB/main/db/db.json",
	type:"get",
	dataType: 'text',  
	error: function(data){
	//debugger;
	  //alert('err');
	},
	success:function(data) {
		
		var regionChanges = JSON.parse(data).sort((a, b) => a.time_stamp[a.time_stamp.length - 1]  - b.time_stamp[b.time_stamp.length - 1]);
		regionChanges = regionChanges.reverse();
		/*
		var data = JSON.parse( data );
		var regionChanges = data.sort((a, b) => {
		  if (a.time_stamp[a.time_stamp.length - 1] > b.time_stamp[b.time_stamp.length - 1]) {
			return -1;
		  }
		});
		*/
		var data = JSON.parse( data );
		var tophoppers = data.sort((a, b) => {
		  if (a.region.length > b.region.length) { 
			return -1;
		  }
		});
		
		//var tophoppers =  JSON.parse(data).sort((a, b) => a.region.length > b.region.length);
		
		//region changes 
		for (let i = 0; i < 6; i++) {
			
			$( ".rrc_view_profile_"+i ).attr("id",regionChanges[i].id);
			$( ".card-title.hopper_"+i ).append( '<a href="' + window.location.href +'?id=' +regionChanges[i].id+'">'+regionChanges[i].id+'</a>' );
			if(regionChanges[i].region[0] === null){
				//console.log(regionChanges[i].id +" => account doesn't own publisher api key appids.");	
			}else{
				for (let j = 0; j < regionChanges[i].region.length; j++) {
					//console.log(regionChanges[i].id+ " => " +regionChanges[i].region[j]);
				  $( ".card-text.hopper_"+i ).append('<img class="card-img-top" src="./assets/cc_flags/png_16px/'+regionChanges[i].region[j].toLowerCase()+'.png" alt="'+regionChanges[i].time_stamp[j]+'" title="'+regionChanges[i].time_stamp[j]+'" style="width:16px;height:16px;">');
				}
			}
			if(regionChanges[i].region.length > 1){
				$( ".text-muted.hopper_"+i ).append( new Date(regionChanges[i].time_stamp[regionChanges[i].time_stamp.length - 1] *1000).toString() );
			}else{
				$( ".text-muted.hopper_"+i ).append( new Date(regionChanges[i].time_stamp[0] *1000).toString() );
			}
		}
		
		//top hoppers
		for (let i = 0; i < 6; i++) {
			
			$( ".trh_view_profile_"+i ).attr("id",tophoppers[i].id);
			$( ".card-title.tophopper_"+i ).append( '<a href="' + window.location.href +'?id=' +tophoppers[i].id+'">'+tophoppers[i].id+'</a>' );
			if(tophoppers[i].region[0] === null){
				//console.log(tophoppers[i].id +" => account doesn't own publisher api key appids.");	
			}else{
				for (let j = 0; j < tophoppers[i].region.length; j++) {
					//console.log(tophoppers[i].id+ " => " +tophoppers[i].region[j]);
				  $( ".card-text.tophopper_"+i ).append('<img class="card-img-top" src="./assets/cc_flags/png_16px/'+tophoppers[i].region[j].toLowerCase()+'.png" alt="'+tophoppers[i].time_stamp[j]+'" title="'+tophoppers[i].time_stamp[j]+'" style="width:16px;height:16px;">');
				}
			}
			if(tophoppers[i].region.length > 1){
				$( ".text-muted.tophopper_"+i ).append( new Date(tophoppers[i].time_stamp[tophoppers[i].time_stamp.length - 1] *1000).toString() );
			}else{
				$( ".text-muted.tophopper_"+i ).append( new Date(tophoppers[i].time_stamp[0] *1000).toString() );
			}
		}
	}
});