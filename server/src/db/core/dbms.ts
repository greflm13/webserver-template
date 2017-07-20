import { Database } from './database';

export abstract class Dbms {

  public abstract openDatabase (name?: string): Promise<Database>;
  public abstract getDatabase (name?: string): Database;

}

