 $(document).on('change', '.check__input', function() {

    let minValue = $(this).data('min');
    let maxValue = $(this).data('max');
    if (minValue != undefined || maxValue != undefined) {
      console.log($(this));
      $('.catalog__input--min').val(minValue);
      $('.catalog__input--max').val(maxValue);
    }
 })

   $(document).on('click', '.catalog__control', function() {
    $('.catalog__result').toggleClass('catalog__result--active');
  })

    $(document).on('click', '.catalog__subtitle', function(e) {
    let elem = $(e.target).parents('.catalog__inner').find('.check__submenu');
    console.log(elem);
    $(elem).slideToggle(250);
    $(e.target).toggleClass('catalog__subtitle--hide');
  })

  $(document).on('click', '.catalog__more', function(e) {
    let block = $(this).parents('.catalog__inner');
    let elems = block.find('.check__item[style*="display: none"]');
    let currentButton = $(e.currentTarget);
    elems.addClass('toggleclass');
    let hideElems = currentButton.parents('.catalog__inner').find('.toggleclass');
    hideElems.slideToggle(150);

    let showText = $(e.currentTarget).data('show');
    let hideText = $(e.currentTarget).data('hide');
    currentButton.toggleClass('catalog__more--hide');
    if ($(e.currentTarget).hasClass('catalog__more--hide')) {
      currentButton.find('span').text(hideText);
    } else {
      currentButton.find('span').text(showText);
    }

  })

 

  $('.check__input, .check__elem').on('click', function(e) {
    let valueTop=0;
    let top = 0;

     let block = $(e.target).parents('.catalog__block');
     let value = block.data('page');


    if ($(document).width() > 768) {
      top = $(e.target).parent().offset().top;
      if(value=='catalog') {
         valueTop = top - $('.main-header').outerHeight(true) - $('.catalog__slider').outerHeight(true)-$('h1').outerHeight(true);
      } else {
      valueTop = top - $('.main-header').outerHeight(true) - $('.single').outerHeight(true);
      }
    } else {
    	top = $(e.target).parent().position().top+$(e.target).parent().height();
      valueTop = top;
    }
    let popup = block.find('.catalog__result');
    $(popup).addClass('catalog__result--active');
    $(popup).css("top", valueTop);
})
