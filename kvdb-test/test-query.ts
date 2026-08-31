import test from "node:test";
import { InternalQueryResult, KVDBTestUtil } from './util.ts';

import {
  KVDBSwitchboard
} from 'kvdb';

test("testEmptyKeys1", () => {
  const switchBoard = new KVDBSwitchboard();
  
  KVDBTestUtil.validateResults(
      switchBoard.listKeys(),
      InternalQueryResult.make()
          .setCommand("ListKeys")
          .setResults(new Int32Array([]))
          .ignoreRecKey()
          .setSuccess(true)
          .build());
        
});

test("testGetEmptyKeys2", () => {
  
  const switchboard = new KVDBSwitchboard();
  KVDBTestUtil
    .start()
    .setOperation(() => switchboard.getEntry(50))
    .setExpected(InternalQueryResult.make()
        .setCommand("GetEntry")
        .ignoreRecKey()
        .ignoreResults()
        .setSuccess(false)
        .build())
    .next()
    .setOperation(() => switchboard.getEntry(50))
    .setExpected(InternalQueryResult.make()
        .setCommand("GetEntry")
        .ignoreRecKey()
        .ignoreResults()
        .setSuccess(false)
        .build())
    .next()
    .run();
});

test("testSetEntry1", () => {
  
  const switchBoard = new KVDBSwitchboard();
        KVDBTestUtil
        .validateResults(
            switchBoard.setEntry(
                1,
                new Int32Array( [6, 5, 4]
            )),
            InternalQueryResult.make()
                .setCommand("SetEntry")
                .setRecKey(1)
                .setResults(new Int32Array([6, 5, 4]))
                .setSuccess(true)
                .build()
        );

        KVDBTestUtil
        .validateResults(
            switchBoard.listKeys(),
            InternalQueryResult.make()
                .setCommand("ListKeys")
                .setResults(new Int32Array([ 1 ]))
                .setRecKey(null)
                .setSuccess(true)
                .build()
        );
});

test("testSetEntrysWithGet1", () => {
  
  const switchBoard = new KVDBSwitchboard();
  KVDBTestUtil.validateResults(
      switchBoard.setEntry(
          1,
          new Int32Array( [6, 5, 4]
     )) ,
      InternalQueryResult.make()
          .setCommand("SetEntry")
          .setRecKey(1)
          .setResults(new Int32Array([6, 5, 4]))
          .setSuccess(true)
          .build()
  );

  KVDBTestUtil.validateResults(
      switchBoard.listKeys(),
      InternalQueryResult.make()
          .setCommand("ListKeys")
          .setResults(new Int32Array([ 1 ]))
          .setRecKey(null)
          .setSuccess(true)
          .build()
  );
  KVDBTestUtil.validateResults(
      switchBoard.getEntry(1),
      InternalQueryResult.make()
          .setCommand("GetEntry")
          .setResults(new Int32Array([6, 5, 4]))
          .setRecKey(1)
          .setSuccess(true)
          .build()
  );
});

test("testSetEntrysWithGet2", () => {
  
  const switchBoard = new KVDBSwitchboard();
  KVDBTestUtil.validateResults(
      switchBoard.setEntry(
          1,
          new Int32Array( [6, 5, 4]
      )),
      InternalQueryResult.make()
          .setCommand("SetEntry")
          .setRecKey(1)
          .setResults(new Int32Array([6, 5, 4]))
          .setSuccess(true)
          .build()
  );
  KVDBTestUtil.validateResults(
      switchBoard.setEntry(
          4,
          new Int32Array( [87, 22, 55]
      )),
      InternalQueryResult.make()
          .setCommand("SetEntry")
          .setRecKey(4)
          .setResults(new Int32Array([87, 22, 55]))
          .setSuccess(true)
          .build()
  );


  KVDBTestUtil.validateResults(
      switchBoard.listKeys(),
      InternalQueryResult.make()
          .setCommand("ListKeys")
          .setResults(new Int32Array([ 1, 4 ]))
          .setRecKey(null)
          .setSuccess(true)
          .build()
  );

  KVDBTestUtil.validateResults(
      switchBoard.getEntry(1),
      InternalQueryResult.make()
          .setCommand("GetEntry")
          .setResults(new Int32Array([6, 5, 4]))
          .setRecKey(1)
          .setSuccess(true)
          .build()
  );
});

