import React, { useState } from 'react';
import { FaUserPlus, FaDumbbell, FaUsers } from 'react-icons/fa';
import Tabela from '../components/Tabela';

function CadastroAluno({ aluno, setAluno, cadastrarAluno, handleAlunoChange }) {
  return (
    <div style={{background: '#e3f0fc', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px #b3d1f7', marginBottom: 16}}>
      <h4 className="mb-3" style={{color: '#1976d2'}}>Cadastrar Novo Aluno</h4>
      <form onSubmit={cadastrarAluno}>
        <input className="form-control" name="nome" placeholder="Nome Completo" value={aluno.nome} onChange={handleAlunoChange} required />
        <input className="form-control" name="email" placeholder="Email" type="email" value={aluno.email} onChange={handleAlunoChange} required />
        <input className="form-control" name="telefone" placeholder="Telefone" value={aluno.telefone} onChange={handleAlunoChange} required />
        <button className="btn btn-primary w-100" type="submit" style={{marginTop: 8}}>Cadastrar Aluno</button>
      </form>
    </div>
  );
}

function CadastroTreinoNovo({ alunos, adicionarTreinos }) {
  const [busca, setBusca] = useState('');
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [nomeTreino, setNomeTreino] = useState('');
  const [treino, setTreino] = useState({ exercicio: '', series: '', repeticoes: '', observacoes: '' });
  const [treinosTemp, setTreinosTemp] = useState([]);

  // Sugestões de alunos
  const sugestoes = busca.length > 0 && !alunoSelecionado
    ? alunos.filter(a => a.nome.toLowerCase().includes(busca.toLowerCase()))
    : [];

  function handleSelectAluno(aluno) {
    setAlunoSelecionado(aluno);
    setBusca('');
  }

  function handleTreinoChange(e) {
    setTreino({ ...treino, [e.target.name]: e.target.value });
  }

  function handleAdicionarTreino(e) {
    e.preventDefault();
    if (!treino.exercicio || !treino.series || !treino.repeticoes || !nomeTreino) return;
    setTreinosTemp([...treinosTemp, { ...treino, nomeTreino }]);
    setTreino({ exercicio: '', series: '', repeticoes: '', observacoes: '' });
  }

  function handleFinalizar() {
    if (alunoSelecionado && treinosTemp.length > 0) {
      adicionarTreinos(alunoSelecionado.email, treinosTemp);
      setAlunoSelecionado(null);
      setNomeTreino('');
      setTreinosTemp([]);
    }
  }

  return (
    <div style={{background: '#e3f0fc', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px #b3d1f7', marginBottom: 16}}>
      <h4 className="mb-3" style={{color: '#1976d2'}}>Criar Treino para Aluno</h4>
      {!alunoSelecionado ? (
        <div style={{marginBottom: 16}}>
          <input
            className="form-control mb-2"
            placeholder="Buscar aluno por nome..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            autoFocus
          />
          {sugestoes.length > 0 && (
            <ul className="list-group" style={{maxHeight: 120, overflowY: 'auto', marginBottom: 0}}>
              {sugestoes.map(a => (
                <li
                  key={a.email}
                  className="list-group-item list-group-item-action"
                  style={{cursor: 'pointer'}}
                  onClick={() => handleSelectAluno(a)}
                >
                  {a.nome} ({a.email})
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div style={{marginBottom: 16}}>
          <div className="alert alert-info d-flex justify-content-between align-items-center" style={{marginBottom: 0}}>
            <span>Aluno: <b>{alunoSelecionado.nome}</b> ({alunoSelecionado.email})</span>
            <button className="btn btn-sm btn-outline-danger" onClick={() => setAlunoSelecionado(null)}>Trocar</button>
          </div>
        </div>
      )}
      {alunoSelecionado && (
        <>
          <input
            className="form-control mb-2"
            placeholder="Nome do Treino (ex: Pernas, Peito, etc)"
            value={nomeTreino}
            onChange={e => setNomeTreino(e.target.value)}
            required
          />
          <form onSubmit={handleAdicionarTreino} style={{width: '100%'}} className="mb-3">
            <div className="row g-2">
              <div className="col-md-4">
                <input className="form-control" name="exercicio" placeholder="Exercício" value={treino.exercicio} onChange={handleTreinoChange} required />
              </div>
              <div className="col-md-2">
                <input className="form-control" name="series" placeholder="Séries" value={treino.series} onChange={handleTreinoChange} required />
              </div>
              <div className="col-md-2">
                <input className="form-control" name="repeticoes" placeholder="Repetições" value={treino.repeticoes} onChange={handleTreinoChange} required />
              </div>
              <div className="col-md-3">
                <input className="form-control" name="observacoes" placeholder="Obs" value={treino.observacoes} onChange={handleTreinoChange} />
              </div>
              <div className="col-md-1 d-flex align-items-center">
                <button className="btn btn-success w-100" type="submit">Adicionar</button>
              </div>
            </div>
          </form>
          <Tabela
            colunas={[
              { key: 'nomeTreino', label: 'Nome do Treino' },
              { key: 'exercicio', label: 'Exercício' },
              { key: 'series', label: 'Séries' },
              { key: 'repeticoes', label: 'Repetições' },
              { key: 'observacoes', label: 'Obs' },
            ]}
            dados={treinosTemp}
            filtroHabilitado={false}
            paginacaoHabilitada={true}
            itensPorPagina={10}
            colunaOrdenacao={'exercicio'}
          />
          <button className="btn btn-primary w-100 mt-3" onClick={handleFinalizar} disabled={treinosTemp.length === 0}>Finalizar Cadastro</button>
        </>
      )}
    </div>
  );
}

function ListaAlunos({ alunos }) {
  const colunas = [
    { key: 'nome', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'telefone', label: 'Telefone' },
  ];
  return (
    <div style={{background: '#e3f0fc', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px #b3d1f7', marginBottom: 16}}>
      <h4 className="mb-3" style={{color: '#1976d2'}}>Alunos Cadastrados</h4>
      <Tabela colunas={colunas} dados={alunos} filtroHabilitado={true} paginacaoHabilitada={true} itensPorPagina={10} colunaOrdenacao={'nome'} />
    </div>
  );
}

const initialAluno = { nome: '', email: '', telefone: '' };

export default function AdminPage({ alunos, setAlunos, treinos, setTreinos }) {
  const [aluno, setAluno] = useState(initialAluno);
  const [active, setActive] = useState('');

  function handleAlunoChange(e) {
    setAluno({ ...aluno, [e.target.name]: e.target.value });
  }

  function cadastrarAluno(e) {
    e.preventDefault();
    setAlunos([...alunos, aluno]);
    setAluno(initialAluno);
  }

  function adicionarTreinos(email, novosTreinos) {
    setTreinos(prev => ([...prev, ...novosTreinos.map(t => ({ ...t, alunoEmail: email }))]));
  }

  const cards = [
    {
      key: 'cadastroTreino',
      icon: <FaDumbbell size={28} color={active === 'cadastroTreino' ? '#1976d2' : '#b3d1f7'} />, 
      label: 'Cadastro de Treino',
    },
    {
      key: 'listaAlunos',
      icon: <FaUsers size={28} color={active === 'listaAlunos' ? '#1976d2' : '#b3d1f7'} />, 
      label: 'Lista de Alunos',
    },
  ];

  return (
    <div className="container" style={{maxWidth: 500}}>
      <h2 className="mb-4" style={{textAlign: 'center'}}>Painel do Personal Trainer</h2>
      <div className="d-flex flex-column align-items-center mb-4" style={{gap: 18}}>
        {cards.map(card => (
          <div
            key={card.key}
            className={`admin-card${active === card.key ? ' active' : ''}`}
            onClick={() => setActive(active === card.key ? '' : card.key)}
            style={{
              display: 'flex', alignItems: 'center', width: '100%', maxWidth: 400, cursor: 'pointer',
              background: active === card.key ? '#e3f0fc' : '#fff',
              border: `2px solid ${active === card.key ? '#1976d2' : '#e3f0fc'}`,
              borderRadius: 16, boxShadow: '0 2px 12px #b3d1f7', padding: '1.1rem 1.2rem',
              transition: 'all 0.2s', gap: 18
            }}
          >
            <span style={{marginRight: 16}}>{card.icon}</span>
            <span style={{fontWeight: 600, fontSize: 20, color: active === card.key ? '#1976d2' : '#222'}}>{card.label}</span>
          </div>
        ))}
      </div>
      {active === 'cadastroTreino' && (
        <CadastroTreinoNovo alunos={alunos} adicionarTreinos={adicionarTreinos} />
      )}
      {active === 'listaAlunos' && (
        <ListaAlunos alunos={alunos} />
      )}
    </div>
  );
} 