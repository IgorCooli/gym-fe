import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import AlunoPage from './pages/AlunoPage';
import CadastroAlunoPage from './pages/CadastroAlunoPage';

function App() {
  const [alunos, setAlunos] = useState([
    { nome: 'João Silva', email: 'joao@email.com', telefone: '11999999999' },
    { nome: 'Maria Souza', email: 'maria@email.com', telefone: '11888888888' },
    { nome: 'Carlos Pereira', email: 'carlos@email.com', telefone: '11777777777' },
    { nome: 'Ana Paula', email: 'ana.paula@email.com', telefone: '11666666666' },
    { nome: 'Bruno Lima', email: 'bruno.lima@email.com', telefone: '11555555555' },
    { nome: 'Fernanda Torres', email: 'fernanda.torres@email.com', telefone: '11444444444' },
    { nome: 'Gabriel Costa', email: 'gabriel.costa@email.com', telefone: '11333333333' },
    { nome: 'Helena Martins', email: 'helena.martins@email.com', telefone: '11222222222' },
    { nome: 'Igor Oliveira', email: 'igor.oliveira@email.com', telefone: '11111111111' },
    { nome: 'Juliana Alves', email: 'juliana.alves@email.com', telefone: '11988888888' },
    { nome: 'Lucas Rocha', email: 'lucas.rocha@email.com', telefone: '11977777777' },
    { nome: 'Mariana Dias', email: 'mariana.dias@email.com', telefone: '11966666666' },
    { nome: 'Nathalia Souza', email: 'nathalia.souza@email.com', telefone: '11955555555' },
    { nome: 'Otávio Ramos', email: 'otavio.ramos@email.com', telefone: '11944444444' },
    { nome: 'Patrícia Mendes', email: 'patricia.mendes@email.com', telefone: '11933333333' },
    { nome: 'Rafael Teixeira', email: 'rafael.teixeira@email.com', telefone: '11922222222' },
    { nome: 'Sofia Castro', email: 'sofia.castro@email.com', telefone: '11911111111' },
  ]);
  const [treinos, setTreinos] = useState([
    // Treino 1: Bíceps e Costas
    { alunoEmail: 'joao@email.com', nomeTreino: 'Bíceps e Costas', exercicio: 'Puxada Frente', series: '4', repeticoes: '10', observacoes: 'Foco na postura' },
    { alunoEmail: 'joao@email.com', nomeTreino: 'Bíceps e Costas', exercicio: 'Remada Curvada', series: '3', repeticoes: '12', observacoes: '' },
    { alunoEmail: 'joao@email.com', nomeTreino: 'Bíceps e Costas', exercicio: 'Rosca Direta', series: '3', repeticoes: '12', observacoes: '' },
    { alunoEmail: 'joao@email.com', nomeTreino: 'Bíceps e Costas', exercicio: 'Rosca Alternada', series: '3', repeticoes: '10', observacoes: '' },
    // Treino 2: Tríceps e Peito
    { alunoEmail: 'joao@email.com', nomeTreino: 'Tríceps e Peito', exercicio: 'Supino Reto', series: '4', repeticoes: '10', observacoes: 'Aumentar carga gradualmente' },
    { alunoEmail: 'joao@email.com', nomeTreino: 'Tríceps e Peito', exercicio: 'Supino Inclinado', series: '3', repeticoes: '12', observacoes: '' },
    { alunoEmail: 'joao@email.com', nomeTreino: 'Tríceps e Peito', exercicio: 'Crucifixo', series: '3', repeticoes: '12', observacoes: '' },
    { alunoEmail: 'joao@email.com', nomeTreino: 'Tríceps e Peito', exercicio: 'Tríceps Testa', series: '3', repeticoes: '12', observacoes: '' },
    { alunoEmail: 'joao@email.com', nomeTreino: 'Tríceps e Peito', exercicio: 'Tríceps Corda', series: '3', repeticoes: '12', observacoes: '' },
    // Treino 3: Pernas e Ombro
    { alunoEmail: 'joao@email.com', nomeTreino: 'Pernas e Ombro', exercicio: 'Agachamento', series: '4', repeticoes: '10', observacoes: 'Descer até 90º' },
    { alunoEmail: 'joao@email.com', nomeTreino: 'Pernas e Ombro', exercicio: 'Leg Press', series: '3', repeticoes: '12', observacoes: '' },
    { alunoEmail: 'joao@email.com', nomeTreino: 'Pernas e Ombro', exercicio: 'Cadeira Extensora', series: '3', repeticoes: '15', observacoes: '' },
    { alunoEmail: 'joao@email.com', nomeTreino: 'Pernas e Ombro', exercicio: 'Desenvolvimento Ombro', series: '3', repeticoes: '12', observacoes: '' },
    { alunoEmail: 'joao@email.com', nomeTreino: 'Pernas e Ombro', exercicio: 'Elevação Lateral', series: '3', repeticoes: '15', observacoes: '' },
    // outros alunos
    { alunoEmail: 'maria@email.com', nomeTreino: 'Full Body', exercicio: 'Puxada', series: '3', repeticoes: '15', observacoes: 'Foco na postura' },
    { alunoEmail: 'carlos@email.com', nomeTreino: 'Cardio', exercicio: 'Corrida', series: '1', repeticoes: '30min', observacoes: 'Ritmo moderado' },
  ]);

  return (
    <Router>
      <nav style={{
        background: '#1976d2',
        color: '#fff',
        padding: '0.75rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px #b3d1f7',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <span style={{fontWeight: 700, fontSize: 22, letterSpacing: 1}}>GymFE</span>
        <div style={{display: 'flex', gap: 24}}>
          <Link to="/" style={{color: '#fff', textDecoration: 'none', fontWeight: 500}}>Login</Link>
          <Link to="/admin" style={{color: '#fff', textDecoration: 'none', fontWeight: 500}}>Admin</Link>
          <Link to="/aluno/joao@email.com" style={{color: '#fff', textDecoration: 'none', fontWeight: 500}}>Aluno</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro-aluno" element={<CadastroAlunoPage />} />
        <Route path="/admin" element={<AdminPage alunos={alunos} setAlunos={setAlunos} treinos={treinos} setTreinos={setTreinos} />} />
        <Route path="/aluno/:email" element={<AlunoPage alunos={alunos} treinos={treinos} />} />
      </Routes>
    </Router>
  );
}

export default App;
