import test from "node:test";
import { InternalQueryResult, KVDBTestUtil } from './util.ts';
import { unlinkSync } from 'node:fs';
import {
  KVDBSwitchboard
} from 'kvdb';

function DeleteFileIfExists(path: string) {
    try {
      unlinkSync(path);
    } catch(err) {
        // ignore
    }
}


test("Test_SaveLoad_1", () =>
{

    let switchBoard = new KVDBSwitchboard();
    

	let ID1 = 11;
	let ID2 = 22;
	let ID3 = 33;
	let Values1 = new Int32Array([ 1, 2, 3 ]);
	let Values2 = new Int32Array([ 4, 5, 6 ]);
	let Values3 = new Int32Array([ 8, 9, 10 ]);
	let path = "./db1.csv";

	DeleteFileIfExists(path);
	
    KVDBTestUtil
        .start()
        .setOperation(
            () => switchBoard.setEntry(
				ID1,
				Values1
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(Values1)
                .setRecKey(ID1)
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.setEntry(
				ID2,
				Values2
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(Values2)
                .setRecKey(ID2)
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.setEntry(
				ID3,
				Values3
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(Values3)
                .setRecKey(ID3)
                .setSuccess(true)
                .build())
        .next()
        .setDBOperation(
            () => switchBoard.save(path))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("Save")
				.ignoreRecKey()
				.ignoreResults()
                .setSuccess(true)
                .build())
        .next()
        .setDBOperation(
            () => switchBoard.load(path))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("Load")
				.ignoreRecKey()
				.ignoreResults()
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.getEntry(
				ID1
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("GetEntry")
                .setResults(Values1)
                .setRecKey(ID1)
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.getEntry(
				ID2
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("GetEntry")
                .setResults(Values2)
                .setRecKey(ID2)
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.getEntry(
				ID3
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("GetEntry")
                .setResults(Values3)
                .setRecKey(ID3)
                .setSuccess(true)
                .build())
        .next()
        .run();
});

test("Test_SaveLoad_2", () =>
{
  let switchBoard = new KVDBSwitchboard();

	let ID1 = 11;
	let ID2 = 22;
	let ID3 = 33;
	let ID4 = 44;
	let Values1 = new Int32Array([ 1, 2, 3 ]);
	let Values2 = new Int32Array([ 4, 5, 6 ]);
	let Values3 = new Int32Array([ 8, 9, 10 ]);
	let Values4 = new Int32Array([ 11, 12, 13 ]);
	let path = "./db2.csv";
	
	DeleteFileIfExists(path);
    KVDBTestUtil
        .start()
        .setOperation(
            () => switchBoard.setEntry(
				ID1,
				Values1
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(Values1)
                .setRecKey(ID1)
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.setEntry(
				ID2,
				Values2
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(Values2)
                .setRecKey(ID2)
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.setEntry(
				ID3,
				Values3
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(Values3)
                .setRecKey(ID3)
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.setEntry(
				ID4,
				Values4
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(Values4)
                .setRecKey(ID4)
                .setSuccess(true)
                .build())
        .next()
        .setDBOperation(
            () => switchBoard.save(path))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("Save")
				.ignoreRecKey()
				.ignoreResults()
                .setSuccess(true)
                .build())
        .next()
        .setDBOperation(
            () => switchBoard.load(path))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("Load")
				.ignoreRecKey()
				.ignoreResults()
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.getEntry(
				ID1
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("GetEntry")
                .setResults(Values1)
                .setRecKey(ID1)
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.getEntry(
				ID2
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("GetEntry")
                .setResults(Values2)

                .setRecKey(ID2)
                .setRecKey(ID2)
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.getEntry(
				ID3
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("GetEntry")
                .setResults(Values3)
                .setRecKey(ID3)
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.getEntry(
				ID4
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("GetEntry")
                .setResults(Values4)
                .setRecKey(ID4)
                .setSuccess(true)
                .build())
        .next()
        .run();

});
test("Test_CommitCheckout_1", () =>
{
  let switchBoard = new KVDBSwitchboard();
	let ID1 = 11;
	let ID2 = 22;
	let ID3 = 33;
	let ID4 = 44;
	let Values1 = new Int32Array([ 1, 2, 3 ]);
	let Values2 = new Int32Array([ 4, 5, 6 ]);
	let Values3 = new Int32Array([ 8, 9, 10 ]);
	let Values4 = new Int32Array([ 11, 12, 13 ]);
    KVDBTestUtil
        .start()
        .setOperation(
            () => switchBoard.setEntry(
				ID1,
				Values1
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(Values1)
                .setRecKey(ID1)
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.setEntry(
				ID2,
				Values2
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(Values2)
                .setRecKey(ID2)
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.setEntry(
				ID3,
				Values3
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(Values3)
                .setRecKey(ID3)
                .setSuccess(true)
                .build())
        .next()
        .setDBOperation(
            () => switchBoard.commit())
        .setExpected(
            InternalQueryResult.makeDB("Commit", true))
        .next()
        .setOperation(
            () => switchBoard.setEntry(
				ID4,
				Values4
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setResults(Values4)
                .setRecKey(ID4)
                .setSuccess(true)
                .build())
        .next()
        .setDBOperation(
            () => switchBoard.checkout(1))
        .setExpected(
            InternalQueryResult.makeDB("Checkout", true))
        .setOperation(
            () => switchBoard.getEntry(
				ID1
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("GetEntry")
                .setResults(Values1)
                .setRecKey(ID1)
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.getEntry(
				ID2
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("GetEntry")
                .setResults(Values2)
                .setRecKey(ID2)
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.getEntry(
				ID3
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("GetEntry")
                .setResults(Values3)
                .setRecKey(ID3)
                .setSuccess(true)
                .build())
        .next()
        .setOperation(
            () => switchBoard.getEntry(
				ID4
			))
        .setExpected(
            InternalQueryResult.make()
                .setCommand("GetEntry")
				.ignoreRecKey()
				.ignoreResults()
                .setSuccess(false)
                .build())
		.next()
		.run();

});


