
var catNames = ["Mew", "Hiss", "Purr", "Snore", "Scratch"];

var Cat = function(){
  this.name = catNames.pop();
  this.clickCount = 0;
};

for (var i = 1;i<6;i++){
//more here add listeners
  var clicker = document.getElementById("cat-click-" + i);
  var cat = new Cat();

  //IIFE!!!
  (function(kat, klicker, iInside){
    klicker.addEventListener('click', function(){
      kat.clickCount++;
      document.getElementById("count" + iInside).innerHTML = kat.clickCount;
    }, false);


    var names = document.getElementsByClassName('name' + iInside);
    for(var j = 0; j < names.length; j++){
      names[j].innerHTML = kat.name;
    };

  })(cat, clicker, i);
}



var catList = document.getElementById('catlist');

for(var j = 0;j< 6;j++){
  (function(j, catList){
    var catName = catList.getElementsByClassName('name'+ (j+1))[0];
    console.log(catName)
    catName.addEventListener('click', function(){
      //hide all cats
      var allCats = document.getElementsByClassName('cat');

      for(var k = 0;k< allCats.length;k++){
        allCats[k].style.display = "none";
      };

      //show the one cat
      document.getElementById('cat'+(j+1)).style.display = "inline-block";
    })

  })(j, catList);
};
