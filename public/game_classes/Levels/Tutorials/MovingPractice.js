class MovingPractice extends Level {
  constructor(levelPack) {
    super(levelPack, 'Moving Practice', 2, 'Move around a bit', 'Moved: ', 'Use the arrow buttons to move your ship', framework.getResources().keyboard_arrows);
  }

  _isPlayerMoving() {
    return (framework.isDown(37) || framework.isDown(38) || framework.isDown(39) || framework.isDown(40));
  }

  _checkRecursively() {
    if (this._isPlayerMoving()) {
      this.increaseObjectiveCounter();
    }
    this.timer.delegateFrameEvent(() => {
      this._checkRecursively();
    }, 60);
  }

  practice() {
    framework.registerEntity(ShipFactory.createShip(0, 0, patterns.ships.BASE_PLAYER_SHIP, [], []));
    this._checkRecursively();
  }
}
