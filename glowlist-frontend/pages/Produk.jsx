import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Produk() {
    const [produk, setProduk] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProduk = async () => {
      try {
        const res = await fetch("http://localhost:3001/produk");
        const data = await res.json();
        setProduk(data);
      } catch (err) {
        console.error("Gagal fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      getProduk();  
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Yakin ingin menghapus produk ini?")) {
            try {
                const res = await fetch(`http://localhost:3001/produk/${id}`, {
                    method: "DELETE",
                });
                if (res.oke) {
                    alert("Produk berhasil dihapus");
                    getProduk(); // ambil ulang data terbaru
                } else {
                    alert("Gagal menghapus produk");
                }
            } catch (err) {
                console.error("Error saat delete:", err);
                alert("terjadi kesalahan saat menghapus data");
            }
        }
    };

    const handleEdit = (id) => {
        naavigate(`/produk/edit/${id}`);
    };

    if (loading) {
        return <div className="container mt-4">Sedang memuat data...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Daftar Produk Glowlist ✨</h2>
                <Link to="/produk/tambah" className="btn btn-primary">
                  + Tambah Produk
                </Link>
            </div>

            <table className="table table-bordered table-striped">
                <thead className="table-primary">
                    <tr>
                        <th>ID</th>
                        <th>Judul</th>
                        <th>Deskripsi</th>
                        <th>Harga</th>
                    </tr>
                </thead>
                <tbody>
                    {produk.length > 0 ? (
                        produk.map((item) => (
                            <tr key={item.id_produk}>
                                <td>{item.id_produk}</td>
                                <td>{item.judul}</td>
                                <td>{item.deskripsi}</td>
                                <td>Rp {item.harga}</td>
                            </tr>
                        ))
                    ) : (
                     <tr>
                        <td colSpan="4" className="text-center">
                           Belum ada produk
                        </td>
                        <td>
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => handleEdit(item.id_produk)}
                            >
                                EDIT
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(item.id_produk)}
                            >
                                DELETE
                            </button>
                        </td>
                     </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}