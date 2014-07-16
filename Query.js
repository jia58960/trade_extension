/**
* 交易查询>定投申请查询
**/
	window.setTimeout(function(){
		//定投申请查询
		var queryTbb3DetailFunc = (function(){
			
			var selector = $("#tbb-3");
			queryDomFunc(selector, [0,1], '', 3, -2, '');

			var srotRows = [0,1,3,-2,-3];
			sortRowsFunc(selector.find("table thead th"),srotRows);

			tableSort(selector.find("table"));

		}());

		//定投确认查询
		var queryTbb4DetailFunc = (function(){

			var selector = $("#tbb-4");
			queryDomFunc(selector, [0], '', 2, '', -4);

			var srotRows = [0,2,-3,-4,-5];
			sortRowsFunc(selector.find("table thead th"),srotRows);

			tableSort(selector.find("table"));

		}());

		//基金分红查询
		var queryTbb4DetailFunc = (function(){

			var selector = $("#tbb-2");

			queryDomFunc(selector, [0], 3, 2, '', '');

			var srotRows = [0,2,3,-2,-1];
			sortRowsFunc(selector.find("table thead th"),srotRows);

			tableSort(selector.find("table"));

		}());

		//交易确认查询
		var queryTbb4DetailFunc = (function(){

			var selector = $("#tbb-1");

			queryDomFunc(selector, [0], 4, 2, '', -4);

			var srotRows = [0,2,4,-3,-4,-5];
			sortRowsFunc(selector.find("table thead th"),srotRows);

			tableSort(selector.find("table"));

		}());

		//交易申请查询
		var queryTbb4DetailFunc = (function(){

			var selector = $("#tbb-0");

			queryDomFunc(selector, [0,1], 5, 3, '', '');

			var srotRows = [0,1,-3,-4,-5];
			sortRowsFunc(selector.find("table thead th"),srotRows);
			
			tableSort(selector.find("table"));

		}());

	},2000);