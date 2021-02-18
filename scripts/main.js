var DETAIL_IMAGE_SELECTOR= '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR= '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR='[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR= '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY=27;
var thumbnail_array_index = 0;




function setDetails(imageUrl,titleText){
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src',imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail){
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail){
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail){
    'use strict';
    return setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb,index){
    'use strict';
    console.log(thumb);
    thumb.addEventListener('click',function(event){
        event.preventDefault();

        thumbnail_array_index = index;
        setDetailsFromThumb(thumb);
        showDetails();
       
    });
}

function getThumbnailArray(){
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var ThumbnailArray = [].slice.call(thumbnails);
    return ThumbnailArray;
}

function hideDetails(){
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails(){
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function(){
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler(){
    'use strict';
    document.body.addEventListener('keyup',function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if(event.keyCode === ESC_KEY){hideDetails();}
    });
}


function addCycleLeftHandler(){
    'use strict';

  
    document.getElementById('leftButton').addEventListener('click',function(event) {
        event.preventDefault();
        var thumbnailArr = getThumbnailArray();
        var index = thumbnail_array_index;
        event.preventDefault();
        if (index === 0){
            index = thumbnailArr.length-1;
        }
        else{
           index--;
        }
        thumbnail_array_index = index;
       
        setDetailsFromThumb(thumbnailArr[index]);
        showDetails();
    });
}

function addCycleRightHandler(){
    'use strict';
    document.getElementById('rightButton').addEventListener('click',function(event) {
        event.preventDefault();
        var index = thumbnail_array_index;
        var thumbnailArr = getThumbnailArray();
        if (index === thumbnailArr.length-1){
            index = 0;
        }
        else{
           index++;
        }
        thumbnail_array_index = index;
        setDetailsFromThumb(thumbnailArr[index]);
        showDetails();
    });
}



function initializeEvents(){
    'use strict'; 
    var thumbnails = getThumbnailArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    addCycleLeftHandler();
    addCycleRightHandler();
}

initializeEvents();