# Estilo de ilustrações — Riso Punk

Estilo visual oficial para personagens e ilustrações narrativas nas aulas do **Protótipo Funcional**.

---

## Conceito

Risografia de duas cores: tinta preta + neon green spot color sobre papel creme. Granulado, registro propositalmente errado, sensação de zine impresso à mão. Personagens com gesto forte e expressivo — entre cartoon editorial e ilustração underground. DIY, anti-corporate, intencionalmente "rough".

Referências: zines dos anos 90, risografia indie contemporânea, capa de fanzine de tecnologia, anti-design intencional.

---

## Paleta travada

Sempre citar os hex no prompt. LLMs de imagem respondem melhor a códigos hex do que a nomes de cor.

| Tinta | Hex | Uso |
|---|---|---|
| Charcoal black | `#1c1c1c` | Linha principal, tipografia, sombras de meia-tinta |
| Electric lime green | `#D4F542` | Spot color — gestos importantes, foco, energia |
| Warm cream paper | `#f0e7da` | Background ("papel") |

**Não usar:** roxo, gradientes, render 3D glossy, paleta arco-íris, estilo "tech startup illustration" padrão Midjourney.

---

## Prompt base (cole e adapte)

```
Two-color risograph print illustration, only #1c1c1c (charcoal black)
and #D4F542 (electric lime green) inks on warm cream paper #f0e7da,
visible grain and screen texture, slight color registration offset
(green plate misaligned 1-2px), bold confident lines,
mid-90s anti-design zine aesthetic, character with strong posture
and expressive face, no gradients, only flat shapes with halftone grain,
small mono-font annotations near the character.

[CENA AQUI — descreva o personagem e a ação em 1 frase]

DIY punk publication style, intentional roughness. --ar 4:5
```

**Negative prompt (Flux/SD):**
```
no purple, no gradients, no stock photo, no generic startup illustration,
no isometric corporate style, no Memphis pattern, no rainbow,
no glossy 3D render, no smooth digital art, no anime
```

---

## Cenas pré-pensadas pro curso

Substitua o `[CENA AQUI]` por uma destas, dependendo do contexto da aula:

### Módulo 01 — Princípios

| Aula / Momento | Cena |
|---|---|
| Aula 01 — Capa | `A product designer standing in front of two giant frames: one labeled MOCKUP showing a flat dead screen, the other labeled FUNCIONAL pulsing with green energy. Designer is mid-stride toward the second.` |
| Aula 01 — Static dies | `A flat paper screen falling off a desk in slow motion, designer hands reaching out too late.` |
| Aula 02 — 4 níveis | `Four figures climbing a staircase, each step labeled with a roman numeral. Top figure breaks through a ceiling of green light.` |
| Aula 03 — Framework | `A designer surrounded by five floating speech bubbles forming a halo, each bubble a different question mark shape, all in green.` |
| Aula 04 — Erros com IA | `A designer wrestling with an oversized robot arm coming out of a laptop screen. Both look determined. Green sparks where they touch.` |

### Conceitos recorrentes

| Conceito | Cena |
|---|---|
| Handoff falhou | `Two people passing a USB stick — one's hand is paper, the other's hand is solid. The stick is breaking in the middle, green crack glowing.` |
| Edge case escondido | `A designer lifting the corner of a screen like a rug. Bugs (literal cartoon bugs, green) scurrying out from underneath.` |
| Protótipo funcional | `A designer pressing PLAY on a remote, and the mockup on the wall comes to life — characters and arrows start moving inside the frame.` |
| Iteração de prompt | `A designer typing into a vintage computer terminal, words spilling out of the screen as a paper banner — getting longer, more detailed.` |
| Designer + IA | `Two figures sharing one desk: a designer (human, hand-drawn lines) and an AI (the green shape, geometric). Both have one hand on the same pencil.` |

---

## Aspect ratios por contexto

| Onde vai | --ar | Notas |
|---|---|---|
| Capa de aula (cover slide) | `4:5` ou `3:4` | Vertical pega melhor o gesto do personagem |
| Card de timeline | `16:10` | Horizontal pro card de 460px |
| Slide full-bleed (image slide) | `16:9` | Cobre a tela toda |
| Quote slide | `1:1` | Quadrado funciona bem ao lado da citação |
| Instagram do curso | `1:1` ou `4:5` | Reaproveita pra divulgação |

---

## Modificadores de variação

Pra evitar que todas as ilustrações fiquem iguais, varie:

- **Registro do offset verde:** "1px misaligned" (sutil) → "3px misaligned" (mais punk)
- **Grão:** "subtle grain" → "heavy halftone grain" → "newspaper-print grain"
- **Linha:** "thin confident line" → "thick brush-pen line" → "scratchy pen line"
- **Composição:** "centered" → "off-center top-left" → "diagonal sweep"
- **Mood:** "determined" / "curious" / "exhausted" / "triumphant" / "skeptical"

---

## Consistência de personagem

Se quiser que apareça O MESMO designer recorrente nas aulas:

1. Gere primeiro uma **model sheet** com o prompt:
   ```
   [prompt base] Character reference sheet: same designer drawn 4 times —
   front view, side view, 3/4 view, and dynamic pose. Same outfit
   (cropped black t-shirt, wide pants, neon green socks), same haircut
   (short bob with green streak), same proportions.
   ```
2. Use a imagem resultante como `--cref` (Midjourney) ou Image Prompt (Flux Pro).
3. Salve essa sheet em `assets/character-sheet.png` no projeto.

---

## Onde usar (e onde NÃO usar)

**Usar:**
- Capas de aula
- Quote slides (lateral à citação)
- Timeline cards (substituir o placeholder `<span>imagem · X</span>` por `<img>`)
- Slides de "erro" / "armadilha" (a estética punk reforça)
- Encerramento de módulo

**Não usar:**
- Slides de código (deixa o código respirar)
- Slides técnicos densos (compare, chart, agenda interna) — ilustração compete com a info
- Telas de produto / screenshots reais — esse estilo é pra metáfora, não pra documentar interface

---

## Geradores recomendados

Em ordem de qualidade pro estilo:

1. **Midjourney v6.1+** — melhor controle de risograph e offset; use `--style raw` pra evitar embelezamento padrão
2. **Flux Pro 1.1** (via Replicate/fal.ai) — ótimo pra controle de paleta hex
3. **Sora Image / GPT-image-1** — bom pra prompts longos com instruções específicas; respeita hex bem
4. **DALL-E 3** — alternativa OK, mas tende a suavizar demais o grão

Evitar SD 1.5 / SDXL base — ficam genéricos demais pra este estilo.
