console.log("Скрипт загружен")
let formData = new FormData();

var buttonsubmit = document.forms[0].elements[1];
buttonsubmit.addEventListener( "click" , buttonPressed);

function buttonPressed(evt) {
	console.log("Кнопка нажата загружен");
	evt.preventDefault();
	
	if(document.forms[0].elements[0].value == 'user'){
	Swal.fire(
			'Ошибка!',
			'Вы не ввели имя!',
			'error'
		)
		console.log("Вы не ввели имя");
	}
	else{
		formData.append('userName', document.forms[0].elements[0].value);
		Swal.fire({
			position: "center",
			icon: "success",
			title: "Ваше имя " + formData.get("userName"),
			showConfirmButton: false,
			timer: 1500
		}
		)
		setTimeout(function() {document.location.href = "../game/game.html";},1500);
		console.log("Перешли на страницу игры");
	}
}