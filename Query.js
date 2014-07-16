/**
* 交易查询>定投申请查询
**/
	window.setTimeout(function(){
		//定投申请查询
		var queryTbb3DetailFunc = (function(){
			
			var selector = $("#tbb-3");
			queryDomFunc(selector, [0,1], '', 3, -2, '');

			var srotRows = [0,1,3,-2,-3];
			sortRowsFunc(selector.find("table thead th"),srotRows);

			tableSort(selector.find("table"));

		}());

		//定投确认查询
		var queryTbb4DetailFunc = (function(){

			var selector = $("#tbb-4");
			queryDomFunc(selector, [0], '', 2, '', -4);

			var srotRows = [0,2,-3,-4,-5];
			sortRowsFunc(selector.find("table thead th"),srotRows);

			tableSort(selector.find("table"));

		}());

		//基金分红查询
		var queryTbb4DetailFunc = (function(){

			var selector = $("#tbb-2");

			queryDomFunc(selector, [0], 3, 2, '', '');

			var srotRows = [0,2,3,-2,-1];
			sortRowsFunc(selector.find("table thead th"),srotRows);

			tableSort(selector.find("table"));

		}());

		//交易确认查询
		var queryTbb4DetailFunc = (function(){

			var selector = $("#tbb-1");

			queryDomFunc(selector, [0], 4, 2, '', -4);

			var srotRows = [0,2,4,-3,-4,-5];
			sortRowsFunc(selector.find("table thead th"),srotRows);

			tableSort(selector.find("table"));

		}());

		//交易申请查询
		var queryTbb4DetailFunc = (function(){

			var selector = $("#tbb-0");

			queryDomFunc(selector, [0,1], 5, 3, '', '');

			var srotRows = [0,1,-3,-4,-5];
			sortRowsFunc(selector.find("table thead th"),srotRows);
			
			tableSort(selector.find("table"));

		}());

	},2000);

function queryDomFunc(s, dA, tA, tAL, tAS, r) {

	var selector = s;
	if (!selector) return;

	var opt = selector.find("table tbody tr:eq(0)").html();
	selector.find("table tbody tr:eq(0)").eq(0).remove();

	var opt = '<thead>' + opt + '</thead>';
	selector.find("table").prepend(opt).addClass('j-custom');
	
	if (dA) {

		for (var i = 0;i<dA.length;i++) {
			selector.find("table thead tr th:eq("+ dA[i] +")").attr('dataType','date');	
		}
	}

	if(tA || tAL || tAS || r) {
		$.each(selector.find("table tbody tr"), function(i,v) {
			
			//处理一般text
			if ((tA instanceof Array) === false) {
				$(this).find("td:eq("+ tA +")").attr('_order',$(this).find("td:eq(" + tA +")").text());
			} else {
				for (var j = 0;j<tA.length;j++){
					$(this).find("td:eq("+ tA[i] +")").attr('_order',$(this).find("td:eq(" + tA[i] +")").text());
				}
			}

			//处理含a链接的text
			if ((tAL instanceof Array) === false) {
				$(this).find("td:eq("+tAL+")").attr('_order',$(this).find("td:eq("+tAL+") a").text().trim());
			} else {
				for (var i = tAL.length - 1; i >= 0; i--) {
					$(this).find("td:eq("+tAL[i]+")").attr('_order',$(this).find("td:eq("+tAL[i]+") a").text().trim());
				};
			}
			
			//处理含span标签的text
			$(this).find("td:eq("+tAS+")").attr('_order',$(this).find("td:eq("+tAS+") span").text().trim());			

			//确认金额
			var c = $(this).find("td:eq("+r+")").text();
			var d = c.replace('￥','');
			$(this).find("td:eq("+r+")").attr('_order',d);

		});
	}
}