import React, { useState } from 'react';

export default function Tabela({ colunas, dados, filtroHabilitado = false, paginacaoHabilitada = false, itensPorPagina = 10, colunaOrdenacao = null }) {
  const [filtro, setFiltro] = useState('');
  const [pagina, setPagina] = useState(1);
  const [ordem, setOrdem] = useState('asc');
  const [colunaAtiva, setColunaAtiva] = useState(colunaOrdenacao);

  // Filtro global
  const dadosFiltrados = filtroHabilitado && filtro
    ? dados.filter(row =>
        colunas.some(col =>
          String(row[col.key] ?? '')
            .toLowerCase()
            .includes(filtro.toLowerCase())
        )
      )
    : dados;

  // Ordenação
  let dadosOrdenados = [...dadosFiltrados];
  if (colunaAtiva) {
    dadosOrdenados.sort((a, b) => {
      const valA = (a[colunaAtiva] || '').toString().toLowerCase();
      const valB = (b[colunaAtiva] || '').toString().toLowerCase();
      if (valA < valB) return ordem === 'asc' ? -1 : 1;
      if (valA > valB) return ordem === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Paginação
  const totalPaginas = paginacaoHabilitada ? Math.ceil(dadosOrdenados.length / itensPorPagina) : 1;
  const dadosPaginados = paginacaoHabilitada && itensPorPagina > 0
    ? dadosOrdenados.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina)
    : dadosOrdenados;

  function handleOrdenar(colKey) {
    if (colKey !== colunaAtiva) {
      setColunaAtiva(colKey);
      setOrdem('asc');
    } else {
      setOrdem(ordem === 'asc' ? 'desc' : 'asc');
    }
  }

  function handleMudarPagina(novaPagina) {
    setPagina(novaPagina);
  }

  // Resetar página ao filtrar ou mudar ordenação
  React.useEffect(() => { setPagina(1); }, [filtro, colunaAtiva, ordem]);

  return (
    <div>
      {filtroHabilitado && (
        <input
          className="form-control mb-3"
          placeholder="Filtrar..."
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
        />
      )}
      <div className="table-responsive">
        <table className="table table-bordered table-hover" style={{background: '#e3f0fc', borderRadius: 12, overflow: 'hidden'}}>
          <thead>
            <tr style={{background: '#1976d2', color: '#fff'}}>
              {colunas.map(col => (
                <th
                  key={col.key}
                  style={{cursor: 'pointer'}}
                  onClick={() => handleOrdenar(col.key)}
                >
                  {col.label}
                  {colunaAtiva === col.key && (
                    <span style={{marginLeft: 4}}>{ordem === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dadosPaginados.length === 0 ? (
              <tr><td colSpan={colunas.length} style={{textAlign: 'center'}}>Nenhum resultado</td></tr>
            ) : (
              dadosPaginados.map((row, i) => (
                <tr key={i}>
                  {colunas.map(col => (
                    <td key={col.key}>
                      {col.render ? col.render(row, i) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {paginacaoHabilitada && totalPaginas > 1 && (
        <nav style={{marginTop: 8}}>
          <ul className="pagination justify-content-center">
            <li className={`page-item${pagina === 1 ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => handleMudarPagina(pagina - 1)} disabled={pagina === 1}>Anterior</button>
            </li>
            {Array.from({ length: totalPaginas }, (_, idx) => (
              <li key={idx + 1} className={`page-item${pagina === idx + 1 ? ' active' : ''}`}>
                <button className="page-link" onClick={() => handleMudarPagina(idx + 1)}>{idx + 1}</button>
              </li>
            ))}
            <li className={`page-item${pagina === totalPaginas ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => handleMudarPagina(pagina + 1)} disabled={pagina === totalPaginas}>Próxima</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
} 