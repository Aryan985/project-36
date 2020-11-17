var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload()
{
dogimg = loadImage("images/dogImg.png")
dogimg1 = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(800, 700);

  foodStock=database.ref('Food');
foodStock.on("value",readStock);
  
  foodObj = new Food();
  
dog = createSprite(250,300,150)
dog.addImage(dogimg)
dog.scale = 0.15

feed = createButton("Feed The Dog")
feed.position(700,95)
feed.mousePressed(feedDog);

addFood = createButton("Add Food")
addFood.position(800,95);
addFood.mousePressed(addFoods)



}


function draw() {  
background(46,139,87)
foodObj.display();

fedTime = database.ref('FeedTime')
fedTime.on("value",function(data){
lastFed = data.val();
})

if(lastFed>=12){
  text("Last Feed : " + lastFed%12 + "PM",350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed : " + lastFed + " AM",350,30);
}
  drawSprites();
  

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(dogimg1);
  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()  
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}




