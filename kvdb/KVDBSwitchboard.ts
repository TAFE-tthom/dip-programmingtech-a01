import { KVDBObject } from './KVDB.ts';
import { KVDBInvalidResult } from './index.ts';
import { type KVDBQueryResult, type KVDBOperationResult } from './KVDBResult.ts';

/**
  * The switchboard is used by an input handler or another
  * view-like object to operate on.
  */
export class KVDBSwitchboard {

  #db: KVDBObject;

  constructor() {
    this.#db = new KVDBObject();
  }

  /**
    * Lists all the keys that have data associated with them
    */
  listKeys(): KVDBQueryResult {
    return KVDBInvalidResult.make("ListKeys");
  }

  /**
    * Retrieves an entry using a given key. This should return an array
	  * of integers if the key exists, otherwise, it should indicate that it was
	  * not successful
	  */
  getEntry(key: number) {
    return KVDBInvalidResult.make("GetEntry");
  }


  /**
  	*  Sets an entry that correspond to a given key.
  	*  If the key already exists, it will replace the data that corresponds
  	*  with that key with the data inputted.
  	*/
  setEntry(key: number, data: Int32Array) {
    return KVDBInvalidResult.make("SetEntry");
  }


  /**
  	*  Will remove a key and its data associated if it exists within the database
  	*  If it does not, it will indicate failure within the result object
  	*/
  removeEntry(key: number) {
    return KVDBInvalidResult.make("RemoveEntry");
  }

  /**
  	*  Given an array of data, it will add the data to the front of the existing
  	*  entry set associated with the key.
  	*  If the key does not exist, this will operate like `SetEntry`
  	*/
  push(key: number, data: Int32Array) {
    return KVDBInvalidResult.make("Push");
  }

  /**
  	*  Similar to `Push`, this operation will append the data to the end
  	*  of the entry set associated with the key.
  	*  If the key does not exist, this will operate like `SetEntry`
  	*/
  append(key: number, data: Int32Array) {
    return KVDBInvalidResult.make("Append");
  }

  /**
    *  A view will ignore elements that are not in the range of stateIndex-endIndex
    *  Given a key, only entries inclusive of startIndex to endIndex will be returned
    *  If the startIndex is > endIndex, this should result in a query failure
    *    As in, it should not return any data
    *  If the data associated with the key is not within range of startIndex
    *  to endindex - This is also considered a failure
    */
  view(key: number, start: number, end: number) {
    return KVDBInvalidResult.make("View");
  }

  /**
  	*  Sorts the entries associated with the key
  	*  If the key does not exist, a failure state should be indicated with
  	*  the result object
  	*  Otherwise, the entries should be sorted in ascending order
  	*/
  sort(key: number) {
    return KVDBInvalidResult.make("Sort");
  }

  /** 
  	*  Sorts a segment of the entry set based on startIndex and endIndex
  	*  If the key does not exist, a failure state should be indicated with
  	*  the result object
  	*  Otherwise, the entries within range should be sorted in ascending order
  	*/
  partialSort(key: number, start: number, end: number) {
    return KVDBInvalidResult.make("PartialSort");
  }

  /**
  	*  Computes a union between two entries, both key1 and key2 have to exist
  	*  for this to be successful.
  	* 
  	*  The result will be combination of both entry sets associated with key1
  	*  key2, it should not contain duplicates and it should be sorted in ascending
  	*  order.
  	*/
  union(key1: number, key2: number) {
    return KVDBInvalidResult.make("Union");
  }

  /** 
  	* Computes the intersection between two entry sets. Both key1 and key2 have
  	* to exist for this to be successful.
  	*
  	* The result should be all elements that entries from both key1 and key2
  	* have in common.
  	* It should not contain duplicates and it should be sorted in asceding order
  	*/
  intersect(key1: number, key2: number) {
    return KVDBInvalidResult.make("Intersect");
  }

  /**
  	*  Retrieves an object that has been committed while
  	*  the application has been open
  	*/
  commit(): KVDBOperationResult {
    return KVDBInvalidResult.make("Commit");
  }

  /**
  	*  Retrieves an object that has been committed while
  	*  the application has been open
  	*/ 
  checkout(id: number): KVDBOperationResult {
    return KVDBInvalidResult.make("Checkout");
  }

  /** 
  	*  Will load database object and replace the current database
  	*  (any commits, keys+values and watchers will be dropped)
  	*  if successfully loaded.
  	*  If the file cannot be loaded, the current database state is preserved.
  	* 
  	*  Database is in a CSV format
  	*     Format: Key0,Value0,Value1,Value2,...
  	*             Key1,Value0,Value1,Value2,...
  	*/
  load(path: string): KVDBOperationResult {
    return KVDBInvalidResult.make("Load");
    
  }

  /**
  	*  Will save the current database to a file specified
  	*  The data that will be saved is only the keys and values associated
  	*  The save format is CSV (Comma-Separated Values)
  	*     Format: Key0,Value0,Value1,Value2,...
  	*             Key1,Value0,Value1,Value2,...
  	*/ 
  save(path: string): KVDBOperationResult {
    return KVDBInvalidResult.make("Save");
  }
  
}
