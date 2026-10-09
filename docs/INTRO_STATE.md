# Dokumentasi Keadaan Intro (Intro State)

Video intro CodeMentor AI diputar **hanya sekali per perangkat** (bukan per
sesi). Setelah itu, status disimpan di `localStorage` sehingga intro tidak
diputar lagi meski browser ditutup dan dibuka kembali.

## Kunci penyimpanan

| Kunci                           | Tipe          | Keterangan                                   |
| ------------------------------- | ------------- | -------------------------------------------- |
| `codementor_intro_seen_v1`      | localStorage  | Flag utama. Ada => intro sudah pernah dilihat |
| `codementor_intro_hint_shown`   | localStorage  | Toast "Putar ulang intro" hanya muncul sekali |
| `codementor_intro_seen` (lama)  | sessionStorage| Kunci lama; otomatis dimigrasi lalu dihapus    |

Isi `codementor_intro_seen_v1` berupa JSON:

```json
{
  "seenAt": "2026-10-09T03:00:00.000Z",
  "skipped": false,
  "source": "auto"
}
```

- `source: "auto"` => video selesai diputar
- `source: "skip"` => user menekan tombol "Lewati"
- `source: "esc"` => user menekan tombol Escape

## Cara reset intro (untuk pengguna)

1. Buka halaman mana pun, gulir ke bawah footer.
2. Klik **"Putar ulang intro"** (ikon ⭮, teks abu-abu subtile).
3. Intro langsung diputar ulang tanpa perlu reload.

## Cara reset intro (untuk developer)

Konsol browser:

```js
window.__codementor.resetIntro(); // hapus flag + tampilkan intro
window.__codementor.showIntro();  // tampilkan intro tanpa menghapus flag
window.__codementor.getIntroState(); // lihat status saat ini
```

DevTools **browser** → tab **Application** → **Local Storage** → hapus
`codementor_intro_seen_v1`.

Atau buka incognito (localStorage kosong => intro muncul kembali).

## Parameter URL untuk QA (hanya mode development)

| URL            | Efek                                              |
| -------------- | ------------------------------------------------- |
| `/?intro=force`| Paksa intro tampil, **tidak** menulis flag          |
| `/?intro=reset`| Hapus flag lalu tampilkan intro                    |
| `/?intro=skip` | Lewati intro walau baru pertama kali (tidak menulis flag) |

Di produksi, parameter ini diabaikan.

## Perilaku penting

- **FOUC ditegah**: status awal `loading`, hanya menampilkan intro setelah
  keputusan dibaca dari storage.
- **prefers-reduced-motion**: intro otomatis dilewati (sumber `skip`).
- **Incognito**: localStorage bekerja dalam satu sesi incognito; intro diputar
  sekali per jendela incognito.
- **Beberapa tab**: perubahan flag di satu tab tersinkron lewat event
  `storage` ke tab lain.
- **Storage nonaktif** (Firefox ketat): intro tetap tampil setiap kunjungan
  (fallback aman).
- **Migrasi**: kunci lama `codementor_intro_seen` (sessionStorage) otomatis
  dipindah ke `codementor_intro_seen_v1` lalu dibersihkan.

## Berkas terkait

- `src/hooks/use-intro-state.ts` — hook utama (state, storage, override URL)
- `src/components/intro/intro-context.tsx` — provider + context `useIntro`
- `src/components/intro/intro-video.tsx` — overlay video full-screen
- `src/components/intro/replay-intro-button.tsx` — tombol "Putar ulang intro"
- `src/components/intro/intro-dev-tools.tsx` — panel dev (mode development saja)
- `src/app/layout.tsx` — pemasangan `<IntroProvider>`