// This is for ngram fts by matt.lee
// @tags: [assumes_no_implicit_index_creation]
(function() {
    "use strict";

    const coll = db.text1;
    coll.drop();

    assert.commandWorked(coll.createIndex({name:"text"}, {default_language: "ngram", name: "x_ngramtext"}));

    assert.writeOK(coll.insert({ _id: 1, name: "MongoDB 3.6은 6/2일 릴리즈되었습니다." }));
    assert.writeOK(coll.insert({ _id: 2, name: "MongoDB 3.6은 6-2일 릴리저되었습니다." }));
    assert.writeOK(coll.insert({ _id: 3, name: "MongoDB 3.6은 6+2일 릴리즈되었습니다." }));
    assert.writeOK(coll.insert({ _id: 4, name: "MongoDB 3.6은 6*2일 릴리저되었습니다." }));

    var res_count;

    // Text search for over 2 character keyword
    res_count = coll.find({ $text: { $search: "Mongo" } }).count();
    assert.eq(4, res_count, "Result count is not matched for keyword 'Mongo'");

    res_count = coll.find({ $text: { $search: "릴리즈" } }).count();
    assert.eq(2, res_count, "Result count is not matched for keyword '릴리즈'");

    res_count = coll.find({ $text: { $search: "3.6" } }).count();
    assert.eq(4, res_count, "Result count is not matched for keyword '3.6'");

    res_count = coll.find({ $text: { $search: "Mongo 3.6" } }).count();
    assert.eq(4, res_count, "Result count is not matched for keyword 'Mongo 3.6'");

    // Phrase search (Not found)
    res_count = coll.find({ $text: { $search: "\"Mongo 3.6\"" } }).count();
    assert.eq(0, res_count, "Result count is not matched for keyword '\"Mongo 3.6\"'");

    // Phrase search (Found)
    res_count = coll.find({ $text: { $search: "\"MongoDB 3.6\"" } }).count();
    assert.eq(4, res_count, "Result count is not matched for keyword '\"MongoDB 3.6\"'");

    res_count = coll.find({ $text: { $search: "\"6/2일 릴리즈\"" } }).count();
    assert.eq(1, res_count, "Result count is not matched for keyword '\"6/2일 릴리즈\"'");

    // Index meta info
    const index = coll.getIndexes().find(index => index.name === "x_ngramtext");
    assert.neq(index, undefined);
    assert.gte(index.textIndexVersion, 3, tojson(index));
    assert.eq(index.default_language, "ngram", tojson(index));
}());
