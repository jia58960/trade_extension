/*指数宝交易查询*/

window.setTimeout(function(){

	/*交易申请查询*/
	var zsbSqQuery = (function(){

		var selector = $("#tbb-0");
		var opt = selector.find("table tbody tr:eq(0)").html();
		selector.find("table tbody tr:eq(0)").eq(0).remove();
		var opt = '<thead>' + opt + '</thead>';
		selector.find("table").prepend(opt).addClass('j-custom');
		
		$.each(selector.find("table tbody tr"), function(i,v) {
			/*确认日期*/
			var a = $(this).find("td:eq(0)").text();
			var b = ((new Date(a)).getTime())/1000;
			console.log(b);
			
			if (isNaN(b)) {
				b = 0;
			};
			$(this).find("td:eq(0)").attr('_order',b);
		});

		var b_th = selector.find("table thead th");
		b_th.eq(0).addClass('sort');
		b_th.eq(-3).addClass('sort');
		b_th.eq(-4).addClass('sort');
		//$(".mctb.mt10 thead tr th:eq(1)").attr('dataType','text');

		tableSort(selector.find("table"));
	})();

	/*交易确认查询*/
	var zsbQrQuery = (function(){
		var selector = $("#tbb-1");
		var opt = selector.find("table tbody tr:eq(0)").html();
		selector.find("table tbody tr:eq(0)").eq(0).remove();
		var opt = '<thead>' + opt + '</thead>';
		selector.find("table").prepend(opt).addClass('j-custom');
		
		$.each(selector.find("table tbody tr"), function(i,v) {
			/*确认日期*/
			var a = $(this).find("td:eq(0)").text();
			var b = ((new Date(a)).getTime())/1000;
			console.log(b);
			
			if (isNaN(b)) {
				b = 0;
			};

			$(this).find("td:eq(0)").attr('_order',b);

			//确认金额
			var c = $(this).find("td:eq(-4)").text();
			var d = c.replace('￥','');
			$(this).find("td:eq(-4)").attr('_order',d);
			

		});

		var b_th = selector.find("table thead th");
		b_th.eq(0).addClass('sort');
		b_th.eq(-3).addClass('sort');
		b_th.eq(-4).addClass('sort');
		b_th.eq(-5).addClass('sort');
		//$(".mctb.mt10 thead tr th:eq(1)").attr('dataType','text');

		tableSort(selector.find("table"));
	})();

},2000);