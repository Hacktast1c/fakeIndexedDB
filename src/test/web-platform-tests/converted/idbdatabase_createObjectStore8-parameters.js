require("../support-node");

    function optionalParameters(desc, params) {
        var t = async_test(document.title + " - " + desc);

        createdb(t).onupgradeneeded = function(e) {
            e.target.result.createObjectStore("store", params);

            this.done();
        };
    }


    optionalParameters("autoInc true",                    {autoIncrement: true});
    optionalParameters("autoInc true, keyPath null",      {autoIncrement: true,  keyPath: null});
    optionalParameters("autoInc true, keyPath undefined", {autoIncrement: true,  keyPath: undefined});
    optionalParameters("autoInc true, keyPath string",    {autoIncrement: true,  keyPath: "a"});

    optionalParameters("autoInc false, keyPath empty",  {autoIncrement: false, keyPath: ""});
    optionalParameters("autoInc false, keyPath array",  {autoIncrement: false, keyPath: ["h", "j"]});
    optionalParameters("autoInc false, keyPath string", {autoIncrement: false, keyPath: "abc"});

    optionalParameters("keyPath empty",     {keyPath: ""});
    optionalParameters("keyPath array",     {keyPath: ["a","b"]});
    optionalParameters("keyPath string",    {keyPath: "abc"});
    optionalParameters("keyPath null",      {keyPath: null});
    optionalParameters("keyPath undefined", {keyPath: undefined});

