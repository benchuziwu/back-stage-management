/*图片上传开始*/
function previewImage(file) {
	var MAXWIDTH = 260;
	var MAXHEIGHT = 180;
	var div = document.getElementById('preview');
	if (file.files && file.files[0]) {
		div.innerHTML = '<img id=imghead>';
		var img = document.getElementById('imghead');
		img.onload = function() {
			var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
			img.width = rect.width;
			img.height = rect.height;
			//                 img.style.marginLeft = rect.left+'px';
			img.style.marginTop = rect.top + 'px';
		}
		var reader = new FileReader();
		reader.onload = function(evt) {
			img.src = evt.target.result;
		}
		reader.readAsDataURL(file.files[0]);
	} else //兼容IE
	{
		var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
		file.select();
		var src = document.selection.createRange().text;
		div.innerHTML = '<img id=imghead>';
		var img = document.getElementById('imghead');
		img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
		var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
		status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
		div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
	}
}

function clacImgZoomParam(maxWidth, maxHeight, width, height) {
	var param = {
		top: 0,
		left: 0,
		width: width,
		height: height
	};
	if (width > maxWidth || height > maxHeight) {
		rateWidth = width / maxWidth;
		rateHeight = height / maxHeight;

		if (rateWidth > rateHeight) {
			param.width = maxWidth;
			param.height = Math.round(height / rateWidth);
		} else {
			param.width = Math.round(width / rateHeight);
			param.height = maxHeight;
		}
	}

	param.left = Math.round((maxWidth - param.width) / 2);
	param.top = Math.round((maxHeight - param.height) / 2);
	return param;
}
/*图片上传结束*/

var myChart = echarts.init(document.getElementById('main'));
option = {
	title: {
		text: '某站点用户访问来源',
		subtext: '纯属虚构',
		x: 'center'
	},
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},
	legend: {
		orient: 'vertical',
		left: 'left',
		data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
	},
	series: [{
		name: '访问来源',
		type: 'pie',
		radius: '55%',
		center: ['50%', '60%'],
		data: [{
			value: 335,
			name: '直接访问'
		}, {
			value: 310,
			name: '邮件营销'
		}, {
			value: 234,
			name: '联盟广告'
		}, {
			value: 135,
			name: '视频广告'
		}, {
			value: 1548,
			name: '搜索引擎'
		}],
		itemStyle: {
			emphasis: {
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowColor: 'rgba(0, 0, 0, 0.5)'
			}
		}
	}]
};
myChart.setOption(option);

