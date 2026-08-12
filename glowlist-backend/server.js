const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'glowlist_db'
});

db.connect(err => {
    if (err) {
        console.error('Gagal konek ke database:', err);
    } else {
        console.log('Berhasil konek ke database Glowlist');
    }
});
const PORT = 3001;
app.use(express.json());

app.get('/', (req,res) => {
    res.send('Selamat Datang di Glowlist API sudah berjalan');
});

app.get('/produk', (req,res) => {
    const sql = 'Select * FROM produk';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

app.post('/produk', (req, res) => {
    const { judul, deskripsi, harga, id_kategori } = req.body;

    if (!judul || !harga) {
        return res.status(400).json({ message: 'Judul dan harga wajib di isi'});
    }

    const sql = 'INSERT INTO produk (judul, deskripsi, harga, id_kategori, tgl_input) VALUES (?, ?, ?, ?, NOW())';
    db.query(sql, [judul, deskripsi, harga, id_kategori], (err, results) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json({
            message: 'Produk berhasil ditambahkan!',
            id_produk: results.insertId
        });
    });
});

app.get('/kategori', (req,res) => {
    const sql = 'Select * FROM kategori';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server  Glowlist jalan di http://localhost:${PORT}`);
});