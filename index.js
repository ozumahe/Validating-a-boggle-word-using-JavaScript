const board = [
  ["I", "L", "A", "W"],
  ["B", "N", "G", "E"],
  ["I", "U", "A", "O"],
  ["A", "S", "R", "L"],
];
const word = "BINGO";
const checkWord = (board = [], word = "") => {
  const numRows = board.length;
  const numCols = board[0].length;
  let queue = board.reduce((acc, row, i) => {
    row.forEach((x, j) => {
      if (x === word[0]) {
        acc.push({
          pos: { r: i, c: j },
          nextIndex: 1,
          path: [numCols * i + j],
        });
      }
    });
    return acc;
  }, []);
  let exploreWord = (obj, queue) => {
    let allMoves = [
      { r: obj.pos.r - 1, c: obj.pos.c },
      { r: obj.pos.r + 1, c: obj.pos.c },
      { r: obj.pos.r, c: obj.pos.c - 1 },
      { r: obj.pos.r, c: obj.pos.c + 1 },
      { r: obj.pos.r - 1, c: obj.pos.c - 1 },
      { r: obj.pos.r - 1, c: obj.pos.c + 1 },
      { r: obj.pos.r + 1, c: obj.pos.c - 1 },
      { r: obj.pos.r + 1, c: obj.pos.c + 1 },
    ];
    allMoves.forEach((o) => {
      let index = numCols * o.r + o.c;
      if (o.r >= 0 && o.r < numRows && o.c >= 0 && o.c < numCols) {
        if (
          board[o.r][o.c] === word[obj.nextIndex] &&
          !obj.path.includes(index)
        ) {
          let cloneObj = JSON.parse(JSON.stringify(obj));
          cloneObj.pos = { r: o.r, c: o.c };
          cloneObj.nextIndex += 1;
          cloneObj.path.push(index);
          queue.push(cloneObj);
        }
      }
    });
  };
  while (queue.length > 0) {
    let obj = queue.shift();
    if (obj.nextIndex === word.length) {
      return true;
    }
    exploreWord(obj, queue);
  }
  return false;
};

console.log(checkWord(board, word));