var myChart1 = echarts.init(document.getElementById('second'));
option1 = {
	tooltip: {
		trigger: 'axis',
		axisPointer: { // 坐标轴指示器，坐标轴触发有效
			type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
		}
	},
	legend: {
		data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: [{
		type: 'category',
		data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
	}],
	yAxis: [{
		type: 'value'
	}],
	series: [{
		name: '直接访问',
		type: 'bar',
		data: [320, 332, 301, 334, 390, 330, 320]
	}, {
		name: '邮件营销',
		type: 'bar',
		stack: '广告',
		data: [120, 132, 101, 134, 90, 230, 210]
	}, {
		name: '联盟广告',
		type: 'bar',
		stack: '广告',
		data: [220, 182, 191, 234, 290, 330, 310]
	}, {
		name: '视频广告',
		type: 'bar',
		stack: '广告',
		data: [150, 232, 201, 154, 190, 330, 410]
	}, {
		name: '搜索引擎',
		type: 'bar',
		data: [862, 1018, 964, 1026, 1679, 1600, 1570],
		markLine: {
			lineStyle: {
				normal: {
					type: 'dashed'
				}
			},
			data: [
				[{
					type: 'min'
				}, {
					type: 'max'
				}]
			]
		}
	}, {
		name: '百度',
		type: 'bar',
		barWidth: 5,
		stack: '搜索引擎',
		data: [620, 732, 701, 734, 1090, 1130, 1120]
	}, {
		name: '谷歌',
		type: 'bar',
		stack: '搜索引擎',
		data: [120, 132, 101, 134, 290, 230, 220]
	}, {
		name: '必应',
		type: 'bar',
		stack: '搜索引擎',
		data: [60, 72, 71, 74, 190, 130, 110]
	}, {
		name: '其他',
		type: 'bar',
		stack: '搜索引擎',
		data: [62, 82, 91, 84, 109, 110, 120]
	}]
};
myChart1.setOption(option1);

$(function() {

	$('input[type=file]').on('click', function() {
		$('#preview').show();
	})

	/*获取下拉列表的value值开始     实现每页显示N个内容开始*/
	/*初始化列表值*/
	$('.table1').css({
		"height": 420,
		'overflow': 'hidden'
	});
	var tr = $('.table1 tr').length;
	$("select[name=search-sort]").change(function() {
		var tiaoshu = $("#select option:selected").text();
		var pageSize = tiaoshu; //每页显示的记录条数
		alert(pageSize)
		var curPage = 0;
		var lastPage;
		var direct = 0;
		var len;
		var page;

		len = $(".table1 tr").length;
		page = len % pageSize == 0 ? len / pageSize : Math.floor(len / pageSize) + 1; //根据记录条数，计算页数
		//  alert("page==="+page);
		curPage = 1;
		displayPage(1); //显示第一页
		$("#btn1").click(function() {
			curPage = 1;
			displayPage();
		});
		$("#btn2").click(function() {
			direct = -1;
			displayPage();
		});
		$("#btn3").click(function() {
			direct = 1;
			displayPage();
		});
		$("#btn4").click(function() {
			curPage = page;
			displayPage();
		});
function displayPage() {
		if ((curPage <= 1 && direct == -1) || (curPage >= page && direct == 1)) {
			direct = 0;
			alert("已经是第一页或者最后一页了");
			return;
		}
		lastPage = curPage;
		curPage = (curPage + direct + len) % len;
		var begin = (curPage - 1) * pageSize; //起始记录号
		var end = begin + pageSize;
		if (end > len) end = len;
		$(".table1 tr").hide();
		$(".table1 tr").each(function(i) {
			if (i >= begin && i < end) //显示第page页的记录
				$(this).show();
		});
	}
		n = tiaoshu;
		++tiaoshu;

		m = tiaoshu + 1;
		var h = $('.table1 tr').height() * m;

		$('.table1').css({
			"height": h,
			'overflow': 'hidden'
		});
		/*	页面切换开始*/
		
		$('.first').on('click', function() {
			hide();
			$("tr:gt(" + 0 + " ):lt(" + (n + 1) + " ) ").show();
			$(this).addClass('active').siblings().removeClass('active');
		})

		$('.second').on('click', function() {
			hide();
			$("tr:gt(" + (2 * n + 3) + " ):lt(" + (3 * n + 1) + " ) ").show();
			$(this).addClass('active').siblings().removeClass('active');
		})
		$('.third').on('click', function() {
			hide();
			$("tr:gt(" + (3 * n + 3) + " ):lt(" + (4 * n + 1) + " ) ").show();
			$(this).addClass('active').siblings().removeClass('active');
		})
		$('.fourth').on('click', function() {
			hide();
			$("tr:gt(" + (4 * n + 3) + " ):lt(" + (5 * n + 1) + " ) ").show();
			$(this).addClass('active').siblings().removeClass('active');
		})
		$('.fifth').on('click', function() {
			hide();
			$("tr:gt(" + (5 * n + 3) + " ):lt(" + (6 * n + 1) + " ) ").show();
			$(this).addClass('active').siblings().removeClass('active');
		})
		

		function hide() {
			$('.table1 tr').hide();
			$('.table1 tr').eq(0).show();
		}
		/*页面切换结束*/

	});
	

	/*获取下拉列表的value值开结束    实现每页显示N个内容结束*/
	/*选择特定内容的列表开始*/
	$("select[name=search]").change(function() {
		var type = $("#type option:selected").html();
		if (type == "全部") {
			$('.table1 td.type').parent().show();
		}
		if (type == "搜索引擎") {
			$('.table1 tr').hide();
			$("td.type:contains('搜索引擎')").each(function() {
				$(this).parent().show();
				$('.table1 tr').eq(0).show();
			})
		}
		if (type == "直接访问") {
			$('.table1 tr').hide();
			$("td.type:contains('直接访问')").each(function() {
				$(this).parent().show();
				$('.table1 tr').eq(0).show();
			})
		}
		if (type == "视频广告") {
			$('.table1 tr').hide();
			$("td.type:contains('视频广告')").each(function() {
				$(this).parent().show();
				$('.table1 tr').eq(0).show();
			})
		}
		if (type == "邮件营销") {
			$('.table1 tr').hide();
			$("td.type:contains('邮件营销')").each(function() {
				$(this).parent().show();
				$('.table1 tr').eq(0).show();
			})
		}
		if (type == "联盟广告") {
			$('.table1 tr').hide();
			$("td.type:contains('联盟广告')").each(function() {
				$(this).parent().show();
				$('.table1 tr').eq(0).show();
			})
		}
	})

	/*$('input[name=sub]').on('click', function() {
		var type = $('input[name=keywords]').val();
		$('.table1 tr').hide();
		/*	$(' "td.type:contains('+ " ' "+ type+ " ' "+ ' )" ' ).parent().show();*/

	/*if (type == "全部") {
			$('.table1 td.type').parent().show();
		}
		if (type == "搜索引擎") {
			$('.table1 tr').hide();
			$("td.type:contains('搜索引擎')").each(function() {
				$(this).parent().show();
				$('.table1 tr').eq(0).show();
			})
		}
		if (type == "直接访问") {
			$('.table1 tr').hide();
			$("td.type:contains('直接访问')").each(function() {
				$(this).parent().show();
				$('.table1 tr').eq(0).show();
			})
		}
		if (type == "视频广告") {
			$('.table1 tr').hide();
			$("td.type:contains('视频广告')").each(function() {
				$(this).parent().show();
				$('.table1 tr').eq(0).show();
			})
		}
		if (type == "邮件营销") {
			$('.table1 tr').hide();
			$("td.type:contains('邮件营销')").each(function() {
				$(this).parent().show();
				$('.table1 tr').eq(0).show();
			})
		}
		if (type == "联盟广告") {
			$('.table1 tr').hide();
			$("td.type:contains('联盟广告')").each(function() {
				$(this).parent().show();
				$('.table1 tr').eq(0).show();
			})
		}
	})*/

	/*选择特定内容的列表结束*/

	/*设定左侧导航的宽度开始*/
	var w = $(window).width();
	long();
	/*设定左侧导航的宽度结束*/
	/*点击按钮缩小开始*/
	var dianjikey = true;
	contentWidth();
	$('.dianji').on('click', function() {
			if (dianjikey) {
				$(this).removeClass('glyphicon-resize-full').addClass('glyphicon-resize-small');
				short();
				dianjikey = false;
				$('.panel-heading').on('click', function() {
					open();
					dianjikey = true;
				})
				contentWidth();

			} else {
				$(this).removeClass('glyphicon-resize-small').addClass('glyphicon-resize-full');
				long();
				dianjikey = true;
				contentWidth();
			}
		})
		/*点击按钮结束*/
		/*日期选择结束*/
	$('.Wdate').on('click', function() {
			WdatePicker();
		})
		/*右箭头切换下箭头开始*/
	var jiantoukey = true;
	$('#dingbu ul li').on('click', function() {
			if (jiantoukey) {
				$(this).find('.glyphicon-chevron-right').removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-down');
				jiantoukey = false;
			} else {
				$(this).find('.glyphicon-chevron-down').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right');
				jiantoukey = true;
			}
		})
		/*右箭头切换下箭头结束*/

	/*会员管理开始*/
	// 全选        
	var xuanzekey = true;
	$(".all").click(function() {
		//		alert(11)
		if (xuanzekey) {
			$("input[name=newslist]").each(function() {
				$(this).attr("checked", true);
				$(".all").html('取消')
			});
			xuanzekey = false;
			return

		} else {
			$("input[name=newslist]").each(function() {
				$(this).attr("checked", false);
				$(".all").html('全选')
			});
			xuanzekey = true;
			return
		}
	});

	/*点击关闭最近计划开始*/
	$('#removejihua').click(function() {
			$(this).parent().parent().remove();
		})
		/*点击关闭最近计划结束*/
		/*点击展开开始*/
	$('.glyphicon-chevron-down').click(function() {
			var height = $(this).parent().parent().height();
			$(this).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up').parent().parent().height('40').css({
				'overflow': "hidden"
			});
			$('.glyphicon-chevron-up').click(function() {
				$(this).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down').parent().parent().height(height);
			})
		})
		/*点击展开结束*/

	/*点赞开始*/
	var dianzan = $('.dianzan');
	dianzan.each(function(i, item) {
			$(item).on('click', function() {
				var shuzhi = $('.shuzhi').eq(i).html();
				shuzhi++;
				$('.shuzhi').eq(i).html(shuzhi);
			})
		})
		/*点赞结束*/

	/*会员管理结束*/

	/*点击显示页面开始*/
	$('#shebei1').on('click', function() {
		$('#shebei').show().siblings().hide();
	})
	$('#shebeifenxi1').on('click', function() {
		$('#shebeifenxi').show().siblings().hide();
	})

	$('#yonghu1').on('click', function() {
		$('#yonghu').show().siblings().hide();
	})

	/*点击 删除model区开始*/
	$('.shanchu').on('click', function() {
			$(this).attr({
				'data-toggle': 'modal',
				'data-target': "#myModal"
			})
			$('.shanchuqueding').on('click', function() {
				$('.shanchu[data-toggle=modal]').parent().parent().remove();
			})
		})
		/*点击 删除 model区结束*/

	/*点击 留言 model区开始*/
	function clearattr() {
		$('.liuyan').removeAttr('data-toggle').removeAttr('data-target');
		$('#fk').val('');
	}
	$('.liuyan').on('click', function() {
			clearattr();
			$(this).attr({
				'data-toggle': 'modal',
				'data-target': "#feedback"
			})
			chuangjian();
			/*留言信息添加开始*/
			$('.liouyantijiao').on('click', function() {
					$('.xiaoxixiala ul li .wenben').eq(0).html($('textarea[name=fk]').val())
				})
				/*留言信息添加结束*/
			var num = $('.xiaoxi .badge').html();
			$('.xiaoxi .badge').html(++num);
		})
		/*点击 留言 model区结束*/

	/*消息提示框显示开始*/
	$('.xiaoxi').hover(function() {
			$('.xiaoxixiala').show();
		}, function() {
			$('.xiaoxixiala').hide();
		})
		/*消息提示框显示结束*/

	/*点击显示页面结束*/

	function chuangjian() {
		/*留言信息创建开始*/
		var li = $('<li class="list-group-item chuangjian"></li>');
		var media1 = $('<div class="media"></div>');
		var a = $('	<a class="media-left pull-left"></a>');
		var img = $('<img src="img/7.jpg" class="img-circle">');
		$('.xiaoxixiala .list-group').prepend(li);
		var mediaBody = $('<div class="media-body pull-left"></div>')
		var h4 = $('<h4 class="media-heading">本初子午</h4>')
		var p = $('<p class="wenben pull-left"></p>');
		var xiaoxi = $('<a class="pull-right new">新消息</a>')
		$(li).append(media1);
		$(media1).append(a);
		$(a).append(img);
		$(media1).append(mediaBody);
		$(mediaBody).append(h4);
		$(mediaBody).append(p);
		$(mediaBody).append(xiaoxi);

		/*留言信息创建结束*/
	}

	

	function contentWidth() {
		$('.container.content').width(w - $('#dingbu').width() - 40).css({
			marginLeft: $('#dingbu').width(),
			padding: 0
		})
	}

	function open() {
		$('.dianji').addClass('glyphicon-resize-full').removeClass('glyphicon-resize-small');
		long();
		$('.panel-body').show();
	}

	function short() {
		$('.navbar-brand').css({
			width: w / 24
		});
		$('#dingbu').css({
			width: w / 24
		});
		$('#dingbu ul li').css({
			width: w / 24
		});
		$('.nav-stacked').css({
			width: w / 24
		})
		$('.panel-body').hide();
	}

	function long() {
		$('.navbar-brand').css({
			width: w / 8
		});
		$('#dingbu').css({
			width: w / 8
		});
		$('#dingbu ul li').css({
			width: w / 8
		});
		$('.nav-stacked').height($(window).height()).css({
			width: w / 8
		})
	}

	/*表单验证开始*/
	$.formValidator.initConfig({ /*初始化配置*/
		alertMessage: false
	});
	$("#test1").formValidator({
		onshow: "请输入用户名称",
		onfocus: "用户名至少6个字符，最多10个字符",
		onempty: "用户名称不能为空",
		oncorrect: "通过"
	}).InputValidator({
		min: 6,
		max: 10,
		onerror: "用户名长度必须在6-10位"
	});

	$("#password1").formValidator({
		onshow: "请输入密码",
		onfocus: "长度为6-12位",
		onempty: "密码不能为空"
	}).InputValidator({
		min: 6,
		max: 12,
		onerror: "密码长度必须是6-12位"
	});

	$("#password2").formValidator({
		onshow: "请再次输入密码",
		onfocus: "请再次输入密码"
	}).CompareValidator({
		desID: "password1",
		operateor: "=",
		datatype: "string",
		onerror: "两次密码输入不一致"
	});

	$("#nl").formValidator({
		onfocus: "请输入您的年龄",
		onempty: "年龄不能为空"
	}).InputValidator({
		type: "value",
		min: 18,
		onerror: "您还未成年，请成年后再来呦。。。"
	});
	/*表单验证结束*/
})