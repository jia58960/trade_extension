/**
* 交易查询>定投申请查询
**/
	window.setTimeout(function(){

		//定投申请查询
		var queryTbb3DetailFunc = (function(){
			
			var selector = $("#tbb-3");
			var opt = selector.find("table tbody tr:eq(0)").html();
			selector.find("table tbody tr:eq(0)").eq(0).remove();
			var opt = '<thead>' + opt + '</thead>';
			selector.find("table").prepend(opt).addClass('j-custom');
			
			$.each(selector.find("table tbody tr"), function(i,v) {
				var str = $(this).find("td:eq(1)").text();
				var st = ((new Date(str)).getTime())/1000;
				console.log(st);

				if (isNaN(st)) {
					st = 0;
				};

				$(this).find("td:eq(1)").attr('_order',st);
			});

			var b_th = selector.find("table thead th");
			b_th.eq(-3).addClass('sort');
			b_th.eq(1).addClass('sort');
			//$(".mctb.mt10 thead tr th:eq(1)").attr('dataType','text');

			tableSort(selector.find("table"));

		}());

		//定投确认查询
		var queryTbb4DetailFunc = (function(){

			var selector = $("#tbb-4");
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

				/*确认金额*/
				var c = $(this).find("td:eq(-4)").text();
				var d = c.replace('￥','');
				$(this).find("td:eq(-4)").attr('_order',d);

			});

			var b_th = selector.find("table thead th");
			b_th.eq(-3).addClass('sort');
			b_th.eq(0).addClass('sort');
			b_th.eq(-4).addClass('sort');
			b_th.eq(-5).addClass('sort');
			//$(".mctb.mt10 thead tr th:eq(1)").attr('dataType','text');

			tableSort(selector.find("table"));

		}());

		//基金分红查询
		var queryTbb4DetailFunc = (function(){

			var selector = $("#tbb-2");
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
			b_th.eq(-2).addClass('sort');
			b_th.eq(-1).addClass('sort');
			//$(".mctb.mt10 thead tr th:eq(1)").attr('dataType','text');

			tableSort(selector.find("table"));

		}());

		//交易确认查询
		var queryTbb4DetailFunc = (function(){

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

		}());

		//交易申请查询
		var queryTbb4DetailFunc = (function(){

			var selector = $("#tbb-0");
			var opt = selector.find("table tbody tr:eq(0)").html();
			selector.find("table tbody tr:eq(0)").eq(0).remove();
			var opt = '<thead>' + opt + '</thead>';
			selector.find("table").prepend(opt).addClass('j-custom');
			
			$.each(selector.find("table tbody tr"), function(i,v) {
				/*确认日期*/
				var a = $(this).find("td:eq(1)").text();
				var b = ((new Date(a)).getTime())/1000;
				console.log(b);
				
				if (isNaN(b)) {
					b = 0;
				};

				$(this).find("td:eq(1)").attr('_order',b);				

			});

			var b_th = selector.find("table thead th");
			b_th.eq(1).addClass('sort');
			b_th.eq(-3).addClass('sort');
			b_th.eq(-4).addClass('sort');
			
			//$(".mctb.mt10 thead tr th:eq(1)").attr('dataType','text');

			tableSort(selector.find("table"));

		}());

	},2000);


function tableSort (jqTableObj) {

	jqTableObj.find('thead th.sort').click(
		function(){

			var dataType = $(this).attr('dataType');
			var tableObj = $(this).closest('table');
			var index = tableObj.find('thead th').index(this) + 1;
			var arr = [];
			var row = tableObj.find('tbody tr');
			
			$.each(row, function(i){arr[i] = row[i]});
			
			if($(this).hasClass('current')){
				arr.reverse();
			} else {
				arr.sort(Utils.sortStr(index, dataType))
				
				tableObj.find('thead th').removeClass('current');
				$(this).addClass('current');
			}
			
			var fragment = document.createDocumentFragment();
			
			$.each(arr, function(i){
				fragment.appendChild(arr[i]);
			});
			
			tableObj.find('tbody').append(fragment);

		}
	);	
	
	var Utils = (function() {
		function sortStr(index, dataType){
			return function(a, b){
				var aText=$(a).find('td:nth-child(' + index + ')').attr('_order') || $(a).find('td:nth-child(' + index + ')').text();
				var bText=$(b).find('td:nth-child(' + index + ')').attr('_order') || $(b).find('td:nth-child(' + index + ')').text();
		
				if(dataType != 'text'){
					aText=parseNonText(aText, dataType);
					bText=parseNonText(bText, dataType);
					
					return aText > bText ? -1 : bText > aText ? 1 : 0;
				} else {
					return aText.localeCompare(bText)
				}
			}
		}
		
		function parseNonText(data, dataType){
			switch(dataType){
				case 'int':
					return parseInt(data) || 0
				case 'float':
					return parseFloat(data) || 0
				default :
				return filterStr(data)
			}
		}
		
		//过滤中文字符和$
		function filterStr(data){
			if (!data) {
				return 0;
			}
			
			return parseFloat(data.replace(/^[\$a-zA-z\u4e00-\u9fa5 ]*(.*?)[a-zA-z\u4e00-\u9fa5 ]*$/,'$1'));
		}
		
		return {'sortStr' : sortStr};
	})();
}