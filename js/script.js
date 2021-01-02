// harus meggunakan web server
function showAllMenu() {
	$.getJSON('data/pizza.json', function(data) {
		let menu = data.menu;
		$('#daftar-menu').empty();
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
$('.menu-kategori').on('click', function() {
	$('.menu-kategori').removeClass('active');
	$(this).addClass('active');

	// tombol kategori di klik
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

// store-text show
$(window).on('load', function() {
	$('.store-text').addClass('show-text');
});

// costum-jumbotron show 
$(window).on('load', function() {
	$('.costum-jumbotron').addClass('show-jumbotron');
});

// efek show ketika di scroll
$(window).scroll(function() {
	const wScroll = $(this).scrollTop();

	// show card
	if (wScroll > $('.my-store').offset().top - 70) {
		$('.card').each(function(i) {
			setTimeout(function() {
				$('.card').eq(i).addClass('show');
			}, 300 * (i + 1));
		});
	}

	// show new-costum-jumbotron
	if (wScroll > 2000) {
		$('.new-costum-jumbotron').addClass('show-costum-jumbotron');
	}

});
