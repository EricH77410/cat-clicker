$(document).ready(function(){

	var model = {
		data: [{
			name:'Albert',
			click:0,
			img:'cat_picture1.jpg',
			id:0
		},
		{
			name:'Bobby',
			click:0,
			img:'cat_picture2.jpeg',
			id:1
		},
		{
			name:'Celeste',
			click:0,
			img:'cat_picture3.jpeg',
			id:2
		},
		{
			name:'Doume',
			click:0,
			img:'cat_picture4.jpeg',
			id:3
		},
		{
			name:'Castor',
			click:0,
			img:'cat_picture5.jpeg',
			id:4
		}
	]
};

var ctrl = {
	activeCat: {},
	init: function(){
		view.initSelect();
			for(var i=0; i<model.data.length; i++){
				view.afficheListe(model.data[i]);
			}
	},
	count: function(){
		this.activeCat.click += 1;
		view.render(this.activeCat);
		view.renderAdmin(this.activeCat);
	},

	setActiveCat: function(i){
		this.activeCat = model.data[i];
		view.render(this.activeCat);
		view.renderAdmin(this.activeCat);
	},
	updateCat: function(sName, nClick, sImg){
		var i = this.activeCat.id;
		model.data[i].name = sName;
		model.data[i].img = sImg;
		model.data[i].click = nClick
		this.activeCat = model.data[i];
		view.render(this.activeCat);
		view.renderAdmin(this.activeCat);
		this.init();
	}
};

var view = {

	mapDom: function(){
		this.$list = $('#list'),
		this.$img = $('#img'),
		this.$count = $('#count'),
		this.$name = $("#name"),
		this.$admin = $('#admin'),
		this.$btn = $('#admin-button'),
		this.$txt_name = $('#txt-name'),
		this.$img_txt = $('#img-txt'),
		this.$txt_click = $('#txt-click'),
		this.$sauve = $('#sauve'),
		this.$cancel = $('#cancel')
	},
	render: function(c){
			this.$img.attr('src', c.img);
			this.$name.text(c.name);
			this.$count.text(c.click+' clicks');
			this.$btn.show();
	},
	mapEvent: function(){
		this.$img.click(function(){
			ctrl.count();
		});
		this.$list.change(function(e){
			var ind = $('#list').prop('selectedIndex');
			ctrl.setActiveCat(ind);
		});
		this.$btn.click(function(){
			$('#admin').show();
		});
		this.$sauve.click(function(){
			var nom = $('#txt-name').val();
			var nClick = parseInt($('#txt-click').val());
			var sImg = $('#img-txt').val();
			ctrl.updateCat(nom,nClick,sImg);
			$('#admin').hide();
		});
		this.$cancel.click(function(){
			$('#admin').hide();
		});
	},
	init: function(){
		this.mapDom();
		this.mapEvent();
		this.$admin.hide();
		this.$btn.hide();
	},
	afficheListe: function(c){
		this.$list.append(new Option(c.name, c.name));
	},
	renderAdmin: function(c){
		this.$txt_name.val(c.name);
		this.$img_txt.val(c.img);
		this.$txt_click.val(c.click);
	},
	initSelect: function(){
		this.$list.children().remove();
	}


};
	view.init();
	ctrl.init();
});
