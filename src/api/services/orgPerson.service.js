export function makeTree1(entities) {
  const firstEntity = entities[0];
  const targetPath = firstEntity.path;
  const result = [];
  let unDone = [],
    source = entities;
  let cpt = 0; // just for stoping infinite loop on error
  do {
    unDone = setResult(source, unDone.length);
    source = unDone;
    if (++cpt > 10)
      throw "mince! something is rotten in the state of Denmark...";
  } while (unDone.length > 0);

  /* --------------------------------------------------------*/
  console.log("\n makeTree result===", JSON.stringify(result, 0, 2));
  /* --------------------------------------------------------*
   **/
  return result;

  function setResult(arrayIn, nb_rej) {
    let orphans = [];
    for (let elData of arrayIn) {
      let newEl = { ...elData._doc, children: null };
      let parAr = getParentKey(elData._doc.path);

      if (parAr.length === 0) {
        result.push(newEl);
      } else {
        let resParent = result;
        do {
          let rech = parAr.pop(),
            fPar = resParent.find((treeElm) => {
              return treeElm.name === rech.name && treeElm.path === rech.path;
            });
          if (fPar) {
            if (fPar.children === null) fPar.children = [];
            resParent = fPar.children;
          } else {
            orphans.push({ ...elData });
            resParent = null;
            parAr.length = 0;
          }
        } while (parAr.length > 0);
        if (resParent) resParent.push(newEl);
      }
    }
    if (orphans.length > 0 && orphans.length == nb_rej)
      throw ` ${nb_rej} children element(s) without parent !'`;

    return orphans;
  }
  function getParentKey(path) {
    const targetLevel = getLevelFromPath(targetPath);
    // return array of parent element
    let rep = [],
      par = path,
      lev,
      bKey,
      xCom,
      idK;
    do {
      bKey = par.substring(0, par.lastIndexOf(",")); // remove last ','
      lev = bKey.match(/,/g).length - 1;
      if (lev > targetLevel) {
        xCom = bKey.lastIndexOf(",");
        par = bKey.substring(0, xCom) + ",";
        idK = bKey.substring(++xCom);
        rep.push({ path: par, name: idK });
      }
    } while (lev > targetLevel);
    return rep;
  }
}

// returns level of target elem
function getLevelFromPath(targetPath) {
  const bKey = targetPath.substring(0, targetPath.lastIndexOf(",")); // remove last ','
  const lev = bKey.match(/,/g).length - 1;
  return lev;
}

export function makeTree(entities) {
  console.log("makeTree entities :>> ", entities);
  const input = entities.map((e) => {
    return e.path;
  });
  console.log("input :>> ", input);
  // var input = ["Fred,Jim,Bob", "Fred,Jim", "Fred,Thomas,Rob", "Fred"];
  var output = [];
  for (var i = 0; i < input.length; i++) {
    var chain = input[i].split(",");
    var currentNode = output;
    for (var j = 0; j < chain.length; j++) {
      var wantedNode = chain[j];
      var lastNode = currentNode;
      for (var k = 0; k < currentNode.length; k++) {
        if (currentNode[k].name == wantedNode) {
          currentNode = currentNode[k].children;
          break;
        }
      }
      // If we couldn't find an item in this list of children
      // that has the right name, create one:
      if (lastNode == currentNode) {
        var newNode = (currentNode[k] = { name: wantedNode, children: [] });
        currentNode = newNode.children;
      }
    }

    console.log("output :>> ", JSON.stringify(output, 0, 2));
    return output;
  }
}
makeTree(persons);

const persons = [
    { path: ',aboveRoot,', _id: 62213134e8fc3448c1e8bccc, name: 'root' },
    {
      path: ',aboveRoot,root,',
      _id: 62213134e8fc3448c1e8bccd,
      name: 'a'
    },
    {
      path: ',aboveRoot,root,',
      _id: 62213134e8fc3448c1e8bcce,
      name: 'b'
    },
    {
      path: ',aboveRoot,root,j,',
      _id: 62213134e8fc3448c1e8bccf,
      name: 'c'
    },
    {
      path: ',aboveRoot,root,e,',
      _id: 62213134e8fc3448c1e8bcd0,
      name: 'd'
    },
    {
      path: ',aboveRoot,root,',
      _id: 62213134e8fc3448c1e8bcd1,
      name: 'e'
    },
    {
      path: ',aboveRoot,root,e,g,',
      _id: 62213134e8fc3448c1e8bcd2,
      name: 'f'
    },
    {
      path: ',aboveRoot,root,e,',
      _id: 62213134e8fc3448c1e8bcd3,
      name: 'g'
    },
    {
      path: ',aboveRoot,root,e,g,',
      _id: 62213134e8fc3448c1e8bcd4,
      name: 'h'
    },
    {
      path: ',aboveRoot,root,e,d,',
      _id: 62213134e8fc3448c1e8bcd5,
      name: 'q'
    },
    {
      path: ',aboveRoot,root,e,',
      _id: 62213134e8fc3448c1e8bcd6,
      name: 'i'
    },
    {
      path: ',aboveRoot,root,',
      _id: 62213134e8fc3448c1e8bcd7,
      name: 'j'
    },
    {
      path: ',aboveRoot,root,a,',
      _id: 62213134e8fc3448c1e8bcd8,
      name: 'k'
    },
    {
      path: ',aboveRoot,root,a,',
      _id: 62213134e8fc3448c1e8bcd9,
      name: 'p'
    },
    {
      path: ',aboveRoot,root,j,',
      _id: 62213134e8fc3448c1e8bcda,
      name: 'l'
    },
    {
      path: ',aboveRoot,root,j,l,',
      _id: 62213134e8fc3448c1e8bcdb,
      name: 'm'
    },
    {
      path: ',aboveRoot,root,j,l,',
      _id: 62213134e8fc3448c1e8bcdc,
      name: 'n'
    },
    {
      path: ',aboveRoot,root,j,l,',
      _id: 62213134e8fc3448c1e8bcdd,
      name: 'o'
    }
  ]
