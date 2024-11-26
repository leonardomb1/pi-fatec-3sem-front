export interface IUser {
  id: number,
  email: string;
  nomeUsuario: string,
  nomePessoa: string,
  nomeSocial: string,
  dtCadastro: Date,
  dtAlteracao: Date,
}

export interface IStudent {
  id: number;
  user: IUser;
  empresa: null,
  candidato: false,
  endereco: string,
  banco: string,
  agencia: string,
  cpf: string,
  rg: string,
  nivelEscolaridade: string,
  pcd: boolean,
  descricaoPcd: string,
  dtNascimento: Date,
  dtCadastro: Date,
  dtAlteracao: Date
}
