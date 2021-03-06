/* COUNTDOWN */
var countDownDate = new Date("Dec 5, 2022 12:00:00").getTime();
console.log(countDownDate);
// Update the count down every 1 second
var x = setInterval(function() {

	// Get today's date and time
	var now = new Date().getTime();

	// Find the distance between now and the count down date
	var distance = countDownDate - now;

	// Time calculations for days, hours, minutes and seconds
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	// Output the result in an element with id="demo"
	if (document.getElementById("countdown-days") != null) {
		document.getElementById("countdown-days").innerHTML = days + " days";
		document.getElementById("countdown-hours").innerHTML = hours + " hours";
		document.getElementById("countdown-minutes").innerHTML = minutes + " minutes";
		document.getElementById("countdown-seconds").innerHTML = seconds + " seconds";
		
		document.getElementById("counth").innerHTML = hours;
		document.getElementById("countm").innerHTML = minutes;
		document.getElementById("counts").innerHTML = seconds;
		
		
		document.getElementById("counth2").innerHTML = hours;
		document.getElementById("countm2").innerHTML = minutes;
		document.getElementById("counts2").innerHTML = seconds;
	}


	// If the count down is over, write some text 
	if (distance < 0) {
		clearInterval(x);
		document.getElementById("countdown-days").innerHTML = "EXPIRED";
		document.getElementById("countdown-hours").innerHTML = "EXPIRED";
		document.getElementById("countdown-minutes").innerHTML = "EXPIRED";
		document.getElementById("countdown-seconds").innerHTML = "EXPIRED";
	}
}, 1000);

// Check Validation
function Validator(options) {

	var selectorRules = {};

	function validate(inputElement, rule) {
		//Ham thuc hien validate
		var errorMessage;
		var errorElemnt = inputElement.parentElement.querySelector(options.errorSelector)

		// L???y ra c??c rules c???a selector
		var rules = selectorRules[rule.selector]

		//L???p qua t???ng rule & ki???m tra
		//N???u l???i th?? d???ng vi???c ki???m tra
		for (var i = 0; i < rules.length; ++i) {
			errorMessage = rules[i](inputElement.value);
			if (errorMessage) break;
		}

		if (errorMessage) {
			errorElemnt.innerHTML = errorMessage;
			inputElement.parentElement.classList.add('invalid')
		} else {
			errorElemnt.innerHTML = '';
			inputElement.parentElement.classList.remove('invalid')
		}
		return !errorMessage;
	}

	// Lay element cua form can validate
	var formElement = document.querySelector(options.form)

	if (formElement) {
		//Khi submit form
		formElement.onsubmit = function(e) {
			//e.preventDefault();

			var isFormValid = true;

			//l???p qua t???ng rule v?? validate
			options.rules.forEach(function(rule) {
				var inputElement = formElement.querySelector(rule.selector)
				var isValid = validate(inputElement, rule);
				if (!isValid) {
					isFormValid = false;
				}
			});

			console.log(formValues);

			if (isFormValid) {
				// Tr?????ng h???p submit v???i javascript
				if (typeof options.onSubmit === 'function') {

					var enableInputs = formElement.querySelectorAll('[name]:not([disabled])')

					var formValues = Array.from(enableInputs).reduce(function(values, input) {
						return (values[input.name] = input.value) && values;
					}, {});

					options.onSubmit(formValues)
					location.href = "signup";

				}
				// Tr?????ng h???p submit v???i h??nh v?? m???c ?????nh
				else {
					formElement.onSubmit();
					location.href = "signup";
				}
			}

		}

		//L???p qua m???i rule v?? x??? l?? (l???ng nghe s??? ki???n blur, input, ..)
		options.rules.forEach(function(rule) {

			//L??u l???i c??c rules cho m???i input
			if (Array.isArray(selectorRules[rule.selector])) {
				selectorRules[rule.selector].push(rule.test)
			} else {
				selectorRules[rule.selector] = [rule.test]
			}


			var inputElement = formElement.querySelector(rule.selector)

			if (inputElement) {
				//X??? l?? tr?????ng h???p blur kh???i input
				inputElement.onblur = function() {
					// value : inputElement.value
					// test func : rule.test
					validate(inputElement, rule)
				}

				//X??? l?? m???i khi ng?????i d??ng nh???p v??o input
				inputElement.oninput = function() {
					var errorElemnt = inputElement.parentElement.querySelector('.form-message');
					errorElemnt.innerHTML = '';
					inputElement.s.classList.remove('invalid')
				}
			}

		})

	}
}

// ?????nh ngh??a rules
// Nguy??n t???c c??c rule:
// 1. Khi c?? l???i => tr??? ra message l???i
// 2.khi h???p l??? => kg tr??? ra c??i g?? c???(undefined)
Validator.isRequired = function(selector, message) {
	return {
		selector: selector,
		test: function(value) {
			return value.trim() ? undefined : message || "Vui l??ng ??i???n v??o ?? tr???ng";
		}
	}
}

Validator.isEmail = function(selector, message) {
	return {
		selector: selector,
		test: function(value) {
			var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return regex.test(value) ? undefined : message || "Vui l??ng nh???p email";
		}
	}
}

