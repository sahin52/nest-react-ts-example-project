
Postgresql database için google cloud kullanılmaya çalışıldı ancak bir türlü bağlantı kurulamayınca lokal database kuruldu


# Generates new resource I guess
npx nest generate resource

# database migration
npx prisma migrate dev --name init2

# initialize prisma
npx prisma init