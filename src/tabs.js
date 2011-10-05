
function _tabs(options) {
	var self = _widget(options),
		remove = self.remove,
		afterSelect = options.afterSelect,
		div = self.div,
		liList = [];
	//create tabs
	div.addClass('ke-tabs')
		.bind('contextmenu,mousedown,mousemove', function(e) {
			e.preventDefault();
		});
	var ul = K('<ul class="ke-tabs-ul ke-clearfix"></ul>');
	div.append(ul);
	//add a tab
	self.add = function(tab) {
		var li = K('<li class="ke-tabs-li">' + tab.title + '</li>');
		li.data('tab', tab);
		liList.push(li);
		ul.append(li);
	};
	self.selectedIndex = 0;
	//select a tab
	self.select = function(index) {
		self.selectedIndex = index;
		_each(liList, function(i, li) {
			li.unbind();
			if (i === index) {
				li.addClass('ke-tabs-li-selected');
				K(li.data('tab').panel).show('');
			} else {
				li.removeClass('ke-tabs-li-selected').removeClass('ke-tabs-li-on')
				.mouseover(function() {
					K(this).addClass('ke-tabs-li-on');
				})
				.mouseout(function() {
					K(this).removeClass('ke-tabs-li-on');
				})
				.click(function() {
					self.select(i);
				});
				K(li.data('tab').panel).hide();
			}
		});
		if (afterSelect) {
			afterSelect.call(self, index);
		}
	};
	//remove tabs
	self.remove = function() {
		_each(liList, function() {
			this.remove();
		});
		ul.remove();
		remove.call(self);
	};
	return self;
}

K.tabs = _tabs;
