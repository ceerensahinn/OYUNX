
const secimler = {
    tas: 'Taş',
    kagit: 'Kağıt',
    makas: 'Makas'
};

const mesajlar = {
    kazan: 'Kazandınız',
    kaybet: 'Kaybettiniz',
    berabere: 'Beraberlik',
};

// Her bir seçim butonuna tıklama
document.querySelectorAll('.secim').forEach(button => {
    button.addEventListener('click', () => {
        // Kullanıcının seçimini al
        const kullaniciSecimi = button.id;
        // Bilgisayarın rastgele bir seçim yapması
        const bilgisayarSecimi = rastgeleSecim();
        const sonucMesaji = sonucHesapla(kullaniciSecimi, bilgisayarSecimi);
        // Mesajı ekranda göster
        document.getElementById('mesaj').textContent = `Bilgisayarın seçimi: ${secimler[bilgisayarSecimi]} - ${sonucMesaji}`;
    });
});

// 1.fonk=function rastgeleSecim->Bilgisayarın rastgele bir seçim yapmasını sağlayan fonksiyon
function rastgeleSecim() {
    // secimler nesnesinibir dizi olarak al
    const secimAnahtarlar = Object.keys(secimler);
    // Anahtarlar arasından rastgele birini seçiyoruz
    return secimAnahtarlar[Math.floor(Math.random() * secimAnahtarlar.length)];
}

// 2.fonk=function sonucHesapla->Kullanıcı ve bilgisayar seçimlerini karşılaştırarak sonucu hesaplayan fonksiyon
function sonucHesapla(kullaniciSecimi, bilgisayarSecimi) {
    // Eğer kullanıcı ve bilgisayarın seçimi aynıysa sonuç berabere olur
    if (kullaniciSecimi === bilgisayarSecimi) {
        return mesajlar.berabere;
    }
    // Kullanıcı seçiminin bilgisayar seçimine göre kazanma durumlarını kontrol 
    if (
        (kullaniciSecimi === 'tas' && bilgisayarSecimi === 'makas') ||
        (kullaniciSecimi === 'kagit' && bilgisayarSecimi === 'tas') ||
        (kullaniciSecimi === 'makas' && bilgisayarSecimi === 'kagit')
    ) {
        return mesajlar.kazan;
    } else {
        // Yukarıdaki şartlar sağlanmıyorsa kullanıcı kaybeder
        return mesajlar.kaybet;
    }
}
