$(document).ready(function() {
  $('a[rel=external]').click(function() {
    window.open(this.href);
    return false;
  });

  $.fn.mailto = function() {
    var $this = $(this),
           id = $this.attr('id'),
         href = $this.attr('href');

    if (id == undefined || href == undefined) return;

    return href.replace(/\s+/, '').replace(' at ', '@').replace(' dot ', '.');
  }

  $('a[rel=email]').click(function() {
    window.open($(this).mailto());
    return false;
  });

  jQuery.validator.addMethod('zipcode', function(val, el) {
    return /^\d{5}(-\d{4})?\s*$/.test(val);
  }, 'invalid'); 

  var 
  $form           = $('form#user_input_form'),
  $main           = $('#main'),
  $errorsc        = $('<div id="errorsContainer"><div id="errors" ><h2>Ooops!</h2><div class="user_email"/><div class="user_zipcode"/></div></div>').hide().prependTo($main),
  $errors         = $errorsc.find("#errors"),
  $thanks         = $('<div id="thanks"/>').hide().prependTo($main),
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
    $thanks.fadeOut('fast')
    $form.removeAttr('disabled');
    return false;
  },
  completeHandler = function() {
    $thanks
      .html("<div class=\"inner\"><h2>Thank You!</h2><p>We'll email you when we are ready to launch in your area.</p><p>To get credit for your FREE <br/>60 Day Premium Membership, make sure you go to our Twitter page and follow us, and make sure you go to our Facebook page and &#8220;Like us.&#8221;</p><p><a href=\"javascript;\" title=\"Close\"><span class=\"icon\"/>Close</a></p></div>")
      .fadeIn('fast')
      .find('a').click(hidethanks)
      scrollToMain();
    ;
  }

  $form.validate({
    groups: { 
      errors: 'user_zipcode user_email'
    },
    messages: {
      user_zipcode: {
        required: "Zipcode is required.",
        zipcode: "Zipcode is not valid."
      },
      user_email: {
        required: "Email is required.",
        email: "Email is not valid."
      }
    },
    onclick: false,
    onfocusout: false,
    onkeyup: false,
    errorPlacement: addError,
    errorClass: 'error',
    invalidHandler: function(f, v) {
      $errorsc.fadeIn('fast');
      scrollToMain();
      v.settings.onkeyup = function() {
        v.settings.onkeyup = v.settings.onfocusout = function(element) {
          if ( element.name in this.submitted || element == this.lastElement ) {
            if(this.element(element)) {
              if(this.numberOfInvalids()) {
                errorByName(element.name).slideUp('fast');
              } else {
                v.settings.onkeyup = v.settings.onfocusout = null;
                $errorsc.fadeOut('fast');
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
        data: $form.serialize(),
        dataType: 'script',
        complete: completeHandler
      });
    }
  });

  $('form input[type=image]').hover(
    function() { $(this).attr('src', '/images/btns_submit_over.png'); },
    function() { $(this).attr('src', '/images/btns_submit.png'); }
  );

  $('div.box-text').after('<div class="arrow"/>');
  $('label.req').append('<span class="star"/>');
  $('a.contact-us').prepend('<span class="icon"/>');
  $('#e9 a').append('<span class="logo"/>');
  $('#contact a').wrap('<div id="middle"/>');
  $('#contact').append('<div id="bottom"/>');
  $('body').append('<div id="filofax"/>');


});
