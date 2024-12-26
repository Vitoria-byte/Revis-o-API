const container = document.querySelector("#container");
const loadMoviesBtn = document.querySelector("#loadMovies");
const loadingElement = document.querySelector("#loading");

// Função para exibir o carregamento enquanto os filmes são buscados
function mostrarCarregando() {
  loadingElement.style.display = "flex"; // Exibe o spinner de carregamento
  container.innerHTML = ""; // Limpa qualquer conteúdo anterior
}

// Função para buscar os filmes na API
async function buscarFilmes() {
  mostrarCarregando(); // Exibe o spinner de carregamento

  try {
    const resposta = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=77c4e2b070a2e1396500d0b42ebf7cec&language=pt-BR"
    );

    if (!resposta.ok) {
      // Verifica se a resposta da API é válida
      throw new Error("Erro ao buscar filmes.");
    }

    const dados = await resposta.json();
    const lista_de_filmes = dados.results;
    container.innerHTML = ""; // Limpa o conteúdo anterior

    lista_de_filmes.forEach((element) => {
      const novo_card = document.createElement("div");
      novo_card.className = "card";

      const imagem = document.createElement("img");
      const baseurl = "https://image.tmdb.org/t/p/w500";
      imagem.src = `${baseurl}${element.poster_path}`;
      imagem.alt = `Uma foto do(a) filme ${element.original_title}`;
      imagem.className = "foto_perfil";

      const original_title = document.createElement("h2");
      original_title.textContent = `Título: ${element.original_title}`;

      const data_de_lançamento = document.createElement("p");
      data_de_lançamento.textContent = `Data de Lançamento: ${element.release_date.slice(
        0,
        4
      )}`;

      const original_language = document.createElement("p");
      original_language.textContent = `Linguagem: ${element.original_language}`;

      novo_card.append(
        imagem,
        original_title,
        data_de_lançamento,
        original_language
      );
      container.appendChild(novo_card);
    });
  } catch (error) {
    container.innerHTML =
      "<p>Ocorreu um erro ao carregar os filmes. Tente novamente mais tarde.</p>";
    console.error(error);
  } finally {
    loadingElement.style.display = "none"; // Oculta o spinner após o carregamento
  }
}

// Adiciona um evento de clique no botão para carregar filmes
loadMoviesBtn.addEventListener("click", buscarFilmes);
