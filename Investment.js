
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

			tableSort($('.mctb.mt10'));

		}());

	//},4000);