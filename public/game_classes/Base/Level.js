class Level {
  constructor(levelPack, levelName, objectivesToComplete, objective, objectivePrefix, help, insteadWeaponHud) {
    this.levelPack = levelPack;
    this.framework = framework;
    this.packName = levelPack.getName();
    this.levelName = levelName;
    this.objectivePrefix = objectivePrefix;
    this.objective = objective;
    this.help = help;
    this.insteadWeaponHud = insteadWeaponHud;
    this.objectiveToComplete = objectivesToComplete;
    this.objectiveScored = new EventExpiration();
    this.objectiveCounter = 0;
    this.hudHandler = HUDHandler.getInstance();
    this.timer = TimeHandler.getInstance();

    this.strings = {
      'playerDied': 'You died... ',
      'objectiveFailed': 'Objective failed...',
      'completeStage': 'Well done!',
      'completePack': 'You completed all of the trainings',
    };
  }

  getName() {
    return this.levelName;
  }

  getPackName() {
    return this.packName;
  }

  resetFramework() {
    framework.resetFramework();
  }

  start() {
    this.objectiveCounter = 0;

    this.hudHandler.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.CENTER), new FrameExpiration(200), this.getPackName(), new TextStyle(), new FadeIn(50), new FadeOut(50)));
    this.hudHandler.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.BOTTOM, 150), new FrameExpiration(200), this.getName(), new TextStyle("25px Gerogia"), new FadeIn(50), new FadeOut(50)));

    this.timer.delegateFrameEvent(() => {
      this.drawHUD();
      this.practice();
    }, 200);
  }

  completed() {
    this.resetFramework();
    this.hudHandler.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.CENTER), new FrameExpiration(200), this.strings.completeStage, new TextStyle(), new FadeIn(50), new FadeOut(50)));
    this.timer.delegateFrameEvent(() => {
        this.resetFramework();
        this.levelPack.nextStage();
      },
      200);
  }

  restart() {
    this.resetFramework();
    this.start();
  }

  drawHUD() {
    let shootingTutorialExpiration = new EventExpiration();

    this.hudHandler.addElement(new TextElement(new TextPosition(POSITIONS.X.LEFT, POSITIONS.Y.BOTTOM, 15), shootingTutorialExpiration, this.help, new TextStyle("20px Gerogia", "white"), new FadeIn(50)));
    this.hudHandler.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.TOP, 15), shootingTutorialExpiration, this.objective, new TextStyle("30px Gerogia", "white"), new FadeIn(50)));

    if (this.insteadWeaponHud !== undefined)
      this.hudHandler.addElement(new ImageElement(new ImagePosition(POSITIONS.X.RIGHT, POSITIONS.Y.BOTTOM, 15), shootingTutorialExpiration, this.insteadWeaponHud, new FadeIn(50), new FadeOut(50)));
    else
      this.hudHandler.addElement(new WeaponHUD());

    this.updateObjectiveCounter();
  }

  updateObjectiveCounter() {
    this.objectiveScored.fire();
    this.timer.delegateFrameEvent(() => {
      this.objectiveScored = new EventExpiration();
      this.hudHandler.addElement(new TextElement(new TextPosition(POSITIONS.X.RIGHT, POSITIONS.Y.TOP, 15), this.objectiveScored, this.objectivePrefix + this.objectiveCounter + " / " + this.objectiveToComplete, new TextStyle("20px Gerogia", "white")));
    }, 1);
  }

  increaseObjectiveCounter() {
    this.objectiveCounter++;
    if (this.isObjectiveCompleted())
      this.completed();
    else
      this.updateObjectiveCounter();
  }

  isObjectiveCompleted() {
    return this.objectiveCounter >= this.objectiveToComplete;
  }

  failed(reason) {
    this.resetFramework();
    this.hudHandler.addElement(new TextElement(new TextPosition(POSITIONS.X.CENTER, POSITIONS.Y.CENTER), new FrameExpiration(200), reason, new TextStyle(), new FadeIn(50), new FadeOut(50)));
    this.timer.delegateFrameEvent(() => {
      this.restart();
    }, 200);
  }

  practice() {
  }

}
