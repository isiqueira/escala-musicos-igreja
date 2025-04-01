# Estágio de construção
FROM node:18-alpine AS builder

WORKDIR /app

# Instala dependências de build
RUN apk add --no-cache git openssh-client python3 make g++

# Cache de dependências
COPY package.json package-lock.json* ./
RUN npm ci

# Copia o restante do código
COPY . .

# Gera o Prisma Client e builda o projeto
RUN npx prisma generate
RUN npm run build

# Remove devDependencies
RUN npm prune --production

# Estágio final
FROM node:18-alpine

WORKDIR /app

# Copia apenas o necessário do builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Variáveis de ambiente (substitua no docker-compose ou runtime)
ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://user:password@db:5432/escala-musicos?schema=public
ENV PORT=3000

EXPOSE 3000

# Comando de inicialização
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
