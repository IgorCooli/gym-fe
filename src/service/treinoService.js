// Serviço de Treinos (mock)

let treinos = [
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
];

export function listarTreinosPorAluno(email) {
  return Promise.resolve(treinos.filter(t => t.alunoEmail === email));
}

export function cadastrarTreinos(email, novosTreinos) {
  treinos = [...treinos, ...novosTreinos.map(t => ({ ...t, alunoEmail: email }))];
  return Promise.resolve(true);
}

export function listarTodosTreinos() {
  return Promise.resolve([...treinos]);
} 