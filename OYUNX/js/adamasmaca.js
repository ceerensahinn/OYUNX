// Bu kodda kullanılan tüm foksiyonlar sırasıyla numaralandrılmıştır
//tahmin edilecek kelimler 
const kelimeler = ["Tavşan", "Sincap", "Yarasa", "Timsah", "Kartal", "Baykuş", "Leopar", "Sırtlan", "Kaplan", "Akbaba", "Ceylan", "Civciv", "İbibik", "Fülfül", "Kuzgun", "Balina", "Neheng", "Bufalo", "İguana", "İmpala", "Jaguar", "Kunduz", "Maymun", "Karaca", "Kayman", "Langur", "Porsuk", "Panter", "Sansar", "Zürafa", "Yengeç", "Tırtıl","Ördek"];
//Kullanılacak değişken tanımları
let mevcutKelime, tahminEdilenHarfler, yanlisTahminSayisi, maxYanlisTahminSayisi;
//Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    //fonk-1:oyunBaslat()
    oyunuBaslat();

    document.getElementById('tahmin-et').addEventListener('click', harfTahmini);
    document.getElementById('tekrar-oyna').addEventListener('click', oyunuBaslat);
});

function oyunuBaslat() {
    //kelime seç ve harfleri büyük yap
    mevcutKelime = kelimeler[Math.floor(Math.random() * kelimeler.length)].toUpperCase();
    tahminEdilenHarfler = [];
    yanlisTahminSayisi = 0;
    maxYanlisTahminSayisi = 6;
    //fonk-2: kelimeyi güncelle
    kelimeGoster();
    //fonk-3:adam görsellini günceller
    adamGuncelle();
    //ekrandaki mesajı sil
    document.getElementById('mesaj').textContent = '';
    //harf kutusunu temizle
    document.getElementById('harf-gir').value = '';
    document.getElementById('harf-gir').disabled = false;
    document.getElementById('tahmin-et').disabled = false;
    //butonu gizler
    document.getElementById('tekrar-oyna').style.display = 'none';
}

function kelimeGoster() {
    let kelimeGoster = document.getElementById('kelime-göster');
    if (kelimeGoster) {
        // Mevcut kelimenin her bir harfi için tahmin edilip edilmediğini kontrol eder.
        // Eğer harf tahmin edildiyse harfi, edilmediyse '_' karakterini gösterir.
        let gosterilenKelime = mevcutKelime.split('').map(harf => 
            tahminEdilenHarfler.includes(harf) ? harf : '_'
        ).join(' ');
       // kelimeyi HTML içeriğine ekler
        kelimeGoster.textContent = gosterilenKelime;

        if (!gosterilenKelime.includes('_')) {
            document.getElementById('mesaj').textContent = 'Tebrikler, kazandınız!';
            document.getElementById('harf-gir').disabled = true;
               // "Tahmin et" butonunu devre dışı bırakır.
            document.getElementById('tahmin-et').disabled = true;
            document.getElementById('tekrar-oyna').style.display = 'inline';
        }
    } else {
        console.error('kelime-göster öğesi bulunamadı!');
    }
}

function adamGuncelle() {
    document.getElementById('adam').style.backgroundImage = `url('../gorseller/adamasmacagorsel/adam${yanlisTahminSayisi}.svg')`;
}

function harfTahmini() {
    const harf = document.getElementById('harf-gir').value.toUpperCase();
    if (harf && !tahminEdilenHarfler.includes(harf)) {
        tahminEdilenHarfler.push(harf);
        if (mevcutKelime.includes(harf)) {
            kelimeGoster();
        } else {
            yanlisTahminSayisi++;
            adamGuncelle();
             // Eğer yanlış tahmin sayısı maksimumu geçerse (oyuncu kaybederse
            if (yanlisTahminSayisi >= maxYanlisTahminSayisi) {
                document.getElementById('mesaj').textContent = `Üzgünüm, kaybettiniz! Doğru kelime: ${mevcutKelime}`;
                document.getElementById('harf-gir').disabled = true;
                 // "Tahmin et" butonunu devre dışı bırakır.
                document.getElementById('tahmin-et').disabled = true;
                // "Tekrar oyna" butonunu gösterir.
                document.getElementById('tekrar-oyna').style.display = 'inline';
            }
        }
    }
       // oyuncu yeni bir tahmin yapabilsin diye harf kutusunu temizler 
    document.getElementById('harf-gir').value = '';
}
