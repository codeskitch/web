function OnSubmit(e) {    
    Submit(e,'');
}
function Submit(e,mailer)
{
    e.preventDefault();
    var btn = $('#btnSubmit');
    //btn.button('reset')
    
    var name = $('input[name="name"]').val();
    var email = $('input[name="email"]').val();
    var phone = $('input[name="phone"]').val();
    var message = $('textarea[name="message"]').val();

    var isValid = true;
    if (name.replace(' ', '') == "") {
        isValid = false;
    }

    var filter = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (!filter.test(email)) {
        isValid = false;
    }

    if (message.replace(' ', '') == "") {
        isValid = false;
    }

    if (isValid) {
        btn.button('loading');

        var param = {
            "name": name,
            "email": email,
            "phone": phone,
            "message": message
        };

        $.ajax({
            url: 'http://assets.codeskitch.com/mailer'+mailer+'.php',
            data: param,
            type: 'POST',
            dataType: "json",
            success: function (data) {
                if (data.status) {
                    btn.button('complete');
                    setTimeout(
                       function () {
                           $('form').fadeOut();
                       }
                        , 500);
                    setTimeout(function () {
                        $('#mailsent').fadeIn();
                        $('form').remove()
                    }
                        , 1000)
                } else {
                    $(".alert").fadeOut();
                    setTimeout(function () {
                        $("#fail-alert").fadeIn()
                        }
                        , 1000);
                }
            },
            error: function (data) {                
                    setTimeout(function () {
                        $("#fail-alert").fadeIn()
                    }
                        , 1000)               
            }
        });
    }
    else {
        $(".alert").fadeOut();
        setTimeout(function () {
            $("#error-alert").fadeIn()
        }
                       , 1000);
    }
    return false;
}
