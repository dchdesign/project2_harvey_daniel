var listOfURL = [
  "https://images.unsplash.com/photo-1523895347637-b4ab8fdc5f41?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=0018fcf0fbffbaec3069db83a56f066d",
  "https://images.unsplash.com/photo-1520889905494-a9ba556b0cf2?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=eff4097e8a383bf1a9d19b5d3aabff44",
  "https://images.unsplash.com/photo-1509307602489-ee74fee4a97c?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=1f0cad6cdc9d75f384cc1bf82b771cdd",
  "https://images.unsplash.com/photo-1484903293490-48d1cee33491?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=ed812cf76cb0b8ea647395a8a9bf879c",
  "https://images.unsplash.com/photo-1521488650599-69948382125d?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=a6c92ca5c3263f73b8ea73d3600785a4"
];
var currentIndex = 0;
var imgContainer = document.querySelector(".imgContainer");
var image = document.querySelector(".image").cloneNode(true);
var maxWidth = 100;

var autoplay = document.querySelector(".autoplay");
var autoplayIntervalID = 0;

var toLeft = document.querySelector(".toLeft");
var toRight = document.querySelector(".toRight");

var indexBar = document.querySelector(".indexBar");
var indexCircle = document.querySelector(".indexCircle").cloneNode(true);
var listOfIndexCircle = []


initialize();

function initialize() {
  //開啟自動輪播
  SetAutoplay(autoplay.classList.toggle("clicked"));

  listOfURL.forEach(function(url, index) {
    //建立全部的圖片
    var newImage = image.cloneNode(true);
    var translateX = index * 100;
    newImage.src = url;
    newImage.style.transform = "translateX(" + translateX + "%)";
    imgContainer.appendChild(newImage);

    //建立indexCircle
    var newIndexCircle = indexCircle.cloneNode(true);
    newIndexCircle.style.display = "block";
    indexBar.appendChild(newIndexCircle);
    listOfIndexCircle.push(newIndexCircle);
  });

  //給予事件觸發器
  autoplay.addEventListener("click", function() {
    SetAutoplay(autoplay.classList.toggle("clicked"));
  });

  toLeft.addEventListener("click", function() {
    currentIndex = checkIndexOverflow(currentIndex - 1);
    scrollImage(currentIndex);
    activateIndexCircle(currentIndex);
  });

  toRight.addEventListener("click", function() {
    currentIndex = checkIndexOverflow(currentIndex + 1);
    scrollImage(currentIndex);
    activateIndexCircle(currentIndex);
  });

  //indexCircle，第一個要顯示出來
  listOfIndexCircle.forEach(function(indexCircle, index){
    indexCircle.addEventListener("click", function(){
      scrollImage(checkIndexOverflow(index));
      activateIndexCircle(index);
    });
  });
  activateIndexCircle(0);
}

function scrollImage(index) {
  var translateX = checkIndexOverflow(index) * -(maxWidth);
  imgContainer.style.transform = "translateX(" + translateX + "%)";
}

function checkIndexOverflow(index) {
  if (index >= listOfURL.length) {
    return 0;
  } else if (index < 0) {
    return listOfURL.length - 1;
  } else {
    return index;
  }
}

function SetAutoplay(bool) {
  if (bool) {
    //每隔X秒，就呼叫一次scrollImage()
    autoplayIntervalID = setInterval(function() {
      currentIndex = checkIndexOverflow(currentIndex + 1);
      scrollImage(currentIndex);
      activateIndexCircle(currentIndex);
    }, 5000);
  } else {
    clearInterval(autoplayIntervalID);
  }
}

function activateIndexCircle(index){
  listOfIndexCircle.forEach(function(indexCircle){
    indexCircle.classList.remove("clicked");
  });
  currentIndex = checkIndexOverflow(index);
  listOfIndexCircle[index].classList.add("clicked");
}
