import React, { useState } from "react";

const PostCreate: React.FC = () => {
  // Estados para título, conteúdo e autor
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  // Função para enviar o post (ainda não implementada)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de envio para o backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Criar Postagem</h1>
      <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Conteúdo" value={content} onChange={e => setContent(e.target.value)} required />
      <input placeholder="Autor" value={author} onChange={e => setAuthor(e.target.value)} required />
      <button type="submit">Publicar</button>
    </form>
  );
};

export default PostCreate;
