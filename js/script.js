// harus meggunakan web server
function showAllMenu() {
	$.getJSON('data/pizza.json', function(data) {
		let menu = data.menu;
		$.each(menu, function(i, data) {
			$('#daftar-menu').append(`
					<div class="col col-sm-4 col-md-4 col-lg-4">
	                    <div class="card mb-5">
	                        <img src="img/menu/${data.gambar}" class="card-img-top img-menu">
	                        <a href="" id="btn-plus">
	                            <img src="img/icon/ic-plus.png" class="icon-plus">
	                        </a>
	                        <div class="card-body">
	                            <h6 class="card-title">Rp ${data.harga}</h5>
	                                <p class="card-text">${data.nama}</p>
	                        </div>
	                    </div>
	                </div>
				`);
		});
	});
}

// tampilkan menu
showAllMenu();

// Active Nav-link
$('.nav-link').on('click', function() {
	$('.nav-link').removeClass('active');
	$(this).addClass('active');
	let kategori = $(this).html();

	if (kategori == 'Semua') {
		showAllMenu();
		return;
	}

	// ganti menu
	$.getJSON('data/pizza.json', function(data) {
		let menu = data.menu;
		let content = '';

		$.each(menu, function(i, data) {
			if (data.kategori == kategori.toLowerCase()) {
				content += `
					<div class="col col-sm-4 col-md-4 col-lg-4">
	                    <div class="card mb-5">
	                        <img src="img/menu/${data.gambar}" class="card-img-top img-menu">
	                        <a href="" id="btn-plus">
	                            <img src="img/icon/ic-plus.png" class="icon-plus">
	                        </a>
	                        <div class="card-body">
	                            <h6 class="card-title">Rp ${data.harga}</h5>
	                                <p class="card-text">${data.nama}</p>
	                        </div>
	                    </div>
	                </div>
				`;
			}
		});

		$('#daftar-menu').html(content);
	});

});