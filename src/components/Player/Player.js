import React, { useState, useEffect, useRef } from 'react';
import { togglePlaying } from '../../redux/player/playerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setStartPlayingTime } from '../../redux/player/playerSlice';
import {
  getQuizMode,
  getSongsList,
  getCurrent,
  isPlaying,
  clickAnswer,
} from '../../redux/player/playerSelectors';
import { ReactComponent as VolumeRobo } from '../../images/volum.svg';
import { ReactComponent as VolumeMusic } from '../../images/volumeMusic.svg';
import { ReactComponent as PlayRobo } from '../../images/PlayButton.svg';
import { ReactComponent as PlayMusic } from '../../images/PlayBttnMusic.svg';
import { ReactComponent as VolumeZeroRobo } from '../../images/volumeZeroRobo.svg';
import { ReactComponent as VolumeZeroMusic } from '../../images/volumeZeroMusic.svg';
import s from './Player.module.css';

const Player = () => {
  const [stateVolume, setStateVolume] = useState(0.3);

  const dispatch = useDispatch();

  const isRoboQuizMode = useSelector(getQuizMode);
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
        {stateVolume > 0 && (
          <span className={s.volumeControl}>
            {isRoboQuizMode ? <VolumeRobo /> : <VolumeMusic />}
          </span>
        )}
        {stateVolume === 0 && (
          <span className={s.volumeControl}>
            {isRoboQuizMode ? <VolumeZeroRobo /> : <VolumeZeroMusic />}
          </span>
        )}

        {isRoboQuizMode ? (
          <input
            value={Math.round(stateVolume * 100)}
            min="0"
            max="100"
            type="range"
            name="volBarRobo"
            id="volBarRobo"
            onChange={e => handleVolume(e)}
          />
        ) : (
          <input
            value={Math.round(stateVolume * 100)}
            min="0"
            max="100"
            type="range"
            name="volBarMusic"
            id="volBarMusic"
            onChange={e => handleVolume(e)}
          />
        )}
      </div>
      <div className={playing || isClickAnswer ? s.hidden : s.musicControls}>
        <div>
          {/* <div className={s.play} onClick={handleClikPlay}> */}
          {isRoboQuizMode ? (
            <PlayRobo className={s.icon} onClick={handleClikPlay} />
          ) : (
            <PlayMusic className={s.icon} onClick={handleClikPlay} />
          )}
          {/* </div> */}

          <p className={isRoboQuizMode ? s.textRobo : s.textMusic}>
            Tap to start
          </p>
        </div>
      </div>
    </div>
  );
};

export default Player;