test("testSetEntrysWithGet3", () => {
  
  const switchBoard = new KVDBSwitchboard();
  KVDBTestUtil
      .start()
      .setOperation(
          () => switchBoard.setEntry(4,
          new Int32Array( [6, 4, 7])))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("SetEntry")
              .setResults(new Int32Array([ 6, 4, 7 ]))
              .setRecKey(4)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.setEntry(7,
          new Int32Array( [9, 9])))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("SetEntry")
              .setResults(new Int32Array([ 9, 9 ]))
              .setRecKey(7)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.getEntry(4))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("GetEntry")
              .setResults(new Int32Array([ 6, 4, 7 ]))
              .setRecKey(4)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.getEntry(7))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("GetEntry")
              .setResults(new Int32Array([ 9, 9 ]))
              .setRecKey(7)
              .setSuccess(true)
              .build())
      .next()
      .run();
});

test("testSetEntrysWithRemove1", () => {
  
  const switchBoard = new KVDBSwitchboard();
  KVDBTestUtil
      .start()
      .setOperation(
          () => switchBoard.setEntry(4,
          new Int32Array( [6, 4, 7])))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("SetEntry")
              .setResults(new Int32Array([ 6, 4, 7 ]))
              .setRecKey(4)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.setEntry(7,
          new Int32Array( [9, 9])))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("SetEntry")
              .setResults(new Int32Array([ 9, 9 ]))
              .setRecKey(7)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.removeEntry(4))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("RemoveEntry")
              .setResults(new Int32Array([ ]))
              .setRecKey(4)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.removeEntry(7))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("RemoveEntry")
              .setResults(new Int32Array([ ]))
              .setRecKey(7)
              .setSuccess(true)
              .build())
      .next()
      .run();
});

test("testSetEntrysWithRemove2", () => {
  
  const switchBoard = new KVDBSwitchboard();
  KVDBTestUtil
      .start()
      .setOperation(
          () => switchBoard.setEntry(10,
          new Int32Array( [6, 4, 7])))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("SetEntry")
              .setResults(new Int32Array([ 6, 4, 7 ]))
              .setRecKey(10)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.removeEntry(10))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("RemoveEntry")
              .setResults(new Int32Array([ ]))
              .setRecKey(10)
              .setSuccess(true)
              .build())
      .next()
      .run();
});

test("testSetEntrysWithRemove3", (t) => {
  
  const switchBoard = new KVDBSwitchboard();
  KVDBTestUtil
      .start()
      .setOperation(
          () => switchBoard.setEntry(10,
          new Int32Array( [6, 4, 7])))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("SetEntry")
              .setResults(new Int32Array([ 6, 4, 7 ]))
              .setRecKey(10)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.setEntry(55,
          new Int32Array([88, 99, 11])))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("SetEntry")
              .setResults(new Int32Array([ 88, 99, 11 ]))
              .setRecKey(55)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.removeEntry(10))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("RemoveEntry")
              .setResults(new Int32Array([ ]))
              .setRecKey(10)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.removeEntry(55))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("RemoveEntry")
              .setResults(new Int32Array([ ]))
              .setRecKey(55)
              .setSuccess(true)
              .build())
      .next()
      .run();
});

test("testSetEntryView1", (t) => {
  
  const switchBoard = new KVDBSwitchboard();
  KVDBTestUtil
      .start()
      .setOperation(
          () => switchBoard.setEntry(10,
          new Int32Array( [6, 4, 7])))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("SetEntry")
              .setResults(new Int32Array([ 6, 4, 7 ]))
              .setRecKey(10)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.setEntry(55,
          new Int32Array([88, 99, 11])))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("SetEntry")
              .setResults(new Int32Array([ 88, 99, 11 ]))
              .setRecKey(55)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.view(10, 0, 1))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("View")
              .setResults(new Int32Array([ 6, 4 ]))
              .setRecKey(10)
              .setSuccess(true)
              .build())
      .next()
      .run();
});

