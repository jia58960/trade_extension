//排序方法
function tableSort(jqTableObj,colNum,rCN,aCN) {

	jqTableObj.find('thead th.sort').click(

		function(){
			
			if (rCN) jqTableObj.find("tr." + rCN).remove();
			
			var dataType = $(this).attr('datatype');
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

			if (colNum || aCN){
				jqTableObj.find("tbody tr").after('<tr class="'+aCN+'"><td colspan="'+colNum+'"></td></tr>');	
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
					return parseInt(data) || 0;
				case 'float':
					return parseFloat(data) || 0;
				case "date":
                	return Date.parse(data)/1000 || 0;
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

		return {'sortStr' : sortStr};

	})();
}

//需排序的列
function sortRowsFunc(selector, rows) {
	if (!selector) return;
	var s = selector;
	 for (var i = 0;i<rows.length;i++) {
	 	s.eq(rows[i]).addClass('sort');
	 }
}