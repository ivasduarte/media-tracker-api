# Casos de Uso (Media Tracker)


## 1. Gestão de Catálogo (Pesquisa)

- **SeachMedia:** O sistema solicita dados à infraestrutura externa (TMDB). A camada de Aplicação recebe os dados em bruto e a camada de Domínio converte-os numa entidade interna `Media` para isolar a API do TMDB do resto do sistema.

## 2. Ações de Utilizador

- **AddToWatchList:** O utilizador guarda a referência de um Media na sua lista.
- **RateMedia:** O utilizador submete uma pontuação. O Domínio garante que o valor encontra-se entre 1 e 5 antes de persistir.