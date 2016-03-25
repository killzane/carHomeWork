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

function drawChart(chartArea, priceHistory) {
	chartArea.CanvasJSChart({
		title: {
			text: "歷史紀錄"
		},
		axisY: {
			title: "價格",
			includeZero: false
		},
		axisX: {
			interval: 1
		},
		data: [
		{
			type: "line", //try changing to column, area
			toolTipContent: "{label}: {y} NTD",
			dataPoints: priceHistory
		}
		]
	});
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
				chartArea = $("<div>").attr('id', 'chart'+i).addClass("col-xs-12").appendTo(tmp);
				var priceHistory = new Array();
				$.each(item.historys, function(idx, monthPrice) {
					priceHistory.push({ label: (monthPrice.month+1) + '月',  y: monthPrice.price });
				});
				drawChart(tmp, priceHistory)
				console.log(priceHistory);
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