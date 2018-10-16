var books = document.getElementsByClassName("isocard__content");

(window).addEventListener("scroll", function () {
    var travel = (window).scrollY;
    // console.log(travel);
    travel = travel/2;
    for(var i=0; i<books.length; i++){
        books[i].style.transform = 'translate(' +  (i*travel) + 'px,-'+ (i*travel) +'px)';
        books[i].style.opacity = (i+1)/3;
    }


});