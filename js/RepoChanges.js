$.ajax({
	url: 'https://api.github.com/repos/MalikRemgcRegion/RemGC_DB/commits',
	beforeSend: function (xhr) {
		xhr.setRequestHeader ("Accept: application/vnd.github.v3+json");
	},
	dataType: 'jsonp',	
	success: function(data){
		console.log(data.data[0].sha);
		$.ajax({
			url: 'https://api.github.com/repos/MalikRemgcRegion/RemGC_DB/commits/'+data.data[0].sha,

			dataType: 'jsonp',
			success: function(data){
				console.log(data.data.files[0].patch);
				$( ".commit_0" ).append( "<h4>" +data.data.files[0].filename+ '</h4><pre  style="font-size:66%;"><xmp>' + data.data.files[0].patch + '</xmp><pre>' );
			}
		});
		
		$.ajax({
			url: 'https://api.github.com/repos/MalikRemgcRegion/RemGC_DB/commits/'+data.data[0].parents[0].sha,
			dataType: 'jsonp',
			success: function(data){
				console.log(data.data.files[0].patch);
				$( ".commit_1" ).append( "<h4>" +data.data.files[0].filename+ '</h4><pre  style="font-size:66%;"><xmp>' + data.data.files[0].patch + '</xmp><pre>' );
			}
		});
	}
});