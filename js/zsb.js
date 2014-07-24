/**
* 指数宝->基金明细
**/

//$("#mask").bind('DOMNodeInserted', function(e) {
	
	setTimeout(function(){

		console.log('指数宝首页');

		var ZsbDetailFunc = (function(){

			$("#ts1").addClass('j-custom'); //定义table标识符（样式用到）

			$("#ts1 > thead > tr >th:last").before("<th>收益率</th>");//新增收益率数据列	

			$("#ts1 > tbody > tr:even").each(function(){
		        var a = $(this).find("td:eq(4)").text(),
			        b = $(this).find("td:eq(5) span").text(),
			        c = ((Math.round((b/(a-b))*10000))/100),
			        d = 'green';
			        yield = c + "%";
			    
			    if(c>=0){
			    	d = 'red';
			    }
		        $(this).find("td:last").before('<td class="tar ' + d +'"><span class="n">' + yield + "</span></td>");
		    });

			//th列属性
	    	$("#ts1 > thead > tr >th:eq(-5)").attr("datatype","float");
	    	$("#ts1 > thead > tr >th:eq(-4)").attr("datatype","float");
	    	$("#ts1 > thead > tr >th:eq(-3)").attr("datatype","float");
	    	$("#ts1 > thead > tr >th:eq(-2)").attr("datatype","float");

			$.each($("#ts1 tbody tr"), function(i,v) {
				var str = $(this).find("td:eq(-5)").text();
				var t_str = str.split("/");
				
				$(this).find("td:eq(-5)").attr('_order',parseFloat(t_str[0]));
				$(this).find("td:eq(1)").attr('_order',$(this).find("td:eq(1)").text());
			});

			//指定排序数据列
			var sortRows = [1,-3,-2,-4,-5];
			sortRowsFunc($("#ts1 thead th"), sortRows);
			tableSort($('#ts1'),7,'hide','hide details');

		})();

	},4000);
	
//});