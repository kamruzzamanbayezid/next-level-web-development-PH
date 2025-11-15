// ? Using interface

interface MediaPlayer {
  play(): void;
  pause(): void;
  stop(): void;
}

class MusicPlayer implements MediaPlayer {
  play(): void {
    console.log("Play Music...");
  }
  pause(): void {
    console.log("Pause Music");
  }
  stop(): void {
    console.log("Stop Music");
  }
}

const bayezidPayer = new MusicPlayer();
// console.log(bayezidPayer.play());
// console.log(bayezidPayer.pause());
// console.log(bayezidPayer.stop());

abstract class RunCriteria {
  abstract Run(): void;
  abstract Rest(): void;
  abstract Finish(): void;
}

class Runner extends RunCriteria {
  Run(): void {
    console.log("Run started...");
  }
  Rest(): void {
    console.log("5 Minutes Break");
  }
  Finish(): void {
    console.log("Run finished");
  }
}

const runner1 = new Runner();
runner1.Run();
runner1.Rest();
runner1.Finish();
