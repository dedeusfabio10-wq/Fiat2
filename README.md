# Fiat - Santuário Digital ✝️

O Fiat é um aplicativo católico premium (PWA) focado na organização da vida de oração, Santo Terço guiado e liturgia diária. Construído com React, Vite e Supabase.

## 🚀 Guia Rápido de Publicação

### 1. Configuração do Banco de Dados (Supabase)
1. Crie uma conta no [Supabase](https://supabase.com).
2. Crie um novo projeto (ex: `fiat-app`).
3. No menu lateral, vá em **SQL Editor**.
4. Cole o conteúdo do arquivo `supabase_setup.sql` deste repositório.
5. Clique em **Run**. (Este script é seguro para rodar múltiplas vezes).
6. Vá em **Settings > API** e copie:
   - `Project URL` (URL do Projeto)
   - `anon` / `public` key (Chave pública)

### 2. Autenticação
1. No Supabase, vá em **Authentication > Providers**.
2. Habilite o **Email** (desabilite "Confirm email" se quiser login imediato para testes).

### 3. Deploy na Vercel
1. Crie uma conta na [Vercel](https://vercel.com) e instale o [Vercel CLI](https://vercel.com/docs/cli) ou conecte seu GitHub.
2. Importe este repositório.
3. Em **Environment Variables**, adicione:
   
   | Nome | Valor (Exemplo) |
   |------|----------------|
   | `VITE_SUPABASE_URL` | `https://sua-url.supabase.co` |
   | `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5c...` |
   
   *(Opcional - Para Pagamentos)*
   - `VITE_MP_LINK_MONTHLY`: Link do Mercado Pago (Checkout Pro)
   - `VITE_MP_LINK_YEARLY`: Link do Mercado Pago (Checkout Pro)

4. Clique em **Deploy**.

## ✨ Recursos do App

- **Santo Terço**: Voz guiada e contagem de contas.
- **Liturgia Diária**: Conectado à API da CNBB.
- **Planner Espiritual**: Salvo na nuvem com Supabase.
- **Modo Premium**: Sistema de assinaturas simulado ou real via Mercado Pago.

## 🛠️ Comandos Locais

```bash
# Instalar dependências
npm install

# Rodar localmente
npm run dev

# Gerar build de produção
npm run build
```

---
*Ad Maiorem Dei Gloriam*