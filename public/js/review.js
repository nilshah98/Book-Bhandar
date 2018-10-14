$('.button').click(function() {
    $(this).hide();
      $('.front').addClass('front-open');
      $('.back').addClass('back-open');
      $('.opened').addClass('opened-open');
      $('.modal').show();
      setTimeout(function() {
          $('.modal').addClass('shadow');
      }, 1000);
      setTimeout(function() {
          $('.front').removeClass('front-open');
          $('.back').removeClass('back-open');
          $('.opened').removeClass('opened-open');
      }, 1200);
    $('.wrapper').delay(500).fadeIn();
  });
  
  $('.close').click(function() {
      $('.wrapper').fadeOut(300);
      $('.modal').removeClass('shadow');
      $('.front').addClass('front-close');
      $('.back').addClass('back-close');
      $('.opened').addClass('opened-close');
      setTimeout(function() {
          $('.modal').hide();
          $('.button').show();
          $('.front').removeClass('front-close');
          $('.back').removeClass('back-close');
          $('.opened').removeClass('opened-close');
      }, 1100)
  })
  
  $('.wrapper').click(function() {
      $('.wrapper').fadeOut(300);
      $('.modal').removeClass('shadow');
      $('.front').addClass('front-close');
      $('.back').addClass('back-close');
      $('.opened').addClass('opened-close');
      setTimeout(function() {
          $('.modal').hide();
          $('.button').show();
          $('.front').removeClass('front-close');
          $('.back').removeClass('back-close');
          $('.opened').removeClass('opened-close');
      }, 1100)
  })