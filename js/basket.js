// товары

function totalProduct() {
  let sumOld = 0;
  let sumNew = 0;
  $('.things__single span').each(function(index, item) {
    let wrap = $(item).parents('.things__col');
    let input = wrap.find('.things__input');
    let elemNew = wrap.find('.things__single span');
    let elemOld = wrap.find('.things__old span');

    let singleNew = $(item).data('new') * Number(input.val() || 1);
    let singleOld = $(item).data('old') * Number(input.val() || 1);

    // подсчет каждого итема

    elemNew.text(singleNew.toLocaleString('ru'));
    elemOld.text(singleOld.toLocaleString('ru'));

    sumOld += singleOld;
    sumNew += singleNew;
  });

  // вывод общих сумм
  $('#product__sum').text(sumOld.toLocaleString('ru'));
  $('#product__current, #popup-product__current').text(sumNew.toLocaleString('ru'));
}


$(document).on('click', '.basket__del--product', function(e) {
  let item = $(e.target).parents('.things__col');
  let popup = item.find('.things__popup');
  popup.addClass('things__popup--active');
  $(item).addClass('active');
})

$(document).on('click', '.things__col .things__elem--yes', function(e) {
  let item = $(e.target).parents('.things__col');
  item.remove();
  totalProduct();
})

$(document).on('click', '.things__col .things__elem--no', function(e) {
  let item = $(e.target).parents('.things__col');
  $(item).removeClass('active');
  let popup = item.find('.things__popup');
  popup.removeClass('things__popup--active');
})

$(document).on('change, input', '.things__input', function() {
  $(this).val(
    $(this).val().replace(/^0|\D/, '') || 1
  );
  totalProduct();
})

$(document).on('click', '.things__btn', function(e) {
  let wrap = $(e.target).parents('.things__col');
  let input = wrap.find('.things__input');
  let value = input.val();

  if ($(e.target).hasClass('things__btn--next')) {
    input.val(Number(value) + 1);
  } else if ($(e.target).hasClass('things__btn--prev') && value != 1) {
    input.val(Number(value) - 1);
  }
  totalProduct();
})


// прокат


function totalProcat() {
  let elems = $('.procat__count');
  let sum = 0;
  $(elems).each(function(index, item) {
    sum += $(item).data('single');
  })
  $('#procat__sum, #popup-procat__current').text(sum.toLocaleString('ru'));
}

$(document).on('click', '.basket__del--procat', function(e) {
  console.log('ggg');
  let item = $(e.target).parents('.checkout__item');
  $(item).addClass('active');
  let popup = item.find('.things__popup');
  popup.addClass('things__popup--active');

})

$(document).on('click', '.checkout__item .things__elem--yes', function(e) {
  let item = $(e.target).parents('.checkout__item');
  item.remove();
  totalProcat();
})

$(document).on('click', '.checkout__item .things__elem--no', function(e) {
  let item = $(e.target).parents('.checkout__item');
  $(item).removeClass('active');
  let popup = item.find('.things__popup');
  popup.removeClass('things__popup--active');
})


// закреление блока

if ($('.basket__block').length > 0) {
  let wrap = $('.wrap');

  listener();

  $(window).resize(listener);
  $(window).scroll(listener);


  function listener() {
    var heightHeader;
    var scrollTop = $(window).scrollTop();

    heightBlock = $(".header").outerHeight(true) + $('.checkout__link').outerHeight(true);

    //  console.log( $('.checkout__link').outerHeight(true) );

    if (heightBlock <= scrollTop) {
      $('.basket__block').addClass('basket__block--fixed');
      wrap.css({
        top: $(".basket__block").outerHeight(true) + 'px',
        position: 'relative',
      });
    } else {
      $('.basket__block').removeClass('basket__block--fixed');
      wrap.css({
        top: ""
      });
    }
  }

}

(function() {
  var topMenu = $(".basket__list"),
    activeClass = "basket__box--active",
    topMenuHeight = topMenu.outerHeight() + 45,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function() {
      var item = $($(this).attr("href"));
      if (item.length) return item;
    });

  // Bind to scroll
  $(window).scroll(function() {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function(v, i) {
      if ($(this).offset().top < fromTop) return this;
    });

    // Get the id of the current element
    cur = cur[cur.length - 1] || scrollItems[0];
    var id = cur && cur.length ? cur[0].id : "";


    // Set/remove active class
    menuItems
      .removeClass(activeClass)
      .filter("[href='#" + id + "']").addClass(activeClass);
  })

})()

$(document).on('click', '.basket__box', function(e) {
  let target = $(this).attr('href');
  $('html, body').animate({
    scrollTop: $(target).offset().top - $('.basket__content').outerHeight(true)
  }, 300);
  e.preventDefault();
});


$(document).mouseup(function(e) {
  var div = $(".things__popup");
  if (!div.is(e.target) && div.has(e.target).length === 0) {
    $('.things__popup ').removeClass('things__popup--active');
   $('.things__col, .checkout__item, .holder-card__item').removeClass('active');
  }
});

$(document).on('click', '.favorites__del', function(){
 $(this).parents('.product__item').remove();
})


$(document).on('click', '.favorites__clear', function(){
  $('.things__popup').addClass('things__popup--active');
})


$(document).on('click', '.favorites .things__elem', function(){
   $('.things__popup').removeClass('things__popup--active');
   
  if($(this).hasClass('things__elem--yes')) {
    $('.product__wrap').remove();
   }
 
})