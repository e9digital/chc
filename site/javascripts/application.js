$(document).ready(function() {
  $('a[rel=external]').click(function() {
    window.open(this.href);
    return false;
  });

  jQuery.validator.addMethod('phone', function(val, el) {
    return /^((\d-?\s*)?\(?\d{3}\)?-?\s*\d{3}-?\s*\d{4}\s*)?$/.test(val);
  }, 'invalid'); 

  //jQuery.validator.addMethod('zipcode', function(val, el) {
    //return /^\d{5}$/.test(val);
  //}, 'invalid'); 

  var 
  $form           = $('form#user_input_form'),
  $main           = $('#main'),
  $content        = $('#content'),
  $errorsc        = $('<div id="errorsContainer"><div id="errors" ><h2>Ooops!</h2><p class="user_name"/><p class="user_email"/><p class="user_phone"/></div></div>').hide().appendTo($content),
  $errors         = $errorsc.find("#errors"),
  $thanks         = $('<div id="thanks"/>').hide().appendTo($content),
  scrollToMain    = function() {
    $('html, body').animate({ scrollTop: $main.offset().top - 100 }, 750);
  },
  errorByName     = function(name) {
    return $errors.find("."+name);
  },
  addError        = function(error, element) {
    errorByName(element.attr('name')).html(error.html());
  },
  hidethanks      = function() {
    $thanks.fadeOut()
    $form.removeAttr('disabled');
    return false;
  },
  completeHandler = function() {
    $(':input, textarea', '#user_input_form').val('');

    $thanks
      .html("<div><h2>Thank You!</h2><p>Your Question has been sent to Jessica.</p><p>She'll get back to you shortly with your Answer...</p></div>")
      .fadeIn()
      .find('a').click(hidethanks)
      scrollToMain();
    ;
  }

  $errorsc.click(function() {
    $(this).fadeOut();
  });

  $thanks.click(function() {
    $(this).fadeOut();
  });

  $form.validate({
    groups: { 
      errors: 'user_name user_email user_phone'
    },
    messages: {
      user_name: {
        required: "Name is required."
      },
      user_email: {
        required: "Email is required.",
        email: "Email is not valid."
      },
      user_phone: {
        phone: "Phone number is not valid."
      }
    },
    onclick: false,
    onfocusout: false,
    onkeyup: false,
    errorPlacement: addError,
    errorClass: 'error',
    invalidHandler: function(f, v) {
      $errorsc.fadeIn();
      scrollToMain();
      v.settings.onkeyup = function() {
        v.settings.onkeyup = v.settings.onfocusout = function(element) {
          if ( element.name in this.submitted || element == this.lastElement ) {
            if(this.element(element)) {
              if(this.numberOfInvalids()) {
                errorByName(element.name).slideUp();
              } else {
                v.settings.onkeyup = v.settings.onfocusout = null;
                $errorsc.fadeOut();
              }
            } else {
              errorByName(element.name).slideDown('fast');
            }
          }
        }
      }
    },
    submitHandler: function() {
      if($form.attr('disabled')) return false;
      $form.attr('disabled', true);
      $.ajax({
        url: $form.attr('action'),
        type: 'POST',
        data: $form.serialize(),
        dataType: 'script',
        complete: completeHandler
      });
    }
  });


  $('#title h1').click(function() {
    window.location = "/";
  });
  $('form input[type=image]').hover(
    function() { $(this).attr('src', '/images/submit_over.png'); },
    function() { $(this).attr('src', '/images/submit.png'); }
  );
  $('label.req').append('<span class="star">*</span>');
  $('#footer').append('<div id="bg-gfx"/>');
  $('#e9 a, a.read-more').append('<span class="logo"/>');
  $("#nav li.current")
    .wrapInner('<div class="nav-m" />')
    .prepend('<div class="nav-l" />')
    .append('<div class="nav-r" />')
    .next('li').addClass('next')
  ;

});
