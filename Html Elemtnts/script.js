const cells = Array.from(document.querySelectorAll('.cell'));
const statusEl = document.getElementById('status');
const restartBtn = document.getElementById('restart');
let board = Array(9).fill('');
let current = 'X';
let active = true;

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function updateStatus(){
  if(!active) return;
  statusEl.textContent = `Player ${current}'s turn`;
}

function handleCellClick(e){
  const el = e.currentTarget;
  const idx = Number(el.dataset.index);
  if(!active || board[idx]) return;
  board[idx] = current;
  el.textContent = current;
  el.classList.add('filled');
  el.setAttribute('data-player', current);

  if(checkWin()){
    statusEl.textContent = `Player ${current} wins!`;
    active = false;
    return;
  }

  if(board.every(Boolean)){
    statusEl.textContent = `It's a draw!`;
    active = false;
    return;
  }

  current = current === 'X' ? 'O' : 'X';
  updateStatus();
}

function checkWin(){
  for(const combo of wins){
    const [a,b,c] = combo;
    if(board[a] && board[a] === board[b] && board[a] === board[c]){
      combo.forEach(i => cells[i].classList.add('win'));
      return true;
    }
  }
  return false;
}

function restart(){
  board.fill('');
  current = 'X';
  active = true;
  statusEl.textContent = `Player ${current}'s turn`;
  cells.forEach(c => { c.textContent = ''; c.classList.remove('win','filled'); c.removeAttribute('data-player'); });
}

// keyboard support (Enter / Space)
cells.forEach(c => {
  c.addEventListener('click', handleCellClick);
  c.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCellClick({ currentTarget: c }); } });
});
restartBtn.addEventListener('click', restart);

updateStatus();