import { KVDBObject as DBObject } from './KVDB.ts';
import { KVDBInvalidResult as InvalidResult,
  type KVDBQueryResult as QueryResult,
  type KVDBOperationResult as OperationResult } from './KVDBResult.ts';
import { KVDBSwitchboard as Switchboard } from './KVDBSwitchboard.ts';


export const KVDBObject = DBObject;
export const KVDBSwitchboard = Switchboard;
export const KVDBInvalidResult = InvalidResult;
export type KVDBQueryResult = QueryResult;
export type KVDBOperationResult = OperationResult;
