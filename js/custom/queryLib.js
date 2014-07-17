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