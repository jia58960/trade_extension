/*指数宝交易查询*/

window.setTimeout(function(){

	/*交易申请查询*/
	var zsbSqQuery = (function(){

		var selector = $("#tbb-0");
		queryDomFunc(selector, [0,1], 5, 3, -2, '');

		var srotRows = [0,1,3,-2,-3,-4,-5];
		sortRowsFunc(selector.find("table thead th"),srotRows);

		tableSort(selector.find("table"));
	})();

	/*交易确认查询*/
	var zsbQrQuery = (function(){
		var selector = $("#tbb-1");
		queryDomFunc(selector, [0], 4, 2, '', -4);

		var srotRows = [0,2,4,-3,-4,-5];
		sortRowsFunc(selector.find("table thead th"),srotRows);

		tableSort(selector.find("table"));
	})();

},2000);