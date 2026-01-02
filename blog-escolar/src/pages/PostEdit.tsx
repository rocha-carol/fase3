import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PostEdit: React.FC = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    // Aqui você vai buscar os dados do post pelo id e preencher os campos
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para salvar alterações
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Editar Postagem</h1>
      <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Conteúdo" value={content} onChange={e => setContent(e.target.value)} required />
      <input placeholder="Autor" value={author} onChange={e => setAuthor(e.target.value)} required />
      <button type="submit">Salvar Alterações</button>
    </form>
  );
};

export default PostEdit;
