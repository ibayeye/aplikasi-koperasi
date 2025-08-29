# 🏦 Aplikasi Koperasi

Sistem manajemen koperasi modern yang terdiri dari backend Laravel dan frontend React dengan teknologi terkini.

## 📋 Daftar Isi

- [🎯 Overview](#-overview)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Requirements](#-requirements)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Setup Detail](#-setup-detail)
- [🤝 Contributing](#-contributing)

---

## 🎯 Overview

Aplikasi Koperasi adalah sistem manajemen koperasi yang menyediakan fitur-fitur lengkap untuk mengelola anggota, simpanan, pinjaman, dan transaksi koperasi. Dibangun dengan arsitektur modern menggunakan Laravel sebagai backend API dan React sebagai frontend.

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Laravel 12
- **Language**: PHP 8.3.16
- **Database**: MySQL/MariaDB
- **Build Tool**: Vite (untuk asset compilation)

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit

---

## 📦 Requirements

Pastikan system Anda memiliki:

| Software | Version | Required |
|----------|---------|----------|
| PHP | >= 8.3.16 | ✅ |
| Composer | >= 2.7.7 | ✅ |
| Node.js | v22.18 | ✅ |
| NPM | v10+ | ✅ |
| MySQL/MariaDB | Latest | ✅ |
| Git | Latest | ✅ |

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/ibayeye/aplikasi-koperasi.git
cd aplikasi-koperasi
```

### 2. Setup Backend & Frontend

```bash
# Setup Backend
cd backend
composer install
npm install

# Setup Frontend  
cd ../frontend
npm install
```

### 3. Jalankan Aplikasi

```bash
# Terminal 1 - Backend
cd backend
php artisan serve

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Akses aplikasi di:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000

---

## 📁 Project Structure

```
aplikasi-koperasi/
├── backend/          # Laravel API Backend
├── frontend/         # React Frontend
├── docs/            # Dokumentasi
└── README.md        # File ini
```

---

## 🔧 Setup Detail

### 🔙 Backend Setup (Laravel)

#### 1. Masuk ke direktori backend
```bash
cd backend
```

#### 2. Install dependencies
```bash
composer install
npm install
```

#### 3. Konfigurasi Environment
```bash
# Copy file environment
cp .env.example .env
```

#### 4. Edit file `.env`

**Ubah dari:**
```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=sqlite
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=laravel
# DB_USERNAME=root
# DB_PASSWORD=
```

**Menjadi:**
```env
APP_NAME="Aplikasi Koperasi"
APP_ENV=local
APP_KEY=base64:B1wUDCj6ThX0jyUCPOG7lCSv66agJ1/DwKkDi5fop+I=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=aplikasi-koperasi
DB_USERNAME=root
DB_PASSWORD=
```

> ⚠️ **Penting**: Buat database MySQL dengan nama `aplikasi-koperasi` sebelum melanjutkan

#### 5. Generate key & Setup database
```bash
# Generate application key
php artisan key:generate

# Jalankan migrasi dan seeder
php artisan migrate --seed
```

#### 6. Jalankan server
```bash
php artisan serve
```

### 🔄 Frontend Setup (React)

#### 1. Masuk ke direktori frontend
```bash
cd frontend
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Jalankan development server
```bash
npm run dev
```

---

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📞 Support

Jika mengalami masalah atau memiliki pertanyaan:

- 📧 **Email**: [iqbal.gitlab@gmail.com]
- 🐛 **Issues**: [GitHub Issues](https://github.com/ibayeye/aplikasi-koperasi/issues)
- 📖 **Wiki**: [Project Wiki](https://github.com/ibayeye/aplikasi-koperasi/wiki)

---
