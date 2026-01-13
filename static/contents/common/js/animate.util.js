window.AnimateUtil = {
  //배열섞기
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  },

  /**
   * 자녀중 첫번째 무비클립
   * @param {createjs.MovieClip} rootMc
   * @returns
   */
  getFirstMC(rootMc) {
    for (const mc of rootMc.children) {
      if (mc instanceof createjs.MovieClip) return mc;
    }
  },

  /**
   * 사운드 플레이
   * @param {string} id
   * @param {bool} loop
   * @param {number} offset
   * @returns
   */
  playSound(id, loop, offset) {
    return createjs.Sound.play(id, {
      interrupt: createjs.Sound.INTERRUPT_EARLY,
      loop: loop,
      offset: offset,
    });
  },

  /**
   * 사운드 중복없이 플레이
   * @param {*} id
   * @param {*} loop
   * @param {*} offset
   * @returns
   */
  checkSound: null,
  playSoundNoDuplication(id, loop, offset) {
    if (this.checkSound) return;

    this.checkSound = createjs.Sound.play(id, {
      interrupt: createjs.Sound.INTERRUPT_EARLY,
      loop: loop,
      offset: offset,
    });

    this.checkSound.on('complete', () => {
      this.checkSound = null;
    });
  },

  /**
   * 사운드 페이드 아웃
   * @param {*} soundID
   * @param {*} decrement
   * @param {*} interval
   */
  fadeOutSound(instance, decrement, interval) {
    const fadeOutInterval = setInterval(function () {
      let volume = instance.volume - decrement;
      if (volume <= 0) {
        volume = 0;
        clearInterval(fadeOutInterval);
      }
      instance.volume = volume;
    }, interval);
  },

  /**
   * 타임라인상에서의 레이어 위치 변경
   * @param {*} movieClip
   * @param {*} child
   * @param {*} position
   */
  setTimeLineChildAt(movieClip, child, position) {
    const mcAnswerIndex = movieClip.timeline.tweens.findIndex(
      (x) => x.target == child
    );

    let tweens = movieClip.timeline.tweens.slice();

    let answerTween = tweens.splice(mcAnswerIndex, 1);
    tweens = tweens.reverse();

    /*
    tweens.forEach((i) => {
      console.log(i.target.name);
    });
    */

    tweens.splice(
      position > tweens.length - 1 ? tweens.length : position,
      0,
      ...answerTween
    );

    for (let i = tweens.length - 1; i >= 0; i--) {
      //console.log('---', tweens[i].target.name);
      movieClip.timeline.addTween(tweens[i]);
    }
  },


  /**
   * 애니메이션 좌우 흔들림
   * @param {*} movieClip 
   * @param {*} option 
   * @param {*} callback 
   */
  aniShake(movieClip, option, callback) {
    const oriX = movieClip.x;

    createjs.Tween.get(movieClip, option || { loop: 0, useTicks: true })
    .to({x:oriX - 5}, 2)
    .to({x:oriX + 5}, 4)
    .to({x:oriX - 5}, 4)
    .to({x:oriX + 5}, 4)
    .to({x:oriX}, 2)
    .wait(1)
    .call(() => {
      createjs.Tween.removeTweens(movieClip);
      callback && callback();
    })
  },

  /**
   * 확대 + 흐릿 -> 원위치
   * @param {*} movieClip 
   * @param {*} option 
   * @param {*} callback 
   */
  aniZoomAndFade(movieClip, option, callback) {
    const oriX = movieClip.x;
    const oriY = movieClip.y;
    createjs.Tween.get(movieClip, option || { loop: 0, useTicks: true })
      .to({scaleX:movieClip.scaleX * 1.2,scaleY:movieClip.scaleY * 1.2,x:oriX,y:oriY,alpha:0.3},11)
      .to({scaleX:movieClip.scaleX,scaleY:movieClip.scaleY,x:oriX, y:oriY,alpha:1},3).wait(1)
      .call(() => {
        createjs.Tween.removeTweens(movieClip);
        callback && callback();
      });
  },

  /**
   * 페이드인 -> 딜레이 -> 페이드아웃
   * @param {*} movieClip 
   * @param {*} delayFrame
   * @param {*} option 
   * @param {*} callback 
   */
  aniFadeInDelayFadeOut(movieClip, delayFrame, option, callback) {
    createjs.Tween.get(movieClip, option || { loop: 0, useTicks: true })
      .to({alpha:1}, 6)
      .wait(delayFrame)
      .to({alpha:0}, 6)
      .call(() => {
        createjs.Tween.removeTweens(movieClip);
        callback && callback();
      });
  }
};
