import { KVDBObject } from './KVDB.ts';

/**
  *  QueryResult is used to represent a result retrieved
  *  from the database.
  *  This result would usually be from a ListKeys, GetEntry, RemoveEntry, SetEntry,
  *  View, MakeWatcher, Watcher, Push and Append operations.
  *  It also includes set operations such as Sort, Unique, Intersect, Union
  */
export interface KVDBQueryResult {

  /**
  	*  Records the command the user has activated
  	*  This should reflect the exact spelling of the Method name within
  	*  SnapshotSwitchboard
  	*/
  command(): string;

  /**
  	*  The result of the operation that was performed.
  	*  If it was a `GetEntry`, it will retrun an array of integers
  	*  that correspond with that key
  	*/
  results(): Int32Array;

  /**
  	*  If the operation was `GetEntry`, `SetEntry` or `RemoveEntry`
  	*  the key should be recorded and retrievable;
  	*/ 
  recordedKey(): number;

  /**
	  * Show if the operation was a success or not
	  */
  success(): boolean;
}

/**
  * Database Operation results, intended for checkout, commit
  * save and load.
  */
export interface KVDBOperationResult {

	/**
  	*  Used to represent the database intended to be checkedout
  	*  loaded, committed or saved. If null, Success() should indicate
  	*  false here
  	*/
  database(): KVDBObject;


	/**
  	*  Outlines if the operation was successful or not
  	*/
  success(): boolean;
}

/**
  * Provided Invalid Result Object
  * Used to satisfy the return values for particular methods
  */
export class KVDBInvalidResult implements KVDBQueryResult, KVDBOperationResult {

  // name of the command that failed
  #command: string = '';
  
  static make(name: string) {
    const res = new KVDBInvalidResult();
    res.#command = name;
    return res;
  }
  database() { return {} as any; }
  command() { return this.#command; }
  results() { return new Int32Array(0); };
  recordedKey() { return -1; }
  success() { return false; }
}


