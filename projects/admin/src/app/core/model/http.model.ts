import { Guru } from '../helper/Guru';



export interface IHttpOption {
  headers?: {
    [header: string]: string | string[];
  };
  params?: {
    [param: string]: string | string[];
  };
  RequestType?: IRequestType;
  RequestServer?: IRequestServer;
  DefaultLogout?: boolean;
  LoadingScreen?: boolean;
}

export enum IRequestType {
  Protected,
  Anonymus,
  Guest
}
export enum IRequestServer {
  Api,
  Auth,
  App,
  Data
}


export class IWebRespose<T>{
  Code!: number;
  Message!: string;
  Data!: T;
}

export class IWebError {
  constructor(e: any) {
    if (Guru.isValidObj(e)) {
      this.Code = e.code ?? e.Code;
      this.Message = e.message ?? e.Message;
      this.Data = e.data ?? e.Data;
    }
  }
  public Code!: number;
  public Message!: string;
  public Data!: IHttpError;
}

export interface IHttpError {
  sysCode: number | string;
  sysMessage: string;
  sysDescription: string;
  sysDetail: string;
  sysDbDetail: string;
  exMessage: string;
  exTrace: string;
}
