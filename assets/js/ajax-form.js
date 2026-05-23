$(document).ready(function () {
    $('#contact-form').submit(function (e) {
        e.preventDefault();

        var form = this;
        var rawAction = $(form).attr('action') || '';
        var resultEl = $('#result');

        // Build the AJAX endpoint URL for FormSubmit
        var actionUrl = rawAction;
        if (rawAction.includes('formsubmit.co') && !rawAction.includes('/ajax/')) {
            actionUrl = rawAction.replace('https://formsubmit.co/', 'https://formsubmit.co/ajax/');
        }

        // Collect form data as a plain object for JSON submission
        var object = {};
        $(form).serializeArray().forEach(function (field) {
            object[field.name] = field.value;
        });

        if (!object.email) {
            resultEl.html('Email field is required.').css('display', 'block');
            return;
        }

        resultEl.html('Please wait...').css('display', 'block');

        fetch(actionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(object)
        })
        .then(function (response) {
            // Read as text first — FormSubmit returns HTML when email not yet activated
            return response.text().then(function (text) {
                var data;
                try {
                    data = JSON.parse(text);
                } catch (err) {
                    data = null; // HTML response = not activated yet
                }

                if (data && (data.success === 'true' || data.success === true)) {
                    resultEl
                        .html(data.message || 'Message sent successfully!')
                        .removeClass('text-gray-400 text-red-500')
                        .addClass('text-green-500');
                    form.reset();
                } else if (data && data.success === 'false') {
                    resultEl
                        .html(data.message || 'An error occurred. Please try again.')
                        .removeClass('text-gray-400 text-green-500')
                        .addClass('text-red-500');
                } else {
                    // FormSubmit not activated yet — submission went through,
                    // but user must confirm email first
                    resultEl
                        .html('Please check official.kodlyx@gmail.com inbox to activate FormSubmit, then resubmit.')
                        .removeClass('text-gray-400 text-red-500')
                        .addClass('text-green-500');
                }

                setTimeout(function () {
                    resultEl.css('display', 'none');
                }, 7000);
            });
        })
        .catch(function (error) {
            console.error('FormSubmit fetch error:', error);
            resultEl
                .html('Network error. Please check your connection and try again.')
                .removeClass('text-gray-400 text-green-500')
                .addClass('text-red-500')
                .css('display', 'block');

            setTimeout(function () {
                resultEl.css('display', 'none');
            }, 7000);
        });
    });
});
