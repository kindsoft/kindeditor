Tabs API
========================================================

.. contents::
	:depth: 2

.. index:: tabs

.. _K.tabs:

K.tabs(options)
--------------------------------------------------------
创建Tabs。

* 参数:
	* object options: 配置信息
* 返回: KTabs
* 继承: KWidget ( :ref:`K.widget` )

示例:

.. sourcecode:: js

	var tabs = K.tabs({
		parent : '#tabs',
		afterSelect : function(i) {
			K('#tab' + (i + 1)).html('选中了标签#' + (i + 1));
		}
	});
	tabs.add({
		title : '标签#1',
		panel : '#tab1'
	});
	tabs.add({
		title : '标签#2',
		panel : '#tab2'
	});
	tabs.add({
		title : '标签#3',
		panel : '#tab3'
	});
	tabs.select(0);
