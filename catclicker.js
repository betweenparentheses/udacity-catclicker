
var model = {
  names: ["Mew", "Hiss", "Purr", "Snore", "Scratch"],
  images: ['cat.jpg', 'cat2.jpg', 'cats3.jpg', 'cat4.jpg'],
  maxID: 0,
  cats: []
};


var octopus = {

  addCat: function(){
    var thisID = model.maxID++;

    model.cats.push({
      id: thisID,
      name: model.names.pop(),
      imageUrl: model.images[ Math.floor(Math.random() * model.images.length) ],
      clickCount: 0
    });
  },

  getCats: function() {
    return model.cats;
  },

  increaseCount: function(id) {
    model.cats[id].clickCount++;
  },

  setCurrent: function(catId) {
    model.currentCat = model.cats[catId];
    viewOneCat.render();
  },

  getCurrent: function() {
    return model.currentCat;
  },

  updateCurrentCat: function(name, url, clicks){

    model.currentCat.name = name;
    model.currentCat.imageUrl = url;
    model.currentCat.clickCount = clicks;
    viewCatList.render();
    viewOneCat.render();
    viewAdmin.render();
  },

  init: function(){
    for(var i = 0; i < 5; i++){
      octopus.addCat();
    }
    viewCatList.init();
    this.setCurrent(0);

    viewOneCat.init();
    viewAdmin.init();
  }
};


var viewCatList = {

  init: function(){
    this.$catList = $('#catlist');
    this.listTemplate = $('script[data-template="cat-li"]').html();

    $(this.$catList).on('click', 'li', function(e){
      var catId = $(this).data('id');
      octopus.setCurrent(catId);
    });
    viewCatList.render();
  },

  render: function(){
    this.listTemplate = $('script[data-template="cat-li"]').html();

    document.getElementById('catlist').innerHTML = '';

    octopus.getCats().forEach(function(cat){
      var catItem = viewCatList.listTemplate.replace(/{{id}}/g, cat.id).replace(/{{name}}/g, cat.name);
      $(viewCatList.$catList).append(catItem);
    })
  }
};

var viewOneCat = {
  init: function(){
    this.$catDiv = $('#the-cat');
    this.$counter = $('#count');
    this.$name = $('#name');
    this.$image = $('#cat-click');

    $(this.$catDiv).on('click', 'img', function(e){
      var id = $(viewOneCat.$catDiv).attr('data-id');

      octopus.increaseCount(id);
      viewOneCat.render();
    });
    viewOneCat.render();
  },

  render: function(){
    var cat = octopus.getCurrent();
    $(viewOneCat.$catDiv).attr('data-id', cat.id);
    $(viewOneCat.$name).text(cat.name);
    $(viewOneCat.$counter).text(cat.clickCount);
    $(viewOneCat.$image).attr('src', cat.imageUrl);
  }
};

var viewAdmin = {
  init: function(){
    adminBtn = document.getElementById('admin-btn');
    adminBtn.addEventListener('click', function(e){
      $(document.getElementById('admin')).toggle();
    });

    cancelBtn = document.getElementById('cancel-btn');
    cancelBtn.addEventListener('click', function(e){
      document.getElementById('admin').style.display = 'none';

      inputs = document.getElementsByTagName('input');
      for(var i = 0; i < inputs.length; i++){
        inputs[i].value = "";
      }
    });


    updateBtn = document.getElementById('update-btn');
    updateBtn.addEventListener('click', function(e){
      var name = document.getElementsByName('change-name')[0].value;
      var url = document.getElementsByName('change-url')[0].value;
      var clicks = document.getElementsByName('change-clicks')[0].value;

      octopus.updateCurrentCat(name, url, clicks);

    });

    this.render();
  },

  render: function(){

    document.getElementById('admin').style.display = 'block';
    var cat = octopus.getCurrent();

    document.getElementsByName('change-name')[0].value = cat.name;
    document.getElementsByName('change-url')[0].value = cat.imageUrl;
    document.getElementsByName('change-clicks')[0].value = cat.clickCount;

  }


};






$(function(){
  octopus.init();
});
