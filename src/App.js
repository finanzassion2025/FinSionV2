import React, { useState, useEffect } from 'react';
import ingresos from './ingresos_finsion_completo.json';
import conceptos from './conceptos_salidas.json';

export default function FinSionApp() {
  const [filtro, setFiltro] = useState('');
  const [columna, setColumna] = useState('Cotizante');
  const [datosFiltrados, setDatosFiltrados] = useState(ingresos);
  const [salidas, setSalidas] = useState([]);
  const [form, setForm] = useState({
    fecha: '',
    cuenta: '',
    valor: '',
    descripcion: '',
    conceptoId: conceptos[0].id
  });

  useEffect(() => {
    const filtroMin = filtro.toLowerCase();
    const resultado = ingresos.filter((item) =>
      item[columna]?.toString().toLowerCase().includes(filtroMin)
    );
    setDatosFiltrados(resultado);
  }, [filtro, columna]);

  const columnas = [
    "Matriz", "Cotizante", "Recibo", "C.C.", "Afiliado", "Periodo", "Fecha",
    "Detalle", "Cuenta", "Banco", "Asesor", "Comisión", "EPS", "Valor",
    "ARL", "Valor.1", "AFP", "Valor.2", "CCF", "Valor.3", "FSP", "Admon",
    "Intereses", "Total", "Total SS", "Afiliación", "labora"
  ];

  const handleSubmit = () => {
    if (!form.fecha || !form.valor || !form.descripcion) return;
    const concepto = conceptos.find(c => c.id === parseInt(form.conceptoId));
    setSalidas([
      ...salidas,
      { ...form, concepto: concepto.concepto }
    ]);
    setForm({ fecha: '', cuenta: '', valor: '', descripcion: '', conceptoId: conceptos[0].id });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">FinSion - Control de Ingresos y Salidas</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">📥 Ingresos</h2>
        <div className="mb-4 flex gap-4 items-center">
          <label>Filtrar por:</label>
          <select onChange={(e) => setColumna(e.target.value)} value={columna} className="border px-2 py-1">
            {columnas.map((col) => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
          <input
            type="text"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            placeholder="Buscar..."
            className="border px-2 py-1 w-64"
          />
        </div>
        <div className="overflow-auto max-h-96">
          <table className="min-w-full border text-sm">
            <thead>
              <tr>
                {columnas.map((col) => (
                  <th key={col} className="border px-2 py-1 bg-gray-200 sticky top-0">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((fila, idx) => (
                <tr key={idx}>
                  {columnas.map((col) => (
                    <td key={col} className="border px-2 py-1">{fila[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">📤 Registrar Salida</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input type="date" value={form.fecha} onChange={e => setForm({ ...form, fecha: e.target.value })} className="border px-2 py-1" />
          <input type="text" placeholder="Cuenta/Banco" value={form.cuenta} onChange={e => setForm({ ...form, cuenta: e.target.value })} className="border px-2 py-1" />
          <input type="number" placeholder="Valor" value={form.valor} onChange={e => setForm({ ...form, valor: e.target.value })} className="border px-2 py-1" />
          <input type="text" placeholder="Descripción" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} className="border px-2 py-1" />
          <select value={form.conceptoId} onChange={e => setForm({ ...form, conceptoId: e.target.value })} className="border px-2 py-1 col-span-2">
            {conceptos.map(c => <option key={c.id} value={c.id}>{c.concepto}</option>)}
          </select>
        </div>
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Agregar Salida</button>

        <h3 className="text-xl font-semibold mt-8 mb-2">📑 Salidas Registradas</h3>
        <table className="w-full border text-sm">
          <thead>
            <tr>
              <th className="border px-2 py-1">Fecha</th>
              <th className="border px-2 py-1">Cuenta</th>
              <th className="border px-2 py-1">Valor</th>
              <th className="border px-2 py-1">Descripción</th>
              <th className="border px-2 py-1">Concepto</th>
            </tr>
          </thead>
          <tbody>
            {salidas.map((s, i) => (
              <tr key={i}>
                <td className="border px-2 py-1">{s.fecha}</td>
                <td className="border px-2 py-1">{s.cuenta}</td>
                <td className="border px-2 py-1">${parseFloat(s.valor).toFixed(2)}</td>
                <td className="border px-2 py-1">{s.descripcion}</td>
                <td className="border px-2 py-1">{s.concepto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
