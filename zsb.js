/**
* 指数宝->基金明细
**/

//$("#mask").bind('DOMNodeInserted', function(e) {
	
	setTimeout(function(){
		console.log('指数宝首页');
		var ZsbDetailFunc = (function(){

			$("#ts1").addClass('j-custom'); //定义table标识符（样式用到）
		    
			$.each($("#ts1 tbody tr"), function(i,v) {
				var str = $(this).find("td:eq(-4)").text();
				var t_str = str.split("/");
				
				$(this).find("td:eq(-4)").attr('_order',parseFloat(t_str[0]));
				$(this).find("td:eq(1)").attr('_order',$(this).find("td:eq(1)").text());
			});

			//指定排序数据列
			var e = $("#ts1 thead th");
			e.eq(1).addClass('sort');
			e.eq(-2).addClass('sort');
			e.eq(-3).addClass("sort");
			e.eq(-4).addClass("sort");

			tableSort($('#ts1'),7);

		})();

	},4000);
	
//});