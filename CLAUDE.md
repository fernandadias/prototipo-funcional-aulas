# CLAUDE.md — Convenções do projeto

## Apresentações de aulas

### ❌ NÃO usar slide de agenda/sumário do módulo

**Regra:** não criar slides que listam todas as aulas do módulo (estilo "Você está aqui").

**Por quê:**
Aulas são móveis. Uma aula pode:
- Trocar de módulo no futuro
- Ser removida ou substituída
- Ter o módulo renumerado
- Sair de ordem

Se a aula gravada tiver um slide com o sumário, o vídeo fica congelado a uma estrutura
que vai mudar. Mais barato manter cada aula auto-suficiente.

**Como aplicar ao criar uma aula nova:**
- Pular do slide de capa direto pro conteúdo (quote de abertura, recap da aula anterior, ou primeiro tópico).
- Não inserir nada com `data-type="agenda"` listando aulas do módulo.
- Pode usar `data-type="agenda"` pra agenda INTERNA da aula (ex: "vamos passar por 3 tópicos hoje") — desde que não cite outras aulas.

**O que substitui:**
- Quote de abertura logo após a capa
- Recap da aula anterior em uma frase
- Bullet point reveal com o que vai ser visto NESTA aula

---

## Estrutura do template

- `template-apresentacao/deck.css` — estilos compartilhados (não edite ad-hoc, é base de tudo)
- `template-apresentacao/deck.js` — engine + injeta toda a UI (toolbar, controles, overlays) no DOM
- `template-apresentacao/index.html` — template de referência minimalista
- `modulo-NN/aula-XX-slug.html` — uma aula por arquivo, com `<link rel="stylesheet" href="../template-apresentacao/deck.css">` e `<script src="../template-apresentacao/deck.js"></script>`

Cada aula = só `<main id="deck">` com `<section class="slide">`s. Toda UI vem do deck.js.
