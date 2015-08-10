jQuery(document).ready(function($){

	var dataURL = "data/data.json",
		dataModel = {},
		$gallery = $('.gallery'),
		$thumbsContainer,
		$overlay,
		$body = $('body');

	var loadData = function (){
		$.getJSON(dataURL, function(data){
			dataModel.images = data;
			dataModel.lastIndex = dataModel.images.length - 1;
			init();
		});
	}
	function init(){
		renderThumbsView();
		addThumbsController();
		renderOverlayView();
		addOverlayControllers();
	}
	function renderThumbsView(){
		$thumbsContainer = $('<div>', {'class':'thumbs clearfix'});
		var images = dataModel.images,
		$thumb;

		images.forEach(function(image){

			$thumb = $('<img>', {'src':image.medium, 'alt': image.caption});
			$thumbsContainer.append($thumb);


		});
		$gallery.append($thumbsContainer); 
	}

	function addThumbsController(){
		var $thumbs = $thumbsContainer.find('img');
		$thumbs.click(function(){
			dataModel.currentIndex = $thumbs.index($(this));
			addOverlay();
			loadImage();
		});
	}

	function renderOverlayView(){
		$overlay = $('<div class = "overlay">');
		var $imageContainer = $('<div class = "image-container clearfix">');
			$figure = $('<figure>'),
			$image = $('<img>'),
			$figCaption = $('<figcaption>'),
			$closeBtn = $('<div class="close-btn fa fa-close">'),
			$nextBtn = $('<div class="next-btn fa fa-arrow-right">'),
			$prevBtn = $('<div class="prev-btn fa fa-arrow-left">');

			$figure.append($image, $figCaption, $closeBtn, $nextBtn, $prevBtn);
			$imageContainer.append($figure);
			$overlay.append($imageContainer);
	}

	function addOverlayControllers(){
		$overlay.find('.close-btn').click(function(){
			removeOverlay();
		});
		$overlay.click(function(e){
			if(e.target === this){
				removeOverlay();
			}
		});
		$nextBtn.click(function(){
			dataModel.currentIndex = dataModel.currentIndex < dataModel.lastIndex? dataModel.currentIndex + 1 : 0;
			loadImage();
		});

		$prevBtn.click(function(){
		dataModel.currentIndex = dataModel.currentIndex > 0? dataModel.currentIndex -1 : dataModel.lastIndex;
		loadImage();
		});
	}

	function loadImage(){
		var image = dataModel.images[dataModel.currentIndex];
		$overlay.find('img')
		.css({'opacity': 0})
		.attr({'src':image.image, 'alt':image.caption})
		.load(function(){
			$(this).unbind('load').velocity('fadeIn', {duration: 500});
		});
		$overlay.find('figcaption').html(image.caption);	
		//console.log(image);
	}

	function addOverlay(){
		$body.append($overlay).css({overflow:'hidden'});

	}
	function removeOverlay(){
		$overlay.detach();
		$body.css({overflow: 'scroll'});

	}

	loadData();
});

