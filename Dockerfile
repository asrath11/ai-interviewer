# 1️⃣ Use the official Node.js 18 Alpine image
FROM node:22-alpine

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy dependency files
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy all source code
COPY . .

# 6️⃣ Build Next.js app (Turbopack handles this in Next 15)
RUN npm run build

# 7️⃣ Expose app port
EXPOSE 3000

# 8️⃣ Start production server
CMD ["npm", "run", "start"]
