const persons = [
  { path: ",aboveRoot,", name: "root" },
  {
    path: ",aboveRoot,root,",
    name: "a",
  },
  {
    path: ",aboveRoot,root,",
    name: "b",
  },
  {
    path: ",aboveRoot,root,j,",
    name: "c",
  },
  {
    path: ",aboveRoot,root,e,",
    name: "d",
  },
  {
    path: ",aboveRoot,root,",
    name: "e",
  },
  {
    path: ",aboveRoot,root,e,g,",
    name: "f",
  },
  {
    path: ",aboveRoot,root,e,",
    name: "g",
  },
  {
    path: ",aboveRoot,root,e,g,",
    name: "h",
  },
  {
    path: ",aboveRoot,root,e,d,",
    name: "q",
  },
  {
    path: ",aboveRoot,root,e,",
    name: "i",
  },
  {
    path: ",aboveRoot,root,",
    name: "j",
  },
  {
    path: ",aboveRoot,root,a,",
    name: "k",
  },
  {
    path: ",aboveRoot,root,a,",
    name: "p",
  },
  {
    path: ",aboveRoot,root,j,",
    name: "l",
  },
  {
    path: ",aboveRoot,root,j,l,",
    name: "m",
  },
  {
    path: ",aboveRoot,root,j,l,",
    name: "n",
  },
  {
    path: ",aboveRoot,root,j,l,",
    name: "o",
  },
];

function makeTree(entities) {
  console.log("entities :>> ", entities);
  const firstEntity = entities[0];
  const targetPath = firstEntity.path;
  const result = [];
  let unDone = [],
    source = entities;
  let cpt = 0; // just for stoping infinite loop on error
  do {
    // assign remaining unDones (orphans from setResult)
    unDone = setResult(source, unDone.length);
    // assign remaining source for next do loop input to setResult
    source = unDone;
    if (++cpt > 10)
      throw "mince! something is rotten in the state of Denmark...";
  } while (unDone.length > 0);

  /* --------------------------------------------------------*/
  console.log("\n makeTree result===", JSON.stringify(result, 0, 2));
  /* --------------------------------------------------------*
   **/
  return result;

  // sets results and returns orphans
  function setResult(arrayIn, nb_rej) {
    let orphans = [];
    for (let elData of arrayIn) {
      // give current element children
      let newEl = { ...elData, children: null };
      // get parent
      let parAr = getParentKey(elData.path);

      // If has no parents then push current elem to result array
      if (parAr.length === 0) {
        result.push(newEl);
        // if has parents,
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
      // get level by counting commas
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

  // returns level of target elem
  function getLevelFromPath(targetPath) {
    const bKey = targetPath.substring(0, targetPath.lastIndexOf(",")); // remove last ','
    console.log("bKey :>> ", bKey);
    const lev = bKey.match(/,/g).length - 1;
    return lev;
  }
}

// Alternate
function makeTree1(entities) {
  console.log("makeTree entities :>> ", entities);
  // const input = entities.map((e) => {
  //   return e.path;
  // });
  var input = [",Fred,Jim,Bob,", ",Fred,Jim,", ",Fred,Thomas,Rob,", ",Fred,"];
  console.log("input :>> ", input);
  var output = [];
  for (var i = 0; i < input.length; i++) {
    const descendentsString = input[i];
    const descendentsStringCommasRemoved = descendentsString.replace(
      /^,|,$/g,
      ""
    );
    var chain = descendentsStringCommasRemoved.split(",");
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
  }
  console.log("output :>> ", JSON.stringify(output, 0, 2));
  return output;
}

// makeTree1(persons);

makeTree(persons);
