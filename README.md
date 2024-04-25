# Kurulum

Şu anda ne yazık ki sadece lokalde çalışan bir uygulama  
be -> backend'in olduğu klasör,
ui -> UI'ın olduğu klasör.  

Lokal bilgisayarıma postgresql kurarak pg bağlantısı kurabildim. Gcloud denedim ancak database'e erişemedim, sanırım connection string'imde bir hata vardı.

Be klasörü için Örnek .env dosyası şu şekilde:

```
DB_USER=postgres
DB_PASS=a60e247e-30f8-4171-864b-cd80e1f45143
DB_HOST=localhost
DB_PORT=5432
DB_BASE=product-pinner
DATABASE_URL=postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_BASE}
```

UI için .env klasörü de bu şekilde:
```
PORT=3001
```
# Yönergeler
- Be klasörüne gidin
- .env dosyası oluşturup içeriğini yukarıdaki şekilde doldurun, postgresql databaseine ihtiyacınız olacak.
- `npm i`, veya `npm ci` komutunu çalıştırın
- database migration için ` npx prisma migrate dev --name init ` komutunu çalıştırın.
- database'inizin şu anda tabloları oluşturmuş olması gerekiyor.
- `npm run start:dev` komutunu çalıştırarak başlatın.
- browser'dan http://localhost:3000/create-mock-products sayfasına giderek, veya http://localhost:3000/create-mock-products'e get isteği atarak mock veri yükleyebilirsiniz

- Ui klasörüne gidin
- `npm i` veya `npm ci` komutunu çalıştırın.
- .env dosyasını güncelleyip port belirtin.
- `npm start` komutuyla başlatın.