Validator.minLength = function(selector, min, message) {
	return {
		selector: selector,
		test: function(value) {
			return value.length >= min ? undefined : message || `Vui l??ng nh???p t???i thi???u ${min} k?? t???`;
		}
	}
}

Validator.isConfirmed = function(selector, getConfirmValue, message) {
	return {
		selector: selector,
		test: function(value) {
			return value === getConfirmValue() ? undefined : message || 'Gi?? tr??? nh???p v??o kh??ng ch??nh s??c'
		}
	}
}

/* CHOOSE COLOR */
var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)

var colors = $$('.option-color__pro')

var colorChosen = $('.option-color__pro.option-color-selected')

colors.forEach((color) => {
	color.onclick = () => {
		$('.option-color__pro.option-color-selected').classList.remove('option-color-selected');

		color.classList.add('option-color-selected')
	}
})


/* QUANTITY-PRODUCT */
let deductBtnArr = document.getElementsByClassName('minus1');
let addButtonArr = document.getElementsByClassName('add1');

for (let deductBtn of deductBtnArr) {
	deductBtn.onclick = function() {
		let currentInputBox = deductBtn.nextElementSibling;
		currentInputBox.value = currentInputBox.value - 1;
	}
}

for (let addButton of addButtonArr) {
	addButton.onclick = () => {
		let currentInputBox = addButton.previousElementSibling;
		currentInputBox.value = parseInt(currentInputBox.value) + 1;
	}
}


/* Change Img */
var mainImg = document.querySelector('.img-main');
var changeImgs = document.querySelectorAll('#img-desc1');
var activeImg = document.querySelector('.view-img__list-item.act');
var noActiveImgs = document.querySelectorAll('.view-img__list-item')

noActiveImgs.forEach((noActiveImg) => {
	noActiveImg.onclick = () => {
		document.querySelector('.view-img__list-item.act').classList.remove('act');
		noActiveImg.classList.add('act');
	}
})
changeImgs.forEach((changeImg) => {
	changeImg.onclick = () => {
		mainImg.src = changeImg.src;
	}
})

/* Zoom img */
/* const cover = document.querySelector('.img-cover');
cover.addEventListener("mousemove", function(e) {
	const screenImage = document.querySelector('.view-img__pro-main');
	const image = document.querySelector('.img-main');
	image.style = "width: auto; height: auto; max-height: unset";

	let imageWidth = image.offsetWidth;
	let imageHeight = image.offsetHeight;
	const screenWidth = screenImage.offsetWidth;
	const screenHeight = screenImage.offsetHeight;
	const spaceX = (imageWidth / 2 - screenWidth) * 2;
	const spaceY = (imageHeight / 2 - screenHeight) * 2;
	imageWidth = imageWidth + spaceX;
	imageHeight = imageHeight + spaceY;

	let x = e.pageX - screenImage.offsetParent?.offsetLeft - screenImage.offsetLeft;
	let y = e.pageY - screenImage.offsetParent?.offsetTop - screenImage.offsetTop;

	const positionX = (imageWidth / screenWidth / 2) * x;
	const positionY = (imageHeight / screenHeight / 2) * y;

	image.style = `left: ${-positionX}px; top: ${-positionY}px;
	width: auto; height: auto; max-height:unset; transform:none;`;
});

cover.addEventListener("mouseleave", function(e) {
	const image = document.querySelector('.img-main');
	image.style = ``;
}) */

/* RANGE */
var elem = document.querySelector('input[type="range"]');

var rangeValue = function() {
	var newValue = elem.value;
	var target = document.getElementById('pro-range__value');
	target.innerHTML = newValue + "??";
}
if (elem) {
	elem.addEventListener("input", rangeValue);
}


function sub(id, price) {
	var chuoi = "#" + id;
	if (Number($(chuoi).val()) > 1) {
		var after = Number($(chuoi).val()) - 1;
		$(chuoi).val(after);
		var tonggiaelement = "#totalPrice" + id;
		var tongtien = after * price;
		$(tonggiaelement).val(tongtien);

		var formElement = "#s" + id;
		var number = $(chuoi).val();
		$(formElement).val(number);
	}
	update();
}

function add(id, price) {
	var chuoi = "#" + id;
	after = Number($(chuoi).val()) + 1;
	$(chuoi).val(after);
	var tonggiaelement = "#" + "totalPrice" + id;
	var tongtien = after * price;
	$(tonggiaelement).val(tongtien);

	var formElement = "#s" + id;
	var number = $(chuoi).val();
	$(formElement).val(number);
	update();
}

function update() {
	var classformpricesingle = document.getElementsByClassName(
		"cart_main_element_title_total"
	);
	var arr = Array.prototype.slice.call(classformpricesingle);
	var sum = 0;
	arr.forEach(function(n) {
		var num = $(n).val();
		console.log(num);
		sum += Number(num);
		console.log(sum);
	});
	$("#total_price").val(Intl.NumberFormat().format(sum));
	$("#total_price_hidden").val(sum);
}


