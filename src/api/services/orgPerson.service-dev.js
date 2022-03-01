function makeTree(entities, targetPath) {
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
  console.log("result===", JSON.stringify(result, 0, 2));
  /* --------------------------------------------------------*/
  return result;

  function setResult(arrayIn, nb_rej) {
    let orphans = [];
    for (let elData of arrayIn) {
      let newEl = { ...elData, children: null };
      console.log("newEl :>> ", newEl);
      // console.log("elData :>> ", elData);
      console.log("elData.path :>> ", elData.path);
      console.log("elData.id :>> ", elData._id);
      let parAr = getParentKey(elData.path);
      console.log("parAr :>> ", parAr);

      if (parAr.length === 0) {
        result.push(newEl);
      } else {
        let resParent = result;
        do {
          let rech = parAr.pop(),
            fPar = resParent.find((treeElm) => {
              console.log("treeElm :>> ", treeElm);
              return treeElm.name === rech.name && treeElm.path === rech.path;
            });
          if (fPar) {
            if (fPar.children === null) fPar.children = [];
            resParent = fPar.children;
            // throw `parent element not found : id:'${rech.id}', path:'${rech.path}'`;
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
    console.log("path :>> ", path);
    const targetLevel = getLevelFromPath(targetPath) + 1;
    // return array of parent element
    let rep = [],
      par = path,
      lev,
      bKey,
      xCom,
      idK;
    do {
      bKey = par.substring(0, par.lastIndexOf(",")); // remove last ','
      console.log("bKey :>> ", bKey);
      lev = bKey.match(/,/g).length - 1;
      console.log("lev :>> ", lev);
      if (lev > targetLevel) {
        xCom = bKey.lastIndexOf(",");
        par = bKey.substring(0, xCom) + ",";
        idK = bKey.substring(++xCom);
        rep.push({ path: par, name: idK });
        console.log("rep after push :>> ", rep);
      }
    } while (lev > targetLevel);
    console.log("array of parent element :>> ", { rep });
    return rep;
  }
}

// returns level of target elem
function getLevelFromPath(targetPath) {
  const bKey = targetPath.substring(0, targetPath.lastIndexOf(",")); // remove last ','
  console.log("bKey :>> ", bKey);
  const lev = bKey.match(/,/g).length - 1;
  return lev;
}

console.log("getLevelFromPath = ", getLevelFromPath(",root,"));
console.log("getLevelFromPath = ", getLevelFromPath(",root,3,"));
console.log("getLevelFromPath = ", getLevelFromPath(",root,3,3-3,"));
console.log("getLevelFromPath = ", getLevelFromPath(",root,3,3-3,3-3-3,"));

const persons = [
  // {
  //   path: ",root,",
  //   name: "same name",
  // },
  // {
  //   path: ",root,",
  //   name: "2",
  // },
  // { path: ",root,2,", name: "2-2" },
  // { path: ",root,", name: "3" },
  { path: ",root,3,", name: "3-3" },
  {
    path: ",root,3,3-3,",
    name: "3-3-3",
  },
  {
    path: ",root,3,3-3,3-3-3,",
    name: "3-3-3-3",
  },
];

// const t = { path: ',root,3,', _id: 621d3439a2e81b536d5c0771, name: '3-3' }

makeTree(persons, ",root,3");
