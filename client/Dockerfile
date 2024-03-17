# Etapa de construção
FROM node:18-alpine AS builder

WORKDIR /app

# Copia apenas os arquivos necessários para a instalação de dependências
COPY package.json yarn.lock ./

# Instalação das dependências
RUN yarn install --frozen-lockfile

# Adiciona todos os arquivos restantes
COPY . .

# Construção da aplicação
RUN yarn build

# Etapa de produção
FROM node:18-alpine

WORKDIR /app

# Copia apenas os artefatos de construção da etapa anterior
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./.env

# Expor a porta da aplicação
EXPOSE 3000

# Comando de inicialização da aplicação
CMD ["yarn", "start"]
