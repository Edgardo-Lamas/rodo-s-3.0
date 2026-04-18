"use client";

import { Player } from "@remotion/player";
import { TechComposition } from "./TechComposition";

export default function TechPlayer() {
  return (
    <div style={{ width: "100%", aspectRatio: "560 / 640", borderRadius: "1.5rem", overflow: "hidden" }}>
      <Player
        component={TechComposition}
        durationInFrames={180}
        fps={30}
        compositionWidth={560}
        compositionHeight={640}
        inputProps={{}}
        style={{ width: "100%", height: "100%" }}
        autoPlay
        loop
        controls={false}
        clickToPlay={false}
      />
    </div>
  );
}
