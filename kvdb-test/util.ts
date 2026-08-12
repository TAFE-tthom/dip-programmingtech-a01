import { strict as assert } from 'node:assert/strict';
import { type KVDBQueryResult, type KVDBOperationResult } from 'kvdb';

export class QueryResultBuilder {

  
  cmd: string = '';
  key: number | null = null;
  res: Int32Array = new Int32Array();
  valid: boolean = false;
  ignoreSet: Array<boolean> = [false, false, false, false];

  setCommand(command: string) {
    this.cmd = command;
    return this;
  }

  ignoreCommand() {
    
    this.ignoreSet[0] = true;
    return this;
  }

  setResults(results: Int32Array) {
    this.res = results;
    return this;
  }

  ignoreResults() {

    this.ignoreSet[1] = true;
    return this;
  }

  setRecKey(key: number | null) {
    this.key = key;
    return this;
  }

  // setRecKeyOptions(key1: number, key2: number) {

  //   return this;
  // }

  ignoreRecKey() {
    this.ignoreSet[2] = true;
    
    return this;
  }

  setSuccess(success: boolean) {
    this.valid = success;
    return this;
  }


  ignoreSuccess() {
    
    this.ignoreSet[3] = true;
    return this;
  }


  build() {
    return new InternalQueryResult(this.cmd, this.key, this.res, this.valid,
    this.ignoreSet);
  }
}

export class InternalQueryResult implements KVDBQueryResult {

  cmd: string;
  key: number | null;
  res: Int32Array; 
  valid: boolean;
  ignoreSet: Array<boolean>

  constructor(command: string, key: number | null, results: Int32Array, success: boolean,
    ignoreSet: Array<boolean>) {
    this.cmd = command;
    this.key = key;
    this.res = results;
    this.valid = success;
    this.ignoreSet = ignoreSet;
  }

  static make() {
    return new QueryResultBuilder();
  }

  static makeDB(cmd: string, success: boolean) {
    return new InternalQueryResult(cmd, -1, new Int32Array(), success,
      [false, false, false, false]);
  }

  command() {
    return this.cmd;
  }

  success() {
    return this.valid;
  }

  results() {
    return this.res;
  }

   recordedKey() {
    return this.key as number;
  }

  simpleValidate(other: KVDBOperationResult) {
    assert.equal(other.success(), this.success(), "Did not match the expected value")
  }


  validate(other: KVDBQueryResult) {
    const self = this;
    const testActions: Array<() => void> = [
      () => { assert.equal(other.command(), self.command(), "Command did not match")},      
      () => { assert.equal(other.results(), self.results(), "Results did not match")},      
      () => { assert.equal(other.recordedKey(), self.recordedKey(), "Key did not match")},      
      () => { assert.equal(other.success(), self.success(), "Success value did not match")},      
    ];

    for(let i = 0; i < this.ignoreSet.length; i++) {
      if(this.ignoreSet[i] === false) {
        const action = testActions[i];
        if(action) {
          action();
        }
      }
    }
  }
  
}


class KVDBTestScenarioOperation {
  currentOperation: (() => KVDBQueryResult) | null = null;
  currentDatabaseOperation: (() => KVDBOperationResult) | null = null;
  expected: KVDBQueryResult | null = null;
  isDBOperation: boolean = false;  
}

export class KVDBTestScenarioBuilder {

  currentOperation: KVDBTestScenarioOperation = new KVDBTestScenarioOperation();
  operations: Array<KVDBTestScenarioOperation> = [];

  static make() {
    return new KVDBTestScenarioBuilder();
  }

  setOperation(oper: () => KVDBQueryResult) {
    this.currentOperation.currentOperation = oper;
    return this;
  }

  setDBOperation(oper: () => KVDBOperationResult) {
    this.currentOperation.currentDatabaseOperation = oper;
    return this;
  }

  setExpected(expected: InternalQueryResult) {
    this.currentOperation.expected = expected;
    return this;
  }

  next() {
    if(this.currentOperation.isDBOperation) {
      if(this.currentOperation.currentDatabaseOperation != null) {
        this.operations.push(this.currentOperation);
      } else {
        throw new Error("Unabe to construct next stage for Scenario");
      }
    } else {
      
      if(this.currentOperation.currentOperation != null) {
        this.operations.push(this.currentOperation);
      } else {
        throw new Error("Unabe to construct next stage for Scenario");
      }
    }
    this.currentOperation = new KVDBTestScenarioOperation();

    return this;
  }

  done() {
    const opers: Array<KVDBTestScenarioOperation> = this.operations;
    return () => {
      for(let i = 0; i < opers.length; i++) {
        const op: KVDBTestScenarioOperation = opers[i]!;  
      
        const exp: InternalQueryResult = op.expected as InternalQueryResult;
        const queryOp = op.currentOperation;
        const dbOp = op.currentDatabaseOperation;

        if(op.isDBOperation) {
          exp.simpleValidate(dbOp!())
        } else {
          exp.validate(queryOp!());
        }
      }
    }
  }

  run() {
    const testScenario = this.done();
    testScenario();
  }
  
    
}



export class KVDBTestUtil {

  static validateResults(actual: KVDBQueryResult, expected: InternalQueryResult) {
    expected.validate(actual);
  }

  static makeValidation(actual: KVDBQueryResult, expected: InternalQueryResult) {
    return () => this.validateResults(actual, expected);
  }

  static start() {
    return KVDBTestScenarioBuilder.make();
  }

  static witDB(cmd: string, expected: boolean) {
    return InternalQueryResult.makeDB(cmd, expected);
  }
  
}
