# CLAUDE.md — Convenções do projeto

## Apresentações de aulas

### ❌ Aulas são móveis: nunca referenciar posição (módulo / número da aula)

**Regra:** **NÃO** mencionar em NENHUM slide o número do módulo, número da aula,
nem listar outras aulas do módulo. Nada de "Módulo 01 · Aula 02", "Aula 03 · Módulo 01",
"Fechamos o módulo 01", "Próximo: Módulo 02", "— Aula 01", etc.

**Por quê:**
Aulas são móveis. Uma aula pode:
- Trocar de módulo no futuro
- Ser removida ou substituída
- Ter o módulo renumerado
- Sair de ordem

Se a aula gravada tiver QUALQUER referência à sua posição numérica, o vídeo fica
congelado a uma estrutura que vai mudar. Mais barato manter cada aula auto-suficiente
e referenciar por TÓPICO/TEMA, nunca por número.

**Como aplicar ao criar uma aula nova:**
- **Capa:** sem eyebrow tipo "Módulo 01 · Aula 02". H1 + lead, e opcionalmente
  o `module-tag` com algo neutro tipo "Protótipo Funcional · por Nanda Dias".
- **Próxima aula:** referenciar pelo TÍTULO/TEMA, nunca por número.
  Ex: "Próximo: Os 4 níveis de protótipo" — não "Próximo: Aula 02".
- **Recap da aula anterior:** "Da aula anterior" / "Vimos que..." — nunca "— Aula 01".
- **Encerramento:** "Fim de um capítulo" / "Fechamos os princípios" — nunca "Fechamos o módulo 01".
- **Agenda do módulo:** proibido (slide listando aulas do módulo com "Você está aqui").
- **Agenda interna da própria aula:** OK (ex: "vamos passar por 3 tópicos hoje"),
  desde que não cite outras aulas/módulos.

**Em data-notes (anotações do palestrante):** referências numéricas estão OK porque
não viram parte do vídeo gravado.

---

## Ilustrações

Estilo oficial: **Riso Punk** — risografia de duas cores (preto + neon green) sobre creme, granulado, registro propositalmente errado, anti-corporate. Spec completa, prompts e cenas pré-pensadas em [`ilustracoes.md`](./ilustracoes.md).

Quando precisar gerar/sugerir ilustrações para uma aula, consultar esse arquivo antes — paleta, prompt base e cenas já estão prontos.

---

## Estrutura do template

- `template-apresentacao/deck.css` — estilos compartilhados (não edite ad-hoc, é base de tudo)
- `template-apresentacao/deck.js` — engine + injeta toda a UI (toolbar, controles, overlays) no DOM
- `template-apresentacao/index.html` — template de referência minimalista
- `modulo-NN/aula-XX-slug.html` — uma aula por arquivo, com `<link rel="stylesheet" href="../template-apresentacao/deck.css">` e `<script src="../template-apresentacao/deck.js"></script>`

Cada aula = só `<main id="deck">` com `<section class="slide">`s. Toda UI vem do deck.js.
