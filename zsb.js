//$("#mask").bind('DOMNodeInserted', function(e) {
	
	/**
	* 指数宝->基金明细
	**/
	setTimeout(function(){
		console.log('指数宝首页');
		var ZsbDetailFunc = (function(){

			$("#ts1").addClass('j-custom'); //定义table标识符（样式用到）

			//指定排序数据列
			var e = $("#ts1 thead th");
			e.eq(-2).addClass('sort');
			e.eq(-3).addClass("sort");
			e.eq(-4).addClass("sort");
		    
			$.each($("#ts1 tbody tr"), function(i,v) {
				var str = $(this).find("td:eq(-4)").text();
				var t_str = str.split("/");
				
				$(this).find("td:eq(-4)").attr('_order',parseFloat(t_str[0]));
			});

			tableSort($('#ts1'),7);

		})();

	},4000);
	
//});

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