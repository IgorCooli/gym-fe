import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Tabela from '../components/Tabela';

export default function AlunoPage({ alunos, treinos }) {
  const { email } = useParams();
  const aluno = alunos.find(a => a.email === email);
  const treinosAluno = treinos.filter(t => t.alunoEmail === email);

  // Obter lista de nomes de treinos únicos
  const nomesTreinos = Array.from(new Set(treinosAluno.map(t => t.nomeTreino)));
  const [treinoSelecionado, setTreinoSelecionado] = useState(nomesTreinos[0] || '');

  // Filtrar exercícios do treino selecionado
  const treinosFiltrados = treinosAluno.filter(t => t.nomeTreino === treinoSelecionado);

  // Estado para marcar exercícios realizados
  const [status, setStatus] = useState(Array(treinosFiltrados.length).fill(false));

  // Calcular porcentagem de exercícios realizados
  const total = status.length;
  const feitos = status.filter(Boolean).length;
  const porcentagem = total > 0 ? Math.round((feitos / total) * 100) : 0;

  function handleCheck(index) {
    setStatus(prev => prev.map((v, i) => i === index ? !v : v));
  }

  function finalizarTreino() {
    setStatus(Array(treinosFiltrados.length).fill(false));
  }

  if (!aluno) return <div className="container mt-5"><h2 style={{color: '#1976d2'}}>Aluno não encontrado</h2></div>;

  // Dados para tabela com coluna de ação
  const colunas = [
    { key: 'exercicio', label: 'Exercício' },
    { key: 'series', label: 'Séries' },
    { key: 'repeticoes', label: 'Repetições' },
    { key: 'observacoes', label: 'Obs' },
    { key: 'realizado', label: 'Realizado', render: (row, i) => (
      <button
        className={`btn btn-sm ${status[i] ? 'btn-success' : 'btn-outline-primary'}`}
        onClick={() => handleCheck(i)}
        type="button"
      >
        {status[i] ? '✔️' : '✔️'}
      </button>
    ) },
  ];

  // Adaptar dados para tabela (adiciona índice para render)
  const dadosTabela = treinosFiltrados.map((t, i) => ({ ...t, realizado: i }));

  return (
    <div className="container" style={{maxWidth: 600}}>
      <h2 style={{textAlign: 'center'}}>Olá, {aluno.nome}</h2>
      <h4 className="mb-3" style={{color: '#1976d2'}}>Seus Treinos</h4>
      {nomesTreinos.length > 1 && (
        <div className="mb-3">
          <label htmlFor="treinoSelect" className="form-label">Selecione o treino:</label>
          <select
            id="treinoSelect"
            className="form-select"
            value={treinoSelecionado}
            onChange={e => {
              setTreinoSelecionado(e.target.value);
              setStatus(Array(treinosAluno.filter(t => t.nomeTreino === e.target.value).length).fill(false));
            }}
          >
            {nomesTreinos.map(nome => (
              <option key={nome} value={nome}>{nome}</option>
            ))}
          </select>
        </div>
      )}
      {treinosFiltrados.length === 0 ? (
        <p>Nenhum treino cadastrado ainda.</p>
      ) : (
        <>
          {/* Porcentagem de exercícios realizados */}
          <div className="mb-3" style={{textAlign: 'center'}}>
            <span style={{fontWeight: 'bold', color: '#1976d2'}}>Progresso do treino: {porcentagem}%</span>
          </div>
          <Tabela
            colunas={colunas}
            dados={dadosTabela}
            filtroHabilitado={false}
            paginacaoHabilitada={false}
            colunaOrdenacao={'exercicio'}
          />
          <button className="btn btn-primary w-100" onClick={finalizarTreino} style={{marginTop: 16}}>Finalizar Treino</button>
        </>
      )}
    </div>
  );
} 