
	//window.setTimeout(function(){
		//setTimeout('__doPostBack(\'ctl00$body$ddAPagerPageSize\',\'3\')', 2000);
		//$("#ctl00_body_ddAPagerPageSize option[value='10']").attr("selected", false);
		//$("#ctl00_body_ddAPagerPageSize option[value='100']").attr("selected", true);
		//$("#ctl00_body_ddAPagerPageSize").change();
		//window.location.reload();
		var fixedFundDetailFunc = (function(){

			var opt = $(".mctb.mt10 tbody tr").eq(0).html();
			$(".mctb.mt10 tbody tr").eq(0).remove();
			var opt = '<thead>' + opt + '</thead>';
			$(".mctb.mt10").prepend(opt).addClass('j-custom');

			$.each($(".mctb.mt10 tbody tr"), function(i,v) {
				var str = $(this).find("td:eq(-3)").text();
				var t_str = str.substring(0,10);
				var st = -((new Date(t_str.replace(/-/g,'/'))).getTime())/1000;

				if (isNaN(st)) {
					st = 0;
				};

				$(this).find("td:eq(-3)").attr('_order',st);
				$(this).find("td:eq(1)").attr('_order',$(this).find("td:eq(1)").text());
			});

			var b_th = $(".mctb.mt10 thead th");
			b_th.eq(-3).addClass('sort');
			b_th.eq(1).addClass('sort');
			b_th.eq(3).addClass('sort');
			//$(".mctb.mt10 thead tr th:eq(1)").attr('dataType','text');

			tableSort($('.mctb.mt10'));

		}());

	//},4000);
	
function tableSort(jqTableObj) {

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
					return parseInt(data) || 0;
				case 'float':
					return parseFloat(data) || 0;
				case "string":
				default :
                {
                    var tdVal = data.toString() || "";
                    //如果值不为空，获得值是汉字的全拼
                    if (tdVal) {
                        tdVal = ZhCN_Pinyin.GetQP(tdVal);
                        tdVal = tdVal.toLowerCase();
                        //console.log(tdVal);
                    }
                    return tdVal;
                }
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