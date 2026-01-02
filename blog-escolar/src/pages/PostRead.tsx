import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPosts } from "../services/postService";
import type { Post } from "../services/postService";
import "../styles/PostRead.css";

// O componente PostRead depende do useParams para saber qual post mostrar,
// e do getPosts para buscar os dados do backend.
const PostRead: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Busca o post pelo id assim que o componente carrega
  useEffect(() => {
    getPosts()
      .then(posts => {
        const found = posts.find(p => p.id === id);
        if (found) setPost(found);
        else setError("Post não encontrado.");
      })
      .catch(() => setError("Erro ao carregar post."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{ textAlign: 'center' }}>Carregando...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  if (!post) return null;

  return (
    <div>
      {/* Topo roxo com título, subtítulo e infos */}
      <div className="postread-topo">
        <div className="postread-titulo">{post.titulo}</div>
        <div className="postread-infos">
          <span className="postread-info">{post.areaDoConhecimento || "Artigos"}</span>
          {post.AtualizadoEm
            ? <span className="postread-info">Atualizado em {post.AtualizadoEm}</span>
            : <span className="postread-info">Publicado em {post.CriadoEm || '--'}</span>
          }
        </div>
      </div>
      {/* Imagem centralizada */}
      {/* Se quiser exibir imagem, adicione campo no backend e frontend */}
      {/* Conteúdo do post */}
      <div className="postread-conteudo">
        {post.conteudo}
      </div>
    </div>
  );
};

export default PostRead;
