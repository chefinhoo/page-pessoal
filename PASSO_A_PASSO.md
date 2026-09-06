<!-- © 2026 Danilo Ramos | daniloramos.dev.br | Todos os direitos reservados. -->

# 📋 PASSO A PASSO — Publicar no GitHub Pages e Personalizar

> Projeto: **page-pessoal** · Conta: **chefinhoo** · URL final: https://chefinhoo.github.io/page-pessoal/
> Projeto: **daniloramos.dev.br** · Autor: **Danilo Ramos**

Este guia cobre, em ordem, tudo o que precisa ser feito:

1. [Preparar o repositório local](#1-preparar-o-repositório-local)
2. [Criar o repositório no GitHub](#2-criar-o-repositório-no-github)
3. [Ativar o GitHub Pages](#3-ativar-o-github-pages)
4. [Publicar (primeiro push e deploys automáticos)](#4-publicar-primeiro-push-e-deploys-automáticos)
5. [Personalizar a página](#5-personalizar-a-página)
6. [Checklist final](#6-checklist-final)

---

## 1. Preparar o repositório local

O projeto **não** tem o Git inicializado ainda. Na pasta do projeto (`daniloramos.dev.br`):

```powershell
# 1. Inicializar o Git na raiz do projeto
git init

# 2. Definir o ramo padrão como main
git branch -M main
```

> ✅ **Importante:** o arquivo `.gitignore` já exclui `node_modules`, `dist`, `*.log`, `.opencode/`, `AGENTS.md` e arquivos de editor. Ou seja, **os arquivos de agentes/AI não serão enviados ao GitHub.**

## 2. Criar o repositório no GitHub

Crie o repositório **`page-pessoal`** na conta **`chefinhoo`** (público ou privado, como preferir):

- Acesse https://github.com/new
- **Repository name:** `page-pessoal`
- **Description (opcional):** `Portfólio pessoal de Danilo Ramos — Desenvolvedor Full Stack (React + Vite)`
- **Visibility:** Público ou privado
- **NÃO** marque "Add a README", "Add .gitignore" ou "Add a license" (os arquivos já vêm deste projeto).

Depois, conecte o repositório local ao remoto:

```powershell
git remote add origin https://github.com/chefinhoo/page-pessoal.git
```

## 3. Ativar o GitHub Pages

O projeto já vem com o arquivo `.github/workflows/deploy.yml` (publicação automática via GitHub Actions).

1. Depois do **primeiro push** (passo 4), acesse o repositório em:
   `Settings → Pages` (https://github.com/chefinhoo/page-pessoal/settings/pages)
2. Em **Build and deployment → Source**, escolha **"GitHub Actions"**
3. **Save** — a partir daí toda alteração na branch `main` publica sozinha em:
   `https://chefinhoo.github.io/page-pessoal/`

## 4. Publicar (primeiro push e deploys automáticos)

```powershell
# conferir o estado antes (node_modules e dist NÃO devem aparecer)
git status

# adicionar tudo, exceto o que está no .gitignore
git add .

# criar o primeiro commit
git commit -m "feat: página pessoal Danilo Ramos (React + Vite)"

# enviar ao GitHub (abrirá o navegador para autenticar, se necessário)
git push -u origin main
```

- O GitHub Actions roda o pipeline e publica o site automaticamente (~2 min).
- **A cada novo `git push`** o site é atualizado sozinho. Para atualizar:

```powershell
git add .
git commit -m "feat: nova alteração"
git push
```

## 5. Personalizar a página

Tudo editável está concentrado em **`src/App.jsx`** e **`src/index.css`**.

### 5.1 Identidade (nome, email, redes)

No topo de `src/App.jsx` está o array `socials`:

```js
const socials = [
  { label: 'GitHub', url: 'https://github.com/chefinhoo', initial: 'GH' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/danramoalm/', initial: 'LI' },
  { label: 'X', url: 'https://x.com/danramoalm', initial: 'X' },
  { label: 'Email', url: 'mailto:contato@daniloramos.dev.br', initial: '@' },
]
```

- Substitua os URLs pelos seus perfis reais (GitHub e LinkedIn já estão preenchidos).
- O e-mail/tel aparecem no `Contact` e no `Footer` como `mailto:contato@daniloramos.dev.br` — atualize se necessário.
- O nome "Danilo Ramos" aparece no Hero (`profile-card`) e no footer — edite os textos.

### 5.2 Textos e conteúdo

| O que | Onde |
| --- | --- |
| Hero (título, descrição, botões) | `function Hero` em `App.jsx` |
| Bio e estatísticas | `function About` em `App.jsx` |
| Skills e níveis (%) | array `skills` em `App.jsx` |
| Serviços | array `services` em `App.jsx` |
| Projetos (filtros, tags, emojis) | array `projects` em `App.jsx` |
| Perguntas frequentes | array `faqData` em `App.jsx` |

### 5.3 Tema (cores neon)

O acento principal é o verde neon `#00ffcc`, definido em vários pontos de `src/index.css`.
Para trocar a cor do tema, substitua `#00ffcc` por outra (ex.: `#7c3aed` roxo, `#38bdf8` azul) em:

- `::selection`, `body` e scrollbar
- Classes `.c-accent`, `.bg-accent`, `.bg-accent10`, `.bg-accent05`, `.border-accent20/40`, `.shadow-glow`
- Todos os elementos que usam `color: #00ffcc`, `background: #00ffcc`, `rgba(0,255,204,...)`

Também dá para editar o fundo (`#0a0c28`, cards `rgba(13,17,40,0.8)`) em `body` e classes `.bg-card`.

### 5.4 Meta tags, favicon e logo

Em `index.html`:

```html
<title>Danilo Ramos | Desenvolvedor Full Stack</title>
<meta name="description" content="Portfólio de Danilo Ramos, desenvolvedor full stack..." />
```

- Atualize título/descrição para SEO.
- `.htaccess` em `public/` serve **apenas** para o domínio próprio (Apache, ex.: `daniloramos.dev.br`). No GitHub Pages ele é ignorado e pode ficar committado sem problema.

### 5.5 Formulário de contato (EmailJS)

O formulário usa [EmailJS](https://www.emailjs.com) sem backend. Credenciais em **`src/emailjsConfig.js`**:

- **Service ID** (`serviceId`)
- **Template ID** (`templateId`)
- **Public Key** (`publicKey`)

Se você ainda não tem conta:

1. Crie em https://dashboard.emailjs.com (plano gratuito até 200 e-mails/mês)
2. Add Service → copie o **Service ID**
3. Email Templates → crie um template com as variáveis `title`, `name`, `email`, `message` → copie o **Template ID**
4. Account → General → API → copie a **Public Key**
5. Cole os três valores em `src/emailjsConfig.js`.

> ⚠️ **Dica de segurança:** como é um site estático, a Public Key do EmailJS é pública por natureza. Não coloque nenhuma chave secreta real nesse arquivo — só as credenciais do EmailJS.

### 5.6 Publicar as alterações

```powershell
git add .
git commit -m "feat: personalização da página"
git push
```

Aguarde a Action terminar e veja em `https://chefinhoo.github.io/page-pessoal/`.

## 6. Checklist final

- [ ] Git inicializado e branch `main`
- [ ] Repositório `chefinhoo/page-pessoal` criado e remoto apontado
- [ ] `Settings → Pages → Source: GitHub Actions`
- [ ] Primeiro push feito com sucesso
- [ ] Site acessível em https://chefinhoo.github.io/page-pessoal/
- [ ] Redes sociais e email atualizados em `App.jsx`
- [ ] Conteúdo (bio, skills, serviços, projetos, FAQ) revisado
- [ ] Cor do tema e meta tags ajustados
- [ ] EmailJS configurado e teste de envio realizado
- [ ] `.opencode/` e `AGENTS.md` **não** listados no `git status`

---

<p align="center">
  <sub>© 2026 <b>Danilo Ramos</b> · <a href="https://daniloramos.dev.br">daniloramos.dev.br</a> · Todos os direitos reservados.</sub>
</p>