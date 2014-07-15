
$("#zsProduce").bind('DOMNodeInserted', function(e) {
	//console.log(e);

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

		    $.each($("#tb_0_zs tbody tr"), function(i,v) {
				var str = $(this).find("td:eq(-5)").text();
				var t_str = str.split("/");
				
				$(this).find("td:eq(-5)").attr('_order',parseFloat(t_str[0]));
			});

			//指定排序数据列
			var e = $("#tb_0_zs thead th");

			e.eq(-2).addClass('sort');
			e.eq(-3).addClass("sort");
		    e.eq(-4).addClass("sort");
		    e.eq(-5).addClass("sort");

			tableSort($('#tb_0_zs'),8);
		})();
	}

});
/*=========================================================*/
/**
* 我的资产->基金明细
**/
$("#tab0").bind('DOMNodeInserted', function(e) {

	if(e.target.id == "tb_0_0"){
		console.log('Ok'); //初始化
		
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

		    $.each($("#tb_0_0 tbody tr"), function(i,v) {
					var str = $(this).find("td:eq(-5)").text();
					var t_str = str.split("/");
					
					$(this).find("td:eq(-5)").attr('_order',parseFloat(t_str[0]));
			});

			//指定排序数据列
			var e = $("#tb_0_0 thead th");
			e.eq(-2).addClass('sort');
			e.eq(-3).addClass("sort");
		    e.eq(-4).addClass("sort");
		    e.eq(-5).addClass("sort");

			tableSort($('#tb_0_0'),8);

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

						console.log('list_loaded!');

						var a = $("#tab1 div:eq(-1)").attr('id'),
							b = a.replace('div','tb_');

						console.log(b);

						$("#"+b).addClass('j-custom');

						var c = $("#"+ b +' thead th');
						c.eq(-2).addClass('sort');
						c.eq(-3).addClass("sort");

						tableSort($("#"+b),6);
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

function tableSort(jqTableObj,colNum) {

	jqTableObj.find('thead th.sort').click(

		function(){
			//去除hideTr区域(基金列表)
			//$("#tb_0_0 .hideTr").remove();
			jqTableObj.find("tr.hideTr").remove();
			
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

			if (colNum){
				jqTableObj.find("tbody tr").after('<tr class="hideTr hide"><td colspan="'+colNum+'"></td></tr>');	
			}
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
