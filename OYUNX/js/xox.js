document.addEventListener("DOMContentLoaded", function() {
    var siraKimde = "x"; // Sıra kimde: varsayılan "x"
    var hucreler = document.querySelectorAll('.hucre');
    var resetDugmesi = document.getElementById('resetDugmesi');
    var ikiKisilikDugme = document.getElementById('ikiKisilikDugme');
    var bilgisayarDugme = document.getElementById('bilgisayarDugme');
    var mesaj = document.getElementById('mesaj');
    var puanX = document.getElementById('puanX');
    var puanO = document.getElementById('puanO');
    var oyunModu = "ikiKisilik"; // Varsayılan oyun modu: 2 Kişilik
    var puanlar = { x: 0, o: 0 }; // Puanları saklamak için nesne

    function oyunuBaslat() {
        hucreler.forEach(function(hucre) {
            hucre.classList.remove("x", "o");
            hucre.dataset.deger = "bos"; // Hucre boş
            hucre.textContent = ''; // Hucre içeriğini temizle
            hucre.onclick = hucreTiklama; // Tıklama olayını ayarla
        });
        siraKimde = "x"; // İlk sırayı "x" olarak ayarla
        mesaj.textContent = ''; // Mesajı temizle
        if (oyunModu === "bilgisayar") setTimeout(bilgisayarHamlesi, 500); // Bilgisayarın hamlesi için kısa bir gecikme
    }

    function hucreTiklama(event) {
        var hucre = event.target;
        if (hucre.dataset.deger === "bos") {
            hucre.classList.add(siraKimde);
            hucre.dataset.deger = siraKimde; // Hucre değerini güncelle
            hucre.textContent = siraKimde === "x" ? "X" : "O"; // Hucre içine X veya O ekle
            siraKimde = siraKimde === "x" ? "o" : "x"; // Sırayı değiştir
            kazananKontrol(); // Kazananı kontrol et
            if (oyunModu === "bilgisayar" && siraKimde === "o") setTimeout(bilgisayarHamlesi, 900); // Bilgisayar hamlesi
        }
    }

    function kazananKontrol() {
        var kazanan = null;
        var kazanmaKombinasyonlari = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        kazanmaKombinasyonlari.forEach(function(kombinasyon) {
            var [a, b, c] = kombinasyon;
            if (hucreler[a].dataset.deger !== "bos" &&
                hucreler[a].dataset.deger === hucreler[b].dataset.deger &&
                hucreler[a].dataset.deger === hucreler[c].dataset.deger) {
                kazanan = hucreler[a].dataset.deger; // Kazananı belirle
            }
        });

        if (kazanan) {
            mesaj.textContent = kazanan === "x" ? "Tebrikler! X Kazandı!" : "Tebrikler! O Kazandı!";
            puanlar[kazanan]++;
            puanlariGuncelle(); // Puanları güncelle
            hucreler.forEach(hucre => hucre.onclick = null); // Tıklama olayını kaldır
        } else if ([...hucreler].every(hucre => hucre.dataset.deger !== "bos")) {
            mesaj.textContent = "Beraberlik!";
        }
    }

    function bilgisayarHamlesi() {
        var bosHucreler = [...hucreler].filter(hucre => hucre.dataset.deger === "bos");
        if (bosHucreler.length > 0) {
            var seciliHucre = bosHucreler[Math.floor(Math.random() * bosHucreler.length)];
            seciliHucre.classList.add("o");
            seciliHucre.dataset.deger = "o"; // Bilgisayarın hamlesi
            seciliHucre.textContent = "O"; // Bilgisayarın hamlesini ekle
            siraKimde = "x"; // Sıra "x" oldu
            kazananKontrol(); // Kazananı kontrol et
        }
    }

    function puanlariGuncelle() {
        puanX.textContent = `X: ${puanlar.x}`; // X puanını güncelle
        puanO.textContent = `O: ${puanlar.o}`; // O puanını güncelle
    }

    ikiKisilikDugme.onclick = function() { oyunModu = "ikiKisilik"; oyunuBaslat(); }; // İki kişilik mod butonu
    bilgisayarDugme.onclick = function() { oyunModu = "bilgisayar"; oyunuBaslat(); }; // Bilgisayar modu butonu
    resetDugmesi.onclick = oyunuBaslat; // Sıfırlama butonu

    oyunuBaslat(); // Oyunu başlat
});
