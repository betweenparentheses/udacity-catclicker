
var model = {
  names: ["Mew", "Hiss", "Purr", "Snore", "Scratch"],
  images: ['cat.jpg', 'cat2.jpg', 'cats3.jpg'],
  maxID: 0,
  cats: []
};


var octopus = {

  currentCat: null,

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
    console.log(id);
    model.cats[id].clickCount++;
  },

  setCurrent: function(catId) {
    this.currentCat = model.cats[catId];
    viewOneCat.render();
  },

  init: function(){
    for(var i = 0; i < 5; i++){
      octopus.addCat();
    }
    viewCatList.init();
    this.currentCat = model.cats[0];

    viewOneCat.init();
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
    var cat = octopus.currentCat;
    $(viewOneCat.$catDiv).attr('data-id', cat.id);
    $(viewOneCat.$name).text(cat.name);
    $(viewOneCat.$counter).text(cat.clickCount);
    $(viewOneCat.$image).attr('src', cat.imageUrl);
  }
};

$(function(){
  octopus.init();
});
