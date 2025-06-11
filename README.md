User Management System

ระบบที่ใช้
- Node.js 18+
- npm
- Docker (ถ้าต้องการใช้งานแบบ container)
- MySQL (หรือฐานข้อมูลที่กำหนดใน `.env`)
- Prisma ORM
- Next.js (Frontend)
- Git


วิธีติดตั้งและรันโปรเจค

1. Clone โปรเจค
git clone https://github.com/Jiradech20/UserManagementSystem.git
cd UserManagementSystem

2. Backend

cd backend

# ติดตั้ง dependencies
npm install

# ตั้งค่าไฟล์ environment
cp .env.example .env
# แก้ไข .env ให้ตรงกับการตั้งค่าฐานข้อมูล

# สร้าง Prisma client
npx prisma generate

# รัน backend (โหมดพัฒนา)
npm run dev

Backend จะรันที่พอร์ต 6000 (หรือพอร์ตที่ตั้งไว้ใน .env)

3. Frontend

cd ../frontend

# ติดตั้ง dependencies
npm install

# รัน frontend (โหมดพัฒนา)
npm run dev

Frontend จะรันที่พอร์ต 4000

4. ใช้งานโปรเจค

- เปิดเว็บเบราว์เซอร์ที่ http://localhost:4000 เพื่อเข้าถึงหน้าเว็บ
- Backend API จะอยู่ที่ http://localhost:6000

---

ใช้งานด้วย Docker

ถ้าต้องการรันด้วย Docker Compose ให้สร้างไฟล์ docker-compose.yml ที่เหมาะสมแล้วรัน

docker-compose up --build

---
ขอบคุณที่ที่อ่านครับ ขอบคุณครับ
