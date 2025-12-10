export interface FormData {
  areaInteresse: string;
  tempoDisponivel: string;
  investimento: string;
  tipoNegocio: string;
  habilidades: string;
  objetivoFinanceiro: string;
}

export interface IdeiaNegocios {
  nomeMarca: string;
  promessa: string;
  analiseViabilidade: string;
  comoViralizar: string;
  publicoAlvo: string;
  estrategiaMarketing: string;
  roadmapLancamento: string;
  scriptAnuncios: string;
  scriptConteudoOrganico: string;
  promptBolt: string;
  formasMonetizacao: string;
  primeirosPassos: string;
  metasFinanceiras: string;
}

export interface ResultadoGerado {
  id: string;
  ideias: IdeiaNegocios[];
  createdAt: string;
}
