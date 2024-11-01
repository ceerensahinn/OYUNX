document.addEventListener('DOMContentLoaded', function() {
    // Giriş Sayfası
    if (document.getElementById('girisFormu')) {
        document.getElementById('girisFormu').addEventListener('submit', function(event) {
            event.preventDefault();
            var kullaniciAdi = document.getElementById('kullaniciAdi').value;
            localStorage.setItem('kullaniciAdi', kullaniciAdi);
            window.location.href = '../html/index.html'; // Giriş yaptıktan sonra index sayfasına yönlendirme
        });
    }

    // Ana Sayfa
    if (document.getElementById('kullanicigirisi')) {
        var kullaniciAdi = localStorage.getItem('kullaniciAdi');
        document.getElementById('kullanicigirisi').innerText = kullaniciAdi ? `Hoş geldin, ${kullaniciAdi}` : 'Kullanıcı';
        document.getElementById('dropdownKullaniciAdi').innerText = kullaniciAdi;

        document.getElementById('kullanicisembol').addEventListener('click', function() {
            document.querySelector('.acilir-menu').classList.toggle('show');
        });

        document.getElementById('cikisYapBtn').addEventListener('click', function() {
            localStorage.removeItem('kullaniciAdi');
            window.location.href = '../html/index.html'; // Çıkış yapıldığında index sayfasına yönlendirme
        });

        // Dropdown menünün dışına tıklayınca kapanması için
        document.addEventListener('click', function(event) {
            var dropdown = document.querySelector('.acilir-menu');
            var kullaniciIkonu = document.getElementById('kullanicisembol');

            if (!kullaniciIkonu.contains(event.target) && dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }
});