test("testSetEntryView2", (t) => {
  
  const switchBoard = new KVDBSwitchboard();
  KVDBTestUtil
      .start()
      .setOperation(
          () => switchBoard.setEntry(10,
          new Int32Array( [6, 4, 7])))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("SetEntry")
              .setResults(new Int32Array([ 6, 4, 7 ]))
              .setRecKey(10)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.setEntry(55,
          new Int32Array([88, 99, 11, 90, 98, 102])))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("SetEntry")
              .setResults(new Int32Array([ 88, 99, 11, 90, 98, 102 ]))
              .setRecKey(55)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.view(55, 2, 5))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("View")
              .setResults(new Int32Array([ 11, 90, 98, 102 ]))
              .setRecKey(55)
              .setSuccess(true)
              .build())
      .next()
      .run();
});

test("testAppendGet1", (t) => {
  
  const switchBoard = new KVDBSwitchboard();
  KVDBTestUtil
      .start()
      .setOperation(
          () => switchBoard.append(10,
          new Int32Array( [6, 4, 7])))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("Append")
              .setResults(new Int32Array([ 6, 4, 7 ]))
              .setRecKey(10)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.append(10,
          new Int32Array([88, 99, 11, 90, 98, 102])))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("Append")
              .setResults(new Int32Array([ 6, 4, 7, 88, 99, 11, 90, 98, 102 ]))
              .setRecKey(10)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.getEntry(10))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("GetEntry")
              .setResults(new Int32Array([ 6, 4, 7, 88, 99, 11, 90, 98, 102 ]))
              .setRecKey(10)
              .setSuccess(true)
              .build())
      .next()
      .run();
});

test("testAppendGet2", (t) => {
  
  const switchBoard = new KVDBSwitchboard();
  KVDBTestUtil
      .start()
      .setOperation(
          () => switchBoard.setEntry(10,
          new Int32Array( [1, 2, 3])))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("SetEntry")
              .setResults(new Int32Array([ 1, 2, 3 ]))
              .setRecKey(10)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.append(10,
          new Int32Array([ 8, 9, 10 ])))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("Append")
              .setResults(new Int32Array([ 1, 2, 3, 8, 9, 10 ]))
              .setRecKey(10)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.getEntry(10))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("GetEntry")
              .setResults(new Int32Array([ 1, 2, 3, 8, 9, 10 ]))
              .setRecKey(10)
              .setSuccess(true)
              .build())
      .next()
      .run();
});

test("testPushGet1", (t) => {
  
  const switchBoard = new KVDBSwitchboard();
  KVDBTestUtil
      .start()
      .setOperation(
          () => switchBoard.push(10,
          new Int32Array( [6, 4, 7])))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("Push")
              .setResults(new Int32Array([6, 4, 7 ]))
              .setRecKey(10)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.push(10,
          new Int32Array([88, 99, 11, 90, 98, 102])))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("Push")
              .setResults(new Int32Array([ 88, 99, 11, 90, 98, 102, 6, 4, 7 ]))
              .setRecKey(10)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.getEntry(10))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("GetEntry")
              .setResults(new Int32Array([ 88, 99, 11, 90, 98, 102, 6, 4, 7 ]))
              .setRecKey(10)
              .setSuccess(true)
              .build())
      .next()
      .run();
});

test("testPushGet2", (t) => {
  
  const switchBoard = new KVDBSwitchboard();

  KVDBTestUtil
      .start()
      .setOperation(
          () => switchBoard.setEntry(10,
          new Int32Array( [1, 2, 3])))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("SetEntry")
              .setResults(new Int32Array([ 1, 2, 3 ]))
              .setRecKey(10)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.push(10,
          new Int32Array([ 8, 9, 10 ])))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("Push")
              .setResults(new Int32Array([ 8, 9, 10, 1, 2, 3 ]))
              .setRecKey(10)
              .setSuccess(true)
              .build())
      .next()
      .setOperation(
          () => switchBoard.getEntry(10))
      .setExpected(
          InternalQueryResult.make()
              .setCommand("GetEntry")
              .setResults(new Int32Array([ 8, 9, 10, 1, 2, 3 ]))
              .setRecKey(10)
              .setSuccess(true)
              .build())
      .next()
      .run();
});

