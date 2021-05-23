$(document).ready(function () {

    // Add smooth scrolling to all links
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            let hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 200, function () {
                //   window.location.hash = hash;
            });
        }
    });

    const openSignupModal = () => {
        $('#registerModal').modal({ backdrop: 'static', keyboard: false })
        $('#mobileNumber').focus();
    }

    const closeSignupModal = () => {
        $('#registerModal').modal('hide')
        $("#mobileNumber").val('');
        changeText();
    }

    $("#signInButn").on('click', openSignupModal);
    $("#registerCloseBtn").on('click', closeSignupModal);

    var a = 0;
    $(window).scroll(function () {

        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById("myBar").style.width = scrolled + "%";
        var oTop = $('#counter-stats').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
            $('.counting').each(function () {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                },

                    {

                        duration: 2000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $this.text(this.countNum);
                            //alert('finished');
                        }

                    });
            });
            a = 1;
        }

    });

    $("#signInBtn").on("click", function (e) {
        e.preventDefault();
        var mobNum = $("#mobileNumber").val();
        var filter = /^\d{10}$/;
        if (!mobNum) {
            changeText("Required");
            return false;
        }
        if (filter.test(mobNum)) {
            if (mobNum.length == 10) {
                changeText();
            } else {
                changeText("Please enter 10  digit mobile number");
                return false;
            }
        } else {
            changeText("Please enter valid number");
            return false;
        }
        $(this).prop('disabled', true);
        $(this).append(`<div id="signInSpinner" class="spinner-border text-light spinner-border-sm" role="status"><span class="sr-only">Loading...</span></div>`);
        validateMobileNumber({ phoneNumber: mobNum });
    });

    const validateMobileNumber = async ({ phoneNumber }) => {
        var request = $.ajax({
            url: "/login",
            type: "POST",
            data: { phoneNumber },
            success: getOTP,
            error: (err) => {
                console.log(err)
            }
        });

    }

    const getOTP = resp => {
        console.log(resp)
        // if(resp.status === 200) {
            $("#mobileNumber").prop('disabled', false);
            $("#signInBtn").hide();
            $("#otpSubmitBtn").show();
        // }
    }

    const changeText = text => {
        $('#mobileError').empty();
        $('#mobileError').append(text);
    }


    $('.timepicker').timepicker({
        interval: 15,
        scrollbar: true
    });
    const cars = [{
        image: 'car_mini',
        name: 'Picco Mini',
        upto: 43,
        amount: 43,
        originalAmt: 32,
        save: 56,
        km: 44
    }, {
        image: 'car_sedan',
        name: 'Picco Sedan',
        upto: 43,
        amount: 43,
        originalAmt: 32,
        save: 56,
        km: 44
    }, {
        image: 'car_suv',
        name: 'Picco SUV',
        upto: 43,
        amount: 43,
        originalAmt: 32,
        save: 56,
        km: 44
    }];
    cars.forEach(({
        image,
        name,
        upto,
        amount,
        originalAmt,
        save,
        km
    }) => {

        $('#carsList').append(`
	        			<div class="row borderRadius mt-3">
	        			<div class="col-3">
	        			<img src="<?= base_url('assets/images/${image}.png') ?>" class="d-block img-fluid " alt="car_mini">
	        			</div>
	        			<div class="col-2">
	        			<div class="row justify-content-start align-items-center h-100">
	        			<div class="d-block text-center text-dark h5">${name}</div>
	        			</div>
	        			</div>
	        			<div class="col-4 bg-light">
	        			<div class="row h-100 justify-content-around align-items-center">
	        			<div>
	        			<del class="text-danger h4 d-block">₹${amount}</del>
	        			<div class="text-success">Save ₹${save}</div>
	        			</div>
	        			<div>
	        			<div class="d-block h3">₹${originalAmt}</div>
	        			<div class="d-block small">up to ${km} km</div>
	        			</div>
	        			</div>
	        			</div>
	        			<div class="col-3">
	        			<div class="row h-100 justify-content-end align-items-center">
	        			<button onclick="carSelectHandle('${name}')" class="btn btn-picco w-50" oncli>select</button>
	        			</div>
	        			</div>
	        			</div>`)
    });

    // $('.timepicker').timepicker('startDate', new Date());
    $('.datepicker').datepicker({
        startDate: new Date()
    });
    // Toggle menu on click
    $('.menu-toggle').click(function () {
        $(".nav ").toggleClass("mobile-nav ");
        $(this).toggleClass("is-active ");
    })
    $('.datepicker').on('change', e => {
        let today = moment().format('MM/DD/YYYY')
        if (today === e.target.value) {
            const a = moment('09:45pm', 'h:mma');
            const b = moment(moment().format('h:mma'), 'h:mma');
            const roundedUp = Math.ceil(moment().minute() / 15) * 15;
            if (b.isBefore(a)) {
                $(".timepicker ").prop("disabled ", false);
                $(".timepicker ").timepicker('setTime', moment().add(2, 'hours').minute(roundedUp).second(0).format('hh:mma'));
                $('.timepicker').timepicker('option', 'minTime', moment().add(2, 'hours').format('hh:mma'));
            } else {
                $(".timepicker ").prop("disabled ", true);
            }
        } else {
            $(".timepicker ").prop("disabled ", false);
            $('.timepicker').timepicker('option', 'minTime', '12:00am');
        }
    });


});