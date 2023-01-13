import React, { useState, useEffect, useRef } from 'react';
import { togglePlaying } from '../../redux/player/playerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setStartPlayingTime } from '../../redux/player/playerSlice';
import {
  getSongsList,
  getCurrent,
  isPlaying,
  clickAnswer,
} from '../../redux/player/playerSelectors';
import { ReactComponent as Volume } from '../../images/volum.svg';
import { ReactComponent as Play } from '../../images/PlayButton.svg';
import s from './Player.module.css';

const Player = () => {
  const [stateVolume, setStateVolume] = useState(0.3);

  const dispatch = useDispatch();

  const songsList = useSelector(getSongsList);
  const currentSong = useSelector(getCurrent);
  const playing = useSelector(isPlaying);
  const isClickAnswer = useSelector(clickAnswer);

  const audio = useRef('audio_tag');

  // PLAY
  const handleClikPlay = () => {
    console.log('total1', Math.round(new Date().getTime()));

    dispatch(setStartPlayingTime(Math.round(new Date().getTime())));
    dispatch(togglePlaying());
    playAudio();
  };
  const playAudio = () => audio.current.play();

  // VOLUME
  const handleVolume = e => {
    const min = e.target.min;
    const max = e.target.max;
    const val = e.target.value;

    // Динамічна зміна бекграунда на полосі
    e.target.style.backgroundSize =
      ((val - min) * 100) / (max - min) + '% 100%';

    setStateVolume(e.target.value / 100);
    audio.current.volume = e.target.value / 100;
  };

  useEffect(() => {
    audio.current.volume = stateVolume;
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
      <div className={s.volume}>
        <span>
          <Volume />
        </span>
        <input
          value={Math.round(stateVolume * 100)}
          min="0"
          max="100"
          type="range"
          name="volBar"
          id="volBar"
          onChange={e => handleVolume(e)}
        />
      </div>
      <div className={playing || isClickAnswer ? s.hidden : s.musicControls}>
        <div>
          <span className={s.play} onClick={handleClikPlay}>
            <Play />
          </span>
          <p className={s.text}>Tap to start</p>
        </div>
      </div>
    </div>
  );
};

export default Player;
