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

// init google chart
// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

function drawChart(idx, priceHistory){
	// Create the data table.
	var data = new google.visualization.DataTable();
	data.addColumn('string', '月份');
	data.addColumn('number', '價格');
	
	data.addRows(priceHistory);
	
	// Set chart options
	var options = {
		height: 300,
		title: '歷史價格',
		legend: { position: 'bottom' }
	};
	
	var chart = new google.visualization.LineChart(document.getElementById('chart'+idx));
	
	chart.draw(data, options);
}

$(document).ready(function() {
	$('#get-json').on('click', function () {
		$.getJSON("http://www.json-generator.com/api/json/get/cjRjLrFgRK?indent=2")
		.done(function(data) {
			console.log("load success");
			$('.items-wrapper').empty();
			$.each( data, function( i, item ) {
				$("<div>").addClass("col-xs-12 col-sm-6 col-md-4 item-block item-block"+i).appendTo(".items-wrapper");
				$("<img>").attr( "src", item.picture ).appendTo( ".item-block"+i );
				$("<p>").html( item.name ).appendTo( ".item-block"+i );
				$("<p>").html( item.price ).appendTo( ".item-block"+i );
				$("<div>").html("歷史紀錄").addClass("btn btn-default show-chart").appendTo( ".item-block"+i );
				tmp = $("<div>").addClass("row chart-wrapper").appendTo(".item-block"+i);
				$("<div>").attr('id', 'chart'+i).addClass("col-xs-12").html("123").appendTo(tmp);
				var priceHistory = new Array();
				$.each(item.historys, function(idx, monthPrice) {
					priceHistory.push([ (monthPrice.month+1) + '月', monthPrice.price]);
				});
				drawChart(i, priceHistory);
				console.log(i);
			});
			$('.chart-wrapper').hide();
		});
	});
	$('body').on('click', '.show-chart', function() {
		console.log("click");
		$(this).next().slideToggle();
	});
	$('#test-tour').on('click', function() {
		tour.init(true);
		tour.start(true);
	});
	tour.init();
	tour.start();
});