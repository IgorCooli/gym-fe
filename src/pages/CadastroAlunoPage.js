import React, { useState } from 'react';

export default function CadastroAlunoPage() {
  const [aluno, setAluno] = useState({ nome: '', email: '', telefone: '', senha: '' });
  const [sucesso, setSucesso] = useState(false);
  const [showSenha, setShowSenha] = useState(false);

  function handleChange(e) {
    setAluno({ ...aluno, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui você pode integrar com o backend para cadastrar o aluno
    setSucesso(true);
    setAluno({ nome: '', email: '', telefone: '', senha: '' });
  }

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{maxWidth: 400, minHeight: '60vh'}}>
      <h2 style={{color: '#1976d2', marginBottom: 24}}>Cadastro de Aluno</h2>
      {sucesso && <div className="alert alert-success w-100" style={{textAlign: 'center'}}>Cadastro realizado com sucesso!</div>}
      <form onSubmit={handleSubmit} style={{width: '100%'}}>
        <input className="form-control mb-3" name="nome" placeholder="Nome Completo" value={aluno.nome} onChange={handleChange} required />
        <input className="form-control mb-3" name="email" placeholder="Email" type="email" value={aluno.email} onChange={handleChange} required />
        <input className="form-control mb-3" name="telefone" placeholder="Telefone" value={aluno.telefone} onChange={handleChange} required />
        <div style={{position: 'relative'}}>
          <input className="form-control mb-3" name="senha" type={showSenha ? 'text' : 'password'} placeholder="Senha" value={aluno.senha} onChange={handleChange} required style={{paddingRight: 40}} />
          <button type="button" onClick={() => setShowSenha(s => !s)} style={{position: 'absolute', right: 10, top: 8, background: 'none', border: 'none', padding: 0, cursor: 'pointer'}} tabIndex={-1} aria-label={showSenha ? 'Ocultar senha' : 'Mostrar senha'}>
            {showSenha ? (
              <svg width="22" height="22" fill="#1976d2" viewBox="0 0 24 24"><path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z"/></svg>
            ) : (
              <svg width="22" height="22" fill="#1976d2" viewBox="0 0 24 24"><path d="M12 5c-7 0-10 7-10 7s3 7 10 7c2.5 0 4.71-.7 6.57-1.88l1.43 1.43 1.41-1.41-18-18-1.41 1.41 3.1 3.1c-1.7 1.13-3.1 2.7-3.1 2.7s3 7 10 7c1.61 0 3.13-.25 4.5-.7l2.1 2.1c-2.01 1.01-4.23 1.6-6.6 1.6-7 0-10-7-10-7s3-7 10-7c2.37 0 4.59.59 6.6 1.6l-2.1 2.1c-1.37-.45-2.89-.7-4.5-.7z"/></svg>
            )}
          </button>
        </div>
        <button className="btn btn-primary w-100" type="submit" style={{marginTop: 8}}>Cadastrar</button>
      </form>
    </div>
  );
} 