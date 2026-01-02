import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { getPosts } from "../services/postService";
import type { Post } from "../services/postService";
import "../styles/Home.css";

// Lista de categorias fixas (pode ser dinâmica depois)
const AREAS_CONHECIMENTO = [
  "Linguagens", "Matemática", "Ciências da Natureza", "Ciências Humanas", "Tecnologias"
];
// ...existing code...st } from "../services/postService";

export const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => setError("Erro ao carregar posts."))
      .finally(() => setLoading(false));
  }, []);

  const destaque = posts[0];
  const outros: Post[] = posts.slice(1, 3);
  const ultimas: Post[] = posts.slice(3, 9);

  return (
    <div className="home-container">
      <h1 className="titulo-principal">Blog Escolar</h1>
      {user && (
        <>
          <p>Bem-vindo, {user.nome}! Você está logado como <b>{user.role}</b>.</p>
          <button onClick={logout}>Sair</button>
        </>
      )}
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Bloco principal roxo com destaque e outros */}
      <div className="home-top-flex">
        <div className="home-categorias-lista home-categorias-lateral">
          <span className="home-categorias-titulo">Área do Conhecimento</span>
          <ul className="home-categorias-ul">
            {AREAS_CONHECIMENTO.map(area => (
              <li className="home-categoria-li" key={area}>{area}</li>
            ))}
          </ul>
        </div>
        <section className="home-bloco-roxo home-bloco-roxo-flex">
          <div className="home-bloco-conteudo">
            <div className="home-bloco-titulo">
              <h2>Tudo o que você quer saber sobre <span className="home-bloco-titulo-destaque">Tecnologia Educacional</span></h2>
              <input className="home-busca" placeholder="O que procura?" />
            </div>
            <div className="home-bloco-posts">
              {destaque && (
                <Link to={`/post/${destaque.id}`} className="home-card-destaque">
                  <span className="categoria">{destaque.areaDoConhecimento || 'Artigos'}</span>
                  <span className="titulo">{destaque.titulo}</span>
                  <p>{destaque.conteudo.substring(0, 120)}...</p>
                  {destaque.AtualizadoEm
                    ? <small>Atualizado em {destaque.AtualizadoEm}</small>
                    : <small>Publicado em {destaque.CriadoEm || '--'}</small>
                  }
                </Link>
              )}
              <div className="home-cards-laterais">
                {outros.map((post: Post) => (
                  <Link to={`/post/${post.id}`} className="home-card-lateral" key={post.id}>
                    <span className="categoria">{post.areaDoConhecimento || 'Artigos'}</span>
                    <span className="titulo">{post.titulo}</span>
                    <p>{post.conteudo.substring(0, 60)}...</p>
                    {post.AtualizadoEm
                      ? <small>Atualizado em {post.AtualizadoEm}</small>
                      : <small>Publicado em {post.CriadoEm || '--'}</small>
                    }
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Seção de Últimas Postagens com três listas diferentes */}
      <h2 className="home-ultimas-titulo">Últimas Postagens</h2>
      <div className="home-ultimas-listas-vertical">
        {/* Primeira lista: 2 colunas, 1 linha, cards retangulares */}
        <div className="home-ultimas-lista home-ultimas-lista-2col">
          {ultimas.slice(0, 2).map((post: Post) => (
            <Link to={`/post/${post.id}`} className="home-card-ultima-ret" key={post.id}>
              <div className="home-card-img-wrapper">
                <img src={`https://via.placeholder.com/120x80?text=${post.areaDoConhecimento?.charAt(0) || 'A'}`} alt={post.titulo} />
              </div>
              <span className="categoria">{post.areaDoConhecimento || 'Artigos'}</span>
              <span className="titulo">{post.titulo}</span>
              <p>{post.conteudo.substring(0, 60)}...</p>
              {post.AtualizadoEm
                ? <small>Atualizado em {post.AtualizadoEm}</small>
                : <small>Publicado em {post.CriadoEm || '--'}</small>
              }
            </Link>
          ))}
        </div>
        {/* Segunda lista: 3 colunas, 1 linha, cards quadrados */}
        <div className="home-ultimas-lista home-ultimas-lista-3col">
          {ultimas.slice(2, 5).map((post: Post) => (
            <Link to={`/post/${post.id}`} className="home-card-ultima-quad" key={post.id}>
              <div className="home-card-img-wrapper">
                <img src={`https://via.placeholder.com/100x100?text=${post.areaDoConhecimento?.charAt(0) || 'A'}`} alt={post.titulo} />
              </div>
              <span className="categoria">{post.areaDoConhecimento || 'Artigos'}</span>
              <span className="titulo">{post.titulo}</span>
              <p>{post.conteudo.substring(0, 40)}...</p>
              {post.AtualizadoEm
                ? <small>Atualizado em {post.AtualizadoEm}</small>
                : <small>Publicado em {post.CriadoEm || '--'}</small>
              }
            </Link>
          ))}
        </div>
        {/* Terceira lista: coluna, cards retangulares com imagem à esquerda */}
        <div className="home-ultimas-lista home-ultimas-lista-leia">
          <h3 className="home-leia-titulo">Você também pode ler...</h3>
          {ultimas.slice(5, 8).map((post: Post) => (
            <Link to={`/post/${post.id}`} className="home-card-leia" key={post.id}>
              <div className="home-card-leia-img">
                <img src={`https://via.placeholder.com/80x80?text=${post.areaDoConhecimento?.charAt(0) || 'A'}`} alt={post.titulo} />
              </div>
              <div className="home-card-leia-info">
                <span className="categoria">{post.areaDoConhecimento || 'Artigos'}</span>
                <span className="titulo">{post.titulo}</span>
                <p>{post.conteudo.substring(0, 40)}...</p>
                {post.AtualizadoEm
                  ? <small>Atualizado em {post.AtualizadoEm}</small>
                  : <small>Publicado em {post.CriadoEm || '--'}</small>
                }
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
