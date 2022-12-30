import React, { useState, useEffect, useRef } from 'react';
import { togglePlaying } from '../../redux/player/playerSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSongsList,
  getCurrent,
  isPlaying,
  clickAnswer,
} from '../../redux/player/playerSelectors';
import { ReactComponent as Volume } from '../../images/volume-low.svg';
import { ReactComponent as Play } from '../../images/play3.svg';
import s from './Player.module.css';

const Player = props => {
  const [stateVolum, setStateVolum] = useState(0.3);

  const dispatch = useDispatch();

  const songsList = useSelector(getSongsList);
  const currentSong = useSelector(getCurrent);
  const playing = useSelector(isPlaying);
  const isClickAnswer = useSelector(clickAnswer);

  const audio = useRef('audio_tag');
  // console.log(audio);

  const playAudio = () => audio.current.play();

  const handleVolume = q => {
    setStateVolum(q);
    audio.current.volume = q;
  };

  useEffect(() => {
    audio.current.volume = stateVolum;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);
  return (
    <div className={s.controls}>
      <audio
        ref={audio}
        muted={!playing}
        type="audio/mpeg"
        src={songsList[currentSong].url}
        // onEnded={() => dispatch(togglePlaying())}
      />
      <div className={s.vlme}>
        <span className={s.volum}>
          <Volume />
        </span>
        <input
          value={Math.round(stateVolum * 100)}
          type="range"
          name="volBar"
          id="volBar"
          onChange={e => handleVolume(e.target.value / 100)}
        />
      </div>
      <div className={s.musicControls}>
        <span
          className={playing || isClickAnswer ? s.hidden : s.play}
          onClick={() => {
            dispatch(togglePlaying());
            playAudio();
          }}
        >
          <span className={s.icon}>
            <Play />
          </span>
        </span>
      </div>
    </div>
  );
};

export default Player;
