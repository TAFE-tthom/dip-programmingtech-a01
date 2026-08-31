import test from "node:test";
import { InternalQueryResult, KVDBTestUtil } from './util.ts';

import {
  KVDBSwitchboard
} from 'kvdb';

test("test_Sort_1", () => {
    let switchBoard = new KVDBSwitchboard();
	let ID = 70;
    KVDBTestUtil
        .start()
        .setOperation(
            () => switchBoard.setEntry(ID,
             new Int32Array([6, 4, 7, 10, 3, 1])))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(new Int32Array([6, 4, 7, 10, 3, 1 ]))
                .setRecKey(ID)
                .setSuccess(true)
                .build())
        .next()
		.setOperation(() => switchBoard.sort(ID))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("Sort")
				.ignoreResults()
				.ignoreRecKey()
                .setSuccess(true)
                .build())
		.next()
        .setOperation(() => switchBoard.getEntry(ID))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("GetEntry")
                .setResults(new Int32Array([ 1, 3, 4, 6, 7, 10 ]))
                .setRecKey(ID)
                .setSuccess(true)
                .build())
        .next()
        .run();

});

test("test_Union_1_NoDup", () => {
    let switchBoard = new KVDBSwitchboard();
	let ID1 = 10;
	let ID2 = 20;
    KVDBTestUtil
        .start()
        .setOperation(
            () => switchBoard.setEntry(ID1,
             new Int32Array([4, 7, 8])))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(new Int32Array([4, 7, 8]))
                .setRecKey(ID1)
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.setEntry(ID2,
             new Int32Array([10, 11, 12])))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(new Int32Array([ 10, 11, 12 ]))
                .setRecKey(ID2)
                .setSuccess(true)
                .build())
        .next()
		.setOperation(() => switchBoard.union(ID1, ID2))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("Union")
				.ignoreRecKey()
				.setResults(new Int32Array([4, 7, 8, 10, 11, 12]))
                .setSuccess(true)
                .build())
		.next()
        .run();

});

test("test_Union_2_Dup", () => {
    let switchBoard = new KVDBSwitchboard();
	let ID1 = 10;
	let ID2 = 20;
    KVDBTestUtil
        .start()
        .setOperation(
            () => switchBoard.setEntry(ID1,
             new Int32Array([4, 7, 8, 10, 11])))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(new Int32Array([4, 7, 6, 10, 11]))
                .setRecKey(ID1)
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.setEntry(ID2,
             new Int32Array([10, 11, 12, 13])))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(new Int32Array([10,11, 12, 13 ]))
                .setRecKey(ID2)
                .setSuccess(true)
                .build())
        .next()
		.setOperation(() => switchBoard.union(ID1, ID2))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("Union")
				.ignoreRecKey()
				.setResults(new Int32Array([4, 7, 8, 10, 11, 12, 13]))
                .setSuccess(true)
                .build())
		.next()
        .run();

});

test("test_Intersection_1", () => {
    let switchBoard = new KVDBSwitchboard();
	let ID1 = 10;
	let ID2 = 20;
    KVDBTestUtil
        .start()
        .setOperation(
            () => switchBoard.setEntry(ID1,
             new Int32Array([4, 7, 8, 10, 11])))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(new Int32Array([ 4, 7,6, 10, 11]))
                .setRecKey(ID1)
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.setEntry(ID2,
             new Int32Array([10, 11, 12, 13])))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(new Int32Array([ 10, 11, 12, 13 ]))
                .setRecKey(ID2)
                .setSuccess(true)
                .build())
        .next()
		.setOperation(() => switchBoard.intersect(ID1, ID2))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("Intersect")
				.ignoreRecKey()
				.setResults(new Int32Array([ 10, 11 ]))
                .setSuccess(true)
                .build())
		.next()
        .run();

});

test("test_Intersection_2", () => {
    let switchBoard = new KVDBSwitchboard();
	let ID1 = 10;
	let ID2 = 20;
    KVDBTestUtil
        .start()
        .setOperation(
            () => switchBoard.setEntry(ID1,
             new Int32Array([ 4, 7, 8, 11])))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(new Int32Array([ 4, 7, 8, 11]))
                .setRecKey(ID1)
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.setEntry(ID2,
             new Int32Array([ 4, 10, 11, 12 ])))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(new Int32Array([ 4, 10, 11, 12 ]))
                .setRecKey(ID2)
                .setSuccess(true)
                .build())
        .next()
		.setOperation(() => switchBoard.intersect(ID1, ID2))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("Intersect")
				.ignoreRecKey()
				.setResults(new Int32Array([ 4, 11 ]))
                .setSuccess(true)
                .build())
		.next()
        .run();

});

test("test_Sort_2", () => {
    let switchBoard = new KVDBSwitchboard();
	let ID = 89;
    KVDBTestUtil
        .start()
        .setOperation(
            () => switchBoard.setEntry(ID,
             new Int32Array([6, 4, 7, 10, 3, 1, -10, 90, 2, 99, 65])))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(new Int32Array([ 6, 4, 7, 10, 3, 1, -10, 90, 2, 99, 65 ]))
                .setRecKey(ID)
                .setSuccess(true)
                .build())
        .next()
		.setOperation(() => switchBoard.sort(ID))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("Sort")
				.ignoreResults()
				.ignoreRecKey()
                .setSuccess(true)
                .build())
		.next()
        .setOperation(() => switchBoard.getEntry(ID))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("GetEntry")
                .setResults(new Int32Array([ -10, 1, 2, 3, 4, 6, 7, 10, 65, 90, 99 ]))
                .setRecKey(ID)
                .setSuccess(true)
                .build())
        .next()
        .run();

});

test("test_PartialSort_1", () => {
    let switchBoard = new KVDBSwitchboard();
	let ID = 67;
	
    KVDBTestUtil
        .start()
        .setOperation(
            () => switchBoard.setEntry(ID,
             new Int32Array([6, 7, 10, 4, 65 ])))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(new Int32Array([ 6, 7, 10, 4, 65 ]))
                .setRecKey(ID)
                .setSuccess(true)
                .build())
        .next()
		.setOperation(() => switchBoard.partialSort(ID, 1, 3))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("PartialSort")
				.ignoreResults()
				.ignoreRecKey()
                .setSuccess(true)
                .build())
		.next()
        .setOperation(() => switchBoard.getEntry(ID))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("GetEntry")
                .setResults(new Int32Array([ 6, 4, 7, 10, 65]))
                .setRecKey(ID)
                .setSuccess(true)
                .build())
        .next()
        .run();

});

test("testPartialSort2", () => {
    let switchBoard = new KVDBSwitchboard();
	let ID = 34;
	
    KVDBTestUtil
        .start()
        .setOperation(
            () => switchBoard.setEntry(ID,
             new Int32Array([6, 4, 7, 10, 3, 1, 77, 12, 28])))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults( new Int32Array([6, 4, 7, 10, 3, 1, 77, 12, 28]))
                .setRecKey(ID)
                .setSuccess(true)
                .build())
        .next()
		.setOperation(() => switchBoard.partialSort(ID, 3, 7))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("PartialSort")
				.ignoreResults()
				.ignoreRecKey()
                .setSuccess(true)
                .build())
		.next()
        .setOperation(() => switchBoard.getEntry(ID))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("GetEntry")
                .setResults(new Int32Array([6, 4, 7, 1, 3, 10, 12, 77, 28]))
                .setRecKey(ID)
                .setSuccess(true)
                .build())
        .next()
        .run();

});
