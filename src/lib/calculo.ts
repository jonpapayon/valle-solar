export interface ConfigCalculo {
  tarifa: number;
  horasSol: number;
  eficiencia: number;
  potenciaPanelW: number;
  ahorroMin: number;
  ahorroMax: number;
}

export function calcular(recibo: number, c: ConfigCalculo) {
  const kwhBimestre = recibo / c.tarifa;
  const kwhDia = kwhBimestre / 60;
  const kw = kwhDia / (c.horasSol * c.eficiencia);
  const paneles = Math.max(1, Math.ceil((kw * 1000) / c.potenciaPanelW));
  return {
    paneles,
    kw: (paneles * c.potenciaPanelW) / 1000,
    min: Math.round((recibo * c.ahorroMin) / 10) * 10,
    max: Math.round((recibo * c.ahorroMax) / 10) * 10,
  };
}