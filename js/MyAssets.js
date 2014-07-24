/**
* 我的资产->指数宝基金明细
**/
$("#zsProduce").bind('DOMNodeInserted', function(e) {

	if (e.target.id == "tb_0_zs") {

		console.log('zsok');

		var zsDetailFunc = (function(){
			$("#tb_0_zs").addClass('j-custom'); //定义table标识符（样式用到）
			$("#tb_0_zs > thead > tr >th:last").before("<th>收益率</th>");//新增收益率数据列

			$("#tb_0_zs > tbody > tr:even").each(function(){

		        var a = $(this).find("td:eq(5) span").text(),
			        b = $(this).find("td:eq(6) span").text(),
			        c = ((Math.round((b/(a-b))*10000))/100),
			        d = 'green';
			        yield = c + "%";
			    if(c>=0){
			    	d = 'red';
			    }
		        $(this).find("td:last").before('<td class="tar ' + d +'"><span class="n">' + yield + "</span></td>");

		    });

		    $("#tb_0_zs > thead > tr >th:eq(4)").attr("datatype","float"); 
		    $("#tb_0_zs > thead > tr >th:eq(-3)").attr("datatype","float");
		    $("#tb_0_zs > thead > tr >th:eq(-2)").attr("datatype","float");
		    $("#tb_0_zs > thead > tr >th:eq(-4)").attr("datatype","float");

		    $.each($("#tb_0_zs tbody tr"), function(i,v) {

				/*var str = $(this).find("td:eq(-5)").text();
				var t_str = str.split("/");
				
				$(this).find("td:eq(-5)").attr('_order',parseFloat(t_str[0]));*/

				$(this).find("td:eq(1)").attr('_order',$(this).find("td:eq(1) a").text().trim()); //基金名称_order值
				$(this).find("td:eq(2)").attr('_order',$(this).find("td:eq(2)").text()); //基金类型_order值
			});

			//指定排序数据列
		    var sortRows = [1,2,-2,-3,-5,-4];
			sortRowsFunc($("#tb_0_zs thead th"), sortRows);

			tableSort($('#tb_0_zs'),8,'hideTr','hideTr hide');
		})();

	}

});

/*=========================================================*/

/**
* 我的资产->基金明细
**/
$("#tab0").bind('DOMNodeInserted', function(e) {

	if(e.target.id == "tb_0_0"){
		
		var fundDetailFunc = (function(){
			$("#tb_0_0").addClass('j-custom'); //定义table标识符（样式用到）
			$("#tb_0_0 > thead > tr >th:last").before("<th>收益率</th>");//新增收益率数据列	

			$("#tb_0_0 > tbody > tr:even").each(function(){
		        var a = $(this).find("td:eq(5) span").text(),
			        b = $(this).find("td:eq(6) span").text(),
			        c = ((Math.round((b/(a-b))*10000))/100),
			        d = 'green';
			        yield = c + "%";
			    if(c>=0){
			    	d = 'red';
			    }
		        $(this).find("td:last").before('<td class="tar ' + d +'"><span class="n">' + yield + "</span></td>");
		    });

			$("#tb_0_0 > thead > tr >th:eq(-2)").attr("datatype","float");
			$("#tb_0_0 > thead > tr >th:eq(-3)").attr("datatype","float");
			$("#tb_0_0 > thead > tr >th:eq(-4)").attr("datatype","float");
			$("#tb_0_0 > thead > tr >th:eq(-5)").attr("datatype","float");
			
		    $.each($("#tb_0_0 tbody tr"), function(i,v) {
				var str = $(this).find("td:eq(-5)").text();
				var t_str = str.split("/");
				
				$(this).find("td:eq(-5)").attr('_order',parseFloat(t_str[0]));
				$(this).find("td:eq(1)").attr('_order',$(this).find("td:eq(1) a").text().trim());
				$(this).find("td:eq(2)").attr('_order',$(this).find("td:eq(2)").text());
			});

			//指定排序数据列

		    var sortRows = [1,2,-2,-3,-5,-4];
			sortRowsFunc($("#tb_0_0 thead th"), sortRows);

			tableSort($('#tb_0_0'),8,'hideTr','hideTr hide');
			
		})();
	}
});

/*=========================================================*/

/**
* 我的资产->基金明细(按银行卡显示)
**/
	var fundSortByBankFunc = (function(){
		$("#sortBy li:eq(-1)").click(function() {
			setTimeout(function(){
				//$("#tab1").bind("DOMNodeInserted", function(e){
					
					//if(e.target.className = "wss"){

						var a = $("#tab1 div:eq(-1)").attr('id'),
							b = a.replace('div','tb_');

						
						$("#"+b).addClass('j-custom');

						$.each($("#" +b +" tbody tr"), function(i,v) {
							$(this).find("td:eq(1)").attr('_order',$(this).find("td:eq(1)").text());
							$(this).find("td:eq(2)").attr('_order',$(this).find("td:eq(2)").text());
						});

						var sortRows = [1,2,-2,-3];
						sortRowsFunc($("#"+ b +' thead th'), sortRows);

						tableSort($("#"+b),6,'hideTr','hideTr hide');
					//}
				//});
				
			},3000);
		});

	})();

/*=========================================================*/
/**
* 总收益率测算
**/
setTimeout(function(){

	var allYieldFunc = (function(){
		
		var all_value = parseFloat($("#all_value").text()),
			fund_benifit = parseFloat($("#fund_benifit").text()),
			zs_benifit = parseFloat($("#zs_benifit").text()),
			fixedprofit = parseFloat($("#fixedprofit").text()),
			TiantianCashBag_benifit = parseFloat($("#TiantianCashBag_benifit").text()),
			a = 'green';

		var all_benifit = fund_benifit + fixedprofit + zs_benifit + TiantianCashBag_benifit,
			all_yield = ((Math.round((all_benifit/(all_value-all_benifit))*10000))/100),
			ROA = all_yield + "%";

		if(all_yield>=0){
			a = 'red';
		}

		//拼接DOM
		var b = '<span class="product_name f14" style="text-align: right; width: 141px;">总收益率<em class="f12">：</em></span>',
			c = '<span class="product_value" style="width: auto; padding-left: 3px;"><em id="all_value" class="f20"><span class="'+ a +'">' + ROA +'</span></em></span>'

		$(".asset_all .clear").append(b+c);
	})();
},3000);
