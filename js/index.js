// Instance the tour
var tour = new Tour({
	steps: [
		{
			element: "#get-json",
			title: "第一步",
			content: "點我抓取商品資料",
			placement: "bottom",
			backdrop: true
		}
	]
});

$(document).ready(function() {
	$('#get-json').on('click', function () {
		$.getJSON("http://www.json-generator.com/api/json/get/ccStEUmUzm?indent=2")
		.done(function(data) {
			console.log("load success");
			$('.items-wrapper').empty();
			console.log(data);
			$.each( data, function( i, item ) {
				$("<div>").addClass("col-xs-12 col-sm-6 col-md-4 item-block item-block"+i).appendTo(".items-wrapper");
				$("<img>").attr( "src", item.picture ).appendTo( ".item-block"+i );
				$("<p>").html( item.name ).appendTo( ".item-block"+i );
				$("<p>").html( item.price ).appendTo( ".item-block"+i );
				console.log(i);
			});
		});
	});
	$('#test-tour').on('click', function() {
		tour.init(true);
		tour.start(true);
	});
	tour.init();
	tour.start();
});