// Serviço de Alunos (mock)

let alunos = [
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
];

export function listarAlunos() {
  return Promise.resolve([...alunos]);
}

export function cadastrarAluno(aluno) {
  alunos.push(aluno);
  return Promise.resolve(aluno);
}

export function buscarAlunoPorEmail(email) {
  return Promise.resolve(alunos.find(a => a.email === email));
} 