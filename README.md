# WebMakers

Site oficial da WebMakers, um estúdio de desenvolvimento web de Itapetininga, SP, que projeta e constrói sites institucionais, landing pages, lojas virtuais e sistemas sob medida.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

## Sobre o projeto

Este repositório contém o site institucional da WebMakers. O objetivo do site é apresentar a empresa para quem chega pelo Instagram, pelo WhatsApp ou pelo Google, mostrando os serviços oferecidos, os projetos já publicados, os valores de cada tipo de site e um caminho direto de contato.

O site foi pensado para funcionar como um cartão de visitas completo: quem visita entende em poucos segundos o que a WebMakers faz, vê exemplos reais de trabalho e consegue chamar no WhatsApp em um clique.

## Como foi feito

O projeto foi desenvolvido inteiramente no Visual Studio Code, escrevendo HTML, CSS e JavaScript puro, sem framework, sem gerador de site e sem build. Essa escolha foi proposital: mantém o projeto simples de entender, leve para carregar e fácil de hospedar de graça.

Cada página é um arquivo HTML independente, todas compartilhando o mesmo arquivo de estilo (`css/style.css`) e os mesmos scripts (`js/main.js` e `js/network-bg.js`), o que mantém a identidade visual e o comportamento consistentes em todo o site.

## Funcionalidades

* Tema claro e escuro, com o botão fixo no topo salvando a preferência do visitante
* Menu fixo responsivo, com versão em tela cheia para celular
* Fundo animado com uma rede de partículas em Canvas, que reage ao mouse, usada no topo da página inicial e nas chamadas de contato
* Página de serviços com tabela de preços por tipo de site
* Página de projetos, mostrando os trabalhos publicados pela WebMakers
* Perguntas frequentes em formato de acordeão
* Formulário de contato que monta a mensagem automaticamente e abre no WhatsApp
* Botão flutuante de WhatsApp presente em todas as páginas

## Tecnologias usadas

* HTML5 semântico
* CSS3, com variáveis (custom properties), Grid e Flexbox para o layout, e sem nenhuma biblioteca externa de estilo
* JavaScript puro (vanilla), sem frameworks, cuidando do tema, do menu, do acordeão e da animação de fundo
* Canvas API para o fundo interativo de partículas
* Google Fonts (Outfit para títulos, Manrope para o texto)
* Vercel para hospedagem e publicação do site

## Estrutura de pastas

```
index.html        Página inicial
servicos.html     Serviços e tabela de preços
projetos.html     Projetos em destaque
faq.html          Perguntas frequentes
contato.html      Contato e formulário
css/style.css     Estilo completo do site
js/main.js        Tema, menu mobile e acordeão do FAQ
js/network-bg.js  Fundo interativo de partículas
assets/           Logos, ícones e favicons
```

## Rodando o projeto localmente

Como é um site estático, não é preciso instalar nada para visualizar. Duas formas simples de rodar:

1. Baixe ou clone este repositório e abra o arquivo `index.html` direto no navegador.
2. Ou, dentro do VS Code, instale a extensão Live Server e clique em "Go Live" para abrir o site com atualização automática a cada alteração.

## Publicação

O site está publicado na Vercel, direto a partir deste repositório. Qualquer alteração enviada para a branch principal é publicada automaticamente.

## Personalização rápida

Pontos do código que costumam precisar de ajuste com o tempo:

* **Número de WhatsApp**: procure por `5515991617508` nos arquivos HTML e troque pelo número atualizado, sempre no formato `55` mais DDD mais número, sem espaços ou símbolos.
* **Preços**: ficam em `servicos.html`, dentro da seção com a classe `price-grid`.
* **Projetos em destaque**: ficam em `index.html` e `projetos.html`, dentro da classe `project-card`.
* **Cores da marca**: ficam no topo de `css/style.css`, dentro de `:root`, nas variáveis `--blue` e `--blue-deep`.

## Contato

WhatsApp: [(15) 99161-7508](https://wa.me/5515991617508)
Instagram: [@webmaker.itape](https://www.instagram.com/webmaker.itape/)

Projeto e código de propriedade da WebMakers.
