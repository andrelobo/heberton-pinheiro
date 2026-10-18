(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        margin: 45,
        dots: false,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:4
            },
            768:{
                items:6
            },
            992:{
                items:8
            }
        }
    });

    // Form handling — envio via WhatsApp (wa.me)
    $('form[id$="-form"]').on('submit', function(e) {
        e.preventDefault();
        var form = $(this);
        var formId = form.attr('id');
        var submitBtn = form.find('button[type="submit"]');
        var originalText = submitBtn.html();

        // Monta a mensagem com label + valor de cada campo preenchido
        var lines = [];
        form.find('input, select, textarea').each(function() {
            var $el = $(this);
            var val = $el.val();
            if (!val) { return; }
            var id = $el.attr('id');
            var label = id ? form.find('label[for="' + id + '"]').text() : ($el.attr('name') || '');
            label = label.replace(/\s*\*+\s*/g, '').replace(/\s+/g, ' ').trim();
            lines.push(label + ': ' + val);
        });

        if (!lines.length) {
            return;
        }

        var title = (formId === 'partner-form')
            ? 'Nova Proposta de Parceria - Site Heberton Pinheiro'
            : 'Nova Inscricao de Voluntario - Site Heberton Pinheiro';
        var text = encodeURIComponent(title + '\n\n' + lines.join('\n'));
        var url = 'https://wa.me/5592984392169?text=' + text;

        submitBtn.prop('disabled', true).html('<i class="fa fa-spinner fa-spin me-2" aria-hidden="true"></i>Abrindo WhatsApp...');

        window.open(url, '_blank', 'noopener');

        form[0].reset();
        submitBtn.prop('disabled', false).html(originalText);
        $('#' + formId.replace('-form', '-success')).removeClass('d-none').attr('tabindex', '-1').focus();
    });
    
})(jQuery);

